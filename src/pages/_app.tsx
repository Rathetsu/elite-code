import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
	return (
		<>
			<Head>
				<title>LeetClone</title>
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<meta name='description' content='Inspired by LeetCode. Practice Competitve Programming Problems. Contains Solutions.' />
				<link rel='icon' href='/ec_logo.ico' />
			</Head>
			<Component {...pageProps} />
		</>

	);
}