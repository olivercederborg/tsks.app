import Head from "next/head";

import Navigation from "@/components/Navigation";
import { Flex } from "@chakra-ui/react";

export default function DashboardShell({ children }) {
	return (
		<>
			<Head>
				<title>Dashboard - Tsks, just tasks.</title>

				<link rel='icon' href='/favicon.ico' />
			</Head>

			<Navigation />
			<main className='bg-primary-background flex flex-col items-center min-h-screen text-white'>
				<section className='mt-14 w-full max-w-screen-md min-h-screen px-5'>
					<h1 className='text-4xl font-bold'>Collections</h1>
					{children}
				</section>
			</main>
		</>
	);
}
