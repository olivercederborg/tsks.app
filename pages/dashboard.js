import Head from "next/head";

import { useAuth } from "@/lib/auth";
import Navigation from "@/components/Navigation";
import DashboardShell from "@/components/DashboardShell";
import ShowCollections from "@/components/ShowCollections";
import { getUserCollections } from "@/lib/db-admin";
import { useEffect, useState } from "react";

export default function Dashboard() {
	const { user } = useAuth();
	const [allCollections, setAllCollections] = useState([]);

	useEffect(() => {
		const getEm = async () => {
			const { collections } = await getUserCollections(user?.uid);
			setAllCollections(collections);
		};
		getEm();
	}, [user?.uid]);

	return (
		<>
			<Head>
				<title>Dashboard - Tsks, just tasks.</title>

				<link rel='icon' href='/favicon.ico' />
			</Head>

			<Navigation />

			<DashboardShell>
				<ShowCollections collections={allCollections} />
			</DashboardShell>
		</>
	);
}
