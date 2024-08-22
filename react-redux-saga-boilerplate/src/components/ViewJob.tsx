import React, { useEffect, useMemo, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ColDef, ICellRendererParams } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { useNavigate } from 'react-router-dom';
import { Modal, Button, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import CreateJob from './JobCreate';
import { useSelector } from 'react-redux';
import { selectAllJobs } from '~/selectors';
import { useDispatch } from 'react-redux';
import { getAllJobs, deleteJob } from '../store/actions';



type Location = {
  city: string;
  country: string;
};

type Skill = {
  skill: string;
};

type Category = {
  categoryname: string;
};

type JobDetails = {
  id: string;
  title: string;
  description: string;
  salary: string;
  location: Location;
  skills: Skill[];
  category: Category;
  dateOfPost: string;
  lastDate: string;
  education: string;
  experience: string;
  jobType: string;
};

const ViewJob: React.FC = () => {
  // const [rowData, setRowData] = useState<JobDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
  const [alertMessage, setAlertMessage] = useState<string>('');
  const [alertVariant, setAlertVariant] = useState<'success' | 'danger' | ''>('');


  const rowData = useSelector(selectAllJobs).data;
  const dispatch = useDispatch();

  useEffect(()=>{
    const fetchData = async () => {
            try {
              await dispatch(getAllJobs());
            } catch (error) {
              setAlertMessage('Failed to load job details. Please try again.');
              setAlertVariant('danger');
            } finally {
              setLoading(false);
            }
          };
      
          fetchData();
  },[dispatch])

  const navigate = useNavigate();

  const deletingJob = async (jobId: string) => {
    try {
      const response = await fetch(`http://localhost:5000/api/admin/jobdelete/${jobId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
    } catch (error) {
      console.error('Error deleting job:', error);
      throw error;
    }
  };


  const handleEdit = (id: string) => {
    setSelectedJobId(id);
    setShowEditModal(true);
  };

  const confirmEdit = () => {
    if (selectedJobId) {
      navigate(`/dashboard/editjob/${selectedJobId}`);
      setShowEditModal(false);
    }
  };

  const handleDelete = (id: string) => {
    setSelectedJobId(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (selectedJobId) {
      try {
        await deletingJob(selectedJobId);
        // setRowData(prevData => prevData.filter(job => job.id !== selectedJobId));
        await dispatch(deleteJob(selectedJobId))
        setAlertMessage('Job deleted successfully!');
        setAlertVariant('success');
      } catch {
        setAlertMessage('Failed to delete job. Please try again.');
        setAlertVariant('danger');
      } finally {
        setShowDeleteModal(false);
        setTimeout(() => {
          setAlertMessage('');
          setAlertVariant('');
        }, 3000);
      }
    }
  };

  const handleViewUsers = (jobId: string) => {
    navigate(`/dashboard/userlist/jobid/${jobId}`, { state: { jobId } });
  };

  const ActionCellRenderer: React.FC<ICellRendererParams> = params => (
    <div>
      <button
        className="btn btn-sm btn-primary"
        onClick={() => handleEdit(params.data.id)}
        style={{ marginRight: '0.5rem' }}
      >
        Edit
      </button>
      <button className="btn btn-sm btn-danger" onClick={() => handleDelete(params.data.id)}>
        Delete
      </button>
    </div>
  );

  const ViewUsersCellRenderer: React.FC<ICellRendererParams> = params => (
    <button className="btn btn-sm btn-info" onClick={() => handleViewUsers(params.data.id)}>
      View Applicants
    </button>
  );

  const frameworkComponents = {
    actionCellRenderer: ActionCellRenderer,
    viewUsersCellRenderer: ViewUsersCellRenderer,
  };

  const defaultColDef = useMemo(() => {
    return {
        filter: 'agTextColumnFilter',
        // floatingFilter: true,
    };
  }, []);

  const pagination = true;
  const paginationPageSize = 10;
  const paginationPageSizeSelector = [10, 20, 30];


  const columnDefs: ColDef[] = [
    { 
    field: 'title', 
    headerName: 'Job Title', 
    sortable: true, 
    filter: true 
  },
    { 
      field: 'description', 
      headerName: 'Description', 
      sortable: true, 
      filter: true },
    {
      field: 'location.city',
      headerName: 'Location',
      sortable: true,
      filter: true,
      cellClass: 'vertical-middle',
      valueGetter: params => `${params.data.location.city}, ${params.data.location.country}`,
      width: 150,
    },
    { 
      field: 'salary', 
      headerName: 'Salary', 
      sortable: true, 
      filter: true,
      width: 120,
    },
    {
      field: 'skills',
      headerName: 'Skills',
      sortable: true,
      filter: true,
      cellClass: 'vertical-middle',
      valueGetter: params => params.data.skills.map(skill => skill.skill).join(', '),
    },
    { 
      field: 'category.categoryname', 
      headerName: 'Category', 
      sortable: true, 
      filter: true,
      width: 120,
    },
    { 
      field: 'dateOfPost', 
      headerName: 'Date of Post', 
      sortable: true, 
      filter: true,
      width: 120,
    },
    { 
      field: 'lastDate', 
      headerName: 'Last Date', 
      sortable: true, 
      filter: true,
      width: 120,
    },
    {
      field: 'education', 
      headerName: 'Education', 
      sortable: true, 
      filter: true,
      width: 150,
    },
    {
      field: 'experience', 
      headerName: "Experience", 
      sortable: true, 
      filter: true,
      width: 120,
    },
    {
      field: 'jobType', 
      headerName: 'Job Type', 
      sortable: true, 
      filter: true,
      width: 120,
    },
    {
      headerName: 'Actions',
      cellRenderer: 'actionCellRenderer',
      width: 120,
    },
    {
      headerName: 'Applied Users',
      cellRenderer: 'viewUsersCellRenderer',
      width: 150,
    },
  ];

  const handleModalClose = () => {
    setShowModal(false);
    fetchJobs().then(jobs => setRowData(jobs));
  };

  return (
    <div className="App" style={{ margin: '2rem 1rem' }}>
      <div className="d-flex justify-content-between align-items-center">
        <h2 style={{ margin: '1rem' }}>Job Listing</h2>
        <button
          className="btn btn-light border-dark bg-dark text-white"
          style={{ margin: '1rem', padding: '1rem' }}
          onClick={() => setShowModal(true)}
        >
          Create Job
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
        <div className="ag-theme-alpine ag-style" style={{ height: 400, width: '100%' }}>
          <AgGridReact
            defaultColDef={defaultColDef}
            rowHeight={60}
            rowData={rowData}
            columnDefs={columnDefs}
            components={frameworkComponents}
            pagination={pagination}
            paginationPageSize={paginationPageSize}
            paginationPageSizeSelector={paginationPageSizeSelector}
          />
        </div>
      )}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Create Job</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CreateJob onClose={handleModalClose} />
        </Modal.Body>
      </Modal>
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Edit</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to edit this job?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={confirmEdit}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this job?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="success" onClick={confirmDelete}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ViewJob;
