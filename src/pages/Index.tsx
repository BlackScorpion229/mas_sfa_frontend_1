import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IndustrySelector } from '@/components/IndustrySelector';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/Header';
import { ArrowRight, BarChart3, Brain, LineChart, Shield } from 'lucide-react';
import { cn } from '@/lib/utils';

const features = [
  {
    icon: Brain,
    title: 'AI-Powered Analysis',
    description: 'Advanced algorithms analyze industry trends and company fundamentals in real-time.',
  },
  {
    icon: BarChart3,
    title: 'Industry Benchmarks',
    description: 'Compare companies against sector-specific financial metrics and standards.',
  },
  {
    icon: LineChart,
    title: 'Trend Detection',
    description: 'Identify revenue, capex, and profitability patterns across market cycles.',
  },
  {
    icon: Shield,
    title: 'Risk Assessment',
    description: 'Comprehensive red flag detection and risk scoring for informed decisions.',
  },
];

export default function Index() {
  const [selectedIndustry, setSelectedIndustry] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleAnalyze = async () => {
    if (!selectedIndustry) return;
    
    setIsLoading(true);
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 800));
    navigate(`/industry/${encodeURIComponent(selectedIndustry)}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container py-16 lg:py-24">
        {/* Hero Section */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6 animate-fade-in">
            <Brain className="w-4 h-4" />
            AI-Powered Financial Intelligence
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 animate-slide-up">
            Start Your{' '}
            <span className="text-gradient">Analysis</span>
          </h1>
          
          <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '100ms' }}>
            Select an industry to generate a comprehensive AI-powered analysis with benchmarks, 
            peer comparisons, and actionable insights.
          </p>

          {/* Industry Selector */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up" style={{ animationDelay: '200ms' }}>
            <IndustrySelector
              value={selectedIndustry}
              onChange={setSelectedIndustry}
            />
            <Button
              variant="hero"
              size="lg"
              onClick={handleAnalyze}
              disabled={!selectedIndustry || isLoading}
              className="w-full sm:w-auto"
            >
              {isLoading ? (
                <>
                  <span className="animate-pulse">Analyzing...</span>
                </>
              ) : (
                <>
                  Show Industry Analysis
                  <ArrowRight className="w-5 h-5 ml-2" />
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className={cn(
                'group p-6 rounded-2xl',
                'bg-card border border-border/50',
                'hover:border-primary/30 hover:bg-card/80',
                'transition-all duration-300',
                'animate-slide-up'
              )}
              style={{ animationDelay: `${300 + index * 100}ms` }}
            >
              <div className="p-3 rounded-xl bg-primary/10 w-fit mb-4 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Background Decorations */}
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-accent/5 rounded-full blur-3xl" />
        </div>
      </main>
    </div>
  );
}
