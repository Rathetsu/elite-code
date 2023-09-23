import React, { useState } from 'react';
import Split from 'react-split';
import Confetti from 'react-confetti';
import ProblemDescription from './ProblemDescription/ProblemDescription';
import CodeSpace from './CodeSpace/CodeSpace';
import { Problem } from '@/utils/types/problem';
import useWindowSize from "@/hooks/useWindowSize";

type WorkSpaceProps = {
	problem: Problem;
};

const WorkSpace: React.FC<WorkSpaceProps> = ({ problem }) => {
	const { width, height } = useWindowSize();
	const [successfullySolved, setSuccessfullySolved] = useState(false);
	const [solved, setSolved] = useState(false);
	return (
		<Split className='split' minSize={0}>
			<ProblemDescription problem={problem} _solved={solved}/>
			<div className='bg-dark-fill-2'>
				<CodeSpace problem={problem} setSuccessfullySolved={setSuccessfullySolved} setSolved={setSolved} />
				{successfullySolved ? <Confetti gravity={0.03} tweenDuration={3000} width={width - 1} height={height - 1} /> : null}
			</div>
		</Split>
	);
}
export default WorkSpace;