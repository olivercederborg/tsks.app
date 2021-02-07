import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Box, Button, FormControl, FormLabel, Input } from "@chakra-ui/react";

import { useAuth } from "@/lib/auth";
import { getAllTodos } from "@/lib/db-admin";
import { createTodo } from "@/lib/db";
import Todo from "@/components/Todo";
import TodoShell from "@/components/TodoShell";

const CollectionTodos = () => {
	const auth = useAuth();
	const router = useRouter();
	const inputEl = useRef(null);
	const collectionId = router.query.collectionId;
	const [allTodos, setAllTodos] = useState([]);

	useEffect(() => {
		const getEm = async () => {
			const { todos } = await getAllTodos(collectionId);
			setAllTodos(todos);
		};
		getEm();
	}, [router]);

	const onSubmit = (e) => {
		e.preventDefault();

		const newTodo = {
			authorId: auth.user.uid,
			collectionId: router.query.collectionId,
			name: inputEl.current.value,
			createdAt: new Date().toISOString(),
			status: "pending"
		};

		setAllTodos([newTodo, ...allTodos]);
		createTodo(newTodo);
		inputEl.current.value = "";
	};
	return (
		<TodoShell>
			<p className='font-medium text-white'>Tasks - {allTodos?.length}</p>
			{allTodos && allTodos.map((todo) => <Todo key={todo.id} {...todo} />)}
			<Box as='form' onSubmit={onSubmit}>
				<FormControl my={8}>
					<FormLabel htmlFor='todo'></FormLabel>
					<Input ref={inputEl} name='todo' type='todo' id='todo' />
					<Button type='submit' mt={4} fontWeight='600'>
						Add Todo
					</Button>
				</FormControl>
			</Box>
		</TodoShell>
	);
};

export default CollectionTodos;
