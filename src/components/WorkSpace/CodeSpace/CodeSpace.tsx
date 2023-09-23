import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Split from 'react-split';
import CodeMirror from '@uiw/react-codemirror';
import { vscodeDark } from '@uiw/codemirror-theme-vscode';
import { javascript } from '@codemirror/lang-javascript';
import { toast } from 'react-toastify';

import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase/firebase';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { firestore } from '@/firebase/firebase';

import { Problem } from '@/utils/types/problem';
import PreferenceBar from './PreferenceBar/PreferenceBar';
import CodeSpaceFooter from '../CodeSpaceFooter'
import { problems } from '@/utils/ProblemData';


type CodeSpaceProps = {
	problem: Problem;
	setSuccessfullySolved: React.Dispatch<React.SetStateAction<boolean>>;
	setSolved: React.Dispatch<React.SetStateAction<boolean>>;
};

const CodeSpace: React.FC<CodeSpaceProps> = ({ problem, setSuccessfullySolved, setSolved }) => {

	const [activeTestCaseId, setActiveTestCaseId] = useState<number>(0);
	const [userCode, setUserCode] = useState<string>(problem.startingCode);
	const [user] = useAuthState(auth);
	const { query: { pid } } = useRouter();

	const onCodeChange = (value: string) => {
		setUserCode(value);
		localStorage.setItem(`code-${pid}`, JSON.stringify(value));
	};

	const handleProblemSubmit = async () => {
		if (!user) {
			toast.error('You must be logged in to submit a solution', {
				position: 'top-center',
				autoClose: 3000,
				hideProgressBar: true,
				theme: 'dark',
			});
			return;
		}

		try {
			let slicedUserCode = userCode.slice(userCode.indexOf(problem.startingFunctionName));
			const callback = new Function(`return ${slicedUserCode}`)();
			const tester = problems[pid as string].testingFunction;

			if (typeof tester === 'function') {
				const success = tester(callback);

				if (success) {
					toast.success('Congrats! All tests have passed!', {
						position: 'top-center',
						autoClose: 3000,
						hideProgressBar: true,
						theme: 'dark',
					});
					setSuccessfullySolved(true);

					setTimeout(() => {
						setSuccessfullySolved(false);
					}, 5000);

					const userRef = doc(firestore, 'users', user.uid);
					await updateDoc(userRef, {
						solvedProblems: arrayUnion(pid),
					});
					setSolved(true);
				}
			}
		} catch (error: any) {
			console.log('submission error', error.message);
			if (error.message.startsWith('AssertionError')) {
				toast.error('Your solution failed one or more test cases. Try again!', {
					position: 'top-center',
					autoClose: 3000,
					theme: 'dark',
				});
			} else {
				toast.error('Your submission doesn\'t compile. Please review your code and try again!', {
					position: 'top-center',
					autoClose: 3000,
					theme: 'dark',
				})
			}
		}
	};

	const handleProblemRun = () => {
		// TODO: Implement this
		handleProblemSubmit();
	};

	useEffect(() => {
		const localStorageCode = localStorage.getItem(`code-${pid}`);
		if (user && localStorageCode) {
			setUserCode(JSON.parse(localStorageCode));
		} else {
			setUserCode(problem.startingCode);
		}
	}, [pid, user, problem.startingCode]);

	return (
		<div className='flex flex-col bg-dark-layer-1 relative overflow-x-hidden overflow-y-clip'>
			<PreferenceBar />

			<Split className='h-[calc(100vh-94px)]' direction='vertical' sizes={[60, 40]} minSize={60}>
				<div className='w-full overflow-auto'>
					<CodeMirror
						value={userCode}
						onChange={onCodeChange}
						theme={vscodeDark}
						extensions={[javascript()]}
						style={{ fontSize: 16 }}
					/>
				</div>

				<div className='w-full px-5 overflow-auto'>
					{/* Test Cases Heading */}
					<div className='flex h-10 items-center space-x-6'>
						<div className='relative flex flex-col h-full justify-center cursor-pointer'>
							<div className='text-sm font-medium leading-5 text-color-white'>Text Cases</div>
							<hr className='absolute bottom-0 h-0.5 w-full rounded-full border-none bg-white' />
						</div>
					</div>

					{/* Test Cases Body */}
					<div className='flex'>
						{problem.examples.map((example, idx) => (
							<div
								className='mr-2 mt-2 items-start text-gray-500'
								key={idx}
								onClick={() => setActiveTestCaseId(idx)}
							>
								<div className='flex flex-wrap items-center gap-y-4'>
									<div
										className={`testCaseNumberText ${activeTestCaseId === idx ? 'bg-dark-fill-2 text-brand-orange' : ''}`}
									>Case {idx + 1}</div>
								</div>
							</div>
						))}
					</div>

					{/* Inputs and Outputs */}
					<div className='font-semibold my-4 mb-16'>
						<p className='testCaseSubTitle'>Input:</p>
						<div className='testCaseBox'>
							{problem.examples[activeTestCaseId].inputText}
						</div>
						<p className='testCaseSubTitle'>Output:</p>
						<div className='testCaseBox'>
							{problem.examples[activeTestCaseId].outputText}
						</div>
					</div>

				</div>
			</Split>

			{/* Footer that contains a console and the submit and run buttons */}
			<CodeSpaceFooter handleProblemSubmit={handleProblemSubmit} handleProblemRun={handleProblemRun} />

		</div>
	);
}
export default CodeSpace;