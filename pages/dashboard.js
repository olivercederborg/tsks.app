import { useAuth } from "@/lib/auth";
import AddCollectionModal from "@/components/AddCollectionModal";
import DashboardShell from "@/components/DashboardShell";
import EmptyState from "@/components/EmptyState";
import ShowCollections from "@/components/ShowCollections";
import useSWR from "swr";
import fetcher from "@/utils/fetcher";

const Dashboard = () => {
	const { user } = useAuth();
	const { data } = useSWR(
		user ? ["/api/collections", user.token] : null,
		fetcher
	);

	if (!data) {
		return (
			<DashboardShell>
				<h1>Loading</h1>
			</DashboardShell>
		);
	}

	if (data.collections.length) {
		return (
			<DashboardShell>
				<ShowCollections collections={data?.collections} />
			</DashboardShell>
		);
	}
};

export default Dashboard;
