import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { RecoilRoot } from "recoil";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App({ Component, pageProps }: AppProps) {
	return (
		<RecoilRoot>
			<Head>
				<title>EliteCode</title>
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<meta name='description' content='Inspired by LeetCode. Practice Competitve Programming Problems. Contains Solutions.' />
				<link rel='icon' href='/e_icon.ico' />
			</Head>
			<ToastContainer />
			<Component {...pageProps} />
		</RecoilRoot>

	);
}