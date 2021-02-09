import { Skeleton } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export default function CollectionPendingTodos({
	currentCollection,
	userTodos
}) {
	const [collectionTodos, setCollectionTodos] = useState(null);

	useEffect(() => {
		if (userTodos.todos) {
			setCollectionTodos(
				userTodos.todos.filter(
					(todo) => todo.collectionId == currentCollection.id
				).length
			);
		}
	}, [userTodos.todos]);

	return (
		<>
			<p className='opacity-60 mt-1'>
				{collectionTodos === 1
					? `${collectionTodos} task`
					: collectionTodos > 1
					? `${collectionTodos} tasks`
					: "No tasks"}
			</p>
		</>
	);
}
