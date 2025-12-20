import { useParams, useSearchParams, Link } from 'react-router-dom';
import { Header } from '@/components/Header';
import { ModuleCard } from '@/components/ModuleCard';
import { HealthScorePanel } from '@/components/HealthScorePanel';
import { Button } from '@/components/ui/button';

import { useStockAnalysis } from '@/hooks/useStockAnalysis';
import { ArrowLeft, MessageSquare, Loader2 } from 'lucide-react';

export default function StockAnalysis() {
  const { ticker } = useParams<{ ticker: string }>();
  const [searchParams] = useSearchParams();
  const industry = searchParams.get('industry') || 'Unknown';
  const decodedIndustry = decodeURIComponent(industry);
  
  const { data, isLoading, error } = useStockAnalysis(ticker, decodedIndustry);

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

  if (error || !data) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container py-16 text-center">
          <p className="text-muted-foreground">{error || 'Stock not found'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container py-8 lg:py-12">
        {/* Page Header */}
        <div className="mb-10">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-3">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">
              {data.company_name}
            </h1>
            <Link to={`/industry/${encodeURIComponent(industry)}`}>
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Industry
              </Button>
            </Link>
          </div>
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
