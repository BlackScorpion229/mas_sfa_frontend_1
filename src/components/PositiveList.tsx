import { CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PositiveListProps {
  points: string[];
}

export function PositiveList({ points }: PositiveListProps) {
  return (
    <ul className="space-y-3">
      {points.map((point, index) => (
        <li
          key={index}
          className={cn(
            'flex items-start gap-3 p-3 rounded-lg',
            'bg-success/5 border border-success/20',
            'animate-fade-in'
          )}
          style={{ animationDelay: `${index * 50}ms` }}
        >
          <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
          <span className="text-sm text-foreground leading-relaxed">{point}</span>
        </li>
      ))}
    </ul>
  );
}
