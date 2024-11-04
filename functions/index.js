const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

exports.deleteProject = functions.https.onCall(async (data, context) => {
  const {id} = data;
  try {
    await admin.firestore().collection("projects").doc(id).delete();
    return {message: "Proyecto eliminado exitosamente"};
  } catch (error) {
    throw new functions.https.HttpsError(
        "internal",
        "Error eliminando el proyecto",
    );
  }
});

