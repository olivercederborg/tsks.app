import AddCollectionModal from "@/components/AddCollectionModal";
import useSWR from "swr";
import { MdLabel } from "react-icons/md";
import { useEffect } from "react";

import { useAuth } from "@/lib/auth";
import fetcher from "@/utils/fetcher";
import NextLink from "next/link";
import { Link } from "@chakra-ui/react";

export default function ShowCollections({ collections }) {
	return (
		<>
			<div className='grid items-start grid-cols-2 gap-6 mt-10'>
				{collections &&
					collections.map((collection) => (
						<NextLink
							key={collection.id}
							href='/collection/[collectionId]'
							as={`/collection/${collection.id}`}
							passHref
						>
							<Link>
								<div className='rounded-3xl flex flex-row items-start p-6 pb-10 bg-gray-800'>
									<div className='rounded-2xl p-4 bg-purple-400'>
										<MdLabel fontSize='30px' />
									</div>
									<div className='ml-5'>
										<h2 className='text-2xl font-bold'>
											{collection.name}
										</h2>
										{/* <p className='opacity-60 mt-2 font-medium'>
											10 tasks - 4 completed
										</p> */}
									</div>
								</div>
							</Link>
						</NextLink>
					))}
				<AddCollectionModal>Add Collection</AddCollectionModal>
			</div>
		</>
	);
}
