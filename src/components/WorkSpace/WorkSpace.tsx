import React from 'react';
import Split from 'react-split';
import ProblemDescription from './ProblemDescription/ProblemDescription';
import CodeSpace from './CodeSpace/CodeSpace';
import { Problem } from '@/utils/types/problem';
import useWindowSize from "@/hooks/useWindowSize";

type WorkSpaceProps = {
	problem: Problem;
};

const WorkSpace:React.FC<WorkSpaceProps> = ({problem}) => {
	const { width, height } = useWindowSize();
	return (
		<Split className='split' minSize={0}>
			<ProblemDescription problem={problem}/>
			<div className='bg-dark-fill-2'>
				<CodeSpace problem={problem}/>
			</div>
		</Split>
	);
}
export default WorkSpace;