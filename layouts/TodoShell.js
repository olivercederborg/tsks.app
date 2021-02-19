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
				<div className='md:mt-14 md:max-w-screen-md relative w-full mt-8'>
					<div className='blur-bg bg-primary-background bg-opacity-90 sticky top-0 z-20 flex items-center justify-start w-full px-5 py-5 mb-12'>
						<Link href='/app' passHref>
							<a className='default-focus bg-primary-card hover:bg-hover-card rounded-2xl p-2.5 text-2xl transition-colors duration-200 ease-in-out'>
								<IoChevronBackOutline />
							</a>
						</Link>
						{currentCollection ? (
							<h1 className='mx-4 text-2xl font-bold truncate'>
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

						<CollectionDropdown currentCollection={currentCollection} />
					</div>
					<div className='px-5'>{children}</div>
				</div>
			</Navigation>
		</>
	);
};

export default TodoShell;
