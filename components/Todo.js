import { completeTodo, deleteTodo } from "@/lib/db";
import { useAuth } from "../lib/auth";
import { mutate } from "swr";
import router from "next/router";
import { FiCheck } from "react-icons/fi";
import { HiOutlineTrash } from "react-icons/hi";
import { useToast } from "@chakra-ui/react";

const Todo = ({ name, id, createdAt, authorId, collectionColor }) => {
	const auth = useAuth();
	const toast = useToast();

	const collectionId = router.query.collectionId;

	const onDelete = () => {
		toast({
			title: "Task deleted!",
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
		deleteTodo(id);
	};

	const onComplete = () => {
		const newTodo = {
			name,
			authorId,
			collectionId,
			createdAt,
			status: "completed"
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
		completeTodo(id);
	};
	return (
		<div className='py-2'>
			<div className='group rounded-2xl bg-primary-card relative flex items-center justify-start p-3'>
				<button
					className={`border-${collectionColor} border-3 focus:outline-none hover:bg-${collectionColor} active:bg-${collectionColor} hover:bg-opacity-40 px-2 py-2 transition-colors duration-100 ease-in-out rounded-lg`}
					onClick={onComplete}
				></button>
				<p className='pr-8 ml-3 text-white'>{name}</p>
				<button
					className={`focus:outline-none hover:bg-red-400 active:bg-${collectionColor} hover:opacity-100 group-hover:opacity-70 absolute right-0 p-2 mr-3 transition-all duration-200 ease-in-out rounded-lg opacity-0`}
					onClick={onDelete}
				>
					<HiOutlineTrash className='' />
				</button>
			</div>
		</div>
	);
};

export default Todo;
