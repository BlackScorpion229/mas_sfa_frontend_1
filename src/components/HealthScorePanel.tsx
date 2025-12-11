import { StockAnalysis } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Activity, TrendingUp, TrendingDown } from 'lucide-react';

interface HealthScorePanelProps {
  analysis: StockAnalysis;
}

export function HealthScorePanel({ analysis }: HealthScorePanelProps) {
  const { health_score, summary_metrics, rule_counts } = analysis;

  const getScoreColor = (score: number) => {
    if (score >= 75) return 'text-success';
    if (score >= 50) return 'text-warning';
    return 'text-destructive';
  };

  const getScoreBg = (score: number) => {
    if (score >= 75) return 'bg-success/20 border-success/30';
    if (score >= 50) return 'bg-warning/20 border-warning/30';
    return 'bg-destructive/20 border-destructive/30';
  };

  const metrics = [
    { label: 'D/E Ratio', value: summary_metrics.de_ratio.toFixed(2), suffix: '×' },
    { label: 'ROE', value: summary_metrics.roe.toFixed(1), suffix: '%' },
    { label: 'CCC', value: Math.round(summary_metrics.ccc), suffix: ' days' },
    { label: 'Capex Intensity', value: summary_metrics.capex_intensity.toFixed(1), suffix: '%' },
    { label: 'Asset Turnover', value: summary_metrics.asset_turnover.toFixed(2), suffix: '×' },
    { label: 'OCF/Debt', value: summary_metrics.ocf_debt.toFixed(2), suffix: '×' },
  ];

  return (
    <Card variant="glass" className="sticky top-4">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <Activity className="w-5 h-5 text-primary" />
          </div>
          <CardTitle>Health Summary</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Health Score */}
        <div className={cn(
          'p-6 rounded-xl border text-center',
          getScoreBg(health_score)
        )}>
          <div className="text-xs text-muted-foreground uppercase tracking-wider mb-2">
            Overall Health Score
          </div>
          <div className={cn('text-5xl font-mono font-bold', getScoreColor(health_score))}>
            {health_score}
          </div>
          <div className="text-sm text-muted-foreground mt-1">out of 100</div>
        </div>

        {/* Rule Counts */}
        <div className="grid grid-cols-3 gap-3">
          <div className="p-3 rounded-lg bg-success/10 border border-success/20 text-center">
            <div className="text-2xl font-mono font-semibold text-success">
              {rule_counts.green}
            </div>
            <div className="text-xs text-muted-foreground mt-1">Green</div>
          </div>
          <div className="p-3 rounded-lg bg-warning/10 border border-warning/20 text-center">
            <div className="text-2xl font-mono font-semibold text-warning">
              {rule_counts.yellow}
            </div>
            <div className="text-xs text-muted-foreground mt-1">Yellow</div>
          </div>
          <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-center">
            <div className="text-2xl font-mono font-semibold text-destructive">
              {rule_counts.red}
            </div>
            <div className="text-xs text-muted-foreground mt-1">Red</div>
          </div>
        </div>

        {/* Summary Metrics */}
        <div className="space-y-3">
          <h4 className="text-xs text-muted-foreground uppercase tracking-wider">
            Key Metrics
          </h4>
          {metrics.map((metric) => (
            <div
              key={metric.label}
              className="flex items-center justify-between py-2 border-b border-border/50 last:border-0"
            >
              <span className="text-sm text-muted-foreground">{metric.label}</span>
              <span className="font-mono text-sm text-foreground">
                {metric.value}{metric.suffix}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
