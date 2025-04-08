import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getStorage } from 'firebase-admin/storage';

const app = initializeApp({
  credential: cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON)),
  storageBucket: 'gs://mr-menuz-scanner.firebasestorage.app',
});

const db = getFirestore(app);
const bucket = getStorage().bucket();

export { db, bucket };
