import Link from "next/link";
import { useRouter } from "next/router";
import { BiHomeAlt } from "react-icons/bi";
import { MdDashboard, MdAccountCircle } from "react-icons/md";
import {
	RiUserAddLine,
	RiUserSharedLine,
	RiUserReceivedLine
} from "react-icons/ri";

import { useAuth } from "@/lib/auth";
import NavDropdown from "../components/NavDropdown";

const LandingNavigation = () => {
	const auth = useAuth();
	const router = useRouter();

	return (
		<>
			<header
				className={`font-regular md:flex bg-opacity-80 blur-bg items-center justify-center hidden w-full py-4 text-white z-20 ${
					router.pathname == "/"
						? "bg-hero-background"
						: "bg-primary-background"
				}`}
			>
				<div className='container flex flex-row items-center justify-between w-full px-5'>
					<nav className='flex items-center justify-between w-full'>
						<div className='flex items-center'>
							<Link href='/' passHref>
								<a className='default-focus text-2xl font-bold'>
									<img
										src='/img/tsks-logo-w-type.svg'
										alt='Tsks logo'
									/>
								</a>
							</Link>
							<Link href='/' passHref>
								<a
									className={`default-focus ml-10 p-4 font-medium border-transparent hover:border-gradient2-button transition-all duration-200 ease-in-out bg-opacity-50 border-b-2 flex items-center`}
								>
									Features
								</a>
							</Link>
						</div>
						{/* Right side nav */}
						<div className='flex items-center'>
							{!auth?.user && (
								<>
									<Link href='/users/signin' passHref>
										<a
											className={`default-focus p-4 font-medium border-transparent hover:border-gradient2-button transition-all duration-200 ease-in-out bg-opacity-50 border-b-2 flex items-center`}
										>
											Sign in
										</a>
									</Link>
									<Link href='/users/signup' passHref>
										<a
											className={`default-focus ml-5 py-3 px-6 border-3 border-gray-button rounded-xl font-medium border-transparent hover:border-gradient2-button transition-all duration-200 ease-in-out bg-opacity-50 flex items-center`}
										>
											Sign up
										</a>
									</Link>
								</>
							)}
						</div>
					</nav>

					{auth.user && <NavDropdown auth={auth} />}
				</div>
			</header>

			<header
				id='mobile_menu'
				className='bg-primary-background bg-opacity-80 blur-bg md:hidden fixed bottom-0 z-20 flex items-start justify-center w-full text-sm font-medium text-white'
			>
				<div className='flex flex-row items-center justify-between w-full'>
					<nav className='flex items-center justify-around w-full'>
						{!auth?.user && (
							<>
								<Link href='/users/signin' passHref>
									<a
										className={`default-focus py-4 opacity-70 hover:opacity-100 flex items-center ${
											router.pathname == "/" ? "opacity-100" : ""
										}`}
									>
										<RiUserSharedLine className={`mr-2 text-2xl`} />
										Sign in
									</a>
								</Link>
								<Link href='/users/signup' passHref>
									<a
										className={`default-focus py-4 opacity-70 hover:opacity-100 flex items-center ${
											router.pathname == "/" ? "opacity-100" : ""
										}`}
									>
										<RiUserAddLine className={`mr-2 text-2xl`} />
										Sign up
									</a>
								</Link>
							</>
						)}
						{auth?.user && (
							<>
								<Link href='/app' passHref>
									<a
										className={`default-focus py-4 opacity-70 hover:opacity-100 flex items-center ${
											router.pathname == "/app" ? "opacity-100" : ""
										}`}
									>
										<MdDashboard className={`mr-2 text-2xl`} />
										Dashboard
									</a>
								</Link>
								<Link href='/' passHref>
									<a
										onClick={() => auth.signout()}
										className={`default-focus py-4 opacity-70 hover:opacity-100 flex items-center ${
											router.pathname == "/" ? "opacity-100" : ""
										}`}
									>
										<RiUserReceivedLine
											className={`mr-2 text-2xl ${
												router.pathname == "/account"
													? "text-primary-default"
													: ""
											}`}
										/>
										Sign out
									</a>
								</Link>
							</>
						)}
					</nav>
				</div>
			</header>
		</>
	);
};

export default LandingNavigation;
