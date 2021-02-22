import LandingNavigation from "@/layouts/LandingNavigation";
import Link from "next/link";

const NotFound = () => {
	return (
		<>
			<div className='notfound-balls h-screen'>
				<LandingNavigation />
				<main className='h-4/5 flex flex-col items-center justify-center'>
					<article className='container flex flex-col items-center px-4 text-center'>
						<h1 className='md:text-5xl lg:text-6xl mt-14 md:mt-0 text-4xl font-bold'>
							404 - Looks like you're lost.
						</h1>
						<p className='text-gray-text mt-8'>
							Maybe this page used to exist or you just spelled something
							wrong.
							<br />
							Chances are you spelled something wrong, so can you double
							check the url?
						</p>
						<Link href='/' passHref>
							<a className='rounded-xl bg-gradient-to-tr shadow-button from-gradient1-button via-gradient2-button hover:-translate-y-1 to-gradient3-button px-8 py-4 mx-3 mt-12 transition-all duration-200 ease-in-out transform'>
								Return Home
							</a>
						</Link>
					</article>
				</main>
			</div>
		</>
	);
};

export default NotFound;
