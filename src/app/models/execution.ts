export type Language = 'typescript' | 'javascript' | 'dotnet';

export interface SubmissionRequest {
  problemId: string;
  code: string;
  language: Language;
  testCases?: TestCaseInput[];
}

export interface TestCaseInput {
  input: string;
  expectedOutput: string;
}

export interface ExecutionResult {
  success: boolean;
  output?: string;
  error?: string;
  testResults?: TestResult[];
  executionTime?: number;
  memoryUsed?: number;
}

export interface TestResult {
  testCaseIndex: number;
  passed: boolean;
  input: string;
  expected: string;
  actual?: string;
  error?: string;
}
