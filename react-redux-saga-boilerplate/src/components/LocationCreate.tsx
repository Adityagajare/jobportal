import React, { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ColDef, ICellRendererParams } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { Modal, Button, Alert, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import BASE_URL from '../services/service';

interface Location {
  id: number;
  city: string;
  country: string;
}

const LocationCreate: React.FC = () => {
  const [rowData, setRowData] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedLocationId, setSelectedLocationId] = useState<number | null>(null);
  const [editCity, setEditCity] = useState('');
  const [editCountry, setEditCountry] = useState('');
  const [newCity, setNewCity] = useState('');
  const [newCountry, setNewCountry] = useState('');
  const [alertMessage, setAlertMessage] = useState<string>('');
  const [alertVariant, setAlertVariant] = useState<'success' | 'danger' | ''>('');

  const fetchLocations = async () => {
    try {
      const response = await fetch(`${BASE_URL}/admin/locations`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setRowData(data.locations);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching locations:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLocations();
  }, []);

  const handleCreate = () => {
    setShowCreateModal(true);
  };

  const handleEdit = (id: number, city: string, country: string) => {
    setSelectedLocationId(id);
    setEditCity(city);
    setEditCountry(country);
    setShowEditModal(true);
  };

  const handleDelete = (id: number) => {
    setSelectedLocationId(id);
    setShowDeleteModal(true);
  };

  const confirmCreate = async () => {
    try {
      const response = await fetch(`${BASE_URL}/admin/createlocation`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ city: newCity, country: newCountry }),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      fetchLocations(); 
      setAlertMessage('Location created successfully!');
      setAlertVariant('success');
    } catch (error) {
      console.error('Error creating location:', error);
      setAlertMessage('Failed to create location. Please try again.');
      setAlertVariant('danger');
    } finally {
      setShowCreateModal(false);
      setNewCity('');
      setNewCountry('');
      setTimeout(() => {
        setAlertMessage('');
        setAlertVariant('');
      }, 3000);
    }
  };

  const confirmEdit = async () => {
    if (selectedLocationId === null) return;
    try {
      const response = await fetch(`${BASE_URL}/admin/updatelocation/${selectedLocationId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ city: editCity, country: editCountry }),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      fetchLocations();
      setAlertMessage('Location updated successfully!');
      setAlertVariant('success');
    } catch (error) {
      console.error('Error updating location:', error);
      setAlertMessage('Failed to update location. Please try again.');
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
    if (selectedLocationId === null) return;
    try {
      const response = await fetch(`${BASE_URL}/admin/deletelocation/${selectedLocationId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      setRowData(prevData => prevData.filter(location => location.id !== selectedLocationId));
      setAlertMessage('Location deleted successfully!');
      setAlertVariant('success');
    } catch (error) {
      console.error('Error deleting location:', error);
      setAlertMessage('Failed to delete location. Please try again.');
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
          onClick={() => handleEdit(params.data.id, params.data.city, params.data.country)}
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
    { field: 'city', headerName: 'City', sortable: true, filter: true },
    { field: 'country', headerName: 'Country', sortable: true, filter: true },
    {
      headerName: 'Actions',
      cellRenderer: 'actionCellRenderer',
    },
  ];

  return (
    <div className="App" style={{ margin: '2rem 1rem' }}>
      <div className="d-flex justify-content-between align-items-center">
        <h2 style={{ margin: '1rem' }}>Location Management</h2>
        <button
          className="btn btn-light border-dark bg-dark text-white"
          style={{ margin: '1rem', padding: '1rem' }}
          onClick={handleCreate}
        >
          Create Location
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

      {/* Modal for creating location */}
      <Modal show={showCreateModal} onHide={() => setShowCreateModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Create Location</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formCity">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter city"
                value={newCity}
                onChange={(e) => setNewCity(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formCountry">
              <Form.Label>Country</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter country"
                value={newCountry}
                onChange={(e) => setNewCountry(e.target.value)}
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

      {/* Modal for edit location */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Location</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formCity">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter city"
                value={editCity}
                onChange={(e) => setEditCity(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formCountry">
              <Form.Label>Country</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter country"
                value={editCountry}
                onChange={(e) => setEditCountry(e.target.value)}
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
        <Modal.Body>Are you sure you want to delete this location?</Modal.Body>
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

export default LocationCreate;
