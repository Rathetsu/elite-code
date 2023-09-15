import React from 'react';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSetRecoilState } from 'recoil';
import { authModalState } from '@/atoms/authModalAtom';

type NavBarProps = {};

const NavBar: React.FC<NavBarProps> = () => {

	const setAuthModalState = useSetRecoilState(authModalState);

	const handleClick = () => {
		setAuthModalState((oldState) => ({
			...oldState,
			isOpen: true,
			activeModal: 'signIn'
		}));
	};

	return (
		<div className="flex items-center  justify-between sm:px-12 px-2 md:px-24">
			<Link href="/" className="flex items-center justify-center h-20">
				<Image src="/ec_logo.png" alt="EliteCode" width={200} height={200} />
			</Link>
			<div className="flex items-center">
				<button
					className="bg-brand-orange text-white px-2 py-1 sm:px-4 rounded-md text-sm font-medium
									hover:text-brand-orange hover:bg-white hover-border-2 hover:border-brand-orange border-transparent
									transition duration-300 ease-in-out"
					onClick={handleClick}
				>
					Sign in
				</button>
			</div>
		</div>
	)
};
export default NavBar;