import { useEffect, useState } from "react";

export default function PendingTodos({ currentCollection, userTodos }) {
	const [collectionTodos, setCollectionTodos] = useState(null);

	useEffect(() => {
		if (userTodos.todos) {
			setCollectionTodos(
				userTodos.todos.filter(
					(todo) => todo.collectionId == currentCollection.id
				).length
			);
		}
	}, [currentCollection, userTodos]);

	return (
		<>
			<p className='opacity-60 mt-2 font-medium'>
				{collectionTodos} {collectionTodos == 1 ? "task" : "tasks"}
			</p>
		</>
	);
}
