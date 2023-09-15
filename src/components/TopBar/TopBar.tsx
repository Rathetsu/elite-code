import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/firebase";
import Logout from "../Buttons/Logout";
import { useSetRecoilState } from "recoil";
import { authModalState } from "@/atoms/authModalAtom";

type TopBarProps = {};

const TopBar: React.FC<TopBarProps> = () => {

	const [user] = useAuthState(auth);

	const setAuthModalState = useSetRecoilState(authModalState);

	return (
		<nav className='relative flex h-[80px] w-full shrink-0 items-center px-5 bg-dark-layer-1 text-dark-gray-7'>
			<div className={'flex w-full items-center justify-between max-w-[1200px] mx-auto'}>
				<Link href='/' className='h-[70px] flex-1'>
					<Image src='/ec_logo.png' alt='Logo' width={250} height={60} className='pb-5' />
				</Link>

				<div className='flex items-center space-x-4 flex-1 justify-end'>
					<div>
						<a
							href='https://www.buymeacoffee.com/aezzat'
							target='_blank'
							rel='noreferrer'
							className='bg-dark-fill-3 py-1.5 px-3 cursor-pointer rounded text-brand-orange hover:bg-dark-fill-2'
						>
							Buy me a coffee
						</a>
					</div>

					{!user ? (
						<Link href='/auth'>
							<button
								className='bg-dark-fill-3 py-1 px-2 cursor-pointer rounded-lg'
								onClick={() => {
									setAuthModalState((prevState) => ({
										...prevState,
										isOpen: true,
										activeModal: 'signIn'
									}));
								}}
							>
								Sign in
							</button>
						</Link>
					) :
						(
							<div className='flex items-center space-x-4'>
								<div className='cursor-pointer group relative'>
									<img
										src='/avatar.png'
										alt='User Profile'
										className='h-8 w-8 rounded-full object-cover group-hover:opacity-80 transition-opacity duration-300'
									/>

									<div
										className='absolute top-10 left-2/4 -translate-x-2/4 mx-auto rounded
												bg-dark-fill-3 text-brand-orange
												p-2 shadow-lg
												z-40 group-hover:scale-100 scale-0
												transition-all duration-300 ease-in-out'
									>
										<p className='text-sm'>{user.email}</p>
									</div>
								</div>

								<Logout />

							</div>
						)
					}
				</div>
			</div>
		</nav>
	);
};
export default TopBar;