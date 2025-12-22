import React, { createContext, useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';

// Create the context
const AppContext = createContext();




// Create a provider component
export function AppProvider({ children }) {
    const [vehicles, setVehicles] = useState([]);
    const [reservations, setReservations] = useState([]);
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState([]);

    const userId = Cookies.get('userId');

    // Fetch vehicles from the API
    async function fetchVehicles() {
        try {
            const response = await axios.get('https://tesla.movelink.org/vehicles');
            setVehicles(response.data);
        } catch (err) {
            console.error('Error fetching vehicles:', err);
            setVehicles([]);
        }
    }

    async function fetchReservations() {
        try {
            const response = await fetch('https://tesla.movelink.org/reservations');
            const data = await response.json();
            setReservations(data);
        } catch (err) {
            console.error('Error fetching reservations:', err);
            setReservations([]);
        }
    }

    async function fetchUser() {
        try {
            const response = await fetch(`https://tesla.movelink.org/users/${userId}`);
            const data = await response.json();
            setUser(data);
        } catch (err) {
            console.error('Error fetching user:', err);
            setUser([]);
        }
    }

    async function fetchUsers() {
        try {
            const response = await fetch(`https://tesla.movelink.org/users`);
            const data = await response.json();
            setUsers(data);
        } catch (err) {
            console.error('Error fetching users:', err);
            setUsers([]);
        }
    }
    

    useEffect(() => {
        fetchVehicles();
        fetchReservations();
        fetchUsers();
    }, []);

    useEffect(() => {
        if(userId !== null) {
            fetchUser();
        }
    }, [userId]);

    return (
        <AppContext.Provider value={{ vehicles, reservations, user, users }}>
            {children}
        </AppContext.Provider>
    );
}

// Custom hook for consuming the context
export function useAppContext() {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useAppContext must be used within an AppProvider');
    }
    return context;
}

export default AppProvider;
