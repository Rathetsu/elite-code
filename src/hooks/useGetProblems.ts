import { useEffect, useState } from "react";
import { DBProblem } from "../utils/types/problem";
import { firestore } from "@/firebase/firebase";
import { query, collection, orderBy, getDocs } from "firebase/firestore";

export default function useGetProblems(
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) {
  const [problems, setProblems] = useState<DBProblem[]>([]);

  useEffect(() => {
    const fetchProblems = async () => {
      setLoading(true);
      const q: any = query(
        collection(firestore, "problems"),
        orderBy("order", "asc")
      );
      const querySnapshot = await getDocs(q);
      const problemsFetched: DBProblem[] = [];
      querySnapshot.forEach((doc: any) => {
        problemsFetched.push({ ...(doc.data() as DBProblem) });
      });
      setProblems(problemsFetched);
      setLoading(false);
    };
    fetchProblems();
  }, [setLoading]);

  return problems;
}
