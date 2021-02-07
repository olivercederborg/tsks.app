import Link from "next/link";
import { FaUserCircle } from "react-icons/fa";

import { useAuth } from "@/lib/auth";

const Navigation = () => {
	const auth = useAuth();

	return (
		<header className='bg-secondary-background flex items-center justify-center font-semibold text-white'>
			<div className='h-14 container flex flex-row items-center justify-between'>
				<nav>
					<Link href='/' passHref>
						<a className='p-8'>Home</a>
					</Link>
					<Link href='/dashboard' passHref>
						<a className='p-8'>Dashboard</a>
					</Link>
				</nav>
				{auth.user && (
					<div className='flex items-center px-8'>
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
