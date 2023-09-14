import React from 'react';

type ForgotPasswordProps = {

};

const ForgotPassword: React.FC<ForgotPasswordProps> = () => {

	return (
		<form className='space-y-6 px-6 lg:px-8 pb-4 sm:pb-6 xl:pb-8'>
			<h3 className='text-xl fron-medium text-white'>Reset Password</h3>

			<p className='text-sm text-white'>
				Enter your email address and we'll send you a link to reset your password.
			</p>

			<div>
				<label htmlFor='email' className='text-sm font-medium block mb-2 text-gray-300'>
					Your email
				</label>
				<input
					type="email"
					name="email"
					id="email"
					className='outline-none block w-full p-2.5 border-2 rounded-lg shadow-sm
					sm:text-sm bg-gray-600 border-gray-500 
					placeholder-gray-400
					focus:outline-none focus:ring-brand-orange focus:border-brand-orange'
				/>
			</div>

			<button
				type="submit"
				className="w-full px-5 py-2.5 text-sm  text-center text-white font-medium rounded-lg bg-brand-orange
						focus:ring-dark-gray-6 focus:border-dark-gray-6
						 hover:bg-brand-orange-s"
			>
				Send password reset email
			</button>

		</form>
	);
}
export default ForgotPassword;