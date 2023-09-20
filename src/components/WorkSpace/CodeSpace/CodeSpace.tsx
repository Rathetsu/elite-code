import React, { useState } from 'react';
import Split from 'react-split';
import CodeMirror from '@uiw/react-codemirror';
import { vscodeDark } from '@uiw/codemirror-theme-vscode';
import { javascript } from '@codemirror/lang-javascript';

import { Problem } from '@/utils/types/problem';
import PreferenceBar from './PreferenceBar/PreferenceBar';
import CodeSpaceFooter from '../CodeSpaceFooter'


type CodeSpaceProps = {
	problem: Problem;
};

const CodeSpace: React.FC<CodeSpaceProps> = ({ problem }) => {

	const [activeTestCaseId, setActiveTestCaseId] = useState<number>(0);

	return (
		<div className='flex flex-col bg-dark-layer-1 relative overflow-x-hidden overflow-y-clip'>
			<PreferenceBar />

			<Split className='h-[calc(100vh-94px)]' direction='vertical' sizes={[60, 40]} minSize={60}>
				<div className='w-full overflow-auto'>
					<CodeMirror
						value={problem.startingCode}
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
			<CodeSpaceFooter />

		</div>
	);
}
export default CodeSpace;