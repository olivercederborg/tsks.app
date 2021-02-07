import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
	Box,
	Button,
	FormControl,
	FormLabel,
	Input,
	useToast
} from "@chakra-ui/react";

import { useAuth } from "@/lib/auth";
import { getAllTodos, getCollection } from "@/lib/db-admin";
import { createTodo } from "@/lib/db";
import Todo from "@/components/Todo";
import useSWR, { mutate } from "swr";
import TodoShell from "@/components/TodoShell";
import fetcher from "@/utils/fetcher";

const CollectionTodos = () => {
	const toast = useToast();
	const router = useRouter();
	const inputEl = useRef(null);
	const collectionId = router.query.collectionId;

	const auth = useAuth();
	const { data } = useSWR(
		auth.user ? ["/api/todos", collectionId] : null,
		fetcher
	);

	const [allTodos, setAllTodos] = useState([]);
	const [collection, setCollection] = useState("");
	console.log(data);

	useEffect(() => {
		const getEm = async () => {
			// const { todos } = await getAllTodos(collectionId);
			const { collection } = await getCollection(collectionId);
			// setAllTodos(todos);
			setCollection(collection);
		};
		getEm();
	}, [router]);

	// const onSubmit = ({ name }) => {
	// 	e.preventDefault();

	// 	const newTodo = {
	// 		authorId: auth.user.uid,
	// 		collectionId: router.query.collectionId,
	// 		name: inputEl.current.value,
	// 		createdAt: new Date().toISOString(),
	// 		status: "pending"
	// 	};
	// 	toast({
	// 		title: "Success!",
	// 		description: "We've added your collection.",
	// 		status: "success",
	// 		duration: 5000,
	// 		isClosable: true
	// 	});
	// 	mutate(
	// 		["/api/todo-collections", auth.user.uid],
	// 		async (data) => ({
	// 			collections: [...data.collections, { id, ...newCollection }]
	// 		}),
	// 		false
	// 	);

	// 	createTodo(newTodo);
	// };

	const onCreateTodo = (e) => {
		e.preventDefault();
		const newTodo = {
			authorId: auth.user.uid,
			collectionId: router.query.collectionId,
			name: inputEl.current.value,
			createdAt: new Date().toISOString(),
			status: "pending"
		};

		const { id } = createTodo(newTodo);
		toast({
			title: "Success!",
			description: "We've added your todo.",
			status: "success",
			duration: 5000,
			isClosable: true
		});
		mutate(
			["/api/todos", collectionId],
			async (data) => ({
				todos: [...data.todos, { id, ...newTodo }]
			}),
			false
		);
		inputEl.current.value = "";
	};
	return (
		<TodoShell currentCollection={collection}>
			<p className='mb-2 font-medium text-white'>
				Tasks - {data?.todos?.length}
			</p>
			{data?.todos &&
				data.todos.map((todo) => <Todo key={todo.id} {...todo} />)}
			<Box as='form' onSubmit={onCreateTodo}>
				<FormControl my={2}>
					<FormLabel m='0' htmlFor='todo'>
						<input
							className='border-primary-card rounded-xl w-full p-3 font-medium bg-transparent border-2'
							ref={inputEl}
							name='todo'
							type='todo'
							id='todo'
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
		</TodoShell>
	);
};

export default CollectionTodos;
