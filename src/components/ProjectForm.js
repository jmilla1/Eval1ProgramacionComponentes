import React, { useState, useRef } from 'react';
import SimpleReactValidator from 'simple-react-validator';
import axios from 'axios';
import firebase from '../firebase';

function ProjectForm() {
    const [name, setName] = useState(''); 
    const [description, setDescription] = useState('');
    const [additionalData, setAdditionalData] = useState(null);
    const [error, setError] = useState('');
    const validator = useRef(new SimpleReactValidator());

    // Función para obtener datos adicionales del proyecto antes de guardar
    const fetchAdditionalData = async () => {
        try {
            const response = await axios.get('https://jsonplaceholder.typicode.com/posts/1');
            setAdditionalData(response.data);
            console.log('Datos adicionales:', response.data);
        } catch (err) {
            setError('Error al obtener datos adicionales');
            console.error(err);
        }
    };

    // Función para manejar el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Nombre del proyecto:', name);
        console.log('Descripción del proyecto:', description);
        
        // Validar el formulario
        if (validator.current.allValid()) {
            await fetchAdditionalData(); // Llamada a la API para obtener datos adicionales

            try {
                // Verifica si los datos adicionales fueron obtenidos
                if (!additionalData) {
                    setError('Error: No se pudieron obtener datos adicionales');
                    return;
                }

                // Guardar el proyecto en Firestore junto con los datos adicionales
                const db = firebase.firestore();
                await db.collection('projects').add({
                    name: name,
                    description: description,
                    additionalData: additionalData, // Agregar los datos adicionales al documento
                    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                });
                alert('Proyecto guardado exitosamente');
                setName('');
                setDescription('');
                setAdditionalData(null); // Limpiar los datos adicionales
            } catch (err) {
                setError('Error al guardar el proyecto');
                console.error(err);
            }
        } else {
            validator.current.showMessages();
            setError('Hay errores en el formulario');
        }
    };

    return (
        <div>
            <h2>Agregar Proyecto</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nombre del Proyecto:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        onBlur={() => validator.current.showMessageFor('name')}
                    />
                    {validator.current.message('name', name, 'required', { className: 'text-danger' })}
                </div>
                <div>
                    <label>Descripción:</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        onBlur={() => validator.current.showMessageFor('description')}
                    ></textarea>
                    {validator.current.message('description', description, 'min:10', { className: 'text-danger' })}
                </div>
                <button type="submit">Guardar Proyecto</button>
                {error && !additionalData && <p className="error">{error}</p>}
            </form>
            {additionalData && (
                <div>
                    <h3>Datos adicionales:</h3>
                    <p>{JSON.stringify(additionalData)}</p>
                </div>
            )}
        </div>
    );
}

export default ProjectForm;