
# Visual Studio Code Snippets for Roundabout

## Overview
This guide provides a collection of useful VS Code snippets to accelerate development with the Roundabout project.

## Installation

1. In VS Code, go to File > Preferences > User Snippets
2. Select "New Snippet file for Roundabout..."
3. Name it "roundabout.code-snippets"
4. Copy and paste the snippets below

## React Component Snippets

### New Component
```json
"React Functional Component": {
  "prefix": "rfc",
  "body": [
    "import React from 'react';",
    "",
    "interface ${1:ComponentName}Props {",
    "  ${2:prop}: ${3:type};",
    "}",
    "",
    "const ${1:ComponentName} = ({ ${2:prop} }: ${1:ComponentName}Props) => {",
    "  return (",
    "    <div>",
    "      $0",
    "    </div>",
    "  );",
    "};",
    "",
    "export default ${1:ComponentName};"
  ],
  "description": "Create a new React functional component with TypeScript"
}
```

### New Page Component
```json
"React Page Component": {
  "prefix": "rpage",
  "body": [
    "import React from 'react';",
    "import NavbarWithAuth from '@/components/NavbarWithAuth';",
    "import Footer from '@/components/Footer';",
    "",
    "const ${1:PageName} = () => {",
    "  return (",
    "    <div className=\"min-h-screen flex flex-col\">",
    "      <NavbarWithAuth />",
    "      <main className=\"flex-grow p-4 md:p-8\">",
    "        <div className=\"container mx-auto space-y-6\">",
    "          <h1 className=\"text-3xl md:text-4xl font-bold mb-2\">${1:PageName}</h1>",
    "          $0",
    "        </div>",
    "      </main>",
    "      <Footer />",
    "    </div>",
    "  );",
    "};",
    "",
    "export default ${1:PageName};"
  ],
  "description": "Create a new page component with Roundabout layout"
}
```

## React Hooks Snippets

### useState Hook
```json
"React useState Hook": {
  "prefix": "rstate",
  "body": [
    "const [${1:state}, set${1/(.*)/${1:/capitalize}/}] = useState${2:<${3:type}>}(${4:initialValue});"
  ],
  "description": "Add a useState hook"
}
```

### useEffect Hook
```json
"React useEffect Hook": {
  "prefix": "reffect",
  "body": [
    "useEffect(() => {",
    "  $0",
    "  return () => {",
    "    // Cleanup function",
    "  };",
    "}, [${1:dependencies}]);"
  ],
  "description": "Add a useEffect hook with cleanup"
}
```

### useQuery Hook
```json
"React Query Hook": {
  "prefix": "rquery",
  "body": [
    "const { data: ${1:data}, isLoading: ${2:isLoading}, error: ${3:error} } = useQuery({",
    "  queryKey: ['${4:key}'],",
    "  queryFn: ${5:fetchFunction},",
    "});"
  ],
  "description": "Add a React Query useQuery hook"
}
```

## Supabase Snippets

### Supabase Query
```json
"Supabase Query": {
  "prefix": "sbquery",
  "body": [
    "const { data: ${1:data}, error: ${2:error} } = await supabase",
    "  .from('${3:table}')",
    "  .select('${4:columns}')",
    "  .eq('${5:column}', ${6:value});"
  ],
  "description": "Create a Supabase query"
}
```

### Supabase Insert
```json
"Supabase Insert": {
  "prefix": "sbinsert",
  "body": [
    "const { data: ${1:data}, error: ${2:error} } = await supabase",
    "  .from('${3:table}')",
    "  .insert([{",
    "    ${4:column}: ${5:value}",
    "  }]);"
  ],
  "description": "Create a Supabase insert operation"
}
```

### Supabase Update
```json
"Supabase Update": {
  "prefix": "sbupdate",
  "body": [
    "const { data: ${1:data}, error: ${2:error} } = await supabase",
    "  .from('${3:table}')",
    "  .update({ ${4:column}: ${5:value} })",
    "  .eq('${6:matchColumn}', ${7:matchValue});"
  ],
  "description": "Create a Supabase update operation"
}
```

### Supabase Delete
```json
"Supabase Delete": {
  "prefix": "sbdelete",
  "body": [
    "const { error: ${1:error} } = await supabase",
    "  .from('${2:table}')",
    "  .delete()",
    "  .eq('${3:column}', ${4:value});"
  ],
  "description": "Create a Supabase delete operation"
}
```

## UI Component Snippets

### Card Component
```json
"Shadcn Card Component": {
  "prefix": "uicard",
  "body": [
    "<Card>",
    "  <CardHeader>",
    "    <CardTitle>${1:Title}</CardTitle>",
    "    <CardDescription>${2:Description}</CardDescription>",
    "  </CardHeader>",
    "  <CardContent>",
    "    $0",
    "  </CardContent>",
    "  <CardFooter>",
    "    <Button>${3:Action}</Button>",
    "  </CardFooter>",
    "</Card>"
  ],
  "description": "Create a Shadcn UI Card component"
}
```

### Form Field
```json
"Shadcn Form Field": {
  "prefix": "uiform",
  "body": [
    "<FormField",
    "  control={form.control}",
    "  name=\"${1:fieldName}\"",
    "  render={({ field }) => (",
    "    <FormItem>",
    "      <FormLabel>${2:Label}</FormLabel>",
    "      <FormControl>",
    "        <Input placeholder=\"${3:Placeholder}\" {...field} />",
    "      </FormControl>",
    "      <FormDescription>${4:Description}</FormDescription>",
    "      <FormMessage />",
    "    </FormItem>",
    "  )}",
    "/>"
  ],
  "description": "Create a Shadcn UI Form Field"
}
```

## Project-Specific Snippets

### Platform Connect Card
```json
"Platform Connect Card": {
  "prefix": "platform-card",
  "body": [
    "<PlatformCard",
    "  name=\"${1:Platform Name}\"",
    "  description=\"${2:Platform Description}\"",
    "  icon={${3:Icon}}",
    "  isConnected={${4:false}}",
    "  onConnect={() => ${5:handleConnect()}}",
    "/>"
  ],
  "description": "Add a Platform Connect Card"
}
```

### Stat Card
```json
"Stat Card": {
  "prefix": "stat-card",
  "body": [
    "<StatCard",
    "  title=\"${1:Title}\"",
    "  value={${2:value}}",
    "  change={${3:change}}",
    "  trend=\"${4|positive,negative,neutral|}\"",
    "  icon={${5:Icon}}",
    "/>"
  ],
  "description": "Add a Stat Card component"
}
```

## How to Use

Type the prefix (e.g., `rfc`) in a TypeScript or TSX file and press Tab to expand the snippet. Fill in the placeholders by typing and using Tab to move between them.

## Customization

You can customize these snippets or add your own by editing the `roundabout.code-snippets` file. Each snippet consists of:

- `prefix`: The text that triggers the snippet
- `body`: The expanded template (array of strings for multiple lines)
- `description`: An optional description

For more information on creating snippets, refer to the [VS Code documentation](https://code.visualstudio.com/docs/editor/userdefinedsnippets).

