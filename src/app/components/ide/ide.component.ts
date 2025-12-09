import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Problem } from '../../models/problem';
import { ExecutionResult } from '../../models/execution';
import { ProblemListComponent } from '../problem-list/problem-list.component';
import { EditorComponent } from '../editor/editor.component';
import { OutputComponent } from '../output/output.component';

@Component({
  selector: 'app-ide',
  standalone: true,
  imports: [CommonModule, FormsModule, ProblemListComponent, EditorComponent, OutputComponent],
  templateUrl: './ide.component.html',
  styleUrls: ['./ide.component.scss']
})
export class IdeComponent implements OnInit {
  @ViewChild(EditorComponent) editorComponent!: EditorComponent;

  selectedProblem: Problem | null = null;
  executionResult: ExecutionResult | null = null;

  ngOnInit(): void {
    // Initialize IDE
  }

  onProblemSelected(problem: Problem): void {
    this.selectedProblem = problem;
    this.executionResult = null;
  }

  onResultReady(result: ExecutionResult): void {
    this.executionResult = result;
  }
}
