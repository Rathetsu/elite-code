import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "@/firebase/firebase";

export default function useGetUserDataForProblem(problemId: string) {
  const [userData, setUserData] = useState({
    liked: false,
    disliked: false,
    starred: false,
    solved: false,
  });
  const [user] = useAuthState(auth);

  useEffect(() => {
    const getUserDataForProblem = async () => {
      const userRef = doc(firestore, "users", user?.uid || "");
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        const userData = userSnap.data();
        const liked = userData?.likedProblems?.includes(problemId);
        const disliked = userData?.dislikedProblems?.includes(problemId);
        const starred = userData?.starredProblems?.includes(problemId);
        const solved = userData?.solvedProblems?.includes(problemId);
        setUserData({ liked, disliked, starred, solved });
      }
    };
    if (user) getUserDataForProblem();
    return () => {
      setUserData({
        liked: false,
        disliked: false,
        starred: false,
        solved: false,
      });
    };
  }, [problemId, user]);

  return { ...userData, setUserData };
}
