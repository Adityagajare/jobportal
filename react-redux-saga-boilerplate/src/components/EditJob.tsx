import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Modal, Button, Alert, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import JobForm, { JobDetails } from './JobForm';
import BASE_URL from '../services/service';

const EditJob: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [initialJob, setInitialJob] = useState<JobDetails | null>(null);
  const [alertMessage, setAlertMessage] = useState<string>('');
  const [alertVariant, setAlertVariant] = useState<'success' | 'danger' | ''>('');
  const [showModal, setShowModal] = useState(true);
  const navigate = useNavigate();


  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await fetch(`${BASE_URL}/admin/job/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch job details');
        }
        const jobDetails: JobDetails = await response.json();
        setInitialJob(jobDetails);
      } catch (error) {
        console.error('Error fetching job details:', error);
        setAlertMessage('Failed to fetch job details. Please try again.');
        setAlertVariant('danger');
      }
    };

    fetchJobDetails();
  }, [id]);

  const handleUpdateJob = async (jobDetails: JobDetails) => {
    try {
      const response = await fetch(`${BASE_URL}/admin/jobupdate/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jobDetails),
      });

      if (!response.ok) {
        throw new Error('Failed to update job');
      }

      const result = await response.json();
      console.log('Success:', result);

      setAlertMessage('Job updated successfully!');
      setAlertVariant('success');

      // Clear alert after 2 seconds
      setTimeout(() => {
        setAlertMessage('');
        setAlertVariant('');
        setShowModal(false);
        navigate('/dashboard/viewjobs');
      }, 2000);
    } catch (error) {
      console.error('Error updating job:', error);
      setAlertMessage('Failed to update job. Please try again.');
      setAlertVariant('danger');
    }
  };

  const handleClose = () => {
    setShowModal(false);
    navigate('/dashboard/viewjobs');
  };

  if (!initialJob) {
    return <div>Loading...</div>;
  }

  return (
    <Modal show={showModal} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit Job</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <JobForm onSubmit={handleUpdateJob} initialJob={initialJob} />
          <div className="w-100 d-flex justify-content-center mt-3">
            {alertMessage && (
              <Alert variant={alertVariant} className="w-75 text-center">
                {alertMessage}
              </Alert>
            )}
          </div>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditJob;
