import React, { useState } from 'react';
import ProjectForm from './components/ProjectForm.js';
import ProjectList from './components/ProjectList';
import './App.css';

function App() {
    const [showForm, setShowForm] = useState(false);

    const toggleForm = () => {
        setShowForm(!showForm);
    };

    return (
        <div className="App">
            <header className = "App-header"> 
                <h1>Gestión de Proyectos</h1>
                <button onClick={toggleForm}>
                    {showForm ? 'Cancelar' : 'Agregar Proyecto'}
                </button>
            
            
                {showForm && <ProjectForm />}

                <ProjectList />
            </header>
        </div>
    );
}

export default App;