import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom"; 
import TicketList from "./componets/tickets/ticketList";
import TicketShow from "./componets/tickets/tickItem";
import EditTicketForm from "./componets/tickets/ticketEdit";
import CreateTicketForm from "./componets/tickets/ticketCreate";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import UserLogin from "./componets/user/userLogin"
import Navbar from "./componets/navbar";
import UserSignUp from "./componets/user/userSignup";
import { authenticate } from "./store/session"; 

function App() {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(state => state.session.user !== null);

    useEffect(() => {
        dispatch(authenticate());
    }, [dispatch]);

    return (
        <Router>
            {isLoggedIn && <Navbar />} 
            <Routes>

                <Route path="/" element={<UserLogin />} />
                <Route path="/signup" element={<UserSignUp />} />

                {isLoggedIn && (
                    <>
                        <Route path="/tickets" element={<TicketList />} />
                        <Route path="/tickets/:user_id/create" element={<CreateTicketForm />} />
                        <Route path="/users/:user_id/tickets/:id/edit" element={<EditTicketForm />} />
                        <Route path="/users/:user_id/tickets/:id" element={<TicketShow />} />
                    </>
                )}

                {!isLoggedIn && <Route path="*" element={<Navigate to="/" />} />}
            </Routes>
        </Router>
    );
}

export default App;
