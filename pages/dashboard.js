import Head from "next/head";

import { useAuth } from "@/lib/auth";
import Navigation from "@/components/Navigation";
import AddCollectionModal from "@/components/AddCollectionModal";
import DashboardShell from "@/components/DashboardShell";
import EmptyState from "@/components/EmptyState";
import ShowCollections from "@/components/ShowCollections";
import useSWR from "swr";
import fetcher from "@/utils/fetcher";

export default function Dashboard() {
	const { user } = useAuth();
	const { data } = useSWR(
		user ? ["/api/collections", user.token] : null,
		fetcher
	);

	return (
		<>
			<Head>
				<title>Dashboard - Tsks, just tasks.</title>

				<link rel='icon' href='/favicon.ico' />
			</Head>

			<Navigation />

			<DashboardShell>
				<ShowCollections collections={data?.collections} />
			</DashboardShell>
		</>
	);
}
