import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createTicket } from '../../store/tickets';

function CreateTicketForm() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const currentUser = useSelector(state => state.session.user); 
    const [name, setName] = useState(currentUser ? currentUser.name : "");
    const [email, setEmail] = useState(currentUser ? currentUser.email : "");
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('new');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = {
                ticket: {
                    name,
                    email,
                    description,
                    status,
                    user_id: Number(currentUser.id) 
                }
            };


            await dispatch(createTicket(currentUser.id, formData));

            setName(currentUser.name);
            setEmail(currentUser.email);
            setDescription('');
            navigate('/tickets');
        } catch (error) {
            setError('Failed to create ticket. Please try again.');
            console.error('Error creating ticket:', error);
        }
    };

    const handleCancel = () => {
        navigate('/tickets');
    };



    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card bg-light">
                        <div className="card-body text-center">
                            <h1 className="text-center mb-4">Submit New Ticket</h1>
                            {error && <div className="alert alert-danger">{error}</div>}
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">Provide Name:</label>
                                    <input type="text" id="name" className="form-control text-center" value={name} onChange={(e) => setName(e.target.value)} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Provide Email:</label>
                                    <input type="email" id="email" className="form-control text-center" value={email} onChange={(e) => setEmail(e.target.value)} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Describe your issue:</label>
                                    <textarea id="description" className="form-control text-center"  value={description} onChange={(e) => setDescription(e.target.value)} />
                                </div>
                                <div className="d-grid gap-2">
                                    <button type="button" className="btn btn-danger" onClick={handleCancel}>Cancel</button>
                                    <button type="submit" className="btn btn-primary">Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreateTicketForm;
