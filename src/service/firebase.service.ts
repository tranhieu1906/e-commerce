var admin = require("firebase-admin");

var serviceAccount = require("../configs/firebase-key.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
