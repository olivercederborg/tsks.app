import useSWR from "swr";
import { motion } from "framer-motion";
import { CircularProgress, CircularProgressLabel } from "@chakra-ui/react";

import { useAuth } from "@/lib/auth";
import fetcher from "@/utils/fetcher";
import { BiCheck } from "react-icons/bi";
import { HiCheck } from "react-icons/hi";

const CollectionProgress = ({ currentCollection }) => {
	const { user } = useAuth();
	const { data: pendingTodos } = useSWR(
		user ? ["/api/todos", currentCollection.id] : null,
		fetcher
	);
	const { data: completedTodos } = useSWR(
		user ? ["/api/todos-completed", currentCollection.id] : null,
		fetcher
	);
	const todos = pendingTodos?.todos.length;
	const doneTodos = completedTodos?.todos.length;
	const progressPercentage = (doneTodos / (todos + doneTodos)) * 100;

	return (
		<>
			<div className='flex items-center justify-between w-full mt-2'>
				{pendingTodos &&
				completedTodos &&
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
							class='animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 z-0'
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
						capIsRound={progressPercentage ? true : false}
						color={currentCollection.collectionColor}
						overflow='visible'
					/>
				)}
			</div>
		</>
	);
};

export default CollectionProgress;
