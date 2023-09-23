import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useSendPasswordResetEmail } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase/firebase';

type ForgotPasswordProps = {};

const ForgotPassword: React.FC<ForgotPasswordProps> = () => {

	const [email, setEmail] = useState('');
	const [sendPasswordResetEmail, sending, error] = useSendPasswordResetEmail(auth);

	const handleResetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const success = await sendPasswordResetEmail(email);
		console.log('success', success);
		// BUG: returns success as true even if email is not associated with an account
		if (success) {
			toast.success("If the provided email address is associated with an account, a password reset email will be sent.",
				{
					position: 'top-center',
					autoClose: 6000,
					theme: 'dark',
					className: 'w-96 h-25',
				});
		}
	};

	useEffect(() => {
		if (error) {
			console.log(error);
			toast.error(error.message,
				{
					position: 'top-center',
					autoClose: 4000,
					theme: 'dark',
				});
		}
	}, [error]);

	return (
		<form
			className='space-y-6 px-6 lg:px-8 pb-4 sm:pb-6 xl:pb-8'
			onSubmit={handleResetPassword}
		>
			<h3 className='text-xl font-bold text-white'>Reset Password</h3>

			<p className='text-sm text-white'>
				Forgotten your password? Enter your email address and we&apos;ll send you a link to reset your password.
			</p>

			<div>
				<label htmlFor='email' className='text-sm font-medium block mb-2 text-gray-300'>
					Your email
				</label>
				<input
					type="email"
					name="email"
					id="email"
					placeholder="name@email.com"
					className='outline-none block w-full p-2.5 border-2 rounded-lg shadow-sm
					sm:text-sm bg-gray-600 border-gray-500 
					placeholder-gray-400
					focus:outline-none focus:ring-brand-orange focus:border-brand-orange'
					onChange={(e) => setEmail(e.target.value)}
				/>
			</div>

			<button
				type="submit"
				className="w-full px-5 py-2.5 text-sm  text-center text-white font-medium rounded-lg bg-brand-orange
						focus:ring-dark-gray-6 focus:border-dark-gray-6
						 hover:bg-brand-orange-s"
			>
				{sending ? 'Sending...' : 'Send password reset email'}
			</button>

		</form>
	);
}
export default ForgotPassword;