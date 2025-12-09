# Algorithm IDE - Quick Reference

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm build
```

## 📋 Project Overview

| Component | Purpose | Status |
|-----------|---------|--------|
| **IdeComponent** | Main IDE container | ✅ Complete |
| **ProblemListComponent** | Problem browser & filter | ✅ Complete |
| **EditorComponent** | Code editor with Monaco | ✅ Complete |
| **OutputComponent** | Results display | ✅ Complete |
| **ApiService** | Backend communication | ✅ Complete |
| **Models** | TypeScript interfaces | ✅ Complete |
| **Routing** | App navigation | ✅ Complete |

## 🔌 Backend API Configuration

**File**: `src/app/services/api.service.ts`
**Line**: 14
```typescript
private baseUrl = 'http://localhost:5000/api'; // Update this
```

## 📡 Expected API Endpoints

Your backend must provide:

```
GET  /api/problems          - List all problems
GET  /api/problems/:id      - Get single problem
POST /api/test              - Run test cases
POST /api/execute           - Submit code
GET  /api/results/:id       - Poll execution result
```

## 🎯 Key Features

- ✅ Multi-language support (TypeScript/JavaScript/.NET)
- ✅ Monaco Editor integration
- ✅ Problem filtering & search
- ✅ Test case execution
- ✅ Detailed result display
- ✅ Dark theme UI
- ✅ Responsive layout

## 📚 File Locations

```
Models:         src/app/models/
Services:       src/app/services/
Components:     src/app/components/
Routes:         src/app/app.routes.ts
Main App:       src/app/app.component.ts
```

## 🧪 Testing

1. **Without Backend**
   - UI loads fully ✓
   - API calls fail (expected) ✓
   - Error messages display ✓

2. **With Backend**
   - All features work ✓
   - Code executes ✓
   - Results display ✓

## 🐛 Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| Monaco not loading | Check internet/CDN access |
| API errors | Verify backend URL in api.service.ts |
| CORS errors | Enable CORS in backend |
| Build fails | Run `npm install` again |
| Port 4200 in use | Use `ng serve --port 4201` |

## 📦 Dependencies

```json
{
  "@angular/core": "^19.2.0",
  "@angular/router": "^19.2.0",
  "monaco-editor": "^0.50.0",
  "axios": "^1.7.0"
}
```

## 🎨 Theme Colors

- Background: `#1e1e1e`
- Text: `#e0e0e0`
- Primary: `#007acc` (Blue)
- Success: `#00a651` (Green)
- Error: `#dc3545` (Red)

## 📱 Responsive Design

- Desktop (>1400px): 4-panel layout
- Tablet (≤1400px): Stacked layout
- Mobile: Single column

## 💾 Building for Production

```bash
npm run build
# Output: dist/tik-tok-angular-project
```

Then deploy the `dist` folder to your web server.

## 🔄 Development Workflow

1. **Edit components** in `src/app/components/`
2. **Update models** in `src/app/models/`
3. **Modify API calls** in `src/app/services/api.service.ts`
4. **Test in browser** at `http://localhost:4200`

## 📖 Documentation Files

- `ALGORITHM_IDE_README.md` - Full documentation
- `IMPLEMENTATION_SUMMARY.md` - Implementation details
- This file - Quick reference

## ✨ Architecture Benefits

- **Modular**: Each component is independent
- **Scalable**: Easy to add new features
- **Maintainable**: Clear separation of concerns
- **Type-Safe**: Full TypeScript support
- **Performant**: Optimized bundle size

## 🎯 Next Phase: Backend API

Create your backend with these endpoints:

**GET /api/problems**
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
      "examples": [{"input": "[2,7]", "output": "[0,1]"}],
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

**POST /api/test**
```json
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
    ]
  }
}
```

---

**Ready to Go!** 🚀

Your IDE frontend is complete. Connect it to your backend and start solving algorithms!
