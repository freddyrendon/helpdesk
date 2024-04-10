import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom'; 
import { login } from '../../store/session';

function UserLogin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState();
  
  const handleLogin = async (e) => {
    e.preventDefault();
  
    const data = await dispatch(login(email, password));
  
    if (data.errors) {
      setErrors(data.errors); 
    } else {
      localStorage.setItem('session_token', data.session_token);
      navigate('/tickets');
    }
  };

  const handleDemoLogin = async () => {
    // You can use predefined demo credentials for the demo login
    const demoEmail = 'admin@aa.io';
    const demoPassword = '12345';
    
    const data = await dispatch(login(demoEmail, demoPassword));
    
    if (data.errors) {
      setErrors(data.errors); 
    } else {
      localStorage.setItem('session_token', data.session_token);
      navigate('/tickets');
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card bg-light">
            <div className="card-body text-center"> 
              <h1 className="card-title mb-4">Welcome to HelpDesk</h1> 
              <h2>User Login</h2> 
              <form onSubmit={handleLogin}>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="d-grid gap-2">
                  <button className="btn btn-primary" type="submit">Login</button>
                </div>
              </form>
              <div className="mt-3">
                <button className="btn btn-secondary" onClick={handleDemoLogin}>Demo Log In</button>
              </div>
              {errors && <p className="text-danger mt-3">{errors}</p>} 
              <p className="mt-3">Not a user? <Link to="/signup">Click here</Link> to sign up.</p> 
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserLogin;
