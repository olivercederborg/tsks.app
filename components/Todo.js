import { deleteTodo } from "@/lib/db";
import { useAuth } from "../lib/auth";
import { mutate } from "swr";
import router from "next/router";
import { BsCheckAll } from "react-icons/bs";
import { useToast } from "@chakra-ui/react";

const Todo = ({ name, id }) => {
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
	return (
		<div className='py-2'>
			<div className='rounded-2xl bg-primary-card flex items-center justify-start p-3'>
				<button
					className='border-primary-default border-3 focus:outline-none hover:bg-primary-default active:bg-primary-default hover:bg-opacity-40 px-2 py-2 transition-colors duration-100 ease-in-out rounded-lg'
					onClick={onDelete}
				></button>
				<p className='ml-3 text-white'>{name}</p>
				{/* <BsCheckAll /> */}
			</div>
		</div>
	);
};

export default Todo;
