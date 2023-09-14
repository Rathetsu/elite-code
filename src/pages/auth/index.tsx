import React, { useEffect, useState } from 'react';
import NavBar from '../../components/NavBar/NavBar';
import EliteModal from '@/components/Modals/EliteModal';
import { useRecoilValue } from 'recoil';
import { authModalState } from '@/atoms/authModalAtom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase/firebase';
import { useRouter } from 'next/router';

type AuthenticationPageProps = {};

const AuthenticationPage: React.FC<AuthenticationPageProps> = () => {

	const router = useRouter();

	const authModal = useRecoilValue(authModalState);

	const [user, loading, error] = useAuthState(auth);

	const [pageLoading, setPageLoading] = useState(true);

	useEffect(() => {
		if (user) router.push('/');
		if (!loading && !user) setPageLoading(false);
	}, [user, router, loading]);

	if (pageLoading) return null;

	return (
		<div className='bg-gradient-to-b from-gray-600 to-black h-screen relative' >
			<div className='max-w-7xl mx-auto px-4 sm:px-6'>
				<NavBar />
				{/* add hero image here later */}
				{authModal.isOpen && <EliteModal />}
			</div>

		</div>
	);
}

export default AuthenticationPage;