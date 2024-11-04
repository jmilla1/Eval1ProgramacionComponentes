import { db } from '../firebase';

function deleteUser(userId) {
    db.collection('users').doc(userId).delete()
    .then(() => {
        console.log('Usuario eliminado con éxito');
    })
    .catch((error) => {
        console.error('Error al eliminar el usuario:', error);
    });
}

export default deleteUser;