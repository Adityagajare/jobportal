import React, { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import Alert from 'react-bootstrap/Alert';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch } from 'react-redux';
import { login } from '../store/actions';
import bgImg from "../assets/Images/bgimg.jpg";
import { Link } from 'react-router-dom';
import BASE_URL from '../services/service';

const LoginContainer = styled.div`
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

const Title = styled.h2`
  margin-bottom: 1.5rem;
  text-align: center;
  color: #113740;
`;

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showAlert, setShowAlert] = useState(false);
  const [alertVariant, setAlertVariant] = useState<'success' | 'danger' | 'info' | 'warning'>(
    'success',
  );
  const [alertMessage, setAlertMessage] = useState<string>('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      const response = await fetch(`${BASE_URL}/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log(data);

      if (response.ok && data.success) {
        setTimeout(()=>{
          setAlertVariant('success');
        setAlertMessage(data.message || 'Login successful!');
        setShowAlert(true);
        setEmail('');
        setPassword('');

        dispatch(login(data.user));
        setTimeout(()=>{
          if(data.user.user_role === '1'){
            navigate('/dashboard')
          }else{
            navigate('/')
          }
        },1500)
        console.log(data.user, 'ppppp');
        })
      } else {
        setAlertVariant('danger');
        setAlertMessage(data.message || 'Login failed!');
        setShowAlert(true);
      }
    } catch (error) {
      console.error('Error during login:', error);
      setAlertVariant('danger');
      setAlertMessage('An error occurred during login.');
      setShowAlert(true);
    }
  };

  return (
    <LoginContainer>
      <FormWrapper>
        <Title>Login</Title>
        {/* Display Alert if showAlert state is true */}
        {showAlert && (
          <Alert variant={alertVariant} onClose={() => setShowAlert(false)} dismissible>
            {alertMessage}
          </Alert>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
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
          <div className="mb-4">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100 mb-2">
            Login
          </button>
        </form>
        <span>
          <Link to='/register'> Go to register page</Link>
        </span>
        <div className=" mt-2">
          <Link to='/forgot-password'>Forgot Password?</Link>
        </div>
      </FormWrapper>
    </LoginContainer>
  );
};

export default LoginPage;
