import { useRef } from "react";
import { mutate } from "swr";
import { useToast } from "@chakra-ui/react";
import { FiEdit, FiMoreHorizontal, FiMoreVertical } from "react-icons/fi";

import { deleteTodo, prioritizeTodo } from "../lib/db";
import { useDetectOutsideClick } from "@/utils/useDetectOutsideClick";
import EditTodoModal from "./EditTodoModal";
import { BiEdit, BiTrash } from "react-icons/bi";
import { HiFlag, HiOutlineFlag } from "react-icons/hi";
import { getPendingTodos } from "@/lib/db-admin";
import { compareAsc, parseISO } from "date-fns";

const TodoDropdown = ({
	collectionId,
	id,
	name,
	authorId,
	createdAt,
	priority
}) => {
	const toast = useToast();
	const dropdownRef = useRef(null);
	const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
	const onClick = () => setIsActive(!isActive);

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

	const onPriority = (prioVal) => {
		const newTodoValues = {
			collectionId,
			name,
			authorId,
			createdAt,
			priority: prioVal
		};
		prioritizeTodo(id, prioVal);

		mutate(
			["/api/todos", collectionId],
			async (data) => {
				const newTodos = data.todos.filter((todo) => todo.id !== id);

				const todos = [...newTodos, { id, ...newTodoValues }];

				todos.sort((a, b) =>
					compareAsc(parseISO(b.createdAt), parseISO(a.createdAt))
				);
				todos.sort((a, b) => (a.priority > b.priority ? 1 : -1));

				return { todos };
			},
			false
		);
	};

	return (
		<div className='relative flex text-left'>
			<button
				onClick={onClick}
				className='default-focus hover:opacity-100 z-10 p-2 transition-opacity duration-200 ease-in-out rounded-lg opacity-50'
			>
				<FiMoreHorizontal className='text-xl' />
			</button>

			<div
				ref={dropdownRef}
				className={`origin-top-right absolute right-0 top-5 z-50 mt-2 w-56 rounded-md shadow-lg bg-secondary-background ring-1 ring-black ring-opacity-5 divide-y divide-primary-background ${
					isActive ? "visible" : "invisible"
				}`}
				role='menu'
				aria-orientation='vertical'
				aria-labelledby='options-menu'
			>
				<div className='py-1'>
					<button
						className='default-focus hover:bg-secondary-card flex w-full px-4 py-2 text-sm text-left text-gray-200'
						role='menuitem'
					>
						<EditTodoModal
							collectionId={collectionId}
							todoId={id}
							todoName={name}
							authorId={authorId}
							createdAt={createdAt}
							priority={priority}
						>
							<FiEdit className='mr-2 text-lg' /> Edit
						</EditTodoModal>
					</button>
				</div>

				<div className='py-1'>
					<button
						onClick={() => onPriority(1)}
						className='default-focus hover:bg-secondary-card flex w-full px-4 py-2 text-sm text-left text-gray-200'
						role='menuitem'
					>
						<HiFlag className='mr-2 text-lg text-red-500' /> Priority 1
					</button>

					<button
						onClick={() => onPriority(2)}
						className='default-focus hover:bg-secondary-card flex w-full px-4 py-2 text-sm text-left text-gray-200'
						role='menuitem'
					>
						<HiFlag className='mr-2 text-lg text-yellow-400' /> Priority 2
					</button>

					<button
						onClick={() => onPriority(3)}
						className='default-focus hover:bg-secondary-card flex w-full px-4 py-2 text-sm text-left text-gray-200'
						role='menuitem'
					>
						<HiFlag className='mr-2 text-lg text-blue-500' /> Priority 3
					</button>

					<button
						onClick={() => onPriority(4)}
						className='default-focus hover:bg-secondary-card flex w-full px-4 py-2 text-sm text-left text-gray-200'
						role='menuitem'
					>
						<HiFlag className='mr-2 text-lg' /> Priority 4
					</button>
				</div>

				<div className='py-1'>
					<button
						onClick={onDelete}
						className='default-focus hover:bg-secondary-card flex items-center w-full px-4 py-2 text-sm text-left text-red-400'
						role='menuitem'
					>
						<BiTrash className='mr-2 text-lg' />
						Delete
					</button>
				</div>
			</div>
		</div>
	);
};

export default TodoDropdown;
