import Link from "next/link";
import { FaUserCircle } from "react-icons/fa";

import { useAuth } from "@/lib/auth";

const Navigation = () => {
	const auth = useAuth();

	return (
		<header className='bg-secondary-background flex items-center justify-center font-semibold text-white'>
			<div className='h-14 flex flex-row items-center justify-between w-full px-5'>
				<div className='flex items-center'>
					<h2 className=' text-2xl font-bold'>
						TSKS<span className='text-primary-default'>.</span>
					</h2>
					<nav>
						<Link href='/' passHref>
							<a className='p-4 ml-2'>Home</a>
						</Link>
						<Link href='/dashboard' passHref>
							<a className='p-4'>Dashboard</a>
						</Link>
					</nav>
				</div>
				{auth.user && (
					<div className='flex items-center'>
						<button
							onClick={() => auth.signout()}
							className='mr-5 font-semibold'
						>
							Log out
						</button>
						<FaUserCircle fontSize='30px' className='text-gray-400' />
					</div>
				)}
			</div>
		</header>
	);
};

export default Navigation;
