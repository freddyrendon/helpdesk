import { resetTickets } from './tickets'; 


// constants
const SET_USER = "session/SET_USER";
const REMOVE_USER = "session/REMOVE_USER";


export const setUser = (user) => ({
    type: SET_USER,
    payload: user,
});

const removeUser = () => ({
    type: REMOVE_USER,
});



const storeUSerData = (data) => {
    if (data)
    sessionStorage.setItem("currentUserData", JSON.stringify({
        data
}))

}

export const authenticate = () => async (dispatch) => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
        const user = JSON.parse(storedUser);
        dispatch(setUser(user));
    } else {
        const response = await fetch("/api/session", {
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (response.ok) {
            const data = await response.json();
            if (data.errors) {
                return;
            }

            localStorage.setItem("user", JSON.stringify(data));
            dispatch(setUser(data));
        }
    }
};


export const login = (email, password) => async (dispatch) => {
    try {
        const response = await fetch("/api/session", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                user: { 
                    email, 
                    password,
                },
            }),
        });

        if (!response.ok) {
            if (response.status < 500) {
                const data = await response.json();
                if (data.errors) {
                    return data;
                }
            } else {
                return ["An error occurred. Please try again."];
            }
        }

        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            console.error("Response does not contain JSON data.");
            return ["An error occurred while parsing the response."];
        }

        const data = await response.json();

        storeUSerData(data)
        dispatch(setUser(data));
        return data;
    } catch (error) {
        console.error("Error parsing JSON response:", error);
        return ["An error occurred while parsing the response."];
    }
};



export const logout = () => async (dispatch) => {
    try {
        await fetch("/api/session", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });

        sessionStorage.removeItem("currentUserData");
        dispatch(removeUser());
        dispatch(resetTickets()); /// dispatch resetTickets when user logs out

    } catch (error) {
        console.error("Error during logout:", error.message);
    }
};


export const signUp = (userData) => async (dispatch) => {
    try {
        const response = await fetch("/api/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ user: userData }),
        });

        if (response.ok) {
            const data = await response.json();
            // storeUSerData(data)
            return data;
        } else {
            const errors = await response.json();
            return errors;
        }
    } catch (error) {
        console.error("Error during sign-up:", error.message);
        return ["An error occurred while signing up."];
    }
};

// const initialState = { user: JSON.parse(sessionStorage.getItem("currentUserData")).data : null };
const userDataFromSessionStorage = sessionStorage.getItem("currentUserData");
const initialState = { user: userDataFromSessionStorage ? JSON.parse(userDataFromSessionStorage).data : null };


export default function reducer(state = initialState, action) {
    switch (action.type) {
        case SET_USER:
            return { user: action.payload };
        case REMOVE_USER:
            return { user: null };
        default:
            return state;
    }
}
