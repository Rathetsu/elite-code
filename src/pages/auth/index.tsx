import React from 'react';
import NavBar from '../../components/NavBar/NavBar';
import EliteModal from '@/components/Modals/EliteModal';

type AuthenticationPageProps = {};

const AuthenticationPage: React.FC<AuthenticationPageProps> = () => {

	return (
		<div className='bg-gradient-to-b from-gray-600 to-black h-screen relative' >
			<div className='max-w-7xl mx-auto px-4 sm:px-6'>
				<NavBar />
				{/* add hero image here later */}
				<EliteModal />
			</div>

		</div>
	);
}

export default AuthenticationPage;