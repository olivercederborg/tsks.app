import AddCollectionModal from "@/components/AddCollectionModal";
import { MdLabel } from "react-icons/md";
import NextLink from "next/link";
import { Link } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Router } from "next/router";
import { getUserTodos } from "@/lib/db-admin";
import { useAuth } from "@/lib/auth";
import PendingTodos from "./CollectionPendingTodos";

export default function ShowCollections({ collections }) {
	const { user } = useAuth();
	const [userTodos, setUserTodos] = useState([]);

	useEffect(() => {
		const getAllUserTodos = async () => {
			const initialTodos = await getUserTodos(user?.uid);
			setUserTodos(initialTodos);
		};
		getAllUserTodos();
	}, [Router]);

	return (
		<>
			<div className='md:grid-cols-2 grid items-start grid-cols-1 gap-4 mt-10'>
				{collections &&
					collections.map((collection) => (
						<NextLink
							key={collection.id}
							href='/collection/[collectionId]'
							as={`/collection/${collection.id}`}
							passHref
						>
							<a className='group no-underline'>
								<div className='group-hover:bg-hover-card rounded-3xl bg-primary-card flex flex-row items-start p-6 transition-all duration-200 ease-in-out'>
									<div className='rounded-2xl bg-primary-default p-4'>
										<MdLabel fontSize='30px' />
									</div>
									<div className='ml-5'>
										<h2 className='text-2xl font-bold'>
											{collection.name}
										</h2>
										<PendingTodos
											currentCollection={collection}
											userTodos={userTodos}
										/>
									</div>
								</div>
							</a>
						</NextLink>
					))}
				<AddCollectionModal>Add Collection</AddCollectionModal>
			</div>
		</>
	);
}
