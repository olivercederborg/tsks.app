import Link from "next/link";
import { useRouter } from "next/router";
import { FaUserCircle } from "react-icons/fa";

import { useAuth } from "@/lib/auth";
import { Avatar } from "@chakra-ui/react";

const Navigation = () => {
	const auth = useAuth();
	const router = useRouter();

	return (
		<header className='bg-secondary-background font-regular flex items-center justify-center text-white'>
			<div className='h-14 flex flex-row items-center justify-between w-full px-5'>
				<div>
					<nav className='flex items-center'>
						<Link href='/' passHref>
							<a className='text-2xl font-bold'>
								TSKS<span className='text-primary-default'>.</span>
							</a>
						</Link>
						<Link href='/dashboard' passHref>
							<a
								className={`ml-6 py-4 font-medium opacity-70 hover:opacity-100 ${
									router.pathname == "/dashboard"
										? "border-primary-default border-b-4 opacity-100"
										: ""
								}`}
							>
								Dashboard
							</a>
						</Link>
					</nav>
				</div>
				{auth.user && (
					<div className='flex items-center'>
						<button
							onClick={() => auth.signout()}
							className='font-regular mr-5'
						>
							Log out
						</button>
						{/* <FaUserCircle fontSize='30px' className='text-gray-400' /> */}
						{auth.user.userRole == "admin" ? (
							<div className='text-red-50 px-2 py-1 mr-2 text-xs font-semibold tracking-wider uppercase bg-red-400 rounded-lg'>
								{auth.user.userRole}
							</div>
						) : (
							<div className='bg-primary-default px-2 py-1 mr-2 text-xs font-semibold tracking-wider text-purple-200 uppercase rounded-lg'>
								{auth.user.userRole}
							</div>
						)}
						<Avatar h='30px' w='30px' />
					</div>
				)}
			</div>
		</header>
	);
};

export default Navigation;
