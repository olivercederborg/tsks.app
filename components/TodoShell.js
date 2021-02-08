import Head from "next/head";
import { Box } from "@chakra-ui/react";
import { mutate } from "swr";

import Navigation from "./Navigation";
import { useAuth } from "@/lib/auth";
import DeleteCollectionButton from "./DeleteCollectionButton";

const TodoShell = ({ children, currentCollection }) => {
	return (
		<>
			<Head>
				<title>{currentCollection?.name} - Tsks, just tasks.</title>

				<link rel='icon' href='/favicon.ico' />
			</Head>

			<Navigation />
			<main className='bg-primary-background flex flex-col items-center min-h-screen text-white'>
				<div className='mt-14 w-full max-w-screen-md px-5'>
					<div className='mb-14 flex justify-between'>
						<h1 className='text-4xl font-bold'>
							{currentCollection?.name}
						</h1>
						<DeleteCollectionButton
							currentCollection={currentCollection}
						/>
					</div>
					{children}
				</div>
			</main>
		</>
	);
};

export default TodoShell;
