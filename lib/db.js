import firebase from "./firebase";

const firestore = firebase.firestore();

export function createUser(uid, data) {
	return firestore
		.collection("users")
		.doc(uid)
		.set({ uid, ...data }, { merge: true });
}

export function createCollection(data) {
	const collection = firestore.collection("collections").doc();
	collection.set(data);

	return collection;
}

export function createTodo(data) {
	return firestore.collection("todos").add(data);
}

export function deleteCollection(id) {
	return firestore.collection("collections").doc(id).delete();
}
