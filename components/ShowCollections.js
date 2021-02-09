import AddCollectionModal from "@/components/AddCollectionModal";
import { MdLabel } from "react-icons/md";
import NextLink from "next/link";
import { Link } from "@chakra-ui/react";
import { HiOutlinePlus } from "react-icons/hi";
import { useEffect, useState } from "react";
import { Router } from "next/router";
import { getUserTodos } from "@/lib/db-admin";
import { useAuth } from "@/lib/auth";
import CollectionPendingTodos from "./CollectionPendingTodos";

export default function ShowCollections({ collections }) {
	const { user } = useAuth();
	const [userTodos, setUserTodos] = useState([]);
	// const [collectionColor, setCollectionColor] = useState("");

	useEffect(() => {
		const getAllUserTodos = async () => {
			const initialTodos = await getUserTodos(user?.uid);
			setUserTodos(initialTodos);
		};
		getAllUserTodos();
	}, [Router]);

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
							<a className='group no-underline'>
								<div className='group-hover:bg-hover-card rounded-3xl bg-primary-card flex flex-row items-start p-6 break-all transition-all duration-200 ease-in-out'>
									<div
										className={`rounded-2xl p-4 ${
											collection.collectionColor == "teal" &&
											"bg-primary-teal"
										} ${
											collection.collectionColor == "yellow" &&
											"bg-primary-yellow"
										} ${
											collection.collectionColor == "rose" &&
											"bg-primary-rose"
										} ${
											collection.collectionColor == "purple" &&
											"bg-primary-default"
										} ${
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
											userTodos={userTodos}
										/>
									</div>
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
