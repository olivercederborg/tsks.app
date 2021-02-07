import Head from "next/head";

import Navigation from "@/components/Navigation";

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
