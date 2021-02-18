import useSWR from "swr";

import { useAuth } from "@/lib/auth";
import fetcher from "@/utils/fetcher";

export default function CollectionPendingTodos({ currentCollection }) {
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

	if (!user) {
		return <p className='opacity-60 mt-1'>Loading</p>;
	}

	return (
		<>
			{pendingTodos && doneTodos != todos + doneTodos ? (
				<p className='opacity-60 mt-1'>
					{todos === 1
						? `${todos} pending task`
						: todos > 1
						? `${todos} pending tasks`
						: "No pending tasks"}
				</p>
			) : pendingTodos && doneTodos == todos + doneTodos && doneTodos ? (
				<p className='opacity-80 mt-1'>All done! 🎉</p>
			) : (
				<p className='opacity-60 mt-1'>No tasks</p>
			)}
		</>
	);
}
