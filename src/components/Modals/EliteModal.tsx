import { Sign } from 'crypto';
import React, { useEffect } from 'react';
import { IoClose } from 'react-icons/io5';
import SignIn from './SignIn';
import SignUp from './SignUp';
import ForgotPassword from './ForgotPassword';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { authModalState } from '@/atoms/authModalAtom';


type EliteModalProps = {};

const EliteModal: React.FC<EliteModalProps> = () => {

	const modalState = useRecoilValue(authModalState);
	const closeModal = useCloseModal();
	
	return (
		<>
			<div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-60" onClick={closeModal}></div>
			<div className="w-full sm:w-[450px] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex justify-center items-center">
				<div className="relative w-full h-full mx-auto flex items-center justify-center">
					<div className="bg-white rounded-lg shadow relative w-full bg-gradient-to-b from-brand-orange to-slate-900 mx-6">
						<div className="flex justify-end p-2">
							<button className="bg-transparent rounded-lg text-sm p-1.5 ml-auto inline-flex items-center
											hover:bg-gray-800 hover:text-white text-white">
								<IoClose className="h-5 w-5" onClick={closeModal} />
							</button>
						</div>

						{modalState.activeModal === 'signIn' && <SignIn />}
						{modalState.activeModal === 'signUp' && <SignUp />}
						{modalState.activeModal === 'forgotPassword' && <ForgotPassword />}

					</div>
				</div>
			</div>
		</>

	);
}
export default EliteModal;


function useCloseModal() {
	const setModalState = useSetRecoilState(authModalState);

	const closeModal = () => {
		setModalState((oldState) => ({
			...oldState,
			isOpen: false,
			activeModal: 'signIn',
		}));
	};

	useEffect(() => {
		window.addEventListener('keydown', (e) => {
			if (e.key === 'Escape') {
				closeModal();
			}
		});
		return () => {
			window.removeEventListener('keydown', () => { });
		};
	});

	return closeModal;
}