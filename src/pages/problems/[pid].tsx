import React from 'react';
import TopBar from '@/components/TopBar/TopBar';
import WorkSpace from '@/components/WorkSpace/WorkSpace';
import { problems } from '@/utils/ProblemData';
import { Problem } from '@/utils/types/problem';

type ProblemPageProps = {
	problem: Problem;
};

const ProblemPage: React.FC<ProblemPageProps> = ({problem}) => {

	console.log(problem);

	return (
		<div>
			<TopBar problemPage />
			<WorkSpace problem={problem} />
		</div>
	);
}
export default ProblemPage;

export async function getStaticPaths() {
	const paths = Object.keys(problems).map((prob) => ({
		params: { pid: prob },
	}));
	return { paths, fallback: false };
}

export async function getStaticProps({ params }: { params: { pid: string } }) {
	const { pid } = params;
	const problem = problems[pid];

	if (!problem) {
		return {
			notFound: true,
		};
	}

	problem.testingFunction = problem.testingFunction.toString(); // turn function into string for serialization purposes

	return {
		props: {
			problem,
		},
	};
}