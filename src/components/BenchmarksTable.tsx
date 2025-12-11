import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { BarChart3 } from 'lucide-react';

interface Benchmark {
  metric: string;
  green: string;
  yellow: string;
  red: string;
}

interface BenchmarksTableProps {
  benchmarks: Benchmark[];
}

export function BenchmarksTable({ benchmarks }: BenchmarksTableProps) {
  return (
    <Card variant="glass" className="animate-slide-up overflow-hidden">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <BarChart3 className="w-5 h-5 text-primary" />
          </div>
          <CardTitle>Industry Benchmarks</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-secondary/30">
                <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Metric
                </th>
                <th className="px-6 py-4 text-center text-xs font-medium uppercase tracking-wider">
                  <span className="inline-flex items-center gap-2 text-success">
                    <span className="w-3 h-3 rounded-full bg-success" />
                    Green
                  </span>
                </th>
                <th className="px-6 py-4 text-center text-xs font-medium uppercase tracking-wider">
                  <span className="inline-flex items-center gap-2 text-warning">
                    <span className="w-3 h-3 rounded-full bg-warning" />
                    Yellow
                  </span>
                </th>
                <th className="px-6 py-4 text-center text-xs font-medium uppercase tracking-wider">
                  <span className="inline-flex items-center gap-2 text-destructive">
                    <span className="w-3 h-3 rounded-full bg-destructive" />
                    Red
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              {benchmarks.map((benchmark, index) => (
                <tr
                  key={benchmark.metric}
                  className={cn(
                    'border-b border-border/50 hover:bg-secondary/20 transition-colors',
                    'animate-fade-in'
                  )}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <td className="px-6 py-4 text-sm font-medium text-foreground">
                    {benchmark.metric}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="font-mono text-sm text-success bg-success/10 px-3 py-1 rounded-full">
                      {benchmark.green}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="font-mono text-sm text-warning bg-warning/10 px-3 py-1 rounded-full">
                      {benchmark.yellow}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="font-mono text-sm text-destructive bg-destructive/10 px-3 py-1 rounded-full">
                      {benchmark.red}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
