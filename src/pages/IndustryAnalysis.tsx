import { useParams, Link } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BenchmarksTable } from '@/components/BenchmarksTable';
import { InsightsCard } from '@/components/InsightsCard';
import { PeerStocksSection } from '@/components/PeerStocksSection';
import { TrendMiniChart } from '@/components/TrendMiniChart';
import { useIndustryBenchmark } from '@/hooks/useIndustryBenchmark';
import { cn } from '@/lib/utils';
import {
  ArrowLeft,
  TrendingUp,
  FileText,
  DollarSign,
  Lightbulb,
  Eye,
  AlertTriangle,
  MessageSquare,
  Loader2,
} from 'lucide-react';

const trendTagVariants: Record<string, 'expanding' | 'moderate' | 'stagnant' | 'declining'> = {
  EXPANDING: 'expanding',
  MODERATE: 'moderate',
  STAGNANT: 'stagnant',
  DECLINING: 'declining',
};

const cycleColors: Record<string, string> = {
  EXPANSION: 'text-success',
  STABLE: 'text-primary',
  SOFTENING: 'text-warning',
};

export default function IndustryAnalysis() {
  const { industry } = useParams<{ industry: string }>();
  const decodedIndustry = industry ? decodeURIComponent(industry) : undefined;
  const { data, isLoading, error } = useIndustryBenchmark(decodedIndustry);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container py-16 flex flex-col items-center justify-center min-h-[60vh]">
          <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
          <p className="text-muted-foreground">Generating industry analysis...</p>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container py-16 text-center">
          <p className="text-muted-foreground">{error || 'Industry not found'}</p>
        </div>
      </div>
    );
  }

  const revenueYoYData = data.revenue_trend.yoy_growth.map((y) => y.growth);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container py-8 lg:py-12">
        {/* Page Header */}
        <div className="mb-10">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-3">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">
              {data.industry_name} Industry Analysis
            </h1>
            <Link to="/">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back
              </Button>
            </Link>
          </div>
          <p className="text-muted-foreground">
            Comprehensive AI-powered analysis with benchmarks and peer comparisons
          </p>
        </div>

        {/* Summary Section */}
        <Card variant="glass" className="mb-8 animate-slide-up">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <FileText className="w-5 h-5 text-primary" />
              </div>
              <CardTitle>Industry Summary</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-foreground leading-relaxed">{data.summary.narrative}</p>
            <div className="flex flex-wrap gap-2">
              {data.summary.sources.map((source, i) => (
                <Badge key={i} variant="secondary" className="text-xs">
                  {source}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Revenue & Capex Trends */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Revenue Trend */}
          <Card variant="glass" className="animate-slide-up" style={{ animationDelay: '100ms' }}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-success/10">
                    <TrendingUp className="w-5 h-5 text-success" />
                  </div>
                  <CardTitle>Revenue Trend</CardTitle>
                </div>
                <Badge variant={trendTagVariants[data.revenue_trend.trend_tag]}>
                  {data.revenue_trend.trend_tag}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="stat-card">
                  <span className="text-xs text-muted-foreground">Industry CAGR</span>
                  <p className="font-mono text-2xl font-semibold text-success">
                    {data.revenue_trend.industry_cagr}%
                  </p>
                </div>
                <div className="space-y-2">
                  <span className="text-xs text-muted-foreground">YoY Growth</span>
                  <TrendMiniChart data={revenueYoYData} color="positive" height={48} />
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {data.revenue_trend.yoy_growth.map((yoy) => (
                  <div key={yoy.year} className="px-3 py-1.5 rounded-lg bg-secondary/50 text-xs">
                    <span className="text-muted-foreground">{yoy.year}:</span>{' '}
                    <span className={cn(
                      'font-mono font-medium',
                      yoy.growth >= 0 ? 'text-success' : 'text-destructive'
                    )}>
                      {yoy.growth >= 0 ? '+' : ''}{yoy.growth}%
                    </span>
                  </div>
                ))}
              </div>

              <p className="text-sm text-muted-foreground">{data.revenue_trend.insight}</p>
            </CardContent>
          </Card>

          {/* Capex Trend */}
          <Card variant="glass" className="animate-slide-up" style={{ animationDelay: '200ms' }}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <DollarSign className="w-5 h-5 text-primary" />
                  </div>
                  <CardTitle>Capex Trend</CardTitle>
                </div>
                <Badge variant="outline" className={cycleColors[data.capex_trend.cycle]}>
                  {data.capex_trend.cycle}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="stat-card">
                  <span className="text-xs text-muted-foreground">Growth Estimate</span>
                  <p className="font-mono text-2xl font-semibold text-primary">
                    {data.capex_trend.growth_estimate}%
                  </p>
                </div>
                <div className="stat-card">
                  <span className="text-xs text-muted-foreground">Intensity (% Revenue)</span>
                  <p className="font-mono text-2xl font-semibold text-foreground">
                    {data.capex_trend.intensity}%
                  </p>
                </div>
              </div>

              <p className="text-sm text-muted-foreground">{data.capex_trend.insight}</p>
            </CardContent>
          </Card>
        </div>

        {/* Benchmarks Table */}
        <div className="mb-8">
          <BenchmarksTable benchmarks={data.benchmarks} />
        </div>

        {/* Insights Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <InsightsCard
            title="Key Insights"
            icon={Lightbulb}
            items={data.key_insights}
            variant="success"
          />
          <InsightsCard
            title="Observations"
            icon={Eye}
            items={data.observations}
            variant="default"
          />
          <InsightsCard
            title="Risk Factors"
            icon={AlertTriangle}
            items={data.risks}
            variant="danger"
          />
        </div>

        {/* Peer Stocks */}
        <div className="mb-8">
          <PeerStocksSection stocks={data.peer_stocks} industry={data.industry_name} />
        </div>

        {/* Chat CTA */}
        <Card variant="gradient" className="animate-slide-up">
          <CardContent className="p-8 text-center">
            <h3 className="text-xl font-semibold text-foreground mb-3">
              Have questions about this analysis?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Chat with our AI assistant to explore industry trends, compare benchmarks, 
              and get deeper insights.
            </p>
            <Link to={`/chat?industry=${encodeURIComponent(data.industry_name)}`}>
              <Button variant="hero" size="lg">
                <MessageSquare className="w-5 h-5 mr-2" />
                Start AI Chat
              </Button>
            </Link>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
