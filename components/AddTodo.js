import { useRef } from "react";
import { useRouter } from "next/router";
import { mutate } from "swr";
import { Box, FormControl, FormLabel } from "@chakra-ui/react";
import { BiPlus } from "react-icons/bi";

import { useAuth } from "@/lib/auth";
import { createTodo } from "@/lib/db";

const AddTodo = ({ collectionColor }) => {
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
			priority: 4,
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
							style={{
								height: "22px",
								width: "23px",
								borderColor: collectionColor,
								backgroundColor: collectionColor
							}}
							className={`default-focus text-primary-background text-center flex justify-center items-center mr-3 text-base transition-colors duration-100 ease-in-out rounded-lg`}
						>
							<BiPlus />
						</button>
						<input
							className='w-full bg-transparent rounded-md outline-none'
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
