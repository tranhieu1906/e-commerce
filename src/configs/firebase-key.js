module.exports = {
  firebaseConfig: {
    type: "service_account",
    project_id: "testupload-e4ae7",
    private_key_id: process.env.PRIVATE_KEY_ID,
    private_key: process.env.PRIVATE_KEY,
    client_email:
      "firebase-adminsdk-foogw@testupload-e4ae7.iam.gserviceaccount.com",
    client_id: process.env.CLINET_ID,
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url:
      "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-foogw%40testupload-e4ae7.iam.gserviceaccount.com",
  },
};
