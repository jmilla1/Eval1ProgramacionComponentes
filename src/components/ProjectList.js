import React, { useEffect, useState } from 'react';
import firebase from '../firebase';

function ProjectList() {
    const [projects, setProjects] = useState([]); 

    useEffect(() => {
        const db = firebase.firestore();

        
        const unsubscribe = db.collection('projects')
            .orderBy('createdAt', 'desc')
            .onSnapshot((snapshot) => {
                const projectsData = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setProjects(projectsData);
            });

        
        return () => unsubscribe();
    }, []);

    return (
        <div>
            <h2>Lista de Proyectos</h2>
            {projects.length === 0 ? (
                <p>No hay proyectos</p>
            ) : (
                <ul>
                    {projects.map((project) => (
                        <React.Fragment key={project.id}>
                            <li>
                                <h3>{project.name}</h3>
                                <p>Descripción: {project.description}</p>
                                {project.additionalData && (
                                    <div>
                                        <p>Datos adicionales:</p>
                                        <pre>{JSON.stringify(project.additionalData, null, 2)}</pre>
                                    </div>
                                )}
                            </li>
                        </React.Fragment>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default ProjectList;