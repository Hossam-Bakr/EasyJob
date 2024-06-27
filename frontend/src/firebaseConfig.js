// src/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getStorage ,ref} from 'firebase/storage';
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDhBPqaaRF7PHHefHTus7L5OD2v1RhsIw0",
  authDomain: "easy-job-voice-record.firebaseapp.com",
  projectId: "easy-job-voice-record",
  storageBucket: "easy-job-voice-record.appspot.com",
  messagingSenderId: "150549002624",
  appId: "1:150549002624:web:6a6449ec974dd1a43ba965",
  measurementId: "G-SGR0B6M9TR"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
// const analytics = getAnalytics(app);
const auth = getAuth(app);

export { storage,auth };
