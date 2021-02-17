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

			<div className='md:grid-cols-2 grid items-start grid-cols-1 gap-4 mt-10'>
				{collections &&
					collections.map((collection) => (
						<NextLink
							key={collection.id}
							href='/collection/[collectionId]'
							as={`/collection/${collection.id}`}
							passHref
						>
							<a className='group default-focus rounded-3xl no-underline'>
								<div className='group-hover:bg-hover-card rounded-3xl bg-primary-card flex flex-col items-start p-6 pb-4 break-all transition-all duration-200 ease-in-out'>
									<div className='flex items-center'>
										<div
											style={{
												backgroundColor: collection.collectionColor
											}}
											className={`rounded-2xl p-4 ${
												!collection.collectionColor &&
												"bg-primary-default"
											}`}
										>
											<MdLabel fontSize='30px' />
										</div>
										<div className='ml-5'>
											<h2 className='text-xl font-semibold'>
												{collection.name}
											</h2>
											<CollectionPendingTodos
												currentCollection={collection}
											/>
										</div>
									</div>
									<CollectionProgress currentCollection={collection} />
								</div>
							</a>
						</NextLink>
					))}
				<AddCollectionModal>
					<HiOutlinePlus className='mr-1 text-lg' />
					Add Collection
				</AddCollectionModal>
			</div>
		</>
	);
}
