import React, { useEffect, useState, useCallback } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ColDef, ICellRendererParams } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { Modal, Button, Alert, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

interface Skill {
  id: number;
  skill: string;
}

const Skills: React.FC = () => {
  const [rowData, setRowData] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedSkillId, setSelectedSkillId] = useState<number | null>(null);
  const [editSkill, setEditSkill] = useState('');
  const [newSkill, setNewSkill] = useState('');
  const [alertMessage, setAlertMessage] = useState<string>('');
  const [alertVariant, setAlertVariant] = useState<'success' | 'danger' | ''>('');

  const fetchSkills = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:5000/api/admin/skills');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setRowData(data.skills);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching skills:', error);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSkills();
  }, [fetchSkills]);

  const handleCreate = () => {
    setShowCreateModal(true);
  };

  const handleEdit = (id: number, skill: string) => {
    setSelectedSkillId(id);
    setEditSkill(skill);
    setShowEditModal(true);
  };

  const handleDelete = (id: number) => {
    setSelectedSkillId(id);
    setShowDeleteModal(true);
  };

  const confirmCreate = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/admin/skill', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ skill: newSkill }),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      fetchSkills(); 
      setAlertMessage('Skill created successfully!');
      setAlertVariant('success');
    } catch (error) {
      console.error('Error creating skill:', error);
      setAlertMessage('Failed to create skill. Please try again.');
      setAlertVariant('danger');
    } finally {
      setShowCreateModal(false);
      setNewSkill('');
      setTimeout(() => {
        setAlertMessage('');
        setAlertVariant('');
      }, 3000);
    }
  };

  const confirmEdit = async () => {
    if (selectedSkillId === null) return;
    try {
      const response = await fetch(`http://localhost:5000/api/admin/skill/${selectedSkillId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ skill: editSkill }),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      fetchSkills();
      setAlertMessage('Skill updated successfully!');
      setAlertVariant('success');
    } catch (error) {
      console.error('Error updating skill:', error);
      setAlertMessage('Failed to update skill. Please try again.');
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
    if (selectedSkillId === null) return;
    try {
      const response = await fetch(`http://localhost:5000/api/admin/skill/${selectedSkillId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      setRowData(prevData => prevData.filter(skill => skill.id !== selectedSkillId));
      setAlertMessage('Skill deleted successfully!');
      setAlertVariant('success');
    } catch (error) {
      console.error('Error deleting skill:', error);
      setAlertMessage('Failed to delete skill. Please try again.');
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
          onClick={() => handleEdit(params.data.id, params.data.skill)}
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
    { field: 'skill', headerName: 'Skill', sortable: true, filter: true },
    {
      headerName: 'Actions',
      cellRenderer: 'actionCellRenderer',
    },
  ];

  return (
    <div className="App" style={{ margin: '2rem 1rem' }}>
      <div className="d-flex justify-content-between align-items-center">
        <h2 style={{ margin: '1rem' }}>Skill Management</h2>
        <button
          className="btn btn-light border-dark bg-dark text-white"
          style={{ margin: '1rem', padding: '1rem' }}
          onClick={handleCreate}
        >
          Create Skill
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

      {/* Modal for creating skill */}
      <Modal show={showCreateModal} onHide={() => setShowCreateModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Create Skill</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formSkill">
              <Form.Label>Skill</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter skill"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
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

      {/* Modal for editing skill */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Skill</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formSkill">
              <Form.Label>Skill</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter skill"
                value={editSkill}
                onChange={(e) => setEditSkill(e.target.value)}
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
        <Modal.Body>Are you sure you want to delete this skill?</Modal.Body>
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

export default Skills;
