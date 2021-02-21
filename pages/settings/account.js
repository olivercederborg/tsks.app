import Link from "next/link";
import { Avatar } from "@chakra-ui/react";
import { IoChevronBackOutline } from "react-icons/io5";

import Navigation from "@/layouts/Navigation";
import CollectionDropdown from "@/components/CollectionDropdown";
import UpdateDisplayName from "@/components/UpdateDisplayName";
import { useAuth } from "@/lib/auth";
import useSWR from "swr";
import fetcher from "@/utils/fetcher";
import Head from "next/head";
import UpdateUserEmail from "@/components/UpdateUserEmail";
import UpdateUserPassword from "@/components/UpdateUserPassword";

const Account = () => {
	const { user, signout, updateUserName, verifyEmail } = useAuth();

	const { data } = useSWR(user ? ["/api/userdata", user.uid] : null, fetcher);
	const userData = data?.userData;

	return (
		<>
			<Head>
				<title>Account Settings - Tsks.</title>
			</Head>
			<Navigation>
				<section
					className='md:mt-10 md:mx-auto relative w-full pb-32'
					style={{ maxWidth: "600px" }}
				>
					<div className='bg-primary-background bg-opacity-90 blur-bg md:top-14 sticky top-0 z-20 flex justify-between px-6 py-4 mb-12'>
						<div className='flex items-center'>
							<Link href='/app' passHref>
								<a className='default-focus bg-primary-card hover:bg-hover-card rounded-2xl p-2.5 text-2xl transition-colors duration-200 ease-in-out'>
									<IoChevronBackOutline />
								</a>
							</Link>
							<h1 className='ml-4 text-2xl font-bold'>
								Account Settings
							</h1>
						</div>
						<CollectionDropdown />
					</div>

					{user ? (
						<section className=' px-6'>
							<div className='flex items-center mb-10'>
								<figure>
									<Avatar w='80px' h='80px' src={user?.photoUrl} />
								</figure>
								<div className='ml-5'>
									<p className='text-2xl font-semibold'>
										{userData?.name ?? "No name set"}
									</p>
									<span className='user-role-gradient bg-primary-background text-xxs inline-block px-2 py-1 mt-2 font-semibold rounded-md'>
										{user?.userRole?.toUpperCase()}
									</span>
								</div>
							</div>

							{user?.provider == "password" && (
								<article className='bg-primary-card rounded-xl px-5 py-6'>
									<section>
										<p className='text-sm opacity-50'>Display Name</p>
										<div className='flex items-center justify-between'>
											<p className='font-medium'>
												{userData?.name ?? "No name set"}
											</p>
											<UpdateDisplayName
												user={userData}
												updateUserName={updateUserName}
											/>
										</div>
									</section>

									<section className='mt-6'>
										<p className='text-sm opacity-50'>Email</p>
										<div className='flex items-center justify-between'>
											<p className='font-medium'>
												{userData?.email}{" "}
												{user?.emailVerified ? (
													<span className='ml-2 text-sm font-normal text-green-400'>
														Verified
													</span>
												) : (
													<a
														onClick={verifyEmail}
														className='opacity-70 ml-2 text-sm font-normal cursor-pointer'
													>
														Verify
													</a>
												)}
											</p>
											{user?.emailVerified && (
												<UpdateUserEmail user={userData} />
											)}
										</div>
									</section>

									<section className='mt-6'>
										<p className='text-sm opacity-50'>Password</p>
										<div className='flex items-center justify-between'>
											<p className='font-medium'>*********</p>
											<UpdateUserPassword user={userData} />
										</div>
									</section>
								</article>
							)}

							<article className='bg-primary-card rounded-xl mt-5 overflow-hidden'>
								<section className='px-5 py-6'>
									<p className=' text-sm opacity-50'>Subscription</p>
									<div className='flex items-center justify-between'>
										<p className='font-medium'>Tsks Free</p>
										<button className='bg-gradient-to-tr from-gradient1-button via-gradient2-button to-gradient3-button hover:opacity-80 px-4 py-2 text-sm font-medium transition-all duration-200 ease-in-out rounded-md'>
											Upgrade to Pro
										</button>
									</div>
								</section>
								<a
									href='#'
									className='bg-hover-card hover:bg-secondary-card block w-full py-4 font-medium text-center transition-all duration-200 ease-in-out'
								>
									See the Pro Benefits
								</a>
							</article>

							<div className='flex justify-center'>
								<button
									onClick={() => signout()}
									className='bg-hover-card hover:bg-secondary-card rounded-xl px-8 py-4 mt-5 font-medium transition-all duration-200 ease-in-out'
								>
									Sign out
								</button>
							</div>
						</section>
					) : (
						""
					)}
				</section>
			</Navigation>
		</>
	);
};

export default Account;
