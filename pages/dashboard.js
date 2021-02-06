import Head from "next/head";

import { useAuth } from "@/lib/auth";
import Navigation from "@/components/Navigation";

export default function Dashboard() {
	const auth = useAuth();

	return (
		<>
			<Head>
				<title>Dashboard - Tsks, just tasks.</title>

				<link rel='icon' href='/favicon.ico' />
			</Head>

			<Navigation />

			<main className='flex flex-col items-center min-h-screen text-white bg-gray-900'>
				<section className='container bg-gray-800'>
					<h1 className='text-5xl font-bold'>Collections</h1>
					<div className='flex'>
						<button className='hover:bg-purple-400 rounded-xl mt-14 flex flex-row items-center justify-center px-6 py-3 mx-2 font-semibold text-white transition-colors duration-200 ease-in-out bg-purple-500'>
							Add Collection
						</button>
						{/* <button
							onClick={(e) => auth.signout()}
							className='hover:bg-purple-400 rounded-xl mt-14 flex flex-row items-center justify-center px-6 py-3 mx-2 font-semibold text-white transition-colors duration-200 ease-in-out bg-purple-500'
						>
							Sign out
						</button> */}
					</div>
				</section>
			</main>
		</>
	);
}
