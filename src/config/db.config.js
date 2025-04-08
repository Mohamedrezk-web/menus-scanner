import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getStorage } from 'firebase-admin/storage';

import serviceAccount from '../../firebaseServiceAccountKey.json' assert { type: 'json' }; // Node.js 17.5+

const app = initializeApp({
  credential: cert(serviceAccount),
  storageBucket: 'gs://mr-menuz-scanner.firebasestorage.app',
});

const db = getFirestore(app);
const bucket = getStorage().bucket();

export { db, bucket };
