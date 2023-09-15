import React, { useState } from "react";
import TopBar from "@/components/TopBar/TopBar";
import ProblemsTable from "@/components/ProblemsTable/ProblemsTable";

export default function Home() {

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
					<table className='text-sm text-left text-gray-300 sm:w-7/12 w-full max-w-[1200px] mx-auto'>
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
						<ProblemsTable />
					</table>
				</div>
			</main>
		</>
	);
}