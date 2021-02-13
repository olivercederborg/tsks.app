import Link from "next/link";
import { useRouter } from "next/router";
import { BiHomeAlt } from "react-icons/bi";
import { MdDashboard, MdAccountCircle } from "react-icons/md";

import { useAuth } from "@/lib/auth";
import NavDropdown from "../components/NavDropdown";

const Navigation = () => {
	const auth = useAuth();
	const router = useRouter();

	return (
		<>
			<header className='bg-navigation font-regular md:flex items-center justify-center hidden text-white shadow-md'>
				<div className='flex flex-row items-center justify-between w-full px-5'>
					<div>
						<nav className='flex items-center'>
							{/* <Link href='/' passHref>
								<a className='default-focus h-7 text-2xl font-bold'>
									<img
										className='h-7'
										src='/img/tsks-logo-w-type.svg'
										alt='Tsks logo'
									/>
								</a>
							</Link> */}
							<Link href='/app' passHref>
								<a
									className={`default-focus py-4 font-medium border-transparent opacity-70 border-b-2 hover:opacity-100 flex items-center ${
										router.pathname == "/app" &&
										"border-white opacity-100"
									}`}
								>
									<MdDashboard
										className={`mr-2 text-2xl ${
											router.pathname == "/app" ? "text-white" : ""
										}`}
									/>
									Dashboard
								</a>
							</Link>
						</nav>
					</div>
					{auth.user && <NavDropdown auth={auth} />}
				</div>
			</header>

			<header
				id='mobile_menu'
				className='bg-secondary-background md:hidden fixed bottom-0 z-20 flex items-start justify-center w-full text-sm font-medium text-white'
			>
				<div className='flex flex-row items-center justify-between w-full'>
					<nav className='flex items-center justify-around w-full'>
						<Link href='/app' passHref>
							<a
								className={`default-focus py-4 opacity-70 hover:opacity-100 flex items-center ${
									router.pathname == "/app" ? "opacity-100" : ""
								}`}
							>
								<MdDashboard
									className={`mr-2 text-2xl ${
										router.pathname == "/app" ? "text-white" : ""
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
										router.pathname == "/account" ? "text-white" : ""
									}`}
								/>
								Account
							</a>
						</Link>
					</nav>
				</div>
			</header>
		</>
	);
};

export default Navigation;
