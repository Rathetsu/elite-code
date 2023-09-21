import { useEffect, useState } from "react";
import { Problem } from "../Problems/Problems";
import { firestore } from "@/firebase/firebase";
import { query, collection, orderBy, getDocs } from "firebase/firestore";

export default function useGetProblems(
  setLoading: React.Dispatch<React.SetStateAction<boolean>> | undefined
) {
  const [problems, setProblems] = useState<Problem[]>([]);

  useEffect(() => {
    const fetchProblems = async () => {
      setLoading(true);
      const q: any = query(
        collection(firestore, "problems"),
        orderBy("order", "asc")
      );
      const querySnapshot = await getDocs(q);
      const problemsFetched: Problem[] = [];
      querySnapshot.forEach((doc: any) => {
        problemsFetched.push({ id: doc.id, ...doc.data() });
      });
      setProblems(problemsFetched);
      setLoading(false);
    };
    fetchProblems();
  }, [setLoading]);

  return problems;
}
