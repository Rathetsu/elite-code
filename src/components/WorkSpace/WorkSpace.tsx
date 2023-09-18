import React from 'react';
import Split from 'react-split';
import ProblemDescription from './ProblemDescription/ProblemDescription';

type WorkSpaceProps = {};

const WorkSpace:React.FC<WorkSpaceProps> = () => {
	
	return (
		<Split className='split'>
			<ProblemDescription />
			<div>Code Editor</div>
		</Split>
	);
}
export default WorkSpace;