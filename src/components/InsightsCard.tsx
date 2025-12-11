import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface InsightsCardProps {
  title: string;
  icon: LucideIcon;
  items: string[];
  variant?: 'default' | 'success' | 'warning' | 'danger';
}

const variantStyles = {
  default: {
    iconBg: 'bg-primary/10',
    iconColor: 'text-primary',
    bulletColor: 'bg-primary',
  },
  success: {
    iconBg: 'bg-success/10',
    iconColor: 'text-success',
    bulletColor: 'bg-success',
  },
  warning: {
    iconBg: 'bg-warning/10',
    iconColor: 'text-warning',
    bulletColor: 'bg-warning',
  },
  danger: {
    iconBg: 'bg-destructive/10',
    iconColor: 'text-destructive',
    bulletColor: 'bg-destructive',
  },
};

export function InsightsCard({ title, icon: Icon, items, variant = 'default' }: InsightsCardProps) {
  const styles = variantStyles[variant];

  return (
    <Card variant="glass" className="h-full animate-slide-up">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className={cn('p-2 rounded-lg', styles.iconBg)}>
            <Icon className={cn('w-5 h-5', styles.iconColor)} />
          </div>
          <CardTitle className="text-lg">{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {items.map((item, index) => (
            <li
              key={index}
              className="flex items-start gap-3 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <span className={cn('w-2 h-2 rounded-full mt-2 flex-shrink-0', styles.bulletColor)} />
              <span className="text-sm text-foreground leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
