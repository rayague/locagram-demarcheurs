// auth.js
import { auth, db } from "./firebase"; // Importer la configuration Firebase
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc, Timestamp } from "firebase/firestore";

// Fonction de validation pour l'IFU
const isValidIFU = (ifu) => {
  // L'IFU au Bénin est généralement un numéro alphanumérique de 9 à 15 caractères
  const regexIFU = /^[A-Za-z0-9]{9,15}$/;
  return regexIFU.test(ifu);
};

// Fonction de validation pour le CIP
const isValidCIP = (cip) => {
  // Le CIP doit correspondre à un format valide spécifique au Bénin
  const regexCIP = /^[A-Za-z0-9]{10}$/; // Exemple : CIP1234567890
  return regexCIP.test(cip);
};

// Validation de l'email
const isValidEmail = (email) => {
  const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return regexEmail.test(email);
};

// Validation du téléphone (exemple : format international béninois)
const isValidPhone = (phone) => {
  const regexPhone = /^(?:\+229|0)[0-9]{7}$/; // Ex. +2291234567 ou 01234567
  return regexPhone.test(phone);
};

// Validation du mot de passe (minimum 6 caractères, contient au moins une majuscule et un chiffre)
const isValidPassword = (password) => {
  const regexPassword = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/;
  return regexPassword.test(password);
};

const signup = async (
  name,
  email,
  phone,
  ifu,
  cip,
  password,
  confirmPassword
) => {
  try {
    // Vérifier les validations de base
    if (!isValidEmail(email)) {
      alert("L'adresse email est invalide.");
      return;
    }

    if (!isValidPhone(phone)) {
      alert("Le numéro de téléphone est invalide.");
      return;
    }

    if (!isValidIFU(ifu)) {
      alert("Le numéro IFU est invalide.");
      return;
    }

    if (!isValidCIP(cip)) {
      alert("Le numéro CIP est invalide.");
      return;
    }

    if (!isValidPassword(password)) {
      alert(
        "Le mot de passe doit contenir au moins une majuscule, un chiffre et être de 6 caractères minimum."
      );
      return;
    }

    if (password !== confirmPassword) {
      alert("Les mots de passe ne correspondent pas !");
      return;
    }

    // Création de l'utilisateur dans Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    // Vérifier si le CIP ou IFU correspond à un administrateur (à personnaliser)
    let role = "utilisateur"; // Valeur par défaut
    if (cip === "CIP12345" || ifu === "12345") {
      role = "administrateur"; // Exemple : CIP/IFU spécifique pour administrateur
    }

    // Créer l'utilisateur dans Firestore
    await setDoc(doc(db, "UTILISATEURS", user.uid), {
      nom: name.split(" ")[0], // Prenons la première partie du nom comme "Nom"
      prenom: name.split(" ")[1] || "", // Prenons la deuxième partie comme "Prénom"
      email: email,
      telephone: phone,
      ifu: ifu,
      cip: cip,
      mot_de_passe: password, // Si tu veux stocker le mot de passe, pense à le hasher avant
      statut_forfait: "inactif", // Statut par défaut "inactif"
      role: role,
      date_creation: Timestamp.now(), // Date de création
    });

    alert("Inscription réussie !");
  } catch (error) {
    console.error("Erreur lors de l'inscription : ", error);
    alert("Erreur lors de l'inscription : " + error.message);
  }
};

export { signup };
