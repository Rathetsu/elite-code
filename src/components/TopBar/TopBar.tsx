import React from "react";
import Link from "next/link";
import Image from "next/image";

type TopBarProps = {};

const TopBar: React.FC<TopBarProps> = () => {

	return (
		<nav className='relative flex h-[80px] w-full shrink-0 items-center px-5 bg-dark-layer-1 text-dark-gray-7'>
			<div className={'flex w-full items-center justify-between max-w-[1200px] mx-auto'}>
				<Link href='/' className='h-[70px] flex-1'>
					<Image src='/ec_logo.png' alt='Logo' width={250} height={60} className='pb-5'/>
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

					<Link href='/auth'>
						<button className='bg-dark-fill-3 py-1 px-2 cursor-pointer rounded-lg'>
							Sign in
						</button>
					</Link>
				</div>
			</div>
		</nav>
	);
};
export default TopBar;