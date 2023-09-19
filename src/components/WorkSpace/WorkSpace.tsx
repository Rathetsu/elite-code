import React from 'react';
import Split from 'react-split';
import ProblemDescription from './ProblemDescription/ProblemDescription';
import CodeSpace from './CodeSpace/CodeSpace';

type WorkSpaceProps = {};

const WorkSpace:React.FC<WorkSpaceProps> = () => {
	
	return (
		<Split className='split' minSize={0}>
			<ProblemDescription />
			<CodeSpace />
		</Split>
	);
}
export default WorkSpace;