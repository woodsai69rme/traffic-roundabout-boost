
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';
import {
  BarChart3,
  Calendar,
  FileText,
  Home,
  LayoutDashboard,
  Link2,
  LogIn,
  Search,
  Settings,
  Users,
  Zap,
  Globe,
  BookOpen,
  DollarSign,
  MessageSquare,
} from 'lucide-react';

interface SearchItem {
  label: string;
  icon: React.ReactNode;
  path: string;
  keywords?: string[];
}

const pages: SearchItem[] = [
  { label: 'Home', icon: <Home className="h-4 w-4" />, path: '/', keywords: ['landing', 'index'] },
  { label: 'Dashboard', icon: <LayoutDashboard className="h-4 w-4" />, path: '/dashboard', keywords: ['overview', 'stats', 'summary'] },
  { label: 'Content Planner', icon: <Calendar className="h-4 w-4" />, path: '/content-planner', keywords: ['schedule', 'posts', 'calendar'] },
  { label: 'Analytics', icon: <BarChart3 className="h-4 w-4" />, path: '/analytics', keywords: ['metrics', 'data', 'reports', 'engagement'] },
  { label: 'Audience Insights', icon: <Users className="h-4 w-4" />, path: '/audience-insights', keywords: ['demographics', 'followers', 'audience'] },
  { label: 'AI Content Creator', icon: <Zap className="h-4 w-4" />, path: '/ai-content', keywords: ['generate', 'ai', 'write', 'create'] },
  { label: 'Platforms', icon: <Globe className="h-4 w-4" />, path: '/platforms', keywords: ['connect', 'social', 'twitter', 'instagram', 'facebook', 'linkedin', 'tiktok'] },
  { label: 'API Integrations', icon: <Link2 className="h-4 w-4" />, path: '/api-integrations', keywords: ['webhooks', 'api', 'connect'] },
  { label: 'Profile', icon: <Settings className="h-4 w-4" />, path: '/profile', keywords: ['account', 'settings', 'user'] },
  { label: 'Documentation', icon: <BookOpen className="h-4 w-4" />, path: '/documentation', keywords: ['docs', 'help', 'guide'] },
  { label: 'Communities', icon: <MessageSquare className="h-4 w-4" />, path: '/communities', keywords: ['groups', 'community'] },
  { label: 'Monetization', icon: <DollarSign className="h-4 w-4" />, path: '/monetization', keywords: ['revenue', 'pricing', 'billing'] },
  { label: 'UTM Link Builder', icon: <Link2 className="h-4 w-4" />, path: '/utm-builder', keywords: ['utm', 'campaign', 'tracking', 'links'] },
];

const actions: SearchItem[] = [
  { label: 'Log In', icon: <LogIn className="h-4 w-4" />, path: '/login', keywords: ['signin', 'auth'] },
  { label: 'Sign Up', icon: <LogIn className="h-4 w-4" />, path: '/register', keywords: ['create account'] },
];

const GlobalSearch = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const handleSelect = (path: string) => {
    setOpen(false);
    navigate(path);
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 rounded-md border border-input bg-background px-3 py-1.5 text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
      >
        <Search className="h-3.5 w-3.5" />
        <span className="hidden sm:inline">Search...</span>
        <kbd className="hidden sm:inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search pages, features, actions..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Pages">
            {pages.map((item) => (
              <CommandItem
                key={item.path}
                value={`${item.label} ${item.keywords?.join(' ') ?? ''}`}
                onSelect={() => handleSelect(item.path)}
              >
                {item.icon}
                <span>{item.label}</span>
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Actions">
            {actions.map((item) => (
              <CommandItem
                key={item.path}
                value={`${item.label} ${item.keywords?.join(' ') ?? ''}`}
                onSelect={() => handleSelect(item.path)}
              >
                {item.icon}
                <span>{item.label}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
};

export default GlobalSearch;
