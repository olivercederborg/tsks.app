import Head from "next/head";

import Navigation from "@/layouts/Navigation";

export default function DashboardShell({ children }) {
	return (
		<>
			<Head>
				<title>Dashboard - Tsks.</title>
			</Head>

			<Navigation>
				<section className='md:mt-14 w-full max-w-screen-md px-5 mt-8'>
					{children}
				</section>
			</Navigation>
		</>
	);
}
