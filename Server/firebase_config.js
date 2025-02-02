// firebase.js
const admin = require('firebase-admin');

const firebaseConfig = {
  type: "service_account",
  project_id: "red-cable-434719-f8",
  private_key_id: "289899bbc606c10617108434cdae9706625fb13f",
  private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCc1bds4gSY07Rw\nfTYXEECM17vUQCEukj8OgVmhTrLjPF9vqG32qR0YFwJAny/ECWsa7Fq7voRS9nVY\nrxpBYBK6ldAXndBTKwWlbJmBR8/3QW68imbYGLigdfmkmhqtN/XfTW5NSbIKdae4\nSHB/1hhKNroBdZxlMb9JgXTakK380YFQGPcmLrxSD07/kyCQiQDvrtNhsKGTgCjE\nJ8KChY687FHCAKeNKisnqxwlHT5+zXcm7CNkZJscgfgzhMKhN1tQGIk7fYbD6Efy\njSZjzGm6j82Nfa+PulSsuq2Bw6nz7ENHCjyMdaCHEiJe6jbjzIzt+OwgGyGgsm6C\naFTPObypAgMBAAECggEAR8QP9DYUjm5JojPZnYIlV42ceIqD5JCtZBDSl9qwRwUo\nUqrK7tUB6DUXJcTyEY2RwjcnacPLPz9iARvXMtUonNLS7wua+YO1SLZCJANdabI6\nXvIiD354dYymmKifzmXOD8mZ0KoJW3ntLomPWR/563PRd7t+vlueQZ+Ifj84Lnhk\nhG8mb/66Dpduhp4p4oINg5K/5X5cPZVHsvupDs6W/uFhIAwVohPVP6R5+Z68VQr+\nNIO3rk+A1+1hsmGaksTKl2J0COZlhP1ENQFI83fkll5xWtzGZ7oSOQPtRFPPmc0N\nUfnuOhUc4/+VFmjSYt2Uf0M1gi+Z9M9ivB9clWz4VQKBgQDKq4Ha2ZFUNrQlrJyD\ng60cn/HNFG2euyfNXez94b3SpVOWaoYdIomuaXHeeSUAjZSD+0bCgKgsQ2J3aQFM\nD9SEYC4I7S53yEAgvOGK8I+UukBYzJCd2bjcRQivjWHCtO2EUbAi3wWn2yje7sEf\nSoPuYLsBXVwSVpem6rEjKFiGcwKBgQDGGpwWoTxFEgwUIKtM7gaZfhkAQYNt9gwv\nCqfl20Q7cZOGRoGjINEQxRJ65yn7/c+bmV/WugirvCyKnloR+sYvExyJ0i9Zu8ny\nhTEb/oumEvQpNAw1OhYcp4eY91F9ASsgP4x7FBOxQ1gQ5M/jTGvwrIFBLjX/PvYr\nr9a9GviNcwKBgBM/VoXCQ9sLlvA9BGA5ESe2yPABEKgSfiUy1l8GIVDwApA2baY2\nsXyu5vGJ78mtqH0gUAgIz+/kNmXAwy7GEhjASZ7vZ4pYqj5xsbnQPtKRHatRQiq7\nkqLYq4qAktg69pOqbl/hblgSqD8DzbN7ECyDYz8t7qCPOLfRciE0o7OhAoGAEXWm\n7BepyCyfA+cdMdqIml6StYMQolBdIog94/Q/Pz3zUpJEOqxZwLCdwFc/TAZCleQe\nnj4nJXugMVdjeNIxRVTZ3wu3QKFcWxOCEIWOqURiYH9F1CsaZ8wcF080z1+a/Wyc\nZPyP/79/s313FQFXQg7yFVyNRcG20ILe2ivWXCECgYBD4fzv7hvq74hnIxqpZLbt\njgw+eW+JwtoaesoB8+Crs7hOvhE4K5GDAprbldPMS+56Q48sHP9NyaSNFxu9cChp\ny9gWidR0lt13z76bHzKAMpNGaq+59Ja23I4cZXroaYIVRHStdsTWA/RT3s6apqrl\n4ymtG9vt3BamQsHkHmE+cA==\n-----END PRIVATE KEY-----\n",
  client_email: "firebase-adminsdk-jy7bu@red-cable-434719-f8.iam.gserviceaccount.com",
  client_id: "105566130304784819431",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-jy7bu%40red-cable-434719-f8.iam.gserviceaccount.com",
  universe_domain: "googleapis.com",
};

admin.initializeApp({
  credential: admin.credential.cert(firebaseConfig),
});

const db = admin.firestore();
const auth = admin.auth();
const storage = admin.storage();

module.exports = { db, auth, storage };
