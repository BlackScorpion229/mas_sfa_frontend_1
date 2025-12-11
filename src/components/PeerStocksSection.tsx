import { useNavigate } from 'react-router-dom';
import { PeerStock } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Building, TrendingUp, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PeerStocksSectionProps {
  stocks: PeerStock[];
  industry: string;
}

const formatMarketCap = (value: number): string => {
  if (value >= 100000) return `₹${(value / 100000).toFixed(1)}L Cr`;
  if (value >= 1000) return `₹${(value / 1000).toFixed(1)}K Cr`;
  return `₹${value.toFixed(0)} Cr`;
};

export function PeerStocksSection({ stocks, industry }: PeerStocksSectionProps) {
  const navigate = useNavigate();

  const handleAnalyze = (ticker: string) => {
    navigate(`/stock/${ticker}?industry=${encodeURIComponent(industry)}`);
  };

  return (
    <Card variant="glass" className="animate-slide-up">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <Building className="w-5 h-5 text-primary" />
          </div>
          <div>
            <CardTitle>Peer Stocks</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Explore companies in the {industry} industry
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {stocks.map((stock, index) => (
            <div
              key={stock.ticker}
              className={cn(
                'group p-4 rounded-xl',
                'bg-secondary/50 border border-border/50',
                'hover:border-primary/30 hover:bg-secondary/80',
                'transition-all duration-300',
                'animate-fade-in'
              )}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-medium text-foreground group-hover:text-primary transition-colors">
                    {stock.name}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline" className="font-mono text-xs">
                      {stock.ticker}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {stock.exchange}
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <div>
                  <span className="text-xs text-muted-foreground">Market Cap</span>
                  <p className="font-mono text-sm font-medium text-foreground">
                    {formatMarketCap(stock.market_cap)}
                  </p>
                </div>
                <div>
                  <span className="text-xs text-muted-foreground">Latest Price</span>
                  <div className="flex items-center gap-1">
                    <p className="font-mono text-sm font-medium text-foreground">
                      ₹{stock.latest_price.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                    </p>
                    <TrendingUp className="w-3 h-3 text-success" />
                  </div>
                </div>
              </div>

              <Button
                variant="glass"
                size="sm"
                className="w-full group/btn"
                onClick={() => handleAnalyze(stock.ticker)}
              >
                Run Fundamental Analysis
                <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover/btn:translate-x-1" />
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
