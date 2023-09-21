import React, { useState } from "react";
import TopBar from "@/components/TopBar/TopBar";
import ProblemsTable from "@/components/ProblemsTable/ProblemsTable";

const LoadingSkeleton = () => {
	return (
		<div className='flex items-center space-x-12 mt-4 px-6'>
			<div className='w-6 h-6 shrink-0 rounded-full bg-dark-layer-1'></div>
			<div className='w-32 h-4 rounded-full sm:w-52 bg-dark-layer-1'></div>
			<div className='w-32 h-4 rounded-full sm:w-52 bg-dark-layer-1'></div>
			<div className='w-32 h-4 rounded-full sm:w-52 bg-dark-layer-1'></div>

			<span className='sr-only'>Loading...</span>

		</div>
	);
}

export default function Home() {

	const [loading, setLoading] = useState(true);

	return (
		<>
			<main className='bg-dark-layer-2 min-h-screen'>
				<TopBar />

				<h1 className='text-xl text-center text-gray-400 font-medium mt-10 mb-5'>
					&ldquo;The art of programming is the art of organizing complexity, of mastering multitude and avoiding its bastard chaos as effectively as possible.&ldquo;
					<br />
					— Edsger W. Dijkstra
				</h1>

				<div className='relative overflow-x-auto mx-auto px-6 pb-10'>
					{loading ? (
						<div className='animate-pulse mx-auto max-w-[1200px] w-full sm:w-7/12'>
							{Array(10).fill(0).map((_, i) => (
								<LoadingSkeleton key={i} />
							))}
						</div>
					) : null}
					<table className='text-sm text-left text-gray-300 sm:w-7/12 w-full max-w-[1200px] mx-auto'>
						{
							!loading ? (
								<thead className='text-xs text-gray-300 uppercase border-b '>
									<tr>
										<th scope='col' className='px-1 py-3 w-0 font-medium'>
											Status
										</th>
										<th scope='col' className='px-6 py-3 w-0 font-medium'>
											Title
										</th>
										<th scope='col' className='px-6 py-3 w-0 font-medium'>
											Difficulty
										</th>

										<th scope='col' className='px-6 py-3 w-0 font-medium'>
											Category
										</th>
										<th scope='col' className='px-6 py-3 w-0 font-medium'>
											Solution
										</th>
									</tr>
								</thead>
							) : null
						}
						<ProblemsTable setLoading={setLoading} />
					</table>
				</div>
			</main>
		</>
	);
}