import React from 'react';
import TopBar from '@/components/TopBar/TopBar';

type ProblemPageProps = {};

const ProblemPage: React.FC<ProblemPageProps> = () => {

	return (
		<div>
			<TopBar
				problemPage
			/>
		</div>
	);
}
export default ProblemPage;