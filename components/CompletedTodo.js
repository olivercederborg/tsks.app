import { completeTodo, deleteTodo, unCompleteTodo } from "@/lib/db";
import { useAuth } from "../lib/auth";
import { mutate } from "swr";
import router from "next/router";
import { FiCheck } from "react-icons/fi";
import { HiOutlineTrash } from "react-icons/hi";
import { useToast } from "@chakra-ui/react";

const Todo = ({ name, id, createdAt, authorId }) => {
	const auth = useAuth();
	const toast = useToast();

	const collectionId = router.query.collectionId;
	// console.log(name, id);

	const onDelete = () => {
		toast({
			title: "Task deleted!",
			status: "success",
			position: "top",
			duration: 1500
		});
		mutate(
			["/api/todos-completed", collectionId],
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
			<div className='group rounded-2xl bg-primary-card relative flex items-center justify-start p-3'>
				<button
					onClick={onUnComplete}
					className='bg-primary-default hover:bg-opacity-50 focus:outline-none active:bg-primary-default border-1 p-1 text-sm transition-colors duration-100 ease-in-out rounded-lg'
					style={{ height: "22px", width: "22px" }}
				>
					<FiCheck />
				</button>
				<p className='ml-3 mr-8 text-white line-through'>{name}</p>
				<button
					className='focus:outline-none hover:bg-red-400 active:bg-primary-default hover:opacity-100 group-hover:opacity-70 absolute right-0 p-2 mr-3 transition-all duration-200 ease-in-out rounded-lg opacity-0'
					onClick={onDelete}
				>
					<HiOutlineTrash className='' />
				</button>
			</div>
		</div>
	);
};

export default Todo;
