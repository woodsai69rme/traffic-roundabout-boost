
# Visual Studio Code Launch Configuration

## Overview
This document provides instructions for setting up optimal launch configurations in VS Code for debugging Roundabout applications.

## Launch Configuration

Create a `.vscode/launch.json` file with the following configurations:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "chrome",
      "request": "launch",
      "name": "Launch Chrome against localhost",
      "url": "http://localhost:5173",
      "webRoot": "${workspaceFolder}"
    },
    {
      "type": "node",
      "request": "launch",
      "name": "Launch Backend",
      "skipFiles": ["<node_internals>/**"],
      "program": "${workspaceFolder}/supabase/functions/index.ts",
      "outFiles": ["${workspaceFolder}/dist/**/*.js"]
    },
    {
      "type": "node",
      "request": "launch",
      "name": "Run Tests",
      "program": "${workspaceFolder}/node_modules/vitest/vitest.mjs",
      "args": ["run"],
      "console": "integratedTerminal"
    }
  ],
  "compounds": [
    {
      "name": "Full Stack",
      "configurations": ["Launch Chrome against localhost", "Launch Backend"]
    }
  ]
}
```

## Debugging Features

### Breakpoints
1. Click in the gutter to the left of the line number
2. Use conditional breakpoints by right-clicking on the gutter
3. Use logpoints to log messages without modifying code

### Watch Expressions
1. Add variables to the watch panel in the debug view
2. Use expressions like `user.profile.settings` to monitor nested properties

### Call Stack Navigation
1. Use the call stack panel to navigate through function calls
2. Click on frames to jump to different points in the execution path

## Remote Debugging

For debugging deployed applications:
1. Enable source maps in your build configuration
2. Configure remote Chrome debugging
3. Use the VS Code extension "Debugger for Chrome" for remote debugging

## Troubleshooting

### Common Issues

#### Breakpoints Not Hitting
- Ensure source maps are correctly configured
- Verify the webRoot setting matches your project structure
- Check that the URL is correct

#### Connection Issues
- Verify port settings are correct
- Check for network restrictions or firewall settings
- Ensure the debugger extension is up to date

#### Performance Problems
- Limit the number of watch expressions
- Avoid complex conditional breakpoints
- Consider logging instead of breaking for large loops
