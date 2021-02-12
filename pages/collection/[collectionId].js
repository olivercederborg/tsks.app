import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/router";
import useSWR, { mutate } from "swr";

import { useAuth } from "@/lib/auth";
import Todo from "@/components/Todo";
import CompletedTodo from "@/components/CompletedTodo";
import TodoShell from "@/layouts/TodoShell";
import fetcher from "@/utils/fetcher";
import AddTodo from "@/components/AddTodo";
import { getCollection } from "@/lib/db-admin";
import TodoSkeleton from "@/layouts/TodoSkeleton";

const CollectionTodos = () => {
	const router = useRouter();
	const collectionId = router.query.collectionId;
	const [collection, setCollection] = useState(null);
	const [collectionColor, setCollectionColor] = useState(null);

	const auth = useAuth();
	const { data: todoData } = useSWR(
		auth.user ? ["/api/todos", collectionId] : null,
		fetcher
	);
	const { data: completedTodoData } = useSWR(
		auth.user ? ["/api/todos-completed", collectionId] : null,
		fetcher
	);

	useEffect(() => {
		const getCurrentCollection = async () => {
			const currentCollection = await getCollection(collectionId);
			setCollection(currentCollection.collection);
		};

		getCurrentCollection();
	}, [router]);

	// useEffect(() => {
	// 	if (collection?.collectionColor === "teal") {
	// 		setCollectionColor("primary-teal");
	// 	} else if (collection?.collectionColor === "yellow") {
	// 		setCollectionColor("primary-yellow");
	// 	} else if (collection?.collectionColor === "orange") {
	// 		setCollectionColor("primary-orange");
	// 	} else if (collection?.collectionColor === "red") {
	// 		setCollectionColor("primary-red");
	// 	} else if (collection?.collectionColor === "purple") {
	// 		setCollectionColor("primary-purple");
	// 	} else if (collection?.collectionColor === "blue") {
	// 		setCollectionColor("primary-blue");
	// 	} else if (collection?.collectionColor === "gray") {
	// 		setCollectionColor("primary-gray");
	// 	} else if (collection?.collectionColor === "brown") {
	// 		setCollectionColor("primary-brown");
	// 	} else if (collection?.collectionColor === "darkBrown") {
	// 		setCollectionColor("primary-darkBrown");
	// 	} else if (!collection?.collectionColor) {
	// 		setCollectionColor("primary-default");
	// 	}
	// }, [collection?.collectionColor]);

	if (!todoData || !collection?.collectionColor) {
		return (
			<TodoShell>
				<TodoSkeleton />
			</TodoShell>
		);
	}

	return (
		<TodoShell currentCollection={collection}>
			<p className='mb-2 font-medium text-white'>
				Tasks - {todoData?.todos.length}
			</p>
			{todoData?.todos?.length
				? todoData.todos.map((todo) => (
						<div key={todo.id}>
							<Todo
								collectionColor={collection.collectionColor}
								{...todo}
							/>
						</div>
				  ))
				: ""}

			<AddTodo collectionColor={collection.collectionColor} />

			{completedTodoData?.todos?.length ? (
				<p className='mt-8 mb-2 font-medium text-white'>
					Completed - {completedTodoData?.todos.length}
				</p>
			) : (
				""
			)}
			{completedTodoData?.todos?.length
				? completedTodoData.todos.map((todo) => (
						<div key={todo.id}>
							<CompletedTodo
								collectionColor={collection.collectionColor}
								{...todo}
							/>
						</div>
				  ))
				: ""}
		</TodoShell>
	);
};

export default CollectionTodos;
