
import React, { useState, useMemo } from 'react';
import NavbarWithAuth from '@/components/NavbarWithAuth';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Copy, Link2, Plus, Trash2, ExternalLink } from 'lucide-react';
import { toast } from 'sonner';

interface UTMParams {
  url: string;
  source: string;
  medium: string;
  campaign: string;
  term: string;
  content: string;
}

interface SavedLink {
  id: string;
  params: UTMParams;
  createdAt: string;
}

const presets = {
  sources: ['google', 'facebook', 'twitter', 'linkedin', 'instagram', 'tiktok', 'email', 'newsletter', 'reddit', 'youtube'],
  mediums: ['social', 'cpc', 'email', 'organic', 'referral', 'display', 'affiliate', 'video', 'banner'],
};

const UTMBuilder = () => {
  const [params, setParams] = useState<UTMParams>({
    url: '',
    source: '',
    medium: '',
    campaign: '',
    term: '',
    content: '',
  });

  const [savedLinks, setSavedLinks] = useState<SavedLink[]>(() => {
    try {
      return JSON.parse(localStorage.getItem('utm_links') || '[]');
    } catch { return []; }
  });

  const generatedUrl = useMemo(() => {
    if (!params.url) return '';
    try {
      const url = new URL(params.url.startsWith('http') ? params.url : `https://${params.url}`);
      if (params.source) url.searchParams.set('utm_source', params.source);
      if (params.medium) url.searchParams.set('utm_medium', params.medium);
      if (params.campaign) url.searchParams.set('utm_campaign', params.campaign);
      if (params.term) url.searchParams.set('utm_term', params.term);
      if (params.content) url.searchParams.set('utm_content', params.content);
      return url.toString();
    } catch {
      return '';
    }
  }, [params]);

  const handleCopy = () => {
    if (!generatedUrl) return;
    navigator.clipboard.writeText(generatedUrl);
    toast.success('URL copied to clipboard!');
  };

  const handleSave = () => {
    if (!generatedUrl) return;
    const newLink: SavedLink = { id: crypto.randomUUID(), params: { ...params }, createdAt: new Date().toISOString() };
    const updated = [newLink, ...savedLinks];
    setSavedLinks(updated);
    localStorage.setItem('utm_links', JSON.stringify(updated));
    toast.success('Link saved!');
  };

  const handleDelete = (id: string) => {
    const updated = savedLinks.filter(l => l.id !== id);
    setSavedLinks(updated);
    localStorage.setItem('utm_links', JSON.stringify(updated));
    toast.success('Link removed');
  };

  const handleLoad = (link: SavedLink) => {
    setParams(link.params);
  };

  const update = (field: keyof UTMParams, value: string) => {
    setParams(p => ({ ...p, [field]: value }));
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <NavbarWithAuth />
      <main className="flex-1 container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">UTM Link Builder</h1>
          <p className="text-muted-foreground">Create campaign tracking URLs with UTM parameters for analytics.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Builder */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Link2 className="h-5 w-5" />Build Your URL</CardTitle>
              <CardDescription>Fill in the parameters below. Source, medium, and campaign are recommended.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="url">Website URL *</Label>
                <Input id="url" placeholder="https://example.com/page" value={params.url} onChange={e => update('url', e.target.value)} />
              </div>

              <div>
                <Label htmlFor="source">Campaign Source *</Label>
                <div className="flex gap-2">
                  <Input id="source" placeholder="e.g. google, facebook" value={params.source} onChange={e => update('source', e.target.value)} className="flex-1" />
                  <Select onValueChange={v => update('source', v)}>
                    <SelectTrigger className="w-24"><SelectValue placeholder="Pick" /></SelectTrigger>
                    <SelectContent>
                      {presets.sources.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="medium">Campaign Medium *</Label>
                <div className="flex gap-2">
                  <Input id="medium" placeholder="e.g. social, cpc, email" value={params.medium} onChange={e => update('medium', e.target.value)} className="flex-1" />
                  <Select onValueChange={v => update('medium', v)}>
                    <SelectTrigger className="w-24"><SelectValue placeholder="Pick" /></SelectTrigger>
                    <SelectContent>
                      {presets.mediums.map(m => <SelectItem key={m} value={m}>{m}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="campaign">Campaign Name *</Label>
                <Input id="campaign" placeholder="e.g. spring_sale, product_launch" value={params.campaign} onChange={e => update('campaign', e.target.value)} />
              </div>

              <div>
                <Label htmlFor="term">Campaign Term <span className="text-muted-foreground text-xs">(optional)</span></Label>
                <Input id="term" placeholder="e.g. running+shoes" value={params.term} onChange={e => update('term', e.target.value)} />
              </div>

              <div>
                <Label htmlFor="content">Campaign Content <span className="text-muted-foreground text-xs">(optional)</span></Label>
                <Input id="content" placeholder="e.g. banner_ad, text_link" value={params.content} onChange={e => update('content', e.target.value)} />
              </div>
            </CardContent>
          </Card>

          {/* Output */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Generated URL</CardTitle>
              </CardHeader>
              <CardContent>
                {generatedUrl ? (
                  <div className="space-y-3">
                    <div className="p-3 bg-muted rounded-md text-sm break-all font-mono">{generatedUrl}</div>
                    <div className="flex gap-2">
                      <Button onClick={handleCopy} className="flex-1"><Copy className="h-4 w-4 mr-1" />Copy</Button>
                      <Button variant="outline" onClick={handleSave}><Plus className="h-4 w-4 mr-1" />Save</Button>
                      <Button variant="outline" size="icon" asChild>
                        <a href={generatedUrl} target="_blank" rel="noopener noreferrer"><ExternalLink className="h-4 w-4" /></a>
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {params.source && <Badge variant="secondary">source: {params.source}</Badge>}
                      {params.medium && <Badge variant="secondary">medium: {params.medium}</Badge>}
                      {params.campaign && <Badge variant="secondary">campaign: {params.campaign}</Badge>}
                      {params.term && <Badge variant="outline">term: {params.term}</Badge>}
                      {params.content && <Badge variant="outline">content: {params.content}</Badge>}
                    </div>
                  </div>
                ) : (
                  <p className="text-muted-foreground text-sm">Enter a URL above to generate your tracking link.</p>
                )}
              </CardContent>
            </Card>

            {savedLinks.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Saved Links ({savedLinks.length})</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 max-h-64 overflow-y-auto">
                  {savedLinks.map(link => (
                    <div key={link.id} className="flex items-center justify-between p-2 rounded-md border text-sm group">
                      <button onClick={() => handleLoad(link)} className="text-left flex-1 truncate hover:text-primary transition-colors">
                        <span className="font-medium">{link.params.campaign || 'Untitled'}</span>
                        <span className="text-muted-foreground ml-2">{link.params.source}/{link.params.medium}</span>
                      </button>
                      <Button variant="ghost" size="icon" className="h-7 w-7 opacity-0 group-hover:opacity-100" onClick={() => handleDelete(link.id)}>
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default UTMBuilder;
