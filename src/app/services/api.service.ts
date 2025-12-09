import { Injectable } from '@angular/core';
import axios, { AxiosInstance } from 'axios';
import { Problem } from '../models/problem';
import { SubmissionRequest, ExecutionResult } from '../models/execution';
import { ApiResponse } from '../models/api';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiClient: AxiosInstance;
  private baseUrl = 'http://localhost:5000/api'; // Update this with your backend URL

  constructor() {
    this.apiClient = axios.create({
      baseURL: this.baseUrl,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  /**
   * Fetch all problems from the backend
   */
  getProblems(): Promise<ApiResponse<Problem[]>> {
    return this.apiClient.get('/problems').then((res: any) => res.data);
  }

  /**
   * Fetch a single problem by ID
   */
  getProblem(problemId: string): Promise<ApiResponse<Problem>> {
    return this.apiClient.get(`/problems/${problemId}`).then((res: any) => res.data);
  }

  /**
   * Submit code for execution
   */
  submitCode(submission: SubmissionRequest): Promise<ApiResponse<ExecutionResult>> {
    return this.apiClient.post('/execute', submission).then((res: any) => res.data);
  }

  /**
   * Get execution result by ID (for polling)
   */
  getExecutionResult(executionId: string): Promise<ApiResponse<ExecutionResult>> {
    return this.apiClient.get(`/results/${executionId}`).then((res: any) => res.data);
  }

  /**
   * Run test cases against submitted code
   */
  runTests(submission: SubmissionRequest): Promise<ApiResponse<ExecutionResult>> {
    return this.apiClient.post('/test', submission).then((res: any) => res.data);
  }
}
