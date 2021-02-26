import NextLink from "next/link";
import { MdLabel } from "react-icons/md";
import { HiOutlinePlus } from "react-icons/hi";

import AddCollectionModal from "@/components/AddCollectionModal";
import CollectionProgress from "./CollectionProgressBar";
import { useAuth } from "@/lib/auth";
import useSWR from "swr";
import fetcher from "@/utils/fetcher";

const FavouriteCollections = () => {
	const { user } = useAuth();
	const { data } = useSWR(["/api/favourite-collections", user.uid], fetcher);
	const collections = data?.collections;

	return (
		<>
			{collections?.length ? (
				<div className='md:grid-cols-3 grid items-start grid-cols-2 gap-4 mt-10'>
					{collections &&
						collections.map((collection) => (
							<NextLink
								key={collection.id}
								href='/collection/[collectionId]'
								as={`/collection/${collection.id}`}
								passHref
							>
								<a className='group default-focus rounded-3xl no-underline'>
									<div className='group-hover:bg-hover-card rounded-3xl bg-primary-card md:p-6 relative flex flex-col items-start h-full p-5 break-all transition-all duration-200 ease-in-out'>
										<div className='flex flex-col items-start'>
											<div
												style={{
													backgroundColor:
														collection.collectionColor
												}}
												className={`rounded-2xl p-3 ${
													!collection.collectionColor &&
													"bg-primary-default"
												}`}
											>
												<MdLabel fontSize='22px' />
											</div>
										</div>
										<div className=' md:mt-10 w-full mt-8'>
											<h2 className='md:text-xl text-lg font-semibold truncate'>
												{collection.name}
											</h2>
											<CollectionProgress
												currentCollection={collection}
											/>
										</div>
									</div>
								</a>
							</NextLink>
						))}
					{/* <AddCollectionModal>
						<HiOutlinePlus className='text-lg' />
					</AddCollectionModal> */}
				</div>
			) : (
				""
			)}
			{!collections?.length ? (
				<div className='flex flex-col justify-center'>
					<h1 className='mt-20 text-2xl font-medium text-center'>
						You have no favourite collections.
					</h1>
					<button>Favourite your first collection!</button>
				</div>
			) : (
				""
			)}
		</>
	);
};
export default FavouriteCollections;
