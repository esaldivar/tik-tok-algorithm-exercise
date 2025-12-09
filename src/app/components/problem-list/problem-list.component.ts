import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Problem } from '../../models/problem';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-problem-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './problem-list.component.html',
  styleUrls: ['./problem-list.component.scss']
})
export class ProblemListComponent implements OnInit {
  @Output() problemSelected = new EventEmitter<Problem>();

  problems: Problem[] = [];
  filteredProblems: Problem[] = [];
  selectedProblem: Problem | null = null;
  isLoading = false;
  errorMessage = '';

  filterText = '';
  selectedDifficulty: string | null = null;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadProblems();
  }

  loadProblems(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.apiService.getProblems()
      .then(response => {
        if (response.success && response.data) {
          this.problems = response.data;
          this.applyFilters();
        } else {
          this.errorMessage = response.error || 'Failed to load problems';
        }
      })
      .catch(error => {
        this.errorMessage = 'Error connecting to server: ' + (error.message || error);
        console.error('Error loading problems:', error);
      })
      .finally(() => {
        this.isLoading = false;
      });
  }

  selectProblem(problem: Problem): void {
    this.selectedProblem = problem;
    this.problemSelected.emit(problem);
  }

  applyFilters(): void {
    this.filteredProblems = this.problems.filter(problem => {
      const matchesText = problem.title.toLowerCase().includes(this.filterText.toLowerCase()) ||
                          problem.description.toLowerCase().includes(this.filterText.toLowerCase());
      const matchesDifficulty = !this.selectedDifficulty || problem.difficulty === this.selectedDifficulty;
      return matchesText && matchesDifficulty;
    });
  }

  onFilterChange(): void {
    this.applyFilters();
  }

  getDifficultyColor(difficulty: string): string {
    switch (difficulty) {
      case 'Easy':
        return 'difficulty-easy';
      case 'Medium':
        return 'difficulty-medium';
      case 'Hard':
        return 'difficulty-hard';
      default:
        return '';
    }
  }
}
