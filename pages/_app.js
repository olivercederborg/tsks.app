import "tailwindcss/tailwind.css";
import { AuthProvider } from "../lib/auth";
import { ChakraProvider } from "@chakra-ui/react";
import "@/styles/style.scss";
import { css, Global } from "@emotion/react";
import Head from "next/head";

const GlobalStyle = ({ children }) => {
	return (
		<>
			<Global
				styles={css`
					html {
						scroll-behavior: smooth;
					}
					body {
						font-family: "Inter";
						background: "#191B21 !important";
					}
					#__next {
						display: flex;
						flex-direction: column;
						min-height: 100vh;
					}
				`}
			/>
			{children}
		</>
	);
};

function MyApp({ Component, pageProps }) {
	return (
		<AuthProvider>
			<ChakraProvider>
				<GlobalStyle />
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
