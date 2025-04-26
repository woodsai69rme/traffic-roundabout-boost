
# VS Code Extensions Configuration

## Essential Extensions

### 1. ESLint
- Installation: `ext install dbaeumer.vscode-eslint`
- Configuration: Follows project's `.eslintrc`
- Purpose: Code quality and consistency

### 2. Prettier
- Installation: `ext install esbenp.prettier-vscode`
- Configuration: Uses project's `.prettierrc`
- Purpose: Code formatting

### 3. Tailwind CSS IntelliSense
- Installation: `ext install bradlc.vscode-tailwindcss`
- Purpose: CSS class suggestions and documentation

### 4. Git Lens
- Installation: `ext install eamodio.gitlens`
- Purpose: Enhanced Git integration and history

## Recommended Settings
```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.updateImportsOnFileMove.enabled": "always"
}
```
