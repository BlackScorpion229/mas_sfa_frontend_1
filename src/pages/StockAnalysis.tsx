import { useEffect, useState } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { Header } from '@/components/Header';
import { ModuleCard } from '@/components/ModuleCard';
import { HealthScorePanel } from '@/components/HealthScorePanel';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { generateStockAnalysis } from '@/data/mockData';
import { StockAnalysis as StockAnalysisType } from '@/types';
import { ArrowLeft, Building2, MessageSquare, Loader2 } from 'lucide-react';

export default function StockAnalysis() {
  const { ticker } = useParams<{ ticker: string }>();
  const [searchParams] = useSearchParams();
  const industry = searchParams.get('industry') || 'Unknown';
  
  const [data, setData] = useState<StockAnalysisType | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 600));
      if (ticker) {
        setData(generateStockAnalysis(ticker, decodeURIComponent(industry)));
      }
      setIsLoading(false);
    };
    loadData();
  }, [ticker, industry]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container py-16 flex flex-col items-center justify-center min-h-[60vh]">
          <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
          <p className="text-muted-foreground">Running fundamental analysis on {ticker}...</p>
          <p className="text-xs text-muted-foreground/60 mt-2">Analyzing 10 modules</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container py-16 text-center">
          <p className="text-muted-foreground">Stock not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container py-8 lg:py-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-4 mb-8">
          <Link to={`/industry/${encodeURIComponent(industry)}`}>
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Industry
            </Button>
          </Link>
          <div className="h-6 w-px bg-border" />
          <Badge variant="outline" className="font-mono">
            {data.ticker}
          </Badge>
          <Badge variant="secondary">
            <Building2 className="w-3 h-3 mr-2" />
            {data.industry}
          </Badge>
        </div>

        {/* Page Header */}
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            {data.company_name}
          </h1>
          <p className="text-muted-foreground">
            Comprehensive fundamental analysis across 10 analytical modules
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-[1fr_320px] gap-8">
          {/* Left: Modules */}
          <div className="space-y-6">
            {data.modules.map((module, index) => (
              <ModuleCard
                key={module.module_name}
                module={module}
                defaultExpanded={index === 0}
              />
            ))}

            {/* Chat CTA */}
            <div className="p-6 rounded-xl bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20">
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <div className="flex-1 text-center sm:text-left">
                  <h3 className="font-semibold text-foreground mb-1">
                    Explore this analysis with AI
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Ask questions about metrics, trends, or compare with industry benchmarks
                  </p>
                </div>
                <Link to={`/chat?ticker=${data.ticker}&industry=${encodeURIComponent(industry)}`}>
                  <Button variant="hero">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Chat
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Right: Health Panel */}
          <div className="hidden lg:block">
            <HealthScorePanel analysis={data} />
          </div>
        </div>

        {/* Mobile Health Panel */}
        <div className="lg:hidden mt-8">
          <HealthScorePanel analysis={data} />
        </div>
      </main>
    </div>
  );
}
