import React, { useState, useEffect } from 'react';
import { db } from './firebase';

function userList() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const unsubscribe = db.collection('users').onSnapshot((snapshot) => {
            const usersData = [];
            snapshot.forEach((doc) => usersData.push({ ...doc.data(), id: doc.id }));
            setUsers(usersData);
        });
    
        return () => unsubscribe();
    }, []);

    return (
        <ul>
            {users.map(user => (
                <li key={user.id}>{user.name} - {user.age} años</li>
            ))}
        </ul>
    );
}

    export default userList;