import React from 'react';
import TopBar from '@/components/TopBar/TopBar';
import WorkSpace from '@/components/WorkSpace/WorkSpace';

type ProblemPageProps = {};

const ProblemPage: React.FC<ProblemPageProps> = () => {

	return (
		<div>
			<TopBar problemPage/>
			<WorkSpace />
		</div>
	);
}
export default ProblemPage;