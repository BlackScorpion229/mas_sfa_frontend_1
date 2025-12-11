import { ChatContext } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Database, BarChart3, FileText, History } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ChatSidebarProps {
  context: ChatContext;
  onContextChange: (context: ChatContext) => void;
  industry?: string;
  ticker?: string;
}

export function ChatSidebar({ context, onContextChange, industry, ticker }: ChatSidebarProps) {
  const toggles = [
    {
      id: 'industrySummary',
      label: 'Industry Summary',
      description: 'Include sector overview and trends',
      icon: Database,
      checked: context.includeIndustrySummary,
      onChange: () => onContextChange({ ...context, includeIndustrySummary: !context.includeIndustrySummary }),
    },
    {
      id: 'benchmarks',
      label: 'Benchmarks',
      description: 'Include industry benchmark ranges',
      icon: BarChart3,
      checked: context.includeBenchmarks,
      onChange: () => onContextChange({ ...context, includeBenchmarks: !context.includeBenchmarks }),
    },
    {
      id: 'stockAnalysis',
      label: 'Stock Analysis',
      description: 'Include fundamental analysis data',
      icon: FileText,
      checked: context.includeStockAnalysis,
      onChange: () => onContextChange({ ...context, includeStockAnalysis: !context.includeStockAnalysis }),
      disabled: !ticker,
    },
  ];

  return (
    <div className="space-y-4">
      <Card variant="glass">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Context Sources</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {toggles.map((toggle) => (
            <div
              key={toggle.id}
              className={cn(
                'flex items-start gap-3 p-3 rounded-lg',
                'bg-secondary/30 border border-border/50',
                toggle.disabled && 'opacity-50'
              )}
            >
              <toggle.icon className="w-5 h-5 text-primary mt-0.5" />
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <Label htmlFor={toggle.id} className="text-sm font-medium cursor-pointer">
                    {toggle.label}
                  </Label>
                  <Switch
                    id={toggle.id}
                    checked={toggle.checked}
                    onCheckedChange={toggle.onChange}
                    disabled={toggle.disabled}
                  />
                </div>
                <p className="text-xs text-muted-foreground">{toggle.description}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Active Context Info */}
      <Card variant="glass">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Active Context</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {industry && (
            <div className="flex items-center gap-2 text-sm">
              <span className="text-muted-foreground">Industry:</span>
              <span className="text-primary font-medium">{industry}</span>
            </div>
          )}
          {ticker && (
            <div className="flex items-center gap-2 text-sm">
              <span className="text-muted-foreground">Stock:</span>
              <span className="text-primary font-mono font-medium">{ticker}</span>
            </div>
          )}
          {!industry && !ticker && (
            <p className="text-sm text-muted-foreground">
              No analysis loaded yet
            </p>
          )}
        </CardContent>
      </Card>

      {/* Conversation History Placeholder */}
      <Card variant="glass">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <History className="w-4 h-4 text-muted-foreground" />
            <CardTitle className="text-base">Past Conversations</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground text-center py-4">
            No previous conversations
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
