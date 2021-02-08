import { useAuth } from "@/lib/auth";
import DashboardShell from "@/components/DashboardShell";
import ShowCollections from "@/components/ShowCollections";
import useSWR from "swr";
import fetcher from "@/utils/fetcher";
import EmptyState from "@/components/EmptyState";

const Dashboard = () => {
	const { user } = useAuth();
	const { data } = useSWR(
		user ? ["/api/todo-collections", user.uid] : null,
		fetcher
	);

	if (!data) {
		return (
			<DashboardShell>
				<h1>Loading</h1>
			</DashboardShell>
		);
	}

	if (data.collections?.length) {
		return (
			<DashboardShell>
				<ShowCollections collections={data.collections} />
			</DashboardShell>
		);
	}

	return (
		<DashboardShell>
			<EmptyState />
		</DashboardShell>
	);
};

export default Dashboard;
