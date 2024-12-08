
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCpKKflF4CzFQBc71Fd616BlknEz42FpHQ',
  authDomain: 'autoq-6a22f.firebaseapp.com',
  projectId: 'autoq-6a22f',
  storageBucket: 'autoq-6a22f.firebasestorage.app',
  messagingSenderId: '653548721088',
  appId: '1:653548721088:web:56d9e1655a31ca0095ae25',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };