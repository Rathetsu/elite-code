export type Example = {
  id: number;
  inputText: string;
  outputText: string;
  explanation?: string;
  img?: string;
};

// local problem data
export type Problem = {
  id: string;
  order: number;
  title: string;
  difficulty: string;
  category: string;
  problemStatement: string;
  examples: Example[];
  constraints: string;
  startingCode: string;
  testingFunction: ((fun: any) => boolean) | string;
  startingFunctionName: string;
};

export type DBProblem = {
  id: string;
  order: number;
  title: string;
  category: string;
  difficulty: string;
  likes: number;
  dislikes: number;
  solution?: string;
};
