
# Visual Studio Code Keybindings for Roundabout Development

## Overview
This document provides recommended keyboard shortcuts and custom keybindings to enhance productivity when developing the Roundabout application.

## Default VS Code Shortcuts

### Essential Navigation
| Shortcut            | Action                      |
|---------------------|----------------------------|
| `Ctrl+P`            | Quick Open, Go to File     |
| `Ctrl+Shift+P`      | Show Command Palette       |
| `Ctrl+G`            | Go to Line                 |
| `Ctrl+Tab`          | Navigate editor tabs       |
| `Alt+←` / `Alt+→`   | Navigate back/forward      |
| `Ctrl+\`            | Split editor               |
| `Ctrl+1/2/3`        | Focus editor group         |

### Code Editing
| Shortcut                  | Action                                |
|---------------------------|---------------------------------------|
| `Ctrl+Space`              | Trigger suggestion                    |
| `Ctrl+Shift+Space`        | Trigger parameter hints               |
| `F12` or `Ctrl+Click`     | Go to Definition                      |
| `Alt+F12`                 | Peek Definition                       |
| `Shift+F12`               | Show References                       |
| `F2`                      | Rename Symbol                         |
| `Ctrl+.`                  | Quick Fix                             |
| `Alt+↑` / `Alt+↓`         | Move line up/down                     |
| `Ctrl+Shift+K`            | Delete line                           |
| `Ctrl+/`                  | Toggle line comment                   |
| `Alt+Shift+A`             | Toggle block comment                  |
| `Ctrl+D`                  | Select next occurrence                |
| `Ctrl+U`                  | Undo cursor position                  |

### TypeScript Specific
| Shortcut            | Action                              |
|---------------------|-------------------------------------|
| `Ctrl+Shift+I`      | Format document                     |
| `F8`                | Go to next error/warning            |
| `Shift+F8`          | Go to previous error/warning        |
| `Ctrl+K Ctrl+I`     | Show hover information              |

### Terminal & Debug
| Shortcut            | Action                              |
|---------------------|-------------------------------------|
| `Ctrl+`` | Toggle terminal                     |
| `F5`                | Start debugging                     |
| `Ctrl+F5`           | Start without debugging             |
| `F9`                | Toggle breakpoint                   |
| `F10`               | Step over                           |
| `F11`               | Step into                           |
| `Shift+F11`         | Step out                            |
| `F5` during debug   | Continue                            |

## Custom Keybindings

To add these custom keybindings:
1. Open Command Palette (`Ctrl+Shift+P`)
2. Type "Preferences: Open Keyboard Shortcuts (JSON)"
3. Add the following keybindings:

```json
[
  {
    "key": "ctrl+alt+r",
    "command": "workbench.action.tasks.runTask",
    "args": "Start Development Server"
  },
  {
    "key": "ctrl+alt+t",
    "command": "workbench.action.tasks.runTask",
    "args": "Run Tests"
  },
  {
    "key": "ctrl+alt+b",
    "command": "workbench.action.tasks.runTask",
    "args": "Build Project"
  },
  {
    "key": "ctrl+alt+l",
    "command": "workbench.action.tasks.runTask",
    "args": "Lint Project"
  },
  {
    "key": "ctrl+alt+f",
    "command": "workbench.action.tasks.runTask",
    "args": "Format Code"
  },
  {
    "key": "ctrl+alt+s",
    "command": "workbench.action.tasks.runTask",
    "args": "Start Supabase Local"
  },
  {
    "key": "ctrl+k ctrl+r",
    "command": "editor.action.refactor",
    "when": "editorHasCodeActionsProvider && editorTextFocus && !editorReadonly"
  },
  {
    "key": "ctrl+shift+r",
    "command": "editor.action.rename",
    "when": "editorHasRenameProvider && editorTextFocus && !editorReadonly"
  },
  {
    "key": "alt+i",
    "command": "editor.action.organizeImports",
    "when": "editorTextFocus && !editorReadonly && supportedCodeAction =~ /(\\s|^)source\\.organizeImports\\b/"
  },
  {
    "key": "ctrl+k ctrl+c",
    "command": "editor.action.commentLine",
    "when": "editorTextFocus && !editorReadonly"
  }
]
```

## Project-Specific Shortcuts

### React Component Navigation
| Custom Shortcut     | Action                                 |
|---------------------|----------------------------------------|
| `Ctrl+Alt+C`        | List all components in project         |
| `Ctrl+Alt+H`        | List all hooks in project              |
| `Ctrl+Alt+P`        | List all pages in project              |

Add these custom shortcuts with the following configuration:

```json
[
  {
    "key": "ctrl+alt+c",
    "command": "workbench.action.quickOpen",
    "args": "components/ "
  },
  {
    "key": "ctrl+alt+h",
    "command": "workbench.action.quickOpen",
    "args": "hooks/ "
  },
  {
    "key": "ctrl+alt+p",
    "command": "workbench.action.quickOpen",
    "args": "pages/ "
  }
]
```

## Extension Shortcuts

### GitLens
| Shortcut            | Action                             |
|---------------------|-----------------------------------|
| `Alt+B`             | Toggle File Blame                 |
| `Alt+H`             | Show Line History                 |
| `Ctrl+Shift+G G`    | Show Git Graph                    |

### ESLint
| Shortcut            | Action                             |
|---------------------|-----------------------------------|
| `Ctrl+Alt+L`        | Fix all auto-fixable problems     |

### Prettier
| Shortcut            | Action                             |
|---------------------|-----------------------------------|
| `Ctrl+Alt+F`        | Format document with Prettier     |

## Troubleshooting Keybindings

If keyboard shortcuts aren't working:
1. Check for conflicts in the "Keyboard Shortcuts" view
2. Verify extension status if it's an extension shortcut
3. Restart VS Code after making changes to keybindings.json
4. Check "when" clauses for context-specific bindings
