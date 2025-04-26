
# Visual Studio Code Tasks Configuration

## Overview
This document explains how to set up task configurations in VS Code for automating common development workflows in the Roundabout project.

## Tasks Configuration

Create a `.vscode/tasks.json` file with the following tasks:

```json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "Start Development Server",
      "type": "npm",
      "script": "dev",
      "problemMatcher": [],
      "presentation": {
        "reveal": "always",
        "panel": "dedicated"
      },
      "group": {
        "kind": "build",
        "isDefault": true
      }
    },
    {
      "label": "Build Project",
      "type": "npm",
      "script": "build",
      "problemMatcher": [],
      "presentation": {
        "reveal": "silent",
        "panel": "shared"
      }
    },
    {
      "label": "Run Tests",
      "type": "npm",
      "script": "test",
      "problemMatcher": [],
      "presentation": {
        "reveal": "always",
        "panel": "shared"
      },
      "group": {
        "kind": "test",
        "isDefault": true
      }
    },
    {
      "label": "Lint Project",
      "type": "npm",
      "script": "lint",
      "problemMatcher": ["$eslint-stylish"],
      "presentation": {
        "reveal": "never",
        "panel": "shared"
      }
    },
    {
      "label": "Format Code",
      "type": "npm",
      "script": "format",
      "problemMatcher": [],
      "presentation": {
        "reveal": "never"
      }
    },
    {
      "label": "Start Supabase Local",
      "type": "shell",
      "command": "npx supabase start",
      "problemMatcher": [],
      "presentation": {
        "reveal": "always",
        "panel": "dedicated"
      }
    }
  ]
}
```

## Running Tasks

### Keyboard Shortcuts
- Press `Ctrl+Shift+B` to run the default build task
- Press `Ctrl+Shift+P` and type "Tasks: Run Task" to select a specific task

### Task Explorer
1. Install the VS Code extension "Task Explorer"
2. Use the Task Explorer panel to view and run tasks
3. Group and organize tasks by category

## Compound Tasks

You can create compound tasks that run multiple tasks in sequence:

```json
{
  "label": "Dev Environment",
  "dependsOrder": "sequence",
  "dependsOn": ["Start Supabase Local", "Start Development Server"],
  "problemMatcher": []
}
```

## Task Automation

### Watch Tasks
Configure file watching to trigger tasks automatically:

```json
{
  "label": "Watch TypeScript",
  "type": "typescript",
  "tsconfig": "tsconfig.json",
  "option": "watch",
  "problemMatcher": ["$tsc-watch"],
  "presentation": {
    "reveal": "never",
    "panel": "dedicated"
  },
  "runOptions": {
    "runOn": "folderOpen"
  }
}
```

### Background Tasks
Set up tasks that run in the background:

```json
{
  "label": "Watch CSS",
  "type": "shell",
  "command": "npx tailwindcss -i ./src/index.css -o ./dist/output.css --watch",
  "problemMatcher": [],
  "presentation": {
    "reveal": "never",
    "panel": "dedicated"
  },
  "isBackground": true
}
```

## Troubleshooting

### Common Issues

#### Task Not Found
- Verify the script exists in package.json
- Check for typos in the script name
- Ensure npm packages are installed

#### Task Fails to Start
- Check terminal output for error messages
- Verify environment variables are set correctly
- Check file paths in task configuration

#### Multiple Terminals Opening
- Use the "presentation" configuration to control terminal behavior
- Set "panel" to "shared" to reuse terminals
