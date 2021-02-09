import { useRef } from "react";
import { mutate } from "swr";
import { useToast } from "@chakra-ui/react";
import { FiMoreVertical } from "react-icons/fi";

import { deleteTodo } from "../lib/db";
import { useDetectOutsideClick } from "@/utils/useDetectOutsideClick";

const TodoDropdown = ({ collectionId, id }) => {
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

	return (
		<div className='relative flex text-left'>
			<button
				onClick={onClick}
				className='default-focus hover:opacity-100 z-10 p-2 transition-opacity duration-200 ease-in-out rounded-lg opacity-50'
			>
				<FiMoreVertical className='text-xl' />
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
						className='default-focus hover:bg-secondary-card block w-full px-4 py-2 text-sm text-left text-gray-200'
						role='menuitem'
					>
						Edit
					</button>
				</div>
				<div className='py-1'>
					<button
						onClick={onDelete}
						className='default-focus hover:bg-secondary-card block w-full px-4 py-2 text-sm text-left text-gray-200'
						role='menuitem'
					>
						Delete
					</button>
				</div>
			</div>
		</div>
	);
};

export default TodoDropdown;
