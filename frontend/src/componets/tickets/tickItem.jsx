import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchTicket } from '../../store/tickets';
import { useDispatch, useSelector } from 'react-redux';

const TicketShow = () => {
    const { id } = useParams(); 
    const dispatch = useDispatch();
    const ticket = useSelector(state => state.tickets[id]);

    useEffect(() => {
        dispatch(fetchTicket(ticket.user_id, ticket.id));
    }, [dispatch, id]);

    if (!ticket) {
        return <div>Loading...</div>;
    }
  
    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card bg-light">
                        <div className="card-body text-center"> 
                            <h1 className="card-title">Ticket Details</h1> 
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item"><strong>Name:</strong> {ticket.name}</li>
                                <li className="list-group-item"><strong>Email:</strong> {ticket.email}</li>
                                <li className="list-group-item"><strong>Description:</strong> {ticket.description}</li>
                                <li className="list-group-item"><strong>Status:</strong> {ticket.status}</li>
                            </ul>
                            <div className="d-grid gap-2">
                                <Link to="/tickets" className="btn btn-primary mt-3">Back to Tickets List</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TicketShow;
