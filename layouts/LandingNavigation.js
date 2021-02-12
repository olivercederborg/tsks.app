import Link from "next/link";
import { useRouter } from "next/router";
import { BiHomeAlt } from "react-icons/bi";
import { MdDashboard, MdAccountCircle } from "react-icons/md";
import { AiOutlineGoogle } from "react-icons/ai";

import { useAuth } from "@/lib/auth";
import NavDropdown from "../components/NavDropdown";

const LandingNavigation = () => {
	const auth = useAuth();
	const router = useRouter();

	return (
		<>
			<header className='font-regular bg-hero-background md:flex items-center justify-center hidden w-full py-10 text-white'>
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
									<Link href='/' passHref>
										<a
											onClick={() => auth.signinWithGoogle()}
											className={`default-focus p-4 font-medium border-transparent hover:border-gradient2-button transition-all duration-200 ease-in-out bg-opacity-50 border-b-2 flex items-center`}
										>
											Sign in
										</a>
									</Link>
									<Link href='/' passHref>
										<a
											onClick={() => auth.signinWithGoogle()}
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
				className='bg-secondary-background md:hidden fixed bottom-0 z-20 flex items-start justify-center w-full text-sm font-medium text-white'
			>
				<div className='flex flex-row items-center justify-between w-full'>
					<nav className='flex items-center justify-around w-full'>
						<Link href='/' passHref>
							<a
								className={`default-focus py-4 opacity-70 hover:opacity-100 flex items-center ${
									router.pathname == "/" ? "opacity-100" : ""
								}`}
							>
								<BiHomeAlt
									className={`mr-2 text-2xl ${
										router.pathname == "/"
											? "text-primary-default"
											: ""
									}`}
								/>
								Home
							</a>
						</Link>
						{!auth?.user && (
							<Link href='/' passHref>
								<a
									onClick={() => auth.signinWithGoogle()}
									className={`default-focus py-4 opacity-70 hover:opacity-100 flex items-center ${
										router.pathname == "/" ? "opacity-100" : ""
									}`}
								>
									<AiOutlineGoogle
										className={`mr-2 text-2xl ${
											router.pathname == "/"
												? "text-primary-default"
												: ""
										}`}
									/>
									Sign in with Google
								</a>
							</Link>
						)}
						{auth?.user && (
							<>
								<Link href='/dashboard' passHref>
									<a
										className={`default-focus py-4 opacity-70 hover:opacity-100 flex items-center ${
											router.pathname == "/dashboard"
												? "opacity-100"
												: ""
										}`}
									>
										<MdDashboard
											className={`mr-2 text-2xl ${
												router.pathname == "/dashboard"
													? "text-primary-default"
													: ""
											}`}
										/>
										Dashboard
									</a>
								</Link>
								<Link href='/' passHref>
									<a
										className={`default-focus py-4 opacity-70 hover:opacity-100 flex items-center ${
											router.pathname == "/" ? "opacity-100" : ""
										}`}
									>
										<MdAccountCircle
											className={`mr-2 text-2xl ${
												router.pathname == "/account"
													? "text-primary-default"
													: ""
											}`}
										/>
										Account
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
