import Link from "next/link";
import { useRouter } from "next/router";
import { BiHomeAlt } from "react-icons/bi";
import { MdDashboard } from "react-icons/md";
import { IoLogOutOutline } from "react-icons/io5";

import { useAuth } from "@/lib/auth";
import { Avatar } from "@chakra-ui/react";

const Navigation = () => {
	const auth = useAuth();
	const router = useRouter();

	return (
		<>
			<header className='bg-secondary-background font-regular md:flex items-center justify-center hidden text-white'>
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
							{auth.user.userRole == "admin" && (
								<div className='text-red-50 px-2 py-1 mr-2 text-xs font-semibold tracking-wider uppercase bg-red-400 rounded-lg'>
									{auth.user.userRole}
								</div>
							)}
							<Avatar h='30px' w='30px' src={auth.user.photoUrl} />
						</div>
					)}
				</div>
			</header>

			<header
				id='mobile_menu'
				className='bg-secondary-background md:hidden fixed bottom-0 z-20 flex items-start justify-center w-full text-sm font-medium text-white'
			>
				<div className='flex flex-row items-center justify-between w-full'>
					<nav className='flex items-center justify-around w-full'>
						<Link href='/' passHref>
							<a
								className={`py-5 opacity-70 hover:opacity-100 flex items-center ${
									router.pathname == "/" ? "opacity-100" : ""
								}`}
							>
								<BiHomeAlt
									className={`mr-2 text-3xl ${
										router.pathname == "/"
											? "text-primary-default"
											: ""
									}`}
								/>
								Home
							</a>
						</Link>
						<Link href='/dashboard' passHref>
							<a
								className={`py-5 opacity-70 hover:opacity-100 flex items-center ${
									router.pathname == "/dashboard" ? "opacity-100" : ""
								}`}
							>
								<MdDashboard
									className={`mr-2 text-3xl ${
										router.pathname == "/dashboard"
											? "text-primary-default"
											: ""
									}`}
								/>
								Dashboard
							</a>
						</Link>
						{auth.user && (
							<button
								onClick={() => auth.signout()}
								className='font-regular opacity-70 flex items-center'
							>
								<IoLogOutOutline className='mr-2 text-3xl' />
								Logout
							</button>
						)}
					</nav>
				</div>
			</header>
		</>
	);
};

export default Navigation;
