import Head from "next/head";

import Navigation from "@/layouts/Navigation";

export default function DashboardShell({ children }) {
	return (
		<>
			<Head>
				<title>Dashboard - Tsks.</title>
			</Head>

			<Navigation />
			<main className='flex flex-col items-center pb-40 text-white'>
				<section className='mt-14 w-full max-w-screen-md px-5'>
					{children}
				</section>
			</main>
		</>
	);
}
