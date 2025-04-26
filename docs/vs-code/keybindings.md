
# Visual Studio Code Keybindings for Roundabout Development

## Overview
This document provides recommended keyboard shortcuts and custom keybindings to enhance productivity when working on the Roundabout project.

## Default Keybindings to Remember

### General
- `Ctrl+S` / `Cmd+S`: Save file
- `Ctrl+P` / `Cmd+P`: Quick file open
- `Ctrl+Shift+P` / `Cmd+Shift+P`: Command palette
- `Ctrl+,` / `Cmd+,`: Open settings
- `Ctrl+B` / `Cmd+B`: Toggle sidebar
- `Alt+Z` / `Option+Z`: Toggle word wrap

### Editing
- `Ctrl+Space` / `Cmd+Space`: Trigger suggestions
- `Ctrl+X` / `Cmd+X`: Cut line (when nothing is selected)
- `Ctrl+C` / `Cmd+C`: Copy line (when nothing is selected)
- `Alt+↑` / `Option+↑`: Move line up
- `Alt+↓` / `Option+↓`: Move line down
- `Ctrl+Shift+K` / `Cmd+Shift+K`: Delete line
- `Ctrl+Enter` / `Cmd+Enter`: Insert line below
- `Ctrl+Shift+Enter` / `Cmd+Shift+Enter`: Insert line above
- `Ctrl+/` / `Cmd+/`: Toggle line comment
- `Ctrl+]` / `Cmd+]`: Indent line
- `Ctrl+[` / `Cmd+[`: Outdent line

### Navigation
- `Ctrl+G` / `Cmd+G`: Go to line
- `Ctrl+T` / `Cmd+T`: Go to symbol
- `F12`: Go to definition
- `Alt+F12` / `Option+F12`: Peek definition
- `Ctrl+Shift+O` / `Cmd+Shift+O`: Go to symbol in file
- `Ctrl+Tab` / `Cmd+Tab`: Navigate editor tabs

### Search
- `Ctrl+F` / `Cmd+F`: Find
- `Ctrl+H` / `Cmd+H`: Replace
- `Ctrl+Shift+F` / `Cmd+Shift+F`: Find in files
- `Ctrl+Shift+H` / `Cmd+Shift+H`: Replace in files

### TypeScript/React Specific
- `Ctrl+.` / `Cmd+.`: Quick fix
- `F8`: Go to next error or warning
- `Shift+F8`: Go to previous error or warning
- `F2`: Rename symbol
- `Ctrl+I` / `Cmd+I`: Format document (useful for TSX/JSX)

## Recommended Custom Keybindings

Create a `keybindings.json` file with these customizations for Roundabout development:

```json
[
  // Fast navigation between components and their test files
  {
    "key": "alt+t",
    "command": "typescript.findAllFileReferences",
    "when": "editorTextFocus && editorLangId == 'typescript' || editorLangId == 'typescriptreact'"
  },
  
  // Quick file creation for React components
  {
    "key": "ctrl+alt+n",
    "command": "explorer.newFile",
    "when": "explorerViewletFocus"
  },
  
  // Toggle between related files (e.g., component and hooks)
  {
    "key": "alt+o",
    "command": "workbench.action.quickOpen",
    "args": {
      "query": "${fileBasenameNoExtension}"
    }
  },
  
  // Toggle terminal focus
  {
    "key": "ctrl+`",
    "command": "workbench.action.terminal.toggleTerminal"
  },
  
  // Split editor vertically (useful for component/hook pairs)
  {
    "key": "ctrl+alt+v",
    "command": "workbench.action.splitEditorRight"
  },
  
  // Split editor horizontally (useful for component/test pairs)
  {
    "key": "ctrl+alt+h",
    "command": "workbench.action.splitEditorDown"
  },
  
  // Quick format for React components
  {
    "key": "ctrl+alt+f",
    "command": "editor.action.formatDocument",
    "when": "editorTextFocus && editorLangId == 'typescriptreact'"
  },
  
  // Quick import organization
  {
    "key": "ctrl+alt+i",
    "command": "editor.action.organizeImports",
    "when": "editorTextFocus && editorLangId == 'typescript' || editorLangId == 'typescriptreact'"
  },
  
  // Quick access to component refactoring options
  {
    "key": "ctrl+alt+r",
    "command": "editor.action.refactor",
    "when": "editorHasCodeActionsProvider && editorTextFocus && !editorReadonly"
  }
]
```

## Productivity Shortcuts for Roundabout Development

### Custom Tasks
- `Ctrl+Shift+B` / `Cmd+Shift+B`: Run default build task (configured in tasks.json)
- `Ctrl+Shift+T` / `Cmd+Shift+T`: Run test task

### Extension-specific Shortcuts

#### ESLint
- `Ctrl+Alt+L` / `Cmd+Option+L`: Fix all auto-fixable ESLint issues

#### Git
- `Ctrl+Shift+G` / `Cmd+Shift+G`: Open source control panel
- `Ctrl+Enter` / `Cmd+Enter`: Commit (when in source control message input)
- `Alt+G P` / `Option+G P`: Git push
- `Alt+G F` / `Option+G F`: Git fetch

#### Tailwind CSS
- `Ctrl+Space` / `Cmd+Space`: Trigger Tailwind CSS class suggestions (when in class attribute)

## Multi-cursor and Selection Techniques

- `Alt+Click` / `Option+Click`: Insert cursor
- `Ctrl+Alt+↑/↓` / `Cmd+Option+↑/↓`: Insert cursor above/below
- `Ctrl+D` / `Cmd+D`: Select current word and find next occurrence
- `Ctrl+L` / `Cmd+L`: Select current line
- `Shift+Alt+→` / `Shift+Option+→`: Expand selection
- `Shift+Alt+←` / `Shift+Option+←`: Shrink selection
- `Ctrl+Shift+L` / `Cmd+Shift+L`: Select all occurrences of current selection

## Installation

1. Open VS Code
2. Press `Ctrl+Shift+P` / `Cmd+Shift+P` to open the command palette
3. Type "Preferences: Open Keyboard Shortcuts (JSON)"
4. Copy and paste the custom keybindings above
5. Save the file

These keybindings are designed to streamline Roundabout development workflows and can be customized further based on personal preferences.

