import { MetricItem } from '@/types';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Info } from 'lucide-react';

interface MetricsGridProps {
  metrics: MetricItem[];
  columns?: 2 | 3 | 4;
}

const formatValue = (value: number, format: MetricItem['format']): string => {
  switch (format) {
    case 'ratio':
      return `${value.toFixed(2)}×`;
    case 'percentage':
      return `${value.toFixed(1)}%`;
    case 'currency':
      return `₹${value.toLocaleString('en-IN', { maximumFractionDigits: 0 })} Cr`;
    case 'number':
    default:
      return value.toLocaleString('en-IN', { maximumFractionDigits: 2 });
  }
};

export function MetricsGrid({ metrics, columns = 3 }: MetricsGridProps) {
  const gridCols = {
    2: 'grid-cols-2',
    3: 'grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-2 lg:grid-cols-4',
  };

  return (
    <div className={cn('grid gap-4', gridCols[columns])}>
      {metrics.map((metric) => (
        <div
          key={metric.name}
          className="stat-card group"
        >
          <div className="flex items-start justify-between mb-2">
            <span className="text-xs text-muted-foreground uppercase tracking-wider">
              {metric.name}
            </span>
            {metric.tooltip && (
              <Tooltip>
                <TooltipTrigger>
                  <Info className="w-3.5 h-3.5 text-muted-foreground/50 hover:text-muted-foreground transition-colors" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs">{metric.tooltip}</p>
                </TooltipContent>
              </Tooltip>
            )}
          </div>
          <div className="font-mono text-2xl font-semibold text-foreground group-hover:text-primary transition-colors">
            {formatValue(metric.value, metric.format)}
          </div>
        </div>
      ))}
    </div>
  );
}
