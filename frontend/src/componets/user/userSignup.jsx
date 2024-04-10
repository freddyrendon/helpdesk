import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signUp } from '../../store/session';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../../store/session'; 

function UserSignUp() {
    const dispatch = useDispatch();
    const navigate = useNavigate(); 
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('user');
    const [nameErrors, setNameErrors] = useState([]);
    const [emailErrors, setEmailErrors] = useState([]);
    const [passwordErrors, setPasswordErrors] = useState([]);


    const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
        setNameErrors(["Name cannot be blank"]);
        return;
    }

    if (!email.trim()) {
        setEmailErrors(["Email cannot be blank"]);
        return;
    }

    if (!password.trim()) {
        setPasswordErrors(["Password cannot be blank"]);
        return;
    }

    const userData = {
        name,
        email,
        password,
        role,
    };

    const data = await dispatch(signUp(userData));

    if (data && data.message === 'User created successfully') {
        
        await dispatch(login(email, password));
        navigate('/tickets');
    } else {
       
        console.error("Unexpected response from server:", data);
    }
};

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card bg-light">
                        <div className="card-body">
                            <h1 className="card-title text-center">Welcome to HelpDesk</h1> 
                            <h2 className="card-title text-center">Sign Up</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label">Name:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                    {nameErrors.length > 0 && (
                                        <ul className="list-unstyled mt-1">
                                            {nameErrors.map((error, index) => (
                                                <li key={index} className="text-danger">{error}</li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Email:</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                    {emailErrors.length > 0 && (
                                        <ul className="list-unstyled mt-1">
                                            {emailErrors.map((error, index) => (
                                                <li key={index} className="text-danger">{error}</li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Password:</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    {passwordErrors.length > 0 && (
                                        <ul className="list-unstyled mt-1">
                                            {passwordErrors.map((error, index) => (
                                                <li key={index} className="text-danger">{error}</li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Role:</label>
                                    <select className="form-select" value={role} onChange={(e) => setRole(e.target.value)}>
                                        <option value="user">User</option>
                                        <option value="admin">Admin</option>
                                    </select>
                                </div>
                                <button type="submit" className="btn btn-primary">Sign Up</button>
                            </form>
                            <p className="mt-3">Already a user? <Link to="/">Click here</Link> to log in.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserSignUp;
