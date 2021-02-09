import router from "next/router";
import { mutate } from "swr";
import { useToast } from "@chakra-ui/react";
import { FiCheck } from "react-icons/fi";

import CompletedTodoDropdown from "./CompletedTodoDropdown";
import { deleteTodo, unCompleteTodo } from "@/lib/db";
import { useAuth } from "../lib/auth";

const Todo = ({ name, id, createdAt, authorId, collectionColor }) => {
	const auth = useAuth();
	const toast = useToast();

	const collectionId = router.query.collectionId;

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
					className={`bg-${collectionColor} default-focus hover:bg-opacity-50 focus:outline-none active:bg-${collectionColor} border-1 p-1 text-sm transition-colors duration-100 ease-in-out rounded-lg`}
					style={{ height: "22px", width: "22px" }}
				>
					<FiCheck />
				</button>
				<p className='ml-3 mr-8 text-white line-through'>{name}</p>
				<div
					className={`focus:outline-none absolute right-0 mr-2 rounded-lg`}
				>
					<CompletedTodoDropdown collectionId={collectionId} id={id} />
				</div>
			</div>
		</div>
	);
};

export default Todo;
