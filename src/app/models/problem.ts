export interface Problem {
  id: string;
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string;
  examples: TestCase[];
  constraints: string;
  functionSignature: string;
  defaultCode: {
    typescript: string;
    javascript: string;
    dotnet: string;
  };
}

export interface TestCase {
  input: string;
  output: string;
  explanation?: string;
}
