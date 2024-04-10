const RECEIVE_USER = 'users/RECEIVE_USER';
const REMOVE_USER = 'users/REMOVE_USER';


export const receive = (user) => ({
    type: RECEIVE_USER,
    user

})

export const fetchUsers = () => async (dispatch) => {
    const response = await fetch('/api/users');
    const data = await response.json();

    data.forEach((user) => {
      dispatch(receive(user));
    })
}


export const remove = (id) => ({
    type: REMOVE_USER,
    id
})

function usersReducer(state = {}, action) {
    switch (action.type) {
        case RECEIVE_USER:
            return {
                ...state,
                [action.user.id]: action.user
            }
        case REMOVE_USER:
            const newState = {...state};
            delete newState[action.id];
            return newState;
        default:
            return state;
    }
}

export default usersReducer;