import { useRouter } from "next/router";
import useSWR, { mutate } from "swr";

import { useAuth } from "@/lib/auth";
import Todo from "@/components/Todo";
import CompletedTodo from "@/components/CompletedTodo";
import TodoShell from "@/layouts/TodoShell";
import fetcher from "@/utils/fetcher";
import AddTodo from "@/components/AddTodo";
import TodoSkeleton from "@/layouts/TodoSkeleton";

const CollectionTodos = () => {
	const router = useRouter();
	const collectionId = router.query.collectionId;

	const auth = useAuth();
	const { data: todoData } = useSWR(
		auth.user ? ["/api/todos", collectionId] : null,
		fetcher
	);
	const { data: completedTodoData } = useSWR(
		auth.user ? ["/api/todos-completed", collectionId] : null,
		fetcher
	);
	const { data: currentCollection } = useSWR(
		auth.user ? ["/api/current-collection", collectionId] : null,
		fetcher
	);
	const collection = currentCollection?.collection;
	console.log(currentCollection);

	if (!todoData || !collection?.collectionColor) {
		return (
			<TodoShell>
				<TodoSkeleton />
			</TodoShell>
		);
	}

	return (
		<TodoShell currentCollection={collection}>
			<p className='mb-3 font-medium text-white'>
				Tasks - {todoData?.todos.length}
			</p>

			<AddTodo collection={collection} />

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

			{completedTodoData?.todos?.length ? (
				<p className='mt-10 mb-2 font-medium text-white'>
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
