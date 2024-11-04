import React, { useState } from 'react';
import { db } from './firebase'; 

function addUser() {
    const [name, setName] = useState("");
    const [age, setAge] = useState('');


const handleSubmit = (e) => {
    e.preventDefault();

    db.collection('users').add({
        name: name,
        age: parseInt(age)
    })
    .then(() => {
        console.log('Usuario añadido con éxito');
        setName('');
        setAge('');
    })
    .catch((error) => {
        console.error('Error al añadir el usuario: ', error);
    });
};

return (
    <form onSubmit={handleSubmit}>
        <input 
            type="text" 
            placeholder="Nombre" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
        />
        <input 
            type="text" 
            placeholder="Edad" 
            value={age} 
            onChange={(e) => setAge(e.target.value)} 
        />
        <button type="submit">Añadir Usuario</button>
    </form>
);
}
export default addUser;