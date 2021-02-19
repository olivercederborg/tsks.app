import NextLink from "next/link";
import { MdLabel } from "react-icons/md";
import { HiOutlinePlus } from "react-icons/hi";

import AddCollectionModal from "@/components/AddCollectionModal";
import CollectionPendingTodos from "./CollectionPendingTodos";
import { useAuth } from "@/lib/auth";
import CollectionProgress from "./CollectionProgressBar";

export default function ShowCollections({ collections }) {
	return (
		<>
			<h1 className='text-3xl font-bold'>Collections</h1>

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
												backgroundColor: collection.collectionColor
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
				<AddCollectionModal>
					<HiOutlinePlus className='text-lg' />
				</AddCollectionModal>
			</div>
		</>
	);
}
