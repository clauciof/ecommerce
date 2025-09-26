// lib/firebase.ts
import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyApwuCowzMTf2rG6hsGivjJuIcVGlhfVg4",
  authDomain: "ponto-final-270d8.firebaseapp.com",
  projectId: "ponto-final-270d8",
  storageBucket: "ponto-final-270d8.appspot.com",
  messagingSenderId: "810113170968",
  appId: "1:810113170968:web:0f4fa8fd165124623acd6d",
  measurementId: "G-FJ5L7Z70Q7"
};

let app: FirebaseApp;
let analytics: ReturnType<typeof getAnalytics> | undefined;
let initialized = false;

try {
  app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
  initialized = true;
  if (typeof window !== "undefined") {
    isSupported().then((yes) => {
      if (yes) analytics = getAnalytics(app);
    });
  }
} catch (error) {
  initialized = false;
  console.error("Erro ao inicializar o Firebase:", error);
}

export { app, analytics };

export function isFirebaseInitialized() {
  return initialized;
}