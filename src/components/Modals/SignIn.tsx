import React, { useState, useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { authModalState } from '@/atoms/authModalAtom';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase/firebase';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

type SignInProps = {};

const SignIn: React.FC<SignInProps> = () => {

	const router = useRouter();

	const setModalState = useSetRecoilState(authModalState);

	const handleClick = (modal: "signIn" | "signUp" | "forgotPassword") => {
		setModalState((oldState) => ({
			...oldState,
			activeModal: modal,
		}));
	};

	const [inputs, setInputs] = useState({
		email: '',
		password: '',
	});

	const [
		signInWithEmailAndPassword,
		user,
		loading,
		error,
	] = useSignInWithEmailAndPassword(auth);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setInputs((oldState) => ({
			...oldState,
			[name]: value,
		}));
	};

	const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!inputs.email || !inputs.password) return toast.error('Please fill in all fields.');
		try {
			const user = await signInWithEmailAndPassword(inputs.email, inputs.password);
			if (!user) return;
			router.push('/');
		} catch (error: any) {
			toast.error(error.message);
		}
	};

	useEffect(() => {
		if (error) toast.error(error.message);
	}, [error]);

	return (
		<form className="space-y-6 px-6 pb-4" onSubmit={handleLogin}>
			<h3 className="text-xl font-medium text-white">Sign in to EliteCode</h3>
			<div>
				<label htmlFor="email" className="block text-sm font-medium mb-2 text-gray-200">
					Email address
				</label>
				<div className="mt-1">
					<input
						onChange={handleInputChange}
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
						onChange={handleInputChange}
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
				{loading ? 'Loading...' : 'Sign In'}
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