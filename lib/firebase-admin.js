import admin from "firebase-admin";

if (!admin.apps.length) {
	admin.initializeApp({
		credential: admin.credential.cert({
			project_id: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
			client_email: process.env.FIREBASE_CLIENT_EMAIL,
			privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n")
		})
	});
}

const auth = admin.auth();
const db = admin.firestore();
export { auth, db };
