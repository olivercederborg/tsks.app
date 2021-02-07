import Head from "next/head";
import { MdLabel } from "react-icons/md";
import useSWR from "swr";

import Navigation from "@/components/Navigation";
import { useAuth } from "@/lib/auth";
import AddCollectionModal from "@/components/AddCollectionModal";
import fetcher from "@/utils/fetcher";

export default function DashboardShell({ children }) {
	return (
		<>
			<Head>
				<title>Dashboard - Tsks, just tasks.</title>

				<link rel='icon' href='/favicon.ico' />
			</Head>

			<Navigation />
			<main className='flex flex-col items-center min-h-screen text-white bg-gray-900'>
				<section className='mt-14 container min-h-screen'>
					<h1 className='text-4xl font-bold'>Collections</h1>
					{children}
				</section>
			</main>
		</>
	);
}
