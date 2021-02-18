import useSWR from "swr";
import { motion } from "framer-motion";

import { useAuth } from "@/lib/auth";
import fetcher from "@/utils/fetcher";

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
			<div className='flex items-center w-full mt-4'>
				<div className='bg-secondary-card w-full h-1 mr-4 rounded-full'>
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
				</div>
				<p className='opacity-70 text-sm break-normal'>
					{typeof todos == "number" && typeof doneTodos == "number"
						? `${doneTodos}/${todos + doneTodos}`
						: "0/0"}
				</p>
			</div>
		</>
	);
};

export default CollectionProgress;
