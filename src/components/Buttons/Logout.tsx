import React from 'react';
import { FiLogOut } from 'react-icons/fi';
import { useSignOut } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase/firebase';

type LogoutProps = {};

const Logout:React.FC<LogoutProps> = () => {

	const [signOut, loading, error] = useSignOut(auth);

	const handleLogout = async () => {
		const success = await signOut();
		if (success) {
			console.log('logged out successfully');
		}
	}
	
	return (
		<button
			className='bg-dark-fill-3 py-1.5 px-3 cursor-pointer rounded-lg text-brand-orange hover:bg-dark-fill-2'
			onClick={handleLogout}
		>
			<FiLogOut />
		</button>
	);
}
export default Logout;