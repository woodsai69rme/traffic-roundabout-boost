
# Visual Studio Code Snippets for Roundabout

## Overview
This document provides custom code snippets to accelerate development in the Roundabout project.

## Installing Snippets

To add these snippets to your VS Code:
1. Open Command Palette (`Ctrl+Shift+P`)
2. Type "Preferences: Configure User Snippets"
3. Select "New Global Snippets file..." or choose an existing language file
4. Add the snippets below to the file

## React Component Snippets

### React Functional Component (`rfc`)
```json
{
  "React Functional Component": {
    "prefix": "rfc",
    "body": [
      "import React from 'react';",
      "",
      "interface ${1:ComponentName}Props {",
      "  $2",
      "}",
      "",
      "const ${1:ComponentName} = ({ $3 }: ${1:ComponentName}Props) => {",
      "  return (",
      "    <div>",
      "      $4",
      "    </div>",
      "  );",
      "};",
      "",
      "export default ${1:ComponentName};"
    ],
    "description": "React Functional Component with TypeScript"
  }
}
```

### React Page Component (`rpage`)
```json
{
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
      "          <header>",
      "            <h1 className=\"text-3xl md:text-4xl font-bold mb-2\">${2:Page Title}</h1>",
      "            <p className=\"text-muted-foreground\">${3:Page description}</p>",
      "          </header>",
      "          ",
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
    "description": "React Page Component with Layout"
  }
}
```

## Hook Snippets

### Custom React Hook (`rhook`)
```json
{
  "React Custom Hook": {
    "prefix": "rhook",
    "body": [
      "import { useState, useEffect } from 'react';",
      "",
      "export const use${1:HookName} = ($2) => {",
      "  const [${3:state}, set${3/(.*)/${3:/capitalize}/}] = useState($4);",
      "",
      "  useEffect(() => {",
      "    $5",
      "    ",
      "    return () => {",
      "      $6",
      "    };",
      "  }, [$7]);",
      "",
      "  const ${8:handler} = () => {",
      "    $9",
      "  };",
      "",
      "  return { ${3:state}, ${8:handler} };",
      "};"
    ],
    "description": "Custom React Hook with TypeScript"
  }
}
```

### Supabase Query Hook (`squery`)
```json
{
  "Supabase Query Hook": {
    "prefix": "squery",
    "body": [
      "import { useQuery } from '@tanstack/react-query';",
      "import { supabase } from '@/integrations/supabase/client';",
      "",
      "export const use${1:QueryName} = ($2) => {",
      "  return useQuery({",
      "    queryKey: ['${3:queryKey}', $4],",
      "    queryFn: async () => {",
      "      const { data, error } = await supabase",
      "        .from('${5:tableName}')",
      "        .select('$6')",
      "        $7",
      "",
      "      if (error) throw error;",
      "      return data;",
      "    }",
      "  });",
      "};"
    ],
    "description": "Supabase Query Hook with React Query"
  }
}
```

## UI Component Snippets

### Card Component (`uicard`)
```json
{
  "UI Card Component": {
    "prefix": "uicard",
    "body": [
      "import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';",
      "",
      "interface ${1:CardName}Props {",
      "  title: string;",
      "  description?: string;",
      "  $2",
      "}",
      "",
      "export const ${1:CardName} = ({ title, description, $3 }: ${1:CardName}Props) => {",
      "  return (",
      "    <Card>",
      "      <CardHeader>",
      "        <CardTitle>{title}</CardTitle>",
      "        {description && <CardDescription>{description}</CardDescription>}",
      "      </CardHeader>",
      "      <CardContent>",
      "        $0",
      "      </CardContent>",
      "      <CardFooter>",
      "        $4",
      "      </CardFooter>",
      "    </Card>",
      "  );",
      "};"
    ],
    "description": "shadcn UI Card Component"
  }
}
```

### Form Component (`uiform`)
```json
{
  "UI Form Component": {
    "prefix": "uiform",
    "body": [
      "import { zodResolver } from '@hookform/resolvers/zod';",
      "import { useForm } from 'react-hook-form';",
      "import * as z from 'zod';",
      "import { Button } from '@/components/ui/button';",
      "import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';",
      "import { Input } from '@/components/ui/input';",
      "",
      "const formSchema = z.object({",
      "  ${1:fieldName}: z.string().min(2, {",
      "    message: '${2:Field} must be at least 2 characters.',",
      "  }),",
      "});",
      "",
      "export function ${3:FormName}() {",
      "  const form = useForm<z.infer<typeof formSchema>>({",
      "    resolver: zodResolver(formSchema),",
      "    defaultValues: {",
      "      ${1:fieldName}: '',",
      "    },",
      "  });",
      "",
      "  function onSubmit(values: z.infer<typeof formSchema>) {",
      "    console.log(values);",
      "    $0",
      "  }",
      "",
      "  return (",
      "    <Form {...form}>",
      "      <form onSubmit={form.handleSubmit(onSubmit)} className=\"space-y-8\">",
      "        <FormField",
      "          control={form.control}",
      "          name=\"${1:fieldName}\"",
      "          render={({ field }) => (",
      "            <FormItem>",
      "              <FormLabel>${2:Field}</FormLabel>",
      "              <FormControl>",
      "                <Input placeholder=\"${4:Placeholder}\" {...field} />",
      "              </FormControl>",
      "              <FormMessage />",
      "            </FormItem>",
      "          )}",
      "        />",
      "        <Button type=\"submit\">Submit</Button>",
      "      </form>",
      "    </Form>",
      "  );",
      "}"
    ],
    "description": "shadcn UI Form with React Hook Form and Zod"
  }
}
```

## Testing Snippets

### Vitest Component Test (`vtest`)
```json
{
  "Vitest Component Test": {
    "prefix": "vtest",
    "body": [
      "import { describe, it, expect, vi } from 'vitest';",
      "import { render, screen } from '@testing-library/react';",
      "import userEvent from '@testing-library/user-event';",
      "import ${1:ComponentName} from './${1:ComponentName}';",
      "",
      "describe('${1:ComponentName}', () => {",
      "  it('should render correctly', () => {",
      "    render(<${1:ComponentName} $2 />);",
      "    ",
      "    expect(screen.getByText('$3')).toBeInTheDocument();",
      "  });",
      "",
      "  it('should handle user interaction', async () => {",
      "    const user = userEvent.setup();",
      "    const handleClick = vi.fn();",
      "    ",
      "    render(<${1:ComponentName} $2 onClick={handleClick} />);",
      "    ",
      "    await user.click(screen.getByRole('button', { name: /click me/i }));",
      "    ",
      "    expect(handleClick).toHaveBeenCalledTimes(1);",
      "  });",
      "});"
    ],
    "description": "Vitest Component Test"
  }
}
```

## Platform-Specific Snippets

### Platform Connection Component (`platform`)
```json
{
  "Platform Connection Component": {
    "prefix": "platform",
    "body": [
      "import React from 'react';",
      "import { Button } from '@/components/ui/button';",
      "import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';",
      "import { Badge } from '@/components/ui/badge';",
      "",
      "interface ${1:PlatformName}ConnectorProps {",
      "  connected?: boolean;",
      "  onConnect: () => void;",
      "  onDisconnect: () => void;",
      "}",
      "",
      "const ${1:PlatformName}Connector = ({ connected = false, onConnect, onDisconnect }: ${1:PlatformName}ConnectorProps) => {",
      "  return (",
      "    <Card>",
      "      <CardHeader>",
      "        <div className=\"flex items-center justify-between\">",
      "          <CardTitle>${1:PlatformName}</CardTitle>",
      "          {connected ? (",
      "            <Badge variant=\"outline\" className=\"bg-green-500/10 text-green-500 border-green-500/20\">Connected</Badge>",
      "          ) : (",
      "            <Badge variant=\"outline\" className=\"bg-gray-500/10 text-gray-500 border-gray-500/20\">Not Connected</Badge>",
      "          )}",
      "        </div>",
      "        <CardDescription>${2:Description}</CardDescription>",
      "      </CardHeader>",
      "      <CardContent>",
      "        <div className=\"text-sm text-muted-foreground\">",
      "          {connected ? (",
      "            <p>Your ${1:PlatformName} account is connected and syncing data.</p>",
      "          ) : (",
      "            <p>Connect your ${1:PlatformName} account to start tracking metrics.</p>",
      "          )}",
      "        </div>",
      "      </CardContent>",
      "      <CardFooter>",
      "        {connected ? (",
      "          <Button variant=\"outline\" onClick={onDisconnect}>Disconnect</Button>",
      "        ) : (",
      "          <Button onClick={onConnect}>Connect ${1:PlatformName}</Button>",
      "        )}",
      "      </CardFooter>",
      "    </Card>",
      "  );",
      "};",
      "",
      "export default ${1:PlatformName}Connector;"
    ],
    "description": "Platform Connection Component"
  }
}
```

## Using Snippets

1. Type the snippet prefix (e.g., `rfc`)
2. Press `Tab` to trigger the snippet
3. Use `Tab` to navigate through the placeholders
4. Fill in the required information
