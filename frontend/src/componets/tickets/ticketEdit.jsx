import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchTicket, updateTicket } from '../../store/tickets';

function EditTicketForm() {
    const { id } = useParams(); 
    const dispatch = useDispatch();
    const ticket = useSelector(state => state.tickets[id]);
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('');
    
    useEffect(() => {
        if (id) { 
            dispatch(fetchTicket(ticket.user_id,ticket.id));
        }
    }, [dispatch, id]);

    useEffect(() => {
        if (ticket) {
            setName(ticket.name);
            setEmail(ticket.email);
            setDescription(ticket.description);
            setStatus(ticket.status);
        }
    }, [ticket]);
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append('ticket[name]', name);
            formData.append('ticket[email]', email);
            formData.append('ticket[description]', description);
            formData.append('ticket[status]', status);

            // dispatch action to update the ticket
            const response = await dispatch(updateTicket(ticket.user_id,ticket.id,formData));

            console.log('Ticket updated successfully:', response);

            navigate(`/users/${ticket.user_id}/tickets/${ticket.id}`);

        } catch (error) {
            console.error('Error updating ticket:', error);
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
                            <h1 className="mb-4">Edit Ticket</h1> 
                            {ticket && (
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label htmlFor="name" className="form-label">Name:</label>
                                        <input type="text" id="name" className="form-control text-center" value={name} onChange={(e) => setName(e.target.value)} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label">Email:</label>
                                        <input type="email" id="email" className="form-control text-center" value={email} onChange={(e) => setEmail(e.target.value)} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="description" className="form-label">Description:</label>
                                        <textarea id="description" className="form-control text-center" value={description} onChange={(e) => setDescription(e.target.value)} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="status" className="form-label">Status:</label>
                                        <select id="status" className="form-select text-center" value={status} onChange={(e) => setStatus(e.target.value)}>
                                            <option value="new">New</option>
                                            <option value="in_progress">In Progress</option> 
                                            <option value="resolved">Resolved</option>
                                        </select>
                                    </div>
                                <div className="d-grid gap-2">
                                    <button type="button" className="btn btn-danger" onClick={handleCancel}>Cancel</button>
                                    <button type="submit" className="btn btn-primary">Submit</button>
                                </div>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditTicketForm;
