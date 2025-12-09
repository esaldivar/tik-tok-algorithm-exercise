import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExecutionResult, TestResult } from '../../models/execution';

@Component({
  selector: 'app-output',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './output.component.html',
  styleUrls: ['./output.component.scss']
})
export class OutputComponent {
  @Input() result: ExecutionResult | null = null;

  getStatusClass(): string {
    if (!this.result) return '';
    return this.result.success ? 'success' : 'error';
  }

  getStatusText(): string {
    if (!this.result) return '';
    return this.result.success ? 'Accepted' : 'Error';
  }

  getPassedCount(): number {
    if (!this.result?.testResults) return 0;
    return this.result.testResults.filter(t => t.passed).length;
  }

  getTotalCount(): number {
    return this.result?.testResults?.length || 0;
  }

  getTestStatusClass(testResult: TestResult): string {
    return testResult.passed ? 'passed' : 'failed';
  }
}
