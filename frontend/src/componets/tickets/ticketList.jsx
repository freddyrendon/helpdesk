import React, { useState, useEffect } from 'react';
import { fetchUserTickets, deleteTicket } from '../../store/tickets';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import './ticketListcss.css';

function TicketList() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const currentUser = useSelector(state => state.session.user);
    const tickets = useSelector(state => state.tickets);

    useEffect(() => {
        const loadTickets = async () => {
            try {
                if (currentUser) {
                    await dispatch(fetchUserTickets(currentUser.id, currentUser.role));
                }
                setLoading(false);
            } catch (error) {
                console.error("Error fetching tickets:", error);
                setLoading(false);
            }
        };

        loadTickets();
    }, [dispatch, currentUser]);

    if (loading) {
        return (
            <div className="container mt-5">
                <div className="row">
                    <div className="col text-center">
                        <h1 className="display-4">Loading...</h1>
                    </div>
                </div>
            </div>
        );
    }

    if (!tickets || Object.keys(tickets).length === 0) {
        return (
            <div className="container mt-5">
                <div className="row">
                    <div className="col text-center">
                        <h1 className="display-4">No tickets available</h1>
                        {currentUser && (
                            <Link to={`/tickets/${currentUser.id}/create`} className="btn btn-primary mt-3">Create Ticket</Link>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    const handleDelete = (userId, ticketId) => {
        dispatch(deleteTicket(userId, ticketId));
    };

    const handleEdit = (userId, ticketId) => {
        navigate(`/users/${userId}/tickets/${ticketId}/edit`);
    };

    const reversedTickets = Object.values(tickets).reverse();


    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <h1 className="mb-4 text-center">Ticket List</h1> 
                    <div className="d-flex justify-content-center mb-3"> 
                        <Link to={`/tickets/${currentUser.id}/create`} className="btn btn-primary">Create Ticket</Link>
                    </div>
                    <div className="row">
                        {reversedTickets.map(ticket => (
                            <div className="col-md-6 mb-3" key={ticket.id}>
                                <div className="card">
                                    <div className="my-card-body">
                                        <Link to={`/users/${ticket.user_id}/tickets/${ticket.id}`} className="ticket-link d-flex flex-column justify-content-center align-items-center"> 
                                            <h5 className="card-title">{ticket.name}</h5>
                                            <p className="card-text">Email: {ticket.email}</p>
                                            <p className="card-text">Description: {ticket.description}</p>
                                            <p className="card-text">Status: {ticket.status}</p>
                                            </Link>
                                            {currentUser.role === "admin" && (
                                                <div className="d-flex justify-content-center mt-3">
                                                    <button
                                                        className="btn btn-danger me-2"
                                                        onClick={() => handleDelete(ticket.user_id, ticket.id)}
                                                    >
                                                        Delete
                                                    </button>
                                                    <button
                                                        className="btn btn-primary"
                                                        onClick={() => handleEdit(ticket.user_id, ticket.id)}
                                                    >
                                                        Edit
                                                    </button>
                                                </div>
                                            )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TicketList;

