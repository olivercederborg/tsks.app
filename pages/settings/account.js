import CollectionDropdown from "@/components/CollectionDropdown";
import Navigation from "@/layouts/Navigation";
import { useAuth } from "@/lib/auth";
import { Avatar, Skeleton } from "@chakra-ui/react";
import Link from "next/link";
import { IoChevronBackOutline } from "react-icons/io5";

const Account = () => {
	const { user } = useAuth();
	return (
		<>
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
							<h1 className='ml-4 text-2xl font-bold'>My Account</h1>
						</div>
						<CollectionDropdown />
					</div>

					<section className='px-6'>
						<div className='flex items-center'>
							<figure>
								<Avatar w='80px' h='80px' src={user?.photoUrl} />
							</figure>
							<div className='ml-5'>
								<p className='text-2xl font-semibold'>{user?.name}</p>
								<span className='user-role-gradient bg-primary-background text-xxs inline-block px-2 py-1 mt-2 font-semibold rounded-md'>
									{user.userRole?.toUpperCase()}
								</span>
							</div>
						</div>

						<article className='bg-primary-card rounded-xl px-5 py-6 mt-10'>
							<section>
								<p className='text-sm opacity-50'>Display Name</p>
								<div className='flex items-center justify-between'>
									<p className='font-medium'>{user?.name}</p>
									<button className='bg-ligther-gray-button px-4 py-2 text-sm font-medium rounded-md'>
										Edit
									</button>
								</div>
							</section>

							<section className='mt-6'>
								<p className='text-sm opacity-50'>Email</p>
								<div className='flex items-center justify-between'>
									<p className='font-medium'>{user?.email}</p>
									<button className='bg-ligther-gray-button px-4 py-2 text-sm font-medium rounded-md'>
										Edit
									</button>
								</div>
							</section>

							<section className='mt-6'>
								<p className='text-sm opacity-50'>Password</p>
								<div className='flex items-center justify-between'>
									<p className='font-medium'>*********</p>
									<button className='bg-ligther-gray-button px-4 py-2 text-sm font-medium rounded-md'>
										Change
									</button>
								</div>
							</section>
						</article>

						<article className='bg-primary-card rounded-xl mt-5 overflow-hidden'>
							<section className='px-5 py-6'>
								<p className=' text-sm opacity-50'>Subscription</p>
								<div className='flex items-center justify-between'>
									<p className='font-medium'>Tsks Free</p>
									<button className='bg-gradient-to-tr from-gradient1-button via-gradient2-button to-gradient3-button px-4 py-2 text-sm font-medium rounded-md'>
										Upgrade to Pro
									</button>
								</div>
							</section>
							<a
								href='#'
								className='bg-hover-card block w-full py-4 font-medium text-center'
							>
								See the Pro Benefits
							</a>
						</article>

						<div className='flex justify-center'>
							<button className='bg-hover-card rounded-xl px-8 py-4 mt-5 font-medium'>
								Sign out
							</button>
						</div>
					</section>
				</section>
			</Navigation>
		</>
	);
};

export default Account;
