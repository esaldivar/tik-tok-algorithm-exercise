# Algorithm IDE - Frontend

A full-featured IDE built with Angular 19 for solving and testing algorithm problems. The frontend communicates with a backend API to manage problems, execute code, and track submissions.

## Features

✅ **Problem Browser** - Browse LeetCode-style algorithm problems with difficulty levels  
✅ **Code Editor** - Monaco Editor integration with syntax highlighting for TypeScript, JavaScript, and C#  
✅ **Multi-Language Support** - Write solutions in TypeScript, JavaScript, or .NET (C#)  
✅ **Live Test Execution** - Run code against test cases with instant feedback  
✅ **Results Display** - View detailed test results with pass/fail indicators  
✅ **Dark Theme** - Professional dark UI optimized for coding  
✅ **Responsive Layout** - Split-view UI with problem description, editor, and output panels  

## Project Structure

```
src/app/
├── models/                    # TypeScript interfaces
│   ├── api.ts                # API response wrapper
│   ├── problem.ts            # Problem and TestCase interfaces
│   └── execution.ts          # Execution and submission types
├── services/
│   └── api.service.ts        # Backend API client
├── components/
│   ├── ide/                  # Main IDE container
│   ├── problem-list/         # Problem selector panel
│   ├── editor/               # Monaco editor component
│   └── output/               # Results display component
├── app.component.ts          # Root component
└── app.routes.ts             # Routing configuration
```

## Installation & Setup

### Prerequisites
- Node.js 18+
- Angular CLI 19+

### Install Dependencies
```bash
npm install
```

### Configure Backend URL
Update the `baseUrl` in `src/app/services/api.service.ts`:
```typescript
private baseUrl = 'http://your-backend-url:port/api';
```

### Run Development Server
```bash
npm start
# or
ng serve
```

Navigate to `http://localhost:4200/`. The app will automatically reload when you change source files.

## API Contract

The frontend expects the following backend endpoints:

### `GET /api/problems`
Returns all available problems.
```json
{
  "success": true,
  "data": [
    {
      "id": "1",
      "title": "Two Sum",
      "description": "...",
      "difficulty": "Easy",
      "category": "Array",
      "examples": [...],
      "constraints": "...",
      "functionSignature": "...",
      "defaultCode": {
        "typescript": "...",
        "javascript": "...",
        "dotnet": "..."
      }
    }
  ]
}
```

### `GET /api/problems/:id`
Returns a specific problem by ID.

### `POST /api/test`
Execute code against test cases.
```json
Request:
{
  "problemId": "1",
  "code": "...",
  "language": "typescript",
  "testCases": [
    { "input": "...", "expectedOutput": "..." }
  ]
}

Response:
{
  "success": true,
  "data": {
    "success": true,
    "testResults": [
      {
        "testCaseIndex": 0,
        "passed": true,
        "input": "...",
        "expected": "...",
        "actual": "..."
      }
    ],
    "executionTime": 125,
    "memoryUsed": 45.2
  }
}
```

### `POST /api/execute`
Submit final code for evaluation.
```json
Request:
{
  "problemId": "1",
  "code": "...",
  "language": "typescript"
}

Response:
{
  "success": true,
  "data": {
    "success": true,
    "output": "Accepted",
    "executionTime": 125,
    "memoryUsed": 45.2
  }
}
```

## Components Overview

### IdeComponent
Main container that orchestrates the IDE layout and manages state between child components.

### ProblemListComponent
Displays filterable list of problems. Supports:
- Search by title/description
- Filter by difficulty level
- Problem selection

### EditorComponent
Monaco editor with:
- Language selection (TypeScript/JavaScript/.NET)
- Code templates from backend
- Run and Submit buttons
- Syntax highlighting

### OutputComponent
Displays execution results including:
- Pass/fail status
- Individual test case results
- Error messages
- Execution metrics (time, memory)

## Technologies Used

- **Angular 19** - Frontend framework
- **Monaco Editor 0.50** - Code editor
- **Axios** - HTTP client
- **SCSS** - Styling
- **TypeScript 5.7** - Type-safe code

## Development

### Build
```bash
npm run build
```

### Run Tests
```bash
npm test
```

### Watch Mode
```bash
npm run watch
```

## Environment Configuration

Create an `.env` file (optional):
```
BACKEND_URL=http://localhost:5000
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Error Handling

The IDE includes comprehensive error handling:
- Network errors when connecting to backend
- Compilation errors in submitted code
- Runtime errors during execution
- Test case failures with detailed diff

## Performance Considerations

- Monaco Editor is loaded from CDN
- Code submissions are optimized with timeouts
- Large problem lists are paginated
- Results are cached appropriately

## Known Limitations

- Monaco Editor loading may take a few seconds on first load
- Code execution timeout is set by backend
- Memory limits depend on backend configuration

## Future Enhancements

- [ ] User authentication and history
- [ ] Syntax error highlighting before submission
- [ ] Code templates and snippets
- [ ] Discussion/comments on problems
- [ ] Leaderboard and rankings
- [ ] Custom test case creation

## License

MIT
