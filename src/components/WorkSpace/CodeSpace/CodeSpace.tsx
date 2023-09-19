import React from 'react';
import Split from 'react-split';
import CodeMirror from '@uiw/react-codemirror';
import { vscodeDark } from '@uiw/codemirror-theme-vscode';
import { javascript } from '@codemirror/lang-javascript';

import PreferenceBar from './PreferenceBar/PreferenceBar';
import CodeSpaceFooter from '../CodeSpaceFooter'


type CodeSpaceProps = {};

const CodeSpace: React.FC<CodeSpaceProps> = () => {

	const startingCode = `function twoSum(nums, target) {
		// Your code here
};`

	return (
		<div className='flex flex-col bg-dark-layer-1 relative overflow-x-auto'>
			<PreferenceBar />

			<Split className='h-[calc(100vh-94px)]' direction='vertical' sizes={[60, 40]} minSize={60}>
				<div className='w-full overflow-auto'>
					<CodeMirror
						value={startingCode}
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
						{/* Case 1 */}
						<div className='mr-2 mt-2 items-start text-white'>
							<div className='flex flex-wrap items-center gap-y-4'>
								<div
									className='testCaseNumberText'
								>Case 1</div>
							</div>
						</div>

						{/* Case 2 */}
						<div className='mr-2 mt-2 items-start text-white'>
							<div className='flex flex-wrap items-center gap-y-4'>
								<div
									className='testCaseNumberText'
								>Case 2</div>
							</div>
						</div>

						{/* Case 3 */}
						<div className='mr-2 mt-2 items-start text-white'>
							<div className='flex flex-wrap items-center gap-y-4'>
								<div
									className='testCaseNumberText'
								>Case 3</div>
							</div>
						</div>
					</div>

					<div className='font-semibold my-4'>
						<p className='testCaseSubTitle'>Input:</p>
						<div className='testCaseBox'>
							nums = [2, 7, 11, 15], target = 9
						</div>
						<p className='testCaseSubTitle'>Output:</p>
						<div className='testCaseBox'>
							[0, 1]
						</div>
					</div>

					<div className='font-semibold my-4'>
						<p className='testCaseSubTitle'>Input:</p>
						<div className='testCaseBox'>
							nums = [2, 7, 11, 15], target = 9
						</div>
						<p className='testCaseSubTitle'>Output:</p>
						<div className='testCaseBox'>
							[0, 1]
						</div>
					</div>

					<div className='font-semibold my-4'>
						<p className='testCaseSubTitle'>Input:</p>
						<div className='testCaseBox'>
							nums = [2, 7, 11, 15], target = 9
						</div>
						<p className='testCaseSubTitle'>Output:</p>
						<div className='testCaseBox'>
							[0, 1]
						</div>
					</div>

				</div>
			</Split>
			{/* Footer that contains a console and the submit and run buttons */}
			<div className=' mt-12'><CodeSpaceFooter /></div>
			
		</div>
	);
}
export default CodeSpace;