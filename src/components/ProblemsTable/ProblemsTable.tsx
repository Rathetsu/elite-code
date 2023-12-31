import React from 'react';
import Link from 'next/link';
import { Problem, DBProblem } from '@/utils/types/problem';
import { BsCheckCircle } from 'react-icons/bs';
import useGetProblems from '@/hooks/useGetProblems';
import useGetSolvedProblems from '@/hooks/useGetSolvedProblems';

type ProblemsTableProps = {
	setLoading?: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProblemsTable: React.FC<ProblemsTableProps> = ({ setLoading = () => { } }) => {

	const problems = useGetProblems(setLoading);
	const solvedProblems = useGetSolvedProblems();

	return (
		<tbody className='text-white'>
			{problems.map((problem: DBProblem, idx: number) => {

				if (idx == 0) return null;

				const difficultyColor =
					problem.difficulty == 'Easy' ? 'text-dark-green-s'
						: problem.difficulty == 'Medium' ? 'text-dark-yellow'
							: 'text-dark-pink';

				return (
					<tr className={`${idx % 2 == 1 ? 'bg-dark-layer-1' : ''}`} key={problem.id}>
						<th className='px-2 py-4 font-medium whitespace-nowrap text-dark-green-s'>
							{solvedProblems.includes(problem.id) ? <BsCheckCircle className='inline-block mr-2' /> : null}
							
						</th>
						<td className='px-6 py-4'>
							<Link href={`/problems/${problem.id}`} className='hover:text-blue-600 cursor-pointer'>
								{problem.title}
							</Link>
						</td>

						<td className={`px-6 py-4 ${difficultyColor}`}> {problem.difficulty} </td>

						<td className='px-6 py-4'> {problem.category} </td>

						<td className='px-6 py-4 text-gray-400'> Coming Soon </td>

					</tr>
				);
			})}
		</tbody>
	);
}

export default ProblemsTable;