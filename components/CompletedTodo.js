import { completeTodo, deleteTodo, unCompleteTodo } from "@/lib/db";
import { useAuth } from "../lib/auth";
import { mutate } from "swr";
import router from "next/router";
import { FiCheck } from "react-icons/fi";
import { useToast } from "@chakra-ui/react";

const Todo = ({ name, id, createdAt, authorId }) => {
	const auth = useAuth();
	const toast = useToast();

	const collectionId = router.query.collectionId;
	// console.log(name, id);

	const onDelete = () => {
		toast({
			title: "Task completed!",
			status: "success",
			position: "bottom-right",
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
		deleteTodo(id);
	};

	const onUnComplete = () => {
		const newTodo = {
			name,
			authorId,
			collectionId,
			createdAt,
			status: "pending"
		};
		mutate(
			["/api/todos-completed", collectionId],
			async (data) => {
				return {
					todos: data.todos.filter((todo) => todo.id !== id)
				};
			},
			false
		);
		mutate(
			["/api/todos", collectionId],
			async (data) => ({ todos: [...data.todos, { id, ...newTodo }] }),
			false
		);
		unCompleteTodo(id);
	};
	return (
		<div className='py-2'>
			<div className='rounded-2xl bg-primary-card flex items-center justify-start p-3'>
				<button
					onClick={onUnComplete}
					className='bg-primary-default border-primary-default hover:bg-opacity-50 focus:outline-none active:bg-primary-default border-1 p-1 mr-3 text-sm transition-colors duration-100 ease-in-out rounded-lg'
					style={{ height: "22px" }}
				>
					<FiCheck />
				</button>
				<p className='ml-3 text-white line-through'>{name}</p>
			</div>
		</div>
	);
};

export default Todo;
