import "tailwindcss/tailwind.css";
import { AuthProvider } from "../lib/auth";
import { ChakraProvider } from "@chakra-ui/react";
import "@/styles/style.scss";

function MyApp({ Component, pageProps }) {
	return (
		<AuthProvider>
			<ChakraProvider>
				<Component {...pageProps} />
			</ChakraProvider>
		</AuthProvider>
	);
}

export default MyApp;
