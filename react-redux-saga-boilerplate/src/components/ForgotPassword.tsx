import React, { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';
import styled from '@emotion/styled';
import 'bootstrap/dist/css/bootstrap.min.css';
import bgImg from "../assets/Images/bgimg.jpg";
import BASE_URL from '../services/service';

const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f8f9fa;
  background-image: url(${bgImg});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

const FormWrapper = styled.div`
  background: #ffffff;
  padding: 2rem;
  border-radius: 0.5rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
`;

const securityQuestions = [
  'What was the name of your first pet?',
  'What is your favorite color?',
  'What is your nickname?',
];

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [securityQuestion, setSecurityQuestion] = useState<string>('');
  const [securityAnswer, setSecurityAnswer] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [alertVariant, setAlertVariant] = useState<'success' | 'danger' | 'info' | 'warning'>('success');
  const [alertMessage, setAlertMessage] = useState<string>('');
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      const response = await fetch(`${BASE_URL}/users/forgot-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, security_question: securityQuestion, security_answer: securityAnswer, new_password: newPassword }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setAlertVariant('success');
        setAlertMessage(data.msg || 'Password updated successfully!');
        setShowAlert(true);
        setEmail('');
        setSecurityQuestion('');
        setSecurityAnswer('');
        setNewPassword('');
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        setAlertVariant('danger');
        setAlertMessage('Failed to update password! ' + data.msg);
        setShowAlert(true);
      }
    } catch (error) {
      console.error('Error during password update:', error);
      setAlertVariant('danger');
      setAlertMessage('An error occurred.');
      setShowAlert(true);
    }
  };

  return (
    <FormContainer>
      <FormWrapper>
    <div>
      <h2>Forgot Password</h2>
      {showAlert && (
        <Alert variant={alertVariant} onClose={() => setShowAlert(false)} dismissible>
          {alertMessage}
        </Alert>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
            <label htmlFor="securityQuestion" className="form-label">Security Question</label>
            <select
              id="securityQuestion"
              className="form-select"
              value={securityQuestion}
              onChange={e => setSecurityQuestion(e.target.value)}
              required
            >
              <option value="">Select a question</option>
              {securityQuestions.map((question, index) => (
                <option key={index} value={question}>{question}</option>
              ))}
            </select>
          </div>
        <div className="mb-3">
          <label htmlFor="securityAnswer" className="form-label">Security Answer</label>
          <input
            type="text"
            className="form-control"
            id="securityAnswer"
            placeholder="Enter your security answer"
            value={securityAnswer}
            onChange={e => setSecurityAnswer(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="newPassword" className="form-label">New Password</label>
          <input
            type="password"
            className="form-control"
            id="newPassword"
            placeholder="Enter your new password"
            value={newPassword}
            onChange={e => setNewPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100 mb-2">
          Update Password
        </button>
      </form>
    </div>
    </FormWrapper>
    </FormContainer>
  );
};

export default ForgotPassword;

