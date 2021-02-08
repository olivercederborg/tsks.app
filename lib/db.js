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

export function deleteCollection(id) {
	return firestore.collection("collections").doc(id).delete();
}

export function createTodo(data) {
	const todo = firestore.collection("todos").doc();
	todo.set(data);

	return todo;
}

export function deleteTodo(id) {
	return firestore.collection("todos").doc(id).delete();
}
