import router from "next/router";
import { mutate } from "swr";
import { useToast } from "@chakra-ui/react";
import { HiCheck } from "react-icons/hi";

import CompletedTodoDropdown from "./CompletedTodoDropdown";
import { unCompleteTodo } from "@/lib/db";
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
					style={{
						height: "22px",
						width: "22px",
						borderColor: collectionColor,
						backgroundColor: collectionColor
					}}
					onClick={onUnComplete}
					className={`default-focus text-primary-background hover:bg-opacity-50 focus:outline-none flex justify-center items-center transition-colors duration-100 ease-in-out rounded-lg`}
				>
					<HiCheck />
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
