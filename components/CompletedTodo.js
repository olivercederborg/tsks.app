import router from "next/router";
import { mutate } from "swr";
import { Tooltip, useToast } from "@chakra-ui/react";
import { HiCheck } from "react-icons/hi";

import CompletedTodoDropdown from "./CompletedTodoDropdown";
import { unCompleteTodo } from "@/lib/db";
import { useAuth } from "../lib/auth";
import { getPendingTodos } from "@/lib/db-admin";
import { compareAsc, parseISO } from "date-fns";

const Todo = ({ name, id, createdAt, authorId, collectionColor, priority }) => {
	const auth = useAuth();
	const toast = useToast();

	const collectionId = router.query.collectionId;

	const onUnComplete = () => {
		const newTodo = {
			name,
			authorId,
			collectionId,
			createdAt,
			priority,
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
			async (data) => {
				const todos = [...data.todos, { id, ...newTodo }];

				todos.sort((a, b) =>
					compareAsc(parseISO(b.createdAt), parseISO(a.createdAt))
				);
				todos.sort((a, b) => (a.priority > b.priority ? 1 : -1));

				return { todos };
			},
			false
		);

		unCompleteTodo(id);
	};
	return (
		<div className='py-2'>
			<div
				className={`group rounded-2xl bg-primary-card relative flex items-center justify-start p-3`}
			>
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
					<CompletedTodoDropdown collectionId={collectionId} id={id} />
				</div>
			</div>
		</div>
	);
};

export default Todo;
