import { RedFlag } from '@/types';
import { cn } from '@/lib/utils';
import { AlertTriangle, AlertCircle, Info } from 'lucide-react';

interface AlertStackProps {
  alerts: RedFlag[];
}

const severityConfig = {
  HIGH: {
    icon: AlertCircle,
    bgClass: 'bg-destructive/10 border-destructive/40',
    iconClass: 'text-destructive',
    badgeClass: 'bg-destructive/20 text-destructive border-destructive/30',
  },
  MEDIUM: {
    icon: AlertTriangle,
    bgClass: 'bg-warning/10 border-warning/40',
    iconClass: 'text-warning',
    badgeClass: 'bg-warning/20 text-warning border-warning/30',
  },
  LOW: {
    icon: Info,
    bgClass: 'bg-muted border-border',
    iconClass: 'text-muted-foreground',
    badgeClass: 'bg-muted text-muted-foreground border-border',
  },
};

export function AlertStack({ alerts }: AlertStackProps) {
  if (alerts.length === 0) return null;

  return (
    <div className="space-y-3">
      {alerts.map((alert, index) => {
        const config = severityConfig[alert.severity];
        const Icon = config.icon;

        return (
          <div
            key={index}
            className={cn(
              'p-4 rounded-lg border',
              config.bgClass,
              'animate-slide-up'
            )}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-start gap-3">
              <Icon className={cn('w-5 h-5 mt-0.5 flex-shrink-0', config.iconClass)} />
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2">
                  <span className={cn(
                    'text-xs font-mono px-2 py-0.5 rounded border',
                    config.badgeClass
                  )}>
                    {alert.severity}
                  </span>
                  <h4 className="font-medium text-sm text-foreground">
                    {alert.title}
                  </h4>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {alert.detail}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
