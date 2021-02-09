import useSWR from "swr";

import CollectionsSkeleton from "layouts/CollectionsSkeleton";
import EmptyState from "layouts/EmptyState";
import ShowCollections from "@/components/ShowCollections";
import DashboardShell from "layouts/DashboardShell";
import { useAuth } from "@/lib/auth";
import fetcher from "@/utils/fetcher";

const Dashboard = () => {
	const { user } = useAuth();
	const { data } = useSWR(
		user ? ["/api/todo-collections", user.uid] : null,
		fetcher
	);

	if (!data) {
		return (
			<DashboardShell>
				<CollectionsSkeleton />
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
