import React, { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ColDef, ICellRendererParams } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { Modal, Button, Alert, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import BASE_URL from '../services/service';

interface Category {
  id: number;
  categoryname: string;
}

const CategoryManage: React.FC = () => {
  const [rowData, setRowData] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  const [editCategory, setEditCategory] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [alertMessage, setAlertMessage] = useState<string>('');
  const [alertVariant, setAlertVariant] = useState<'success' | 'danger' | ''>('');

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${BASE_URL}/admin/categories`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setRowData(data.categories);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching categories:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCreate = () => {
    setShowCreateModal(true);
  };

  const handleEdit = (id: number, categoryname: string) => {
    setSelectedCategoryId(id);
    setEditCategory(categoryname);
    setShowEditModal(true);
  };

  const handleDelete = (id: number) => {
    setSelectedCategoryId(id);
    setShowDeleteModal(true);
  };

  const confirmCreate = async () => {
    try {
      const response = await fetch(`${BASE_URL}/admin/categories`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ categoryname: newCategory }),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      fetchCategories(); // Refresh the list
      setAlertMessage('Category created successfully!');
      setAlertVariant('success');
    } catch (error) {
      console.error('Error creating category:', error);
      setAlertMessage('Failed to create category. Please try again.');
      setAlertVariant('danger');
    } finally {
      setShowCreateModal(false);
      setNewCategory('');
      setTimeout(() => {
        setAlertMessage('');
        setAlertVariant('');
      }, 3000);
    }
  };

  const confirmEdit = async () => {
    if (selectedCategoryId === null) return;
    try {
      const response = await fetch(`${BASE_URL}/admin/updatecategory/${selectedCategoryId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ categoryname: editCategory }),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      fetchCategories(); // Refresh the list
      setAlertMessage('Category updated successfully!');
      setAlertVariant('success');
    } catch (error) {
      console.error('Error updating category:', error);
      setAlertMessage('Failed to update category. Please try again.');
      setAlertVariant('danger');
    } finally {
      setShowEditModal(false);
      setTimeout(() => {
        setAlertMessage('');
        setAlertVariant('');
      }, 3000);
    }
  };

  const confirmDelete = async () => {
    if (selectedCategoryId === null) return;
    try {
      const response = await fetch(`${BASE_URL}/admin/categorydelete/${selectedCategoryId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      setRowData(prevData => prevData.filter(category => category.id !== selectedCategoryId));
      setAlertMessage('Category deleted successfully!');
      setAlertVariant('success');
    } catch (error) {
      console.error('Error deleting category:', error);
      setAlertMessage('Failed to delete category. Please try again.');
      setAlertVariant('danger');
    } finally {
      setShowDeleteModal(false);
      setTimeout(() => {
        setAlertMessage('');
        setAlertVariant('');
      }, 3000);
    }
  };

  const ActionCellRenderer: React.FC<ICellRendererParams> = params => {
    return (
      <div>
        <button
          className="btn btn-sm btn-primary"
          onClick={() => handleEdit(params.data.id, params.data.categoryname)}
          style={{ marginRight: '0.5rem' }}
        >
          Edit
        </button>
        <button className="btn btn-sm btn-danger" onClick={() => handleDelete(params.data.id)}>
          Delete
        </button>
      </div>
    );
  };

  const columnDefs: ColDef[] = [
    { field: 'categoryname', headerName: 'Category', sortable: true, filter: true },
    {
      headerName: 'Actions',
      cellRenderer: 'actionCellRenderer',
    },
  ];

  return (
    <div className="App" style={{ margin: '2rem 1rem' }}>
      <div className="d-flex justify-content-between align-items-center">
        <h2 style={{ margin: '1rem' }}>Category Management</h2>
        <button
          className="btn btn-light border-dark bg-dark text-white"
          style={{ margin: '1rem', padding: '1rem' }}
          onClick={handleCreate}
        >
          Create Category
        </button>
      </div>
      {alertMessage && (
        <Alert variant={alertVariant} className="w-50 mx-auto">
          {alertMessage}
        </Alert>
      )}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="ag-theme-alpine" style={{ height: 400, width: '100%' }}>
          <AgGridReact
            defaultColDef={{ flex: 1 }}
            rowHeight={60}
            rowData={rowData}
            columnDefs={columnDefs}
            components={{ actionCellRenderer: ActionCellRenderer }}
          />
        </div>
      )}

      {/* Modal for creating category */}
      <Modal show={showCreateModal} onHide={() => setShowCreateModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Create Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formCategory">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter category"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCreateModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={confirmCreate}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal for editing category */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formCategory">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter category"
                value={editCategory}
                onChange={(e) => setEditCategory(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={confirmEdit}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal for delete confirmation */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this category?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CategoryManage;
