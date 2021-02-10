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
			<header className='bg-secondary-background font-regular md:flex items-center justify-center hidden text-white shadow-2xl'>
				<div className='flex flex-row items-center justify-between w-full px-5'>
					<div>
						<nav className='flex items-center'>
							<Link href='/' passHref>
								<a className='default-focus text-2xl font-bold'>
									TSKS<span className='text-primary-default'>.</span>
								</a>
							</Link>
							<Link href='/dashboard' passHref>
								<a
									className={`default-focus ml-6 py-4 font-medium border-transparent opacity-70 border-b-2 hover:opacity-100 flex items-center ${
										router.pathname == "/dashboard" &&
										"border-primary-default opacity-100"
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
						<Link href='/dashboard' passHref>
							<a
								className={`default-focus py-4 opacity-70 hover:opacity-100 flex items-center ${
									router.pathname == "/dashboard" ? "opacity-100" : ""
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
						<Link href='' passHref>
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
					</nav>
				</div>
			</header>
		</>
	);
};

export default Navigation;
