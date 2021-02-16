import { useAuth } from "@/lib/auth";
import fetcher from "@/utils/fetcher";
import useSWR from "swr";

export default function CollectionPendingTodos({ currentCollection }) {
	const { user } = useAuth();
	const { data: pendingTodos } = useSWR(
		user ? ["/api/todos", currentCollection.id] : null,
		fetcher
	);
	const todos = pendingTodos?.todos.length;

	return (
		<>
			{pendingTodos ? (
				<p className='opacity-60 mt-1'>
					{todos === 1
						? `${todos} pending task`
						: todos > 1
						? `${todos} pending tasks`
						: "No pending tasks"}
				</p>
			) : (
				"Loading"
			)}
		</>
	);
}
