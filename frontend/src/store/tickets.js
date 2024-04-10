export const RECEIVE_TICKETS = 'tickets/RECEIVE_TICKETS';
export const RECEIVE_TICKET = 'tickets/RECEIVE_TICKET';
export const REMOVE_TICKET = 'tickets/REMOVE_TICKET';
export const RESET_TICKETS = 'tickets/RESET_TICKETS'; // Add a new action type


export const getTicket = (ticketId) => (state) => {
  return state.tickets && state.tickets[ticketId] ? state.tickets[ticketId] : null;
};

export const getTickets = () => (state) => (
  state.tickets ? Object.values(state.tickets) : []
);

export const fetchTickets = (userId) => async (dispatch) => {
  try {
    const response = await fetch(`/api/users/${userId}/tickets`);
    const data = await response.json();

    dispatch({
      type: RECEIVE_TICKETS,
      tickets: data,
    });
  } catch (error) {
    console.error('Error fetching tickets:', error);
  }
};

export const fetchUserTickets = (userId, currentUserRole) => async (dispatch) => {
  try {
    let response;
    if (currentUserRole === 'admin') {
      response = await fetch(`/api/users/${userId}/tickets`);
    } else {
      response = await fetch(`/api/users/${userId}/tickets?user=${userId}`);
    }
    
    const data = await response.json();

    dispatch({
      type: RECEIVE_TICKETS,
      tickets: data,
    });
  } catch (error) {
    console.error('Error fetching user tickets:', error);
  }
};

export const fetchTicket = (userId, ticketId) => async (dispatch) => {
  try {
    const response = await fetch(`/api/users/${userId}/tickets/${ticketId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch ticket');
    }
    const ticket = await response.json();

    dispatch({
      type: RECEIVE_TICKET,
      ticket,
    });
  } catch (error) {
    console.error('Error fetching ticket:', error);
  }
};

export const createTicket = (userId, formData) => async (dispatch) => {
  try {
    const response = await fetch(`/api/users/${userId}/tickets`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      const data = await response.json();

      dispatch({
        type: RECEIVE_TICKET,
        ticket: data,
      });
    } else {
      throw new Error('Failed to create ticket');
    }
  } catch (error) {
    console.error('Error creating ticket:', error);
  }
};

export const updateTicket = (userId, ticketId, formData) => async (dispatch) => {
  try {
    const response = await fetch(`/api/users/${userId}/tickets/${ticketId}`, {
      method: 'PATCH',
      body: formData,
    });

    const data = await response.json();

    if (response.ok) {
      dispatch({
        type: RECEIVE_TICKET,
        ticket: data,
      });
      console.log(`Would normally send email here with body: ${JSON.stringify(data)}`);
    }
    return response
  } catch (error) {
    console.error('Error updating ticket:', error);
  }
};

export const deleteTicket = (userId, ticketId) => async (dispatch) => {
  try {
    await fetch(`/api/users/${userId}/tickets/${ticketId}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });

    dispatch({
      type: REMOVE_TICKET,
      ticketId,
    });
  } catch (error) {
    console.error('Error deleting ticket:', error);
  }
};

export const resetTickets = () => ({
  type: RESET_TICKETS,
});

const ticketsReducer = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_TICKET:
      return { ...state, [action.ticket.id]: action.ticket };

    case RECEIVE_TICKETS:
      const newState = { ...state, ...action.tickets };
      return newState;

    case REMOVE_TICKET:
      const { [action.ticketId]: removedTicket, ...remainingState } = state;
      // debugger
      return remainingState;

    case RESET_TICKETS: 
      return {};
    default:
      return state;
  }
};

export default ticketsReducer;
