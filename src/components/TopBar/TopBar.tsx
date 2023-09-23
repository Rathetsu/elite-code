import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { BsList } from "react-icons/bs";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/firebase";
import { useSetRecoilState } from "recoil";
import { authModalState } from "@/atoms/authModalAtom";
import Logout from "../Buttons/Logout";
import Timer from "../Timer/Timer";
import { problems } from '@/utils/ProblemData';
import { Problem } from "@/utils/types/problem";

type TopBarProps = {
	problemPage?: boolean;
};

const TopBar: React.FC<TopBarProps> = ({ problemPage }) => {

	const [user] = useAuthState(auth);
	const setAuthModalState = useSetRecoilState(authModalState);
	const router = useRouter();
	const handleProblemNavigation = (isForward: boolean) => {
		const { order } = problems[router.query.pid as string] as Problem;
		const direction = isForward ? 1 : -1;
		const problemsCount = Object.keys(problems).length;
		const nextProblemOrder = order + direction;
		if (isForward && nextProblemOrder > problemsCount) {
			const firstProblemKey = Object.keys(problems)[0];
			router.push(`/problems/${firstProblemKey}`);
		} else if (!isForward && nextProblemOrder < 1) {
			const lastProblemKey = Object.keys(problems)[problemsCount - 1];
			router.push(`/problems/${lastProblemKey}`);
		} else {
			const nextProblemKey = Object.keys(problems)[nextProblemOrder - 1];
			router.push(`/problems/${nextProblemKey}`);
		}
	};

	return (
		<nav className='relative flex h-[50px] w-full shrink-0 items-center px-5 bg-dark-layer-1 text-dark-gray-7'>
			<div className={`flex w-full mx-auto ${!problemPage ? 'max-w-[1200px]' : ''}`}>
				<Link href='/' className='h-[70px] flex-1'>
					<Image src='/ec_logo.png' alt='Logo' width={170} height={40} className='py-[15px]' />
				</Link>

				{problemPage && (
					<div className='flex items-center gap-4 justify-center'>
						<div
							className='flex items-center justify-center rounded bg-dark-fill-3 hover:bg-dark-fill-2 h-8 w-8 cursor-pointer'
							onClick={() => handleProblemNavigation(false)}
						>
							<FaChevronLeft />
						</div>
						<Link
							href='/'
							className='flex items-center gap-2 cursor-pointer font-medium max-w-[170px] text-dark-gray-8'
						>
							<div className='flex items-center justify-center rounded pt-0.5'>
								<BsList />
							</div>

							<p>Problem List</p>
						</Link>
						<div
							className='flex items-center justify-center rounded bg-dark-fill-3 hover:bg-dark-fill-2 h-8 w-8 cursor-pointer'
							onClick={() => handleProblemNavigation(true)}
						>
							<FaChevronRight />
						</div>
					</div>
				)}

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


					{user && problemPage && <Timer />}

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
									<Image
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