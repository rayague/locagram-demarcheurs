// Importer les fonctions nécessaires du SDK Firebase
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Configuration Firebase (que tu m'as fournie)
const firebaseConfig = {
  apiKey: "AIzaSyCeaMAgyFWN12ktRuGSHsLdySgiZqvBIKA",
  authDomain: "locagram-f08b9.firebaseapp.com",
  projectId: "locagram-f08b9",
  storageBucket: "locagram-f08b9.appspot.com",
  messagingSenderId: "504321320981",
  appId: "1:504321320981:web:65037b379691080972c61c",
};

// Initialiser Firebase avec la configuration
const app = initializeApp(firebaseConfig);

// Initialiser les services Firebase
const auth = getAuth(app); // Service d'authentification
const db = getFirestore(app); // Service de Firestore pour les bases de données
const storage = getStorage(app); // Service de stockage Firebase

// Exporter les services Firebase pour les utiliser dans d'autres fichiers
export { auth, db, storage };
