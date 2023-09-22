import React, { useEffect, useState } from "react";
import { DBProblem } from "@/utils/types/problem";
import { firestore } from "@/firebase/firebase";
import { doc, getDoc } from "firebase/firestore";

export default function useGetCurrentProblem(problemId: string) {
  console.log("problemId", problemId);
  const [currentProblem, setCurrentProblem] = useState<DBProblem | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [problemDifficultyClassName, setProblemDifficultyClassName] =
    useState<string>("");

  useEffect(() => {
    const getCurrentProblem = async () => {
      setLoading(true);
      try {
        const docRef = doc(firestore, "problems", problemId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data() as DBProblem;
          setCurrentProblem(data as DBProblem);
          setProblemDifficultyClassName(
            data.difficulty === 'Easy'
              ? 'bg-olive text-olive'
              : data.difficulty === 'Medium'
              ? 'bg-dark-yellow text-dark-yellow'
              : 'bg-dark-pink text-dark-pink'
          );
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.log("Error getting document:", error);
      }
      setLoading(false);
    };
    getCurrentProblem();

  }, [problemId]);

  return { currentProblem, loading, problemDifficultyClassName, setCurrentProblem };
}
