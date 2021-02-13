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
					bg: "#15151C",
					width: "100%",
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
					<meta
						content='width=device-width, initial-scale=1'
						name='viewport'
					/>

					<meta name='description' content={siteDescription} />
					<meta name='keywords' content={siteKeywords} />
					<meta property='og:title' content='Tsks, just tasks.' />
					<meta name='apple-mobile-web-app-capable' content='yes' />
					<meta
						name='apple-mobile-web-app-status-bar-style'
						content='black-translucent'
					/>
					<meta name='apple-mobile-web-app-title' content='Tsks' />

					<meta
						property='og:image'
						content='https://dev.tsks.app/img/preview.png'
					/>
					<meta property='og:description' content={siteDescription} />
					<meta property='og:type' content='website' />
					<meta property='og:site_name' content='Tsks, just tasks.' />
					<meta property='og:url' content='https://tsks.app/' />
					<meta name='twitter:card' content='summary' />
					<meta name='twitter:site' content='@tsksapp' />
					<meta name='twitter:creator' content='@tsksapp' />
					<meta name='twitter:description' content={siteDescription} />
					<meta
						name='twitter:image'
						content='https://dev.tsks.app/img/preview.png'
					/>

					<link rel='manifest' href='/manifest.json' />
					<link
						rel='apple-touch-icon'
						href='/icons/apple-touch-icon.png'
					/>
					<link rel='icon' sizes='32x32' href='/icons/favicon_32x32.png' />
					<link rel='icon' sizes='16x16' href='/icons/favicon_16x16.png' />
					<meta name='theme-color' content='#15151C' />

					<link rel='preconnect' href='https://fonts.gstatic.com' />
					<link
						href='https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap'
						rel='stylesheet'
					/>

					{/* Splash screens */}
					<link
						href='splashscreens/iphone5_splash.png'
						media='(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)'
						rel='apple-touch-startup-image'
					/>
					<link
						href='splashscreens/iphone6_splash.png'
						media='(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2)'
						rel='apple-touch-startup-image'
					/>
					<link
						href='splashscreens/iphoneplus_splash.png'
						media='(device-width: 621px) and (device-height: 1104px) and (-webkit-device-pixel-ratio: 3)'
						rel='apple-touch-startup-image'
					/>
					<link
						href='splashscreens/iphonex_splash.png'
						media='(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3)'
						rel='apple-touch-startup-image'
					/>
					<link
						href='splashscreens/iphonexr_splash.png'
						media='(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2)'
						rel='apple-touch-startup-image'
					/>
					<link
						href='splashscreens/iphonexsmax_splash.png'
						media='(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3)'
						rel='apple-touch-startup-image'
					/>
					<link
						href='splashscreens/ipad_splash.png'
						media='(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2)'
						rel='apple-touch-startup-image'
					/>
					<link
						href='splashscreens/ipadpro1_splash.png'
						media='(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2)'
						rel='apple-touch-startup-image'
					/>
					<link
						href='splashscreens/ipadpro3_splash.png'
						media='(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2)'
						rel='apple-touch-startup-image'
					/>
					<link
						href='splashscreens/ipadpro2_splash.png'
						media='(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2)'
						rel='apple-touch-startup-image'
					/>
				</Head>

				<Component {...pageProps} />
			</ChakraProvider>
		</AuthProvider>
	);
}

export default MyApp;

export const siteKeywords =
	"oliver, cederborg, tsks, app, tasks, task, manager, management, todo, list, todolist";
export const siteDescription =
	"Tsks is a task manager made simply to manage and keep track of everyday tasks with a modern and simple interface.";
