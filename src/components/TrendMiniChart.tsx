import { cn } from '@/lib/utils';

interface TrendMiniChartProps {
  data: number[];
  height?: number;
  color?: 'positive' | 'negative' | 'neutral';
}

export function TrendMiniChart({ data, height = 40, color = 'positive' }: TrendMiniChartProps) {
  if (!data || data.length === 0) return null;

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  
  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * 100;
    const y = height - ((value - min) / range) * (height - 8);
    return `${x},${y}`;
  }).join(' ');

  const areaPoints = `0,${height} ${points} 100,${height}`;

  const colorClasses = {
    positive: {
      stroke: 'stroke-success',
      fill: 'fill-success/20',
      gradient: 'from-success/30 to-success/0',
    },
    negative: {
      stroke: 'stroke-destructive',
      fill: 'fill-destructive/20',
      gradient: 'from-destructive/30 to-destructive/0',
    },
    neutral: {
      stroke: 'stroke-muted-foreground',
      fill: 'fill-muted/20',
      gradient: 'from-muted/30 to-muted/0',
    },
  };

  return (
    <div className="relative w-full" style={{ height }}>
      <svg
        viewBox={`0 0 100 ${height}`}
        className="w-full h-full"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id={`gradient-${color}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" className={cn('stop-color-current', colorClasses[color].stroke)} stopOpacity="0.3" />
            <stop offset="100%" className={cn('stop-color-current', colorClasses[color].stroke)} stopOpacity="0" />
          </linearGradient>
        </defs>
        
        {/* Area fill */}
        <polygon
          points={areaPoints}
          className={cn(colorClasses[color].fill)}
        />
        
        {/* Line */}
        <polyline
          points={points}
          fill="none"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={cn(colorClasses[color].stroke)}
        />
        
        {/* End dot */}
        <circle
          cx="100"
          cy={height - ((data[data.length - 1] - min) / range) * (height - 8)}
          r="3"
          className={cn(colorClasses[color].stroke.replace('stroke-', 'fill-'))}
        />
      </svg>
    </div>
  );
}
