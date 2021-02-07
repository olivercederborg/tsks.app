import Head from "next/head";
import Link from "next/link";
import { AiOutlineGoogle } from "react-icons/ai";

import { useAuth } from "@/lib/auth";

export default function Index() {
	const auth = useAuth();

	return (
		<>
			<Head>
				<title>Home - Tsks, just tasks.</title>
				<script
					dangerouslySetInnerHTML={{
						__html: `
          if (document.cookie && document.cookie.includes('tsks-auth')) {
            window.location.href = "/dashboard"
          }`
					}}
				/>
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<main className='flex flex-col items-center justify-center min-h-screen text-center text-white bg-gray-900'>
				{!auth.user ? (
					<h1 className='text-6xl font-bold'>Tsks, just tasks.</h1>
				) : (
					<h1 className='text-5xl font-bold'>
						Welcome, {auth.user.name}.
					</h1>
				)}
				{!auth?.user && (
					<p className='opacity-60 mt-8 text-gray-200'>
						Keep track of your daily tasks in life and
						<br /> get that satisfaction once completed.
					</p>
				)}
				{auth.user ? (
					<div className='flex'>
						<Link href='/dashboard'>
							<button className='hover:bg-purple-400 rounded-xl mt-14 flex flex-row items-center justify-center px-6 py-3 mx-2 font-semibold text-white transition-colors duration-200 ease-in-out bg-purple-500'>
								View Dashboard
							</button>
						</Link>
						<button
							onClick={(e) => auth.signout()}
							className='hover:bg-purple-400 rounded-xl mt-14 flex flex-row items-center justify-center px-6 py-3 mx-2 font-semibold text-white transition-colors duration-200 ease-in-out bg-purple-500'
						>
							Sign out
						</button>
					</div>
				) : (
					<button
						onClick={(e) => auth.signinWithGoogle()}
						className='hover:bg-purple-400 rounded-xl mt-14 flex flex-row items-center justify-center px-6 py-3 font-semibold text-white transition-colors duration-200 ease-in-out bg-purple-500'
					>
						<AiOutlineGoogle className='mr-2 text-2xl' />
						Sign in with Google
					</button>
				)}
			</main>
		</>
	);
}
