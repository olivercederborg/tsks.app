import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/router";
import useSWR, { mutate } from "swr";
import {
	Box,
	Button,
	FormControl,
	FormLabel,
	Input,
	useToast
} from "@chakra-ui/react";

import { useAuth } from "@/lib/auth";
import { createTodo } from "@/lib/db";

const AddTodo = () => {
	const toast = useToast();
	const router = useRouter();
	const inputEl = useRef(null);
	const collectionId = router.query.collectionId;

	const auth = useAuth();

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
		toast({
			title: "Success!",
			description: "We've added your task.",
			status: "success",
			duration: 5000,
			isClosable: true
		});
		mutate(
			["/api/todos", collectionId],
			async (data) => ({ todos: [...data.todos, { id, ...newTodo }] }),
			false
		);
		inputEl.current.value = "";
		console.log(id);
	};
	return (
		<Box as='form' onSubmit={onCreateTodo}>
			<FormControl my={2}>
				<FormLabel m='0' htmlFor='todo'>
					<input
						className='border-primary-card rounded-xl w-full p-3 font-medium bg-transparent border-2'
						ref={inputEl}
						name='name'
						type='name'
						id='name'
						placeholder='Add task'
					/>
				</FormLabel>
				<button
					className='bg-primary-default rounded-2xl hidden px-6 py-3'
					type='submit'
					mt={4}
					fontWeight='600'
				>
					Add Todo
				</button>
			</FormControl>
		</Box>
	);
};

export default AddTodo;
