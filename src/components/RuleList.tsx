import { RuleItem } from '@/types';
import { cn } from '@/lib/utils';
import { CheckCircle2, AlertTriangle, XCircle } from 'lucide-react';

interface RuleListProps {
  rules: RuleItem[];
}

const flagConfig = {
  GREEN: {
    icon: CheckCircle2,
    bgClass: 'bg-success/10 border-success/20',
    iconClass: 'text-success',
    textClass: 'text-success',
  },
  YELLOW: {
    icon: AlertTriangle,
    bgClass: 'bg-warning/10 border-warning/20',
    iconClass: 'text-warning',
    textClass: 'text-warning',
  },
  RED: {
    icon: XCircle,
    bgClass: 'bg-destructive/10 border-destructive/20',
    iconClass: 'text-destructive',
    textClass: 'text-destructive',
  },
};

export function RuleList({ rules }: RuleListProps) {
  return (
    <div className="space-y-3">
      {rules.map((rule, index) => {
        const config = flagConfig[rule.flag];
        const Icon = config.icon;

        return (
          <div
            key={index}
            className={cn(
              'p-4 rounded-lg border',
              config.bgClass,
              'animate-fade-in'
            )}
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="flex items-start gap-3">
              <Icon className={cn('w-5 h-5 mt-0.5 flex-shrink-0', config.iconClass)} />
              <div className="space-y-1">
                <div className={cn('font-medium text-sm', config.textClass)}>
                  [{rule.flag}] {rule.name}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {rule.reason}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
