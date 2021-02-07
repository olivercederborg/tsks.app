import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/functions";

export const firebaseConfig = {
	apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
	authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
	projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
};

export const app = !firebase.apps.length
	? firebase.initializeApp(firebaseConfig)
	: firebase.app();

export const auth = app.auth();

export const db = app.firestore();

export default app;
