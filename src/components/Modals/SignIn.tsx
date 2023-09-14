import React from 'react';
import { useSetRecoilState } from 'recoil';
import { authModalState } from '@/atoms/authModalAtom';

type SignInProps = {};

const SignIn: React.FC<SignInProps> = () => {

	const setModalState = useSetRecoilState(authModalState);

	const handleClick = (modal: "signIn" | "signUp" | "forgotPassword") => {
		setModalState((oldState) => ({
			...oldState,
			activeModal: modal,
		}));
	};

	return (
		<form className="space-y-6 px-6 pb-4">
			<h3 className="text-xl font-medium text-white">Sign in to EliteCode</h3>
			<div>
				<label htmlFor="email" className="block text-sm font-medium mb-2 text-gray-200">
					Email address
				</label>
				<div className="mt-1">
					<input
						id="email"
						name="email"
						type="email"
						autoComplete="email"
						required
						placeholder='name@email.com'
						className="outline-none block w-full p-2.5 border-2 rounded-lg shadow-sm
								sm:text-sm bg-gray-600 border-gray-500 
								placeholder-gray-400
								focus:outline-none focus:ring-brand-orange focus:border-brand-orange"
					/>
				</div>
			</div>

			<div>
				<label htmlFor="email" className="block text-sm font-medium mb-2 text-gray-200">
					Password
				</label>
				<div className="mt-1">
					<input
						id="password"
						name="password"
						type="password"
						autoComplete="password"
						required
						placeholder='*********'
						className="outline-none block w-full p-2.5 border-2 rounded-lg shadow-sm
								sm:text-sm bg-gray-600 border-gray-500 
								placeholder-gray-400
								focus:outline-none focus:ring-brand-orange focus:border-brand-orange"
					/>
				</div>
			</div>

			<button
				type="submit"
				className="w-full px-5 py-2.5 text-sm  text-center text-white font-medium rounded-lg bg-brand-orange
						focus:ring-dark-gray-6 focus:border-dark-gray-6.
						 hover:bg-brand-orange-s"
			>
				Sign in
			</button>

			<button
				className='flex w-full justify-end'
				onClick={() => handleClick('forgotPassword')}
			>
				<a href="#" className="w-full text-right text-sm font-medium block text-brand-orange hover:underline">Forgot your password?</a>
			</button>

			<div className="text-sm font-medium text-gray-350">
				Not a member yet?
				<a href="#" className="text-brand-orange pl-2 hover:underline" onClick={() => handleClick('signUp')}>
					Sign up now
				</a>
			</div>
		</form>
	);
}
export default SignIn;