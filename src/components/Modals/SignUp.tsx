import React from 'react';

type SignupProps = {};

const Signup: React.FC<SignupProps> = () => {

	return (
		<form className="space-y-6 px-6 pb-4">
			<h3 className="text-xl font-medium text-white">Register to EliteCode</h3>

			<div>
				<label htmlFor="displayName" className="block text-sm font-medium mb-2 text-gray-200">
					Display Name
				</label>
				<div className="mt-1">
					<input
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
				Create Account
			</button>

			<div className="text-sm font-medium text-gray-350">
				Already a member?
				<a href="#" className="text-brand-orange pl-2 hover:underline">
					Sign in
				</a>
			</div>
		</form>
	);
}
export default Signup;