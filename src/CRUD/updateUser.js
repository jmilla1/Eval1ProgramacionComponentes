import { db } from './firebase';

function updateUser(userId, newName) {
    db.collection('users').doc(userId).update({
        name: newName
    })
    .then(() => {
        console.log('Usuario actualizado con éxito');
    })
    .catch((error) => {
        console.error('Error al actualizar el usuario: ', error);
    });
}

export default updateUser;