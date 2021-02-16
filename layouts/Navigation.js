import Link from "next/link";
import { useRouter } from "next/router";
import { MdDashboard, MdAccountCircle, MdLabel } from "react-icons/md";
import { motion } from "framer-motion";

import { useAuth } from "@/lib/auth";
import NavDropdown from "../components/NavDropdown";
import useSWR from "swr";
import fetcher from "@/utils/fetcher";
import { HiMenuAlt2 } from "react-icons/hi";
import { useState } from "react";

const Navigation = ({ children, href }) => {
	const auth = useAuth();
	const router = useRouter();
	const [isActive, setIsActive] = useState(true);

	const { data } = useSWR(
		auth.user ? ["/api/todo-collections", auth.user.uid] : null,
		fetcher
	);
	const collections = data?.collections;

	return (
		<>
			<header className='bg-navigation font-regular md:flex z-10 items-center justify-center hidden text-white shadow-md'>
				<div className='flex flex-row items-center justify-between w-full px-5'>
					<div>
						<nav className='flex items-center'>
							{router.pathname != "/app" && (
								<button
									onClick={() => setIsActive(!isActive)}
									className='default-focus opacity-70 lg:block hover:opacity-100 hidden py-4 mr-4 text-2xl font-medium border-b-2 border-transparent'
								>
									<HiMenuAlt2 />
								</button>
							)}
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
			{router.pathname != "/app" && (
				<nav
					className={`bg-navigation w-72 border-t-1 border-primary-background lg:block fixed hidden h-full z-10 transition-transform duration-200 ease-in-out translate-x-0 transform ${
						!isActive && "-translate-x-72"
					}`}
				>
					<h3 className='mt-4 mb-3 ml-4 text-lg font-semibold'>
						Collections
					</h3>
					{collections &&
						collections.map((collection) => (
							<Link
								key={collection.id}
								href='/collection/[collectionId]'
								as={`/collection/${collection.id}`}
								passHref
							>
								<a
									className={`group default-focus rounded-3xl no-underline`}
								>
									<div
										className={`group-hover:bg-hover-card flex flex-row items-center px-4 py-4 break-all transition-all duration-200 ease-in-out ${
											router.query.collectionId === collection.id
												? "bg-hover-card"
												: ""
										}`}
									>
										<div
											style={{
												backgroundColor: collection.collectionColor
											}}
											className={`rounded-xl p-2.5 ${
												!collection.collectionColor &&
												"bg-primary-default"
											}`}
										>
											<MdLabel fontSize='20px' />
										</div>
										<div className='ml-3'>
											<h2 className='text-base font-semibold'>
												{collection.name}
											</h2>
										</div>
									</div>
								</a>
							</Link>
						))}
				</nav>
			)}

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

			<main
				className={`flex justify-center w-full mr-0 transition-all duration-200 ease-in-out pl-0 transform mb-32 ${
					router.pathname != "/app" && isActive && "lg:pl-72"
				}`}
			>
				{children}
			</main>
		</>
	);
};

export default Navigation;
