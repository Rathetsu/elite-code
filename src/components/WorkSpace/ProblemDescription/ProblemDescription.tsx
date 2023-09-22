import React, { useState } from "react";
import { AiFillLike, AiFillDislike, AiOutlineLoading3Quarters, AiFillStar } from "react-icons/ai";
import { BsCheck2Circle } from "react-icons/bs";
import { TiStarOutline } from "react-icons/ti";
import { toast } from "react-toastify";
import { auth } from "@/firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Problem } from "@/utils/types/problem";
import useGetCurrentProblem from "@/hooks/useGetCurrentProblem";
import { CircularSkeleton, RectangleSkeleton } from "@/components/Skeletons/Loaders";
import useGetUserDataForProblem from "@/hooks/useGetUserDataForProblem";
import { runTransaction } from "firebase/firestore";
import { firestore } from "@/firebase/firebase";
import { doc, getDoc } from "firebase/firestore";

type ProblemDescriptionProps = {
	problem: Problem;
};

const ProblemDescription: React.FC<ProblemDescriptionProps> = ({ problem }) => {

	const { currentProblem, loading, problemDifficultyClassName, setCurrentProblem } = useGetCurrentProblem(problem.id);
	const { liked, disliked, starred, solved, setUserData } = useGetUserDataForProblem(problem.id);
	const [updating, setUpdating] = useState(false); // for updating the like/dislike/star count
	const [user] = useAuthState(auth);

	const handleLikeClick = async () => {
		if (!user) {
			toast.error("Please login to like the problem", {
				position: 'top-left',
				theme: 'dark',
				autoClose: 3000,
			});
			return;
		}

		if (updating) return;

		await runTransaction(firestore, async (transaction) => {
			setUpdating(true);
			const userRef = doc(firestore, "users", user.uid);
			const problemRef = doc(firestore, "problems", problem.id);
			const userDoc = await transaction.get(userRef);
			const problemDoc = await transaction.get(problemRef);
			if (!userDoc.exists() || !problemDoc.exists()) {
				toast.error("Something went wrong", {
					position: 'top-left',
					theme: 'dark',
					autoClose: 3000,
				});
				return;
			}
			if (liked) {
				transaction.update(userRef, {
					likedProblems: userDoc.data().likedProblems.filter((id: string) => id !== problem.id),
				});
				transaction.update(problemRef, {
					likes: problemDoc.data().likes - 1,
				});
				if (currentProblem) {
					setCurrentProblem({
						...currentProblem,
						likes: currentProblem.likes - 1,
					});
					setUserData((prevUserData) => {
						return {
							...prevUserData,
							liked: false,
						}
					});
				}
			} else if (disliked) {
				transaction.update(userRef, {
					likedProblems: [...userDoc.data().likedProblems, problem.id],
					dislikedProblems: userDoc.data().dislikedProblems.filter((id: string) => id !== problem.id),
				});
				transaction.update(problemRef, {
					likes: problemDoc.data().likes + 1,
					dislikes: problemDoc.data().dislikes - 1,
				});
				if (currentProblem) {
					setCurrentProblem({
						...currentProblem,
						likes: currentProblem.likes + 1,
						dislikes: currentProblem.dislikes - 1,
					});
					setUserData((prevUserData) => {
						return {
							...prevUserData,
							liked: true,
							disliked: false,
						}
					});
				}
			} else {
				transaction.update(userRef, {
					likedProblems: [...userDoc.data().likedProblems, problem.id],
				});
				transaction.update(problemRef, {
					likes: problemDoc.data().likes + 1,
				});
				if (currentProblem) {
					setCurrentProblem({
						...currentProblem,
						likes: currentProblem.likes + 1,
					});
					setUserData((prevUserData) => {
						return {
							...prevUserData,
							liked: true,
						}
					});
				}
			}
		});
		setUpdating(false);
	};

	const handleDislikeClick = async () => {
		if (!user) {
			toast.error("Please login to dislike the problem", {
				position: 'top-left',
				theme: 'dark',
				autoClose: 3000,
			});
			return;
		}

		if (updating) return;

		await runTransaction(firestore, async (transaction) => {
			setUpdating(true);
			const userRef = doc(firestore, "users", user.uid);
			const problemRef = doc(firestore, "problems", problem.id);
			const userDoc = await transaction.get(userRef);
			const problemDoc = await transaction.get(problemRef);

			if (!userDoc.exists() || !problemDoc.exists()) {
				toast.error("Something went wrong", {
					position: 'top-left',
					theme: 'dark',
					autoClose: 3000,
				});
				return;
			}

			if (liked) {
				transaction.update(userRef, {
					likedProblems: userDoc.data().likedProblems.filter((id: string) => id !== problem.id),
					dislikedProblems: [...userDoc.data().dislikedProblems, problem.id],
				})
				transaction.update(problemRef, {
					likes: problemDoc.data().likes - 1,
					dislikes: problemDoc.data().dislikes + 1,
				});
				if (currentProblem) {
					setCurrentProblem({
						...currentProblem,
						likes: currentProblem.likes - 1,
						dislikes: currentProblem.dislikes + 1,
					});
					setUserData((prevUserData) => {
						return {
							...prevUserData,
							liked: false,
							disliked: true,
						}
					});
				}
			} else if (disliked) {
				transaction.update(userRef, {
					dislikedProblems: userDoc.data().dislikedProblems.filter((id: string) => id !== problem.id),
				});
				transaction.update(problemRef, {
					dislikes: problemDoc.data().dislikes - 1,
				});
				if (currentProblem) {
					setCurrentProblem({
						...currentProblem,
						dislikes: currentProblem.dislikes - 1,
					});
					setUserData((prevUserData) => {
						return {
							...prevUserData,
							disliked: false,
						}
					});
				}
			} else {
				transaction.update(userRef, {
					dislikedProblems: [...userDoc.data().dislikedProblems, problem.id],
				});
				transaction.update(problemRef, {
					dislikes: problemDoc.data().dislikes + 1,
				});
				if (currentProblem) {
					setCurrentProblem({
						...currentProblem,
						dislikes: currentProblem.dislikes + 1,
					});
					setUserData((prevUserData) => {
						return {
							...prevUserData,
							disliked: true,
						}
					});
				}
			}
		});
		setUpdating(false);
	};

	const handleStarClick = async () => {
		if (!user) {
			toast.error("Please login to star the problem", {
				position: 'top-left',
				theme: 'dark',
				autoClose: 3000,
			});
			return;
		}

		if (updating) return;

		await runTransaction(firestore, async (transaction) => {
			setUpdating(true);
			const userRef = doc(firestore, "users", user.uid);
			const problemRef = doc(firestore, "problems", problem.id);
			const userDoc = await transaction.get(userRef);
			const problemDoc = await transaction.get(problemRef);

			if (!userDoc.exists() || !problemDoc.exists()) {
				toast.error("Something went wrong", {
					position: 'top-left',
					theme: 'dark',
					autoClose: 3000,
				});
				return;
			}

			if (starred) {
				transaction.update(userRef, {
					starredProblems: userDoc.data().starredProblems.filter((id: string) => id !== problem.id),
				});
				transaction.update(problemRef, {
					stars: problemDoc.data().stars - 1,
				});
				if (currentProblem) {
					setCurrentProblem({
						...currentProblem,
						stars: currentProblem.stars - 1,
					});
					setUserData((prevUserData) => {
						return {
							...prevUserData,
							starred: false,
						}
					});
				}
			} else {
				transaction.update(userRef, {
					starredProblems: [...userDoc.data().starredProblems, problem.id],
				});
				transaction.update(problemRef, {
					stars: problemDoc.data().stars + 1,
				});
				if (currentProblem) {
					setCurrentProblem({
						...currentProblem,
						stars: currentProblem.stars + 1,
					});
					setUserData((prevUserData) => {
						return {
							...prevUserData,
							starred: true,
						}
					});
				}
			}
		});
		setUpdating(false);
	};

	return (
		<div className='bg-dark-layer-1'>
			{/* TAB */}
			<div className='flex h-11 w-full items-center pt-2 bg-dark-layer-2 text-white overflow-x-hidden'>
				<div className={"bg-dark-layer-1 rounded-t-[5px] px-5 py-[10px] text-xs cursor-pointer"}>
					Description
				</div>
			</div>

			<div className='flex px-0 py-4 h-[calc(100vh-94px)] overflow-y-auto'>
				<div className='px-5'>
					{/* Problem heading */}
					<div className='w-full'>
						<div className='flex space-x-4'>
							<div className='flex-1 mr-2 text-lg text-white font-medium'>{problem.title}</div>
						</div>
						{!loading && currentProblem ? (
							<div className='flex items-center mt-3'>
								<div
									className={`${problemDifficultyClassName} inline-block rounded-[21px] bg-opacity-[.15] px-2.5 py-1 text-xs font-medium capitalize`}
								>
									{currentProblem.difficulty}
								</div>
								<div className='rounded p-[3px] ml-4 text-lg transition-colors duration-200 text-green-s text-dark-green-s'>
									<BsCheck2Circle />
								</div>
								<div
									className='flex items-center cursor-pointer hover:bg-dark-fill-3 space-x-1 rounded p-[3px]  ml-4 text-lg transition-colors duration-200 text-dark-gray-6'
									onClick={handleLikeClick}
								>
									{liked && !updating ? <AiFillLike className='text-dark-blue-s' />
										: updating ? <AiOutlineLoading3Quarters className='animate-spin' />
											: <AiFillLike />}
									<span className='text-xs'>{currentProblem.likes}</span>
								</div>
								<div
									className='flex items-center cursor-pointer hover:bg-dark-fill-3 space-x-1 rounded p-[3px]  ml-4 text-lg transition-colors duration-200 text-green-s text-dark-gray-6'
									onClick={handleDislikeClick}
								>
									{disliked ? <AiFillDislike className='text-dark-blue-s' />
										: updating ? <AiOutlineLoading3Quarters className='animate-spin' />
											: <AiFillDislike />}
									<span className='text-xs'>{currentProblem.dislikes}</span>
								</div>
								<div
									className='cursor-pointer hover:bg-dark-fill-3  rounded p-[3px]  ml-4 text-xl transition-colors duration-200 text-green-s text-dark-gray-6 '
									onClick={handleStarClick}
								>
									{starred ? <AiFillStar className='text-dark-yellow' />
										: updating ? <AiOutlineLoading3Quarters className='animate-spin' />
											: <TiStarOutline />}
								</div>
							</div>
						) : (
							<div className='flex mt-3 space-x-2'>
								<RectangleSkeleton />
								<CircularSkeleton />
								<RectangleSkeleton />
								<RectangleSkeleton />
								<CircularSkeleton />
							</div>
						)}

						{/* Problem Statement(paragraphs) */}
						<div className='text-white text-sm'>
							<div
								dangerouslySetInnerHTML={{ __html: problem.problemStatement }}
							/>
						</div>

						{/* Examples */}
						<div className='mt-4'>
							{problem.examples.map((example, idx) => (
								<div key={idx}>
									<p className='font-medium text-white '>Example {idx + 1}: </p>
									{example.img ?
										<div className='flex justify-center'>
											<img src={example.img} alt='example' className='my-3' />
										</div>
										: null
									}
									<div className='example-card'>
										<pre>
											<strong className='text-white'>Input: </strong> {example.inputText}
											<br />
											<strong>Output:</strong> {example.outputText} <br />
											{
												example.explanation ?
													<>
														<strong>Explanation:</strong> {example.explanation}
													</>
													: null
											}
										</pre>
									</div>
								</div>
							))}
						</div>

						{/* Constraints */}
						<div className='my-4'>
							<div className='text-white text-sm font-medium'>Constraints:</div>
							<ul className='text-white ml-5 list-disc'>
								<div
									dangerouslySetInnerHTML={{ __html: problem.constraints }}
								/>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
export default ProblemDescription;