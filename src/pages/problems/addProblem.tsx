import React, { useState } from "react";
import { toast } from "react-toastify";
import { firestore } from "@/firebase/firebase";
import { doc, setDoc } from "firebase/firestore";

type addProblemFormProps = {};

const addProblemForm: React.FC<addProblemFormProps> = () => {

	const classForInput = `outline-none block w-full p-2.5 border-2 rounded-lg shadow-sm
sm:text-sm bg-gray-600 border-gray-500 
placeholder-gray-400
focus:outline-none focus:ring-brand-orange focus:border-brand-orange`;

	const [inputs, setInputs] = useState({
		id: '',
		order: 0,
		title: '',
		category: '',
		difficulty: '',
		likes: 0,
		dislikes: 0,
		stars: 0,
		solution: '',
	});

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setInputs((oldState) => ({ ...oldState, [name]: value }));
	};

	const saveToFireStore = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const newProblem = {
			...inputs,
			likes: 0,
			dislikes: 0,
			stars: 0,
			order: Number(inputs.order),
		}
		await setDoc(doc(firestore, "problems", inputs.id), newProblem);

		const form = document.querySelector('form');
		if (form) {
			form.reset();
		}
		setInputs({
			id: '',
			order: 0,
			title: '',
			category: '',
			difficulty: '',
			likes: 0,
			dislikes: 0,
			stars: 0,
			solution: '',
		});

		toast.success("Saved to Firestore!",
			{
				position: 'top-center',
				autoClose: 6000,
				theme: 'dark',
				className: 'w-96 h-25',
			});
	};

	return (
		<div className='flex items-center justify-center h-screen bg-gradient-to-b from-brand-orange to-slate-900'>
			<form onSubmit={saveToFireStore} className='flex flex-col gap-4 p-10 rounded-lg'>
				<input onChange={handleInputChange} type='text' placeholder='id' name='id' className={classForInput} />
				<input onChange={handleInputChange} type='text' placeholder='order' name='order' className={classForInput} />
				<input onChange={handleInputChange} type='text' placeholder='title' name='title' className={classForInput} />
				<input onChange={handleInputChange} type='text' placeholder='category' name='category' className={classForInput} />
				<input onChange={handleInputChange} type='text' placeholder='difficulty' name='difficulty' className={classForInput} />
				{/* No need to have likes, dislikes and stars in the form, they're always initialized to 0 */}
				<input onChange={handleInputChange} type='text' placeholder='solution?' name='solution' className={classForInput} />

				<button className='bg-brand-orange-s text-gray-500 font-bold font-lg rounded-lg p-2 hover:bg-brand-orange hover:text-white'>
					Save to Firestore
				</button>
			</form>
		</div>

	);
}
export default addProblemForm;