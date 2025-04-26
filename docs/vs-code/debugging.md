
# Visual Studio Code Debugging Guide

## Overview
This guide provides detailed instructions for setting up and using VS Code's powerful debugging capabilities with the Roundabout application.

## Debug Configuration

### Frontend Debugging
To debug the React application:

1. Create a `.vscode/launch.json` file with the following configuration:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "chrome",
      "request": "launch",
      "name": "Launch Chrome against localhost",
      "url": "http://localhost:5173",
      "webRoot": "${workspaceFolder}",
      "sourceMaps": true,
      "sourceMapPathOverrides": {
        "webpack:///src/*": "${webRoot}/src/*"
      }
    }
  ]
}
```

2. Start your development server (`npm run dev`)
3. Press F5 to launch Chrome with debugger attached

### Edge Functions Debugging
To debug Supabase Edge Functions:

```json
{
  "name": "Debug Edge Functions",
  "type": "node",
  "request": "launch",
  "runtimeExecutable": "npm",
  "runtimeArgs": ["run", "functions:serve"],
  "skipFiles": ["<node_internals>/**"],
  "outFiles": ["${workspaceFolder}/supabase/functions/**/*.js"]
}
```

## Debugging Techniques

### Breakpoints

#### Basic Breakpoints
- Click in the gutter (left margin of editor) to set a breakpoint
- When execution reaches the breakpoint, the debugger will pause

#### Conditional Breakpoints
Right-click on the gutter and select "Add Conditional Breakpoint":
```javascript
user && user.isAdmin // Only break when user is an admin
```

#### Logpoints
Right-click on the gutter and select "Add Logpoint":
```
User data: {JSON.stringify(user)}
```
This logs information without pausing execution.

### Data Inspection

#### Watch Expressions
Add expressions to the Watch panel to monitor their values:
- Simple variables: `count`
- Complex expressions: `platforms.filter(p => p.isConnected)`
- Object properties: `user.profile.settings`

#### Debug Console
Use the Debug Console to evaluate expressions while paused:
- Type expressions to evaluate in the current context
- Access local variables without any prefix
- Use console API: `console.log()`, `console.table()`

### Execution Control

#### Step Controls
- Continue (F5): Resume execution until the next breakpoint
- Step Over (F10): Execute the current line and stop at the next line
- Step Into (F11): Step into a function call
- Step Out (Shift+F11): Execute the rest of the current function

#### Call Stack Navigation
- View the call stack to see how execution arrived at the current point
- Click on different stack frames to navigate through the call hierarchy

## React DevTools Integration

Enable React DevTools integration for component debugging:

1. Install the "React Developer Tools" extension for Chrome
2. In VS Code, install the "React Developer Tools" extension
3. Configure integration in launch.json:

```json
{
  "type": "chrome",
  "request": "launch",
  "name": "Launch Chrome with React DevTools",
  "url": "http://localhost:5173",
  "webRoot": "${workspaceFolder}",
  "userDataDir": "${workspaceFolder}/.vscode/chrome",
  "runtimeArgs": [
    "--load-extension=${workspaceFolder}/node_modules/react-devtools/shell-chrome"
  ]
}
```

## Network Debugging

### Network Request Inspection
1. Use the Network tab in Chrome DevTools
2. Filter requests by type, domain, or status
3. Set breakpoints on XHR/fetch requests:
   - Open Chrome DevTools
   - Go to Sources tab
   - Expand the "XHR/fetch Breakpoints" section
   - Add a breakpoint for specific URLs

### API Call Debugging
To debug Supabase API calls:

1. Set breakpoints in your API service files
2. Watch network requests in Chrome DevTools
3. Add logging to track request/response data:
```typescript
const fetchPlatforms = async () => {
  console.log('Fetching platforms...');
  const { data, error } = await supabase.from('platforms').select('*');
  console.log('Result:', { data, error });
  return data;
};
```

## Performance Profiling

### CPU Profiling
1. Open Chrome DevTools Performance tab
2. Click "Record"
3. Perform the actions you want to profile
4. Stop recording and analyze results

### Memory Leaks
To identify memory leaks:

1. Open Chrome DevTools Memory tab
2. Take a heap snapshot
3. Perform suspected leaking operations
4. Take another snapshot and compare

## Advanced Debugging Features

### Debug Terminal Integration
Configure VS Code to log terminal output during debugging:

```json
{
  "name": "Debug with Terminal",
  "type": "node",
  "request": "launch",
  "program": "${workspaceFolder}/node_modules/vite/bin/vite.js",
  "args": ["dev"],
  "console": "integratedTerminal"
}
```

### Source Maps
Ensure source maps are properly configured:

1. Verify your tsconfig.json has sourceMap enabled:
```json
{
  "compilerOptions": {
    "sourceMap": true
  }
}
```

2. Make sure Vite is configured to generate source maps:
```javascript
// vite.config.js
export default defineConfig({
  build: {
    sourcemap: true
  }
});
```

## Troubleshooting Debugging Issues

### Common Problems and Solutions

#### Breakpoints Not Hitting
- Ensure source maps are correctly generated
- Verify the workspace folder is correctly set
- Check that the URL in launch configuration is correct

#### Network Issues
- Check CORS configurations
- Verify network connectivity
- Examine request/response headers

#### State Management Debugging
- Use Redux DevTools for Redux state
- Use React Query DevTools for query state
- Set breakpoints in state update functions
