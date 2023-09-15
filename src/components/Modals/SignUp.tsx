import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { useSetRecoilState } from 'recoil';
import { authModalState } from '@/atoms/authModalAtom';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase/firebase';


type SignupProps = {};

const Signup: React.FC<SignupProps> = () => {

	const router = useRouter();

	const setModalState = useSetRecoilState(authModalState);

	const handleClick = () => {
		setModalState((oldState) => ({
			...oldState,
			activeModal: 'signIn',
		}));
	};

	const [inputs, setInputs] = React.useState({
		displayName: '',
		email: '',
		password: '',
	});

	const [
		createUserWithEmailAndPassword,
		user,
		loading,
		error
	] = useCreateUserWithEmailAndPassword(auth);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setInputs((oldState) => ({
			...oldState,
			[name]: value,
		}));
	};

	const handleRegistration = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!inputs.displayName || !inputs.email || !inputs.password) return toast.error('Please fill in all fields.');
		try {
			const newUser = await createUserWithEmailAndPassword(inputs.email, inputs.password);
			if (!newUser) return;
			router.push('/');
		} catch (error: any) {
			toast.error(error.message);
		}
	};

	useEffect(() => {
		if (error) toast.error(error.message);
	}, [error]);




	return (
		<form className="space-y-6 px-6 pb-4" onSubmit={handleRegistration}>
			<h3 className="text-xl font-medium text-white">Register to EliteCode</h3>

			<div>
				<label htmlFor="displayName" className="block text-sm font-medium mb-2 text-gray-200">
					Display Name
				</label>
				<div className="mt-1">
					<input
						onChange={handleChange}
						id="displayName"
						name="displayName"
						type="displayName"
						autoComplete="on"
						required
						placeholder='johndoe'
						className="outline-none block w-full p-2.5 border-2 rounded-lg shadow-sm
							sm:text-sm bg-gray-600 border-gray-500 
							placeholder-gray-400
							focus:outline-none focus:ring-brand-orange focus:border-brand-orange"
					/>
				</div>
			</div>

			<div>
				<label htmlFor="email" className="block text-sm font-medium mb-2 text-gray-200">
					Email address
				</label>
				<div className="mt-1">
					<input
						onChange={handleChange}
						id="email"
						name="email"
						type="email"
						autoComplete="on"
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
						onChange={handleChange}
						id="password"
						name="password"
						type="password"
						autoComplete="on"
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
					focus:ring-dark-gray-6 focus:border-dark-gray-6
					hover:bg-brand-orange-s"
			>
				{loading ? 'Creating an account...' : 'Create Account'}
			</button>

			<div className="text-sm font-medium text-gray-350">
				Already a member?
				<a href="#" className="text-brand-orange pl-2 hover:underline" onClick={handleClick}>
					Sign in
				</a>
			</div>
		</form>
	);
}
export default Signup;