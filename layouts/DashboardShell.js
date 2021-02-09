import Head from "next/head";

import Navigation from "layouts/Navigation";

export default function DashboardShell({ children }) {
	return (
		<>
			<Head>
				<title>Dashboard - Tsks, just tasks.</title>

				<link rel='icon' href='/favicon.ico' />
			</Head>

			<Navigation />
			<main className='bg-primary-background flex flex-col items-center min-h-screen pb-40 text-white'>
				<section className='mt-14 w-full max-w-screen-md min-h-screen px-5'>
					{children}
				</section>
			</main>
		</>
	);
}
