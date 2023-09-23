import React, { useState, useEffect } from 'react';
import { doc, getDoc } from  'firebase/firestore';
import { firestore } from '@/firebase/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase/firebase';
import { Problem } from '@/utils/types/problem';

export default function useGetSolvedProblems() {
	const [solvedProblems, setSolvedProblems] = useState<string[]>([]);
	const [user] = useAuthState(auth);

	useEffect (() => {
		const fetchSolvedProblems = async () => {
			const useRef = doc(firestore, 'users', user!.uid);
			const userDoc = await getDoc(useRef);

			if (userDoc.exists()) {
				setSolvedProblems(userDoc.data()!.solvedProblems);
			}
		};
		if (user) fetchSolvedProblems();
		if (!user) setSolvedProblems([]);
	}, [user]);

	return solvedProblems;
}