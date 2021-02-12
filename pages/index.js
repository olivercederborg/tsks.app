import Head from "next/head";
import Link from "next/link";
import { AiOutlineGoogle } from "react-icons/ai";

import { useAuth } from "@/lib/auth";
import LandingHero from "@/layouts/LandingHero";

export default function Index() {
	const auth = useAuth();

	return (
		<>
			<Head>
				<title>Home - Tsks, just tasks.</title>
				{/* <script
					dangerouslySetInnerHTML={{
						__html: `
          if (document.cookie && document.cookie.includes('tsks-auth')) {
            window.location.href = "/dashboard"
          }`
					}}
				/> */}
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<main className='flex flex-col items-center min-h-screen text-center text-white'>
				<LandingHero />
			</main>
		</>
	);
}
