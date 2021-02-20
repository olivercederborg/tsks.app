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

export function editCollection(id, newValues) {
	const collection = firestore
		.collection("collections")
		.doc(id)
		.update(newValues);

	return collection;
}

export async function deleteCollection(id) {
	firestore.collection("collections").doc(id).delete();

	const snapshot = await firestore
		.collection("todos")
		.where("collectionId", "==", id)
		.get();

	const batch = firestore.batch();

	snapshot.forEach((doc) => {
		batch.delete(doc.ref);
	});

	return batch.commit();
}

export function createTodo(data) {
	const todo = firestore.collection("todos").doc();
	todo.set(data);

	return todo;
}

export function editTodo(id, newValues) {
	return firestore.collection("todos").doc(id).update(newValues);
}

export function deleteTodo(id) {
	return firestore.collection("todos").doc(id).delete();
}

export function completeTodo(id, newData) {
	return firestore.collection("todos").doc(id).update({
		status: "completed",
		completedAt: newData.completedAt
	});
}

export function prioritizeTodo(id, priorityValue) {
	return firestore.collection("todos").doc(id).update({
		priority: priorityValue
	});
}

export function unCompleteTodo(id) {
	return firestore.collection("todos").doc(id).update({
		status: "pending"
	});
}

// USERS
export function updateDisplayName(uid, newName) {
	return firestore.collection("users").doc(uid).update({ name: newName });
}

export function updateEmail(uid, newEmail) {
	return firestore.collection("users").doc(uid).update({ email: newEmail });
}
