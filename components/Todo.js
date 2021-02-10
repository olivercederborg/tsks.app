import router from "next/router";
import { mutate } from "swr";
import { useToast } from "@chakra-ui/react";

import TodoDropdown from "./TodoDropdown";
import { completeTodo } from "@/lib/db";
import { useAuth } from "../lib/auth";

const Todo = ({ name, id, createdAt, authorId, collectionColor }) => {
	const auth = useAuth();
	const toast = useToast();

	const collectionId = router.query.collectionId;

	const onComplete = () => {
		const newTodo = {
			name,
			authorId,
			collectionId,
			createdAt,
			status: "completed",
			completedAt: new Date().toISOString()
		};
		toast({
			title: "Task completed!",
			status: "success",
			position: "top",
			duration: 1500
		});
		mutate(
			["/api/todos", collectionId],
			async (data) => {
				return {
					todos: data.todos.filter((todo) => todo.id !== id)
				};
			},
			false
		);
		mutate(
			["/api/todos-completed", collectionId],
			async (data) => ({ todos: [...data.todos, { id, ...newTodo }] }),
			false
		);
		completeTodo(id, newTodo);
	};

	return (
		<div className='py-2'>
			<div className='group rounded-2xl bg-primary-card relative flex items-center justify-start p-3'>
				<button
					className={`default-focus border-${collectionColor} border-3 focus:outline-none hover:bg-${collectionColor} active:bg-${collectionColor} hover:bg-opacity-40 px-2 py-2 transition-colors duration-100 ease-in-out rounded-lg`}
					onClick={onComplete}
				></button>
				<p className='pr-8 ml-3 text-white'>{name}</p>
				<div
					className={`focus:outline-none absolute right-0 mr-2 rounded-lg`}
				>
					<TodoDropdown collectionId={collectionId} id={id} />
				</div>
			</div>
		</div>
	);
};

export default Todo;
