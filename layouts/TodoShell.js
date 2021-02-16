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

			<Navigation>
				<div className='md:mt-14 relative w-full max-w-screen-md mt-8'>
					<div className='blur-bg bg-primary-background bg-opacity-90 sticky top-0 z-20 flex justify-between px-5 py-5 mb-12'>
						<div className='flex items-center'>
							<Link href='/app' passHref>
								<a className='default-focus bg-primary-card hover:bg-hover-card rounded-2xl p-3 text-2xl transition-colors duration-200 ease-in-out'>
									<IoChevronBackOutline />
								</a>
							</Link>
							{currentCollection ? (
								<h1 className='ml-4 text-2xl font-bold'>
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
					<div className='px-5'>{children}</div>
				</div>
			</Navigation>
		</>
	);
};

export default TodoShell;
