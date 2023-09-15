import React from 'react';
import Link from 'next/link';
import { problems, Problem } from '@/Problems/Problems';
import { BsCheckCircle } from 'react-icons/bs';

type ProblemsTableProps = {};

const ProblemsTable: React.FC<ProblemsTableProps> = () => {

	return (
		<tbody className='text-white'>
			{problems.map((problem: Problem, idx: number) => {

				const difficultyColor =
					problem.difficulty == 'Easy' ? 'text-dark-green-s'
						: problem.difficulty == 'Medium' ? 'text-dark-yellow'
							: 'text-dark-pink';

				return (
					<tr className={`${idx % 2 == 1 ? 'bg-dark-layer-1' : ''}`} key={problem.id}>
						<th className='px-2 py-4 font-medium whitespace-nowrap text-dark-green-s'>
							{/* check if solved */}
							<BsCheckCircle fontSize={"19"} width="19" />
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