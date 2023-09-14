import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { RecoilRoot } from "recoil";

export default function App({ Component, pageProps }: AppProps) {
	return (
		<RecoilRoot>
			<Head>
				<title>EliteCode</title>
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<meta name='description' content='Inspired by LeetCode. Practice Competitve Programming Problems. Contains Solutions.' />
				<link rel='icon' href='/ec_logo.ico' />
			</Head>
			<Component {...pageProps} />
		</RecoilRoot>

	);
}