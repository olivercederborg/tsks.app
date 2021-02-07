import { Box } from "@chakra-ui/react";

const TodoShell = ({ children }) => {
	return (
		<main className='flex flex-col items-center min-h-screen text-white bg-gray-900'>
			<Box maxWidth='700px' className='mt-14 container min-h-screen'>
				<h1 className='text-4xl font-bold'>Collections</h1>
				{children}
			</Box>
		</main>
	);
};

export default TodoShell;
