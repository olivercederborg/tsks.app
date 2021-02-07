import Head from "next/head";
import { Box } from "@chakra-ui/react";
import Navigation from "./Navigation";

const TodoShell = ({ children, currentCollection }) => {
	return (
		<>
			<Head>
				<title>{currentCollection?.name} - Tsks, just tasks.</title>

				<link rel='icon' href='/favicon.ico' />
			</Head>

			<Navigation />
			<main className='bg-primary-background flex flex-col items-center min-h-screen text-white'>
				<Box maxWidth='700px' className='mt-14 container min-h-screen'>
					<h1 className='mb-14 text-4xl font-bold'>
						{currentCollection?.name}
					</h1>
					{children}
				</Box>
			</main>
		</>
	);
};

export default TodoShell;
