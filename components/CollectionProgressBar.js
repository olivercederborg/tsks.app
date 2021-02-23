import { CircularProgress } from "@chakra-ui/react";

import { HiCheck } from "react-icons/hi";
import { getCompletedTodos, getPendingTodos } from "@/lib/db-admin";
import { useEffect, useState } from "react";
import useSWR from "swr";
import fetcher from "@/utils/fetcher";
import { useAuth } from "@/lib/auth";

const CollectionProgress = ({ currentCollection }) => {
	const { user } = useAuth();
	// const [pendingTodos, setPendingTodos] = useState([]);
	// const [completedTodos, setCompletedTodos] = useState([]);

	const { data: pendingTodos } = useSWR(
		user ? ["/api/todos", currentCollection.id] : null,
		fetcher
	);
	const { data: completedTodos } = useSWR(
		user ? ["/api/todos-completed", currentCollection.id] : null,
		fetcher
	);

	// console.log(completedTodos.todos);

	const todos = pendingTodos?.todos.length;
	const doneTodos = completedTodos?.todos.length;
	const progressPercentage = (doneTodos / (todos + doneTodos)) * 100;

	// useEffect(() => {
	// 	let isRendered = true;
	// 	getPendingTodos(currentCollection.id).then(
	// 		(todos) => isRendered && setPendingTodos(todos)
	// 	);
	// 	getCompletedTodos(currentCollection.id).then(
	// 		(todos) => isRendered && setCompletedTodos(todos)
	// 	);
	// 	return () => {
	// 		isRendered = false;
	// 	};
	// }, []);

	return (
		<>
			<div className='flex items-center justify-between w-full mt-2'>
				{pendingTodos?.todos &&
				completedTodos?.todos &&
				typeof todos === "number" &&
				typeof todos === "number" ? (
					<p className='opacity-70 text-sm break-normal'>
						{progressPercentage == 100
							? `All ${doneTodos} done!`
							: todos !== 0 || doneTodos !== 0
							? `${doneTodos}/${todos + doneTodos} done`
							: "No tasks"}
					</p>
				) : (
					<p className='opacity-70 text-sm break-normal'>--/-- done</p>
				)}

				{progressPercentage === 100 ? (
					<div
						className='relative z-10 flex items-center justify-center w-5 h-5 rounded-full'
						style={{ backgroundColor: currentCollection.collectionColor }}
					>
						<HiCheck className='text-primary-card z-10 text-sm' />
						<span
							className='animate-ping absolute z-0 inline-flex w-full h-full rounded-full opacity-75'
							style={{
								backgroundColor: currentCollection.collectionColor
							}}
						></span>
					</div>
				) : (
					<CircularProgress
						value={progressPercentage || 0}
						size='20px'
						thickness='14px'
						capIsRound={progressPercentage}
						color={currentCollection.collectionColor}
						trackColor='#32323f'
						overflow='visible'
					/>
				)}
			</div>
		</>
	);
};

export default CollectionProgress;
