import { useState } from 'react';
import { StockModule } from '@/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { MetricsGrid } from '@/components/MetricsGrid';
import { TrendMiniChart } from '@/components/TrendMiniChart';
import { RuleList } from '@/components/RuleList';
import { AlertStack } from '@/components/AlertStack';
import { PositiveList } from '@/components/PositiveList';
import { Badge } from '@/components/ui/badge';
import { ChevronDown, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ModuleCardProps {
  module: StockModule;
  defaultExpanded?: boolean;
}

export function ModuleCard({ module, defaultExpanded = false }: ModuleCardProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  const greenCount = module.rules.filter(r => r.flag === 'GREEN').length;
  const yellowCount = module.rules.filter(r => r.flag === 'YELLOW').length;
  const redCount = module.rules.filter(r => r.flag === 'RED').length;

  return (
    <Card variant="glass" className="overflow-hidden animate-slide-up">
      <CardHeader
        className="cursor-pointer hover:bg-secondary/30 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <CardTitle className="text-lg">{module.module_name}</CardTitle>
            <CardDescription>{module.description}</CardDescription>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2">
              {greenCount > 0 && (
                <Badge variant="success" className="font-mono text-xs">
                  {greenCount} ✓
                </Badge>
              )}
              {yellowCount > 0 && (
                <Badge variant="warning" className="font-mono text-xs">
                  {yellowCount} ⚠
                </Badge>
              )}
              {redCount > 0 && (
                <Badge variant="danger" className="font-mono text-xs">
                  {redCount} ✗
                </Badge>
              )}
            </div>
            <ChevronDown
              className={cn(
                'w-5 h-5 text-muted-foreground transition-transform duration-200',
                isExpanded && 'rotate-180'
              )}
            />
          </div>
        </div>
      </CardHeader>

      {isExpanded && (
        <CardContent className="space-y-8 animate-fade-in">
          {/* Two-pane layout */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left Pane: Metrics & Trends */}
            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-4 uppercase tracking-wider">
                  Key Metrics
                </h4>
                <MetricsGrid metrics={module.key_metrics} columns={2} />
              </div>

              {module.trends.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-4 uppercase tracking-wider">
                    Trends
                  </h4>
                  {module.trends.map((trend, index) => (
                    <div key={index} className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-foreground">{trend.label}</span>
                        <div className="flex items-center gap-2">
                          <TrendingUp className={cn(
                            'w-4 h-4',
                            trend.yoy_growth >= 0 ? 'text-success' : 'text-destructive'
                          )} />
                          <Badge
                            variant={trend.yoy_growth >= 0 ? 'success' : 'danger'}
                            className="font-mono"
                          >
                            {trend.yoy_growth >= 0 ? '+' : ''}{trend.yoy_growth.toFixed(1)}%
                          </Badge>
                        </div>
                      </div>
                      <TrendMiniChart
                        data={trend.data}
                        color={trend.yoy_growth >= 0 ? 'positive' : 'negative'}
                        height={48}
                      />
                      <p className="text-xs text-muted-foreground">{trend.insight}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Right Pane: Rules & Flags */}
            <div className="space-y-6">
              {module.rules.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-4 uppercase tracking-wider">
                    Analysis Rules
                  </h4>
                  <RuleList rules={module.rules} />
                </div>
              )}

              {module.red_flags.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-destructive mb-4 uppercase tracking-wider">
                    Red Flags
                  </h4>
                  <AlertStack alerts={module.red_flags} />
                </div>
              )}

              {module.positive_points.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-success mb-4 uppercase tracking-wider">
                    Positive Points
                  </h4>
                  <PositiveList points={module.positive_points} />
                </div>
              )}
            </div>
          </div>

          {/* Narrative */}
          <div className="pt-4 border-t border-border">
            <h4 className="text-sm font-medium text-muted-foreground mb-3 uppercase tracking-wider">
              Analysis Narrative
            </h4>
            <p className="text-sm text-foreground leading-relaxed">
              {module.analysis_narrative}
            </p>
          </div>
        </CardContent>
      )}
    </Card>
  );
}
