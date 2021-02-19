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
				{/* <div className='bg-secondary-card w-full h-1 mr-4 rounded-full'>
					{progressPercentage ?? pendingTodos ?? completedTodos ? (
						<motion.div
							initial={{ scaleX: 0, originX: 0 }}
							animate={{ scaleX: 1 }}
							transition={{ delay: 0.25, duration: 0.65 }}
							style={{
								backgroundColor: currentCollection.collectionColor,
								width: `${progressPercentage}%` ?? "0%"
							}}
							className='h-full bg-black rounded-full'
						/>
					) : (
						""
					)}
				</div> */}
				<p className='opacity-70 text-sm break-normal'>
					{progressPercentage == 100
						? `All ${doneTodos} done!`
						: todos !== 0 || doneTodos !== 0
						? `${doneTodos}/${todos + doneTodos} done`
						: "No tasks"}
				</p>

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
						capIsRound='true'
						color={currentCollection.collectionColor}
						overflow='visible'
					/>
				)}
			</div>
		</>
	);
};

export default CollectionProgress;
