import { compareAsc, compareDesc, parseISO } from "date-fns";

import { db } from "./firebase";

export async function getAllTodos(collectionId) {
	const snapshot = await db
		.collection("todos")
		.where("collectionId", "==", collectionId ?? "")
		.get();

	const todos = [];

	snapshot.forEach((doc) => {
		todos.push({ id: doc.id, ...doc.data() });
	});

	todos.sort((a, b) =>
		compareDesc(parseISO(b.createdAt), parseISO(a.createdAt))
	);

	return { todos };
}

export async function getPendingTodos(collectionId) {
	const snapshot = await db
		.collection("todos")
		.where("collectionId", "==", collectionId ?? "")
		.get();

	const rawTodos = [];

	snapshot.forEach((doc) => {
		rawTodos.push({ id: doc.id, ...doc.data() });
	});

	const todos = rawTodos.filter((doc) => doc.status == "pending");

	todos.sort((a, b) =>
		compareDesc(parseISO(b.createdAt), parseISO(a.createdAt))
	);

	return { todos };
}

export async function getCompletedTodos(collectionId) {
	const snapshot = await db
		.collection("todos")
		.where("collectionId", "==", collectionId ?? "")
		.get();

	const rawTodos = [];

	snapshot.forEach((doc) => {
		rawTodos.push({ id: doc.id, ...doc.data() });
	});

	const todos = rawTodos.filter((doc) => doc.status == "completed");

	todos.sort((a, b) =>
		compareDesc(parseISO(b.completedAt), parseISO(a.completedAt))
	);

	return { todos };
}

export async function getUserTodos(uid) {
	const snapshot = await db
		.collection("todos")
		.where("authorId", "==", uid ?? "")
		.get();

	const rawTodos = [];

	snapshot.forEach((doc) => {
		rawTodos.push({ id: doc.id, ...doc.data() });
	});

	const todos = rawTodos.filter((doc) => doc.status == "pending");

	return { todos };
}

export async function getAllCollections() {
	const snapshot = await db.collection("collections").get();

	const collections = [];

	snapshot.forEach((doc) => {
		collections.push({ id: doc.id, ...doc.data() });
	});

	return { collections };
}

export async function getUserCollections(uid) {
	const snapshot = await db
		.collection("collections")
		.where("authorId", "==", uid ?? "")
		.get();
	const collections = [];

	snapshot.forEach((doc) => {
		collections.push({ id: doc.id, ...doc.data() });
	});

	collections.sort((a, b) =>
		compareAsc(parseISO(a.createdAt), parseISO(b.createdAt))
	);

	return { collections };
}

export async function getCollectionTodos(collectionId) {
	const snapshot = await db
		.collection("todos")
		.where("collectionId", "==", collectionId)
		.get();

	const todos = [];

	snapshot.forEach((doc) => {
		todos.push({ id: doc.id, ...doc.data() });
	});

	return { todos };
}
export async function getCollection(collectionId) {
	const doc = await db.collection("collections").doc(collectionId).get();

	const collection = { id: doc.id, ...doc.data() };

	return { collection };
}

export async function getUserFeedback(uid) {
	const snapshot = await db
		.collection("feedback")
		.where("authorId", "==", uid)
		.get();
	const feedback = [];

	snapshot.forEach((doc) => {
		feedback.push({ id: doc.id, ...doc.data() });
	});

	return { feedback };
}
