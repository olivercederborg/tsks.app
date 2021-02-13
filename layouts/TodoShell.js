import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { IoChevronBackOutline } from "react-icons/io5";

import { useAuth } from "@/lib/auth";
import Navigation from "./Navigation";
import DeleteCollectionButton from "../components/DeleteCollectionButton";
import { Skeleton } from "@chakra-ui/react";
import CompletedTodoDropdown from "../components/CompletedTodoDropdown";
import CollectionDropdown from "../components/CollectionDropdown";

const TodoShell = ({ children, currentCollection }) => {
	const { user } = useAuth();
	const router = useRouter();

	if (user?.uid) {
		if (currentCollection && user.uid !== currentCollection.authorId) {
			router.push("/app");
		}
	}

	return (
		<>
			<Head>
				<title>{currentCollection?.name} - Tsks.</title>
			</Head>

			<Navigation />
			<main className='flex flex-col items-center pb-40 text-white'>
				<div className='mt-14 w-full max-w-screen-md px-5'>
					<div className='flex justify-between mb-12'>
						<div className='flex items-center'>
							<Link href='/app' passHref>
								<a className='default-focus bg-primary-card hover:bg-hover-card rounded-2xl p-3 text-2xl transition-colors duration-200 ease-in-out'>
									<IoChevronBackOutline />
								</a>
							</Link>
							{currentCollection ? (
								<h1 className='ml-4 text-3xl font-bold'>
									{currentCollection?.name}
								</h1>
							) : (
								<Skeleton
									borderRadius='16px'
									startColor='#21232D'
									endColor='#2A2D39'
									h='36px'
									w='180px'
									ml='4'
								/>
							)}
						</div>
						<CollectionDropdown currentCollection={currentCollection} />
					</div>
					{children}
				</div>
			</main>
		</>
	);
};

export default TodoShell;
