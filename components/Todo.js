import router from "next/router";
import { mutate } from "swr";
import { Tooltip, useToast } from "@chakra-ui/react";

import TodoDropdown from "./TodoDropdown";
import {
	completeTodo,
	decrementTodos,
	incrementCompletedTodos
} from "@/lib/db";
import { useAuth } from "../lib/auth";
import { eachDayOfInterval } from "date-fns";
import { useDeprecatedInvertedScale } from "framer-motion";

const Todo = ({ name, id, createdAt, authorId, collectionColor, priority }) => {
	const auth = useAuth();
	const toast = useToast();

	const collectionId = router.query.collectionId;

	const onComplete = () => {
		const newTodo = {
			name,
			authorId,
			collectionId,
			createdAt,
			priority,
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
		incrementCompletedTodos(collectionId);
		decrementTodos(collectionId);
	};

	return (
		<div className='py-2'>
			<div
				className={`group rounded-2xl bg-primary-card relative flex items-center justify-start p-3`}
			>
				<button
					style={{
						borderColor: collectionColor
					}}
					className={`default-focus border-3 focus:outline-none bg-opacity-0 hover:bg-opacity-40 px-2 py-2 transition-colors duration-100 ease-in-out rounded-lg`}
					onClick={onComplete}
				></button>

				<p className='pr-8 ml-3 text-white'>{name}</p>
				<Tooltip
					openDelay={500}
					label={`Priority ${priority}`}
					placement='top'
					bg='#272732'
					color='gray.200'
					borderRadius='6px'
					py='4px'
					px='8px'
				>
					<div
						style={{ width: "12px", height: "12px" }}
						className={`rounded-md absolute -top-0.5 -right-0.5 ${
							priority === 4 && "hidden"
						} ${!priority && "hidden"} ${
							priority === 3 && "bg-blue-500"
						} ${priority === 2 && "bg-yellow-500"} ${
							priority === 1 && "bg-red-500"
						}`}
					></div>
				</Tooltip>
				<div
					className={`focus:outline-none absolute right-0 mr-2 rounded-lg flex items-center`}
				>
					<TodoDropdown
						collectionId={collectionId}
						id={id}
						name={name}
						createdAt={createdAt}
						authorId={authorId}
						collectionColor={collectionColor}
						priority={priority}
					/>
				</div>
			</div>
		</div>
	);
};

export default Todo;
