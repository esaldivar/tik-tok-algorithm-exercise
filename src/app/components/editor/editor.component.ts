import { Component, Input, OnInit, Output, EventEmitter, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Problem } from '../../models/problem';
import { Language, SubmissionRequest, ExecutionResult } from '../../models/execution';
import { ApiService } from '../../services/api.service';

declare var monaco: any;

@Component({
  selector: 'app-editor',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit, AfterViewInit {
  @Input() problem: Problem | null = null;
  @Output() resultReady = new EventEmitter<ExecutionResult>();

  @ViewChild('editorContainer', { static: false }) editorContainer!: ElementRef;

  selectedLanguage: Language = 'typescript';
  code = '';
  isRunning = false;
  isLoadingEditor = false;

  private editor: any;
  private editorLoaded = false;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadMonacoEditor();
  }

  ngAfterViewInit(): void {
    if (this.editorLoaded && this.editorContainer) {
      this.initializeEditor();
    }
  }

  private loadMonacoEditor(): void {
    this.isLoadingEditor = true;
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/monaco-editor@0.50.0/min/vs/loader.min.js';
    script.onload = () => {
      (window as any).require.config({ paths: { vs: 'https://cdn.jsdelivr.net/npm/monaco-editor@0.50.0/min/vs' } });
      (window as any).require(['vs/editor/editor.main'], () => {
        this.editorLoaded = true;
        this.isLoadingEditor = false;
        if (this.editorContainer) {
          this.initializeEditor();
        }
      });
    };
    document.body.appendChild(script);
  }

  private initializeEditor(): void {
    if (this.editor) {
      this.editor.dispose();
    }

    this.editor = monaco.editor.create(this.editorContainer.nativeElement, {
      value: this.code,
      language: this.getMonacoLanguage(this.selectedLanguage),
      theme: 'vs-dark',
      fontSize: 14,
      tabSize: 2,
      minimap: { enabled: false },
      scrollBeyondLastLine: false,
      wordWrap: 'on',
      automaticLayout: true
    });

    this.editor.onDidChangeModelContent(() => {
      this.code = this.editor.getValue();
    });
  }

  ngOnChanges(): void {
    if (this.problem && this.editorLoaded) {
      this.selectedLanguage = 'typescript';
      this.code = this.problem.defaultCode.typescript;
      if (this.editor) {
        this.editor.setValue(this.code);
      }
    }
  }

  changeLanguage(language: Language): void {
    this.selectedLanguage = language;
    const newCode = this.problem?.defaultCode[language] || '';
    this.code = newCode;
    if (this.editor) {
      this.editor.setValue(newCode);
      monaco.editor.setModelLanguage(this.editor.getModel(), this.getMonacoLanguage(language));
    }
  }

  runCode(): void {
    if (!this.problem || !this.code) {
      alert('Please select a problem and write some code');
      return;
    }

    this.isRunning = true;
    const submission: SubmissionRequest = {
      problemId: this.problem.id,
      code: this.code,
      language: this.selectedLanguage,
      testCases: this.problem.examples.map(ex => ({
        input: ex.input,
        expectedOutput: ex.output
      }))
    };

    this.apiService.runTests(submission)
      .then(result => {
        this.resultReady.emit(result.data || result as unknown as ExecutionResult);
      })
      .catch(error => {
        const errorResult: ExecutionResult = {
          success: false,
          error: 'Error running code: ' + (error.message || error)
        };
        this.resultReady.emit(errorResult);
      })
      .finally(() => {
        this.isRunning = false;
      });
  }

  submitCode(): void {
    if (!this.problem || !this.code) {
      alert('Please select a problem and write some code');
      return;
    }

    this.isRunning = true;
    const submission: SubmissionRequest = {
      problemId: this.problem.id,
      code: this.code,
      language: this.selectedLanguage
    };

    this.apiService.submitCode(submission)
      .then(result => {
        this.resultReady.emit(result.data || result as unknown as ExecutionResult);
      })
      .catch(error => {
        const errorResult: ExecutionResult = {
          success: false,
          error: 'Error submitting code: ' + (error.message || error)
        };
        this.resultReady.emit(errorResult);
      })
      .finally(() => {
        this.isRunning = false;
      });
  }

  resetCode(): void {
    if (this.problem) {
      this.code = this.problem.defaultCode[this.selectedLanguage];
      if (this.editor) {
        this.editor.setValue(this.code);
      }
    }
  }

  private getMonacoLanguage(language: Language): string {
    const languageMap: Record<Language, string> = {
      typescript: 'typescript',
      javascript: 'javascript',
      dotnet: 'csharp'
    };
    return languageMap[language];
  }
}
