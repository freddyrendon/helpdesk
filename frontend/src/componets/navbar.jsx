import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { logout } from '../store/session'; 

function Navbar() {
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const navigate = useNavigate(); 

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('user'); // remove user from storage
    navigate('/');
  };

  const formatName = (name) => {
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        <Link className="navbar-brand" to="/tickets">Help Desk</Link>
        <div className="d-flex align-items-center">
          {user ? (
            <>
              <span className="me-2 text-white">Welcome, {formatName(user.name)}!</span>
              <button className="btn btn-light me-2" onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <Link className="nav-link me-2" to="/userlogin">Login</Link>
              <Link className="nav-link me-2" to="/signup">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}


export default Navbar;
