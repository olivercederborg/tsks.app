import Link from "next/link";
import { AiOutlineGoogle } from "react-icons/ai";

import { useAuth } from "@/lib/auth";
import LandingNavigation from "./LandingNavigation";
import { useEffect, useState } from "react";

const LandingHero = () => {
	const auth = useAuth();
	const [greeting, setGreeting] = useState("Hi");

	const currentTime = new Date().getHours();

	useEffect(() => {
		switch (currentTime) {
			case 5:
			case 6:
			case 7:
			case 8:
			case 9:
			case 10:
			case 11:
				setGreeting("Good morning");
				break;
			case 12:
			case 13:
			case 14:
			case 15:
			case 16:
				setGreeting("Good afternoon");
				break;
			case 17:
			case 18:
			case 19:
			case 20:
			case 21:
			case 22:
			case 23:
				setGreeting("Good evening");
				break;

			default:
				setGreeting(`Hi`);
		}
	}, [currentTime]);

	return (
		<>
			<article
				id='hero'
				className='bg-hero-background hero-image flex flex-col w-full h-screen'
			>
				<LandingNavigation />
				<section className='h-4/6 md:h-3/6 lg:h-3/6 relative flex flex-col justify-center'>
					{!auth?.user && (
						<h1 className='text-5xl font-bold leading-snug'>
							Tsks, just tasks
							<span className='bg-gradient-to-r from-gradient1-button via-gradient2-button to-gradient3-button bg-clip-text text-transparent'>
								.
							</span>
						</h1>
					)}

					{auth?.user && (
						<h1 className='md:text-5xl md:leading-normal text-4xl font-bold leading-snug'>
							{greeting},<br />
							{auth.user.name}
							<span className='bg-gradient-to-r from-gradient1-button via-gradient2-button to-gradient3-button bg-clip-text text-transparent'>
								.
							</span>
						</h1>
					)}

					<p className='text-gray-text mt-7 font-medium leading-relaxed'>
						Keep track of the daily tasks in life and
						<br />
						get that satisfaction upon completion.
					</p>
					<div className='flex justify-center mt-12 font-semibold'>
						{!auth?.user && (
							<>
								<Link href='/users/signup' passHref>
									<a className='rounded-xl bg-gradient-to-tr shadow-button from-gradient1-button via-gradient2-button hover:-translate-y-1 to-gradient3-button px-8 py-4 mx-3 transition-all duration-200 ease-in-out transform'>
										Get Started
									</a>
								</Link>

								<a className='bg-gray-button shadow-button rounded-xl hover:bg-opacity-90 hover:-translate-y-1 px-8 py-4 mx-3 transition-all duration-200 ease-in-out transform'>
									Learn More
								</a>
							</>
						)}
						{auth?.user && (
							<Link href='/app' passHref>
								<a className='rounded-xl bg-gradient-to-tr shadow-button from-gradient1-button via-gradient2-button hover:-translate-y-1 to-gradient3-button px-8 py-4 mx-3 transition-all duration-200 ease-in-out transform'>
									View Dashboard
								</a>
							</Link>
						)}
					</div>
				</section>
			</article>
		</>
	);
};
export default LandingHero;
