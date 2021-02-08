import { useRef } from "react";
import { useRouter } from "next/router";
import { mutate } from "swr";
import { Box, FormControl, FormLabel } from "@chakra-ui/react";
import { HiOutlinePlus } from "react-icons/hi";

import { useAuth } from "@/lib/auth";
import { createTodo } from "@/lib/db";

const AddTodo = () => {
	const auth = useAuth();
	const router = useRouter();
	const inputEl = useRef(null);
	const collectionId = router.query.collectionId;

	const onCreateTodo = (e) => {
		e.preventDefault();

		const newTodo = {
			authorId: auth.user.uid,
			collectionId: router.query.collectionId,
			createdAt: new Date().toISOString(),
			status: "pending",
			name: inputEl.current.value
		};

		const { id } = createTodo(newTodo);

		mutate(
			["/api/todos", collectionId],
			async (data) => ({ todos: [...data.todos, { id, ...newTodo }] }),
			false
		);
		inputEl.current.value = "";
	};

	return (
		<Box as='form' onSubmit={onCreateTodo}>
			<FormControl my={2}>
				<FormLabel m='0' htmlFor='todo'>
					<div
						className='border-primary-card group hover:border-secondary-card rounded-2xl border-3 flex items-center w-full'
						style={{ padding: "10px" }}
					>
						<button
							className='bg-primary-default border-primary-default focus:outline-none active:bg-primary-default border-1 p-1 mr-3 text-sm transition-colors duration-100 ease-in-out rounded-lg'
							style={{ height: "22px" }}
						>
							<HiOutlinePlus />
						</button>
						<input
							className='w-full bg-transparent outline-none'
							ref={inputEl}
							name='name'
							type='name'
							id='name'
							placeholder='Add task'
							required
						></input>
					</div>
				</FormLabel>
			</FormControl>
		</Box>
	);
};

export default AddTodo;
