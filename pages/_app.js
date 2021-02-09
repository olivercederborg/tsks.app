import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import Head from "next/head";

import { AuthProvider } from "../lib/auth";
import "@/styles/style.scss";
import "tailwindcss/tailwind.css";

function MyApp({ Component, pageProps }) {
	const theme = extendTheme({
		styles: {
			global: {
				body: {
					bg: "#191B21",
					color: "white",
					overflowX: "hidden",
					fontFamily: "Inter, sans-serif"
				}
			}
		}
	});
	return (
		<AuthProvider>
			<ChakraProvider theme={theme}>
				<Head>
					<link rel='preconnect' href='https://fonts.gstatic.com' />
					<link
						href='https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap'
						rel='stylesheet'
					/>
					<meta
						content='width=device-width, initial-scale=1'
						name='viewport'
					/>
				</Head>

				<Component {...pageProps} />
			</ChakraProvider>
		</AuthProvider>
	);
}

export default MyApp;
