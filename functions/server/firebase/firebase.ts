import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

let apiKey: string;
let authDomain: string;
let projectId: string;

if (process.env.NEXT_PUBLIC_FIREBASE_API_KEY) {
  apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
} else {
  throw new Error("FIREBASE_API_KEY environment variable is not set");
}

if (process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN) {
  authDomain = process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN;
} else {
  throw new Error("FIREBASE_AUTH_DOMAIN environment variable is not set");
}

if (process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID) {
  projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
} else {
  throw new Error("FIREBASE_PROJECT_ID environment variable is not set");
}

if (!getApps().length) {
  const firebaseApp = initializeApp({
    apiKey,
    authDomain,
    projectId,
  });
} else {
  const firebaseApp = getApp();
}

export const db = getFirestore();
