import { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Header } from '@/components/Header';
import { ChatPanel } from '@/components/ChatPanel';
import { ChatSidebar } from '@/components/ChatSidebar';
import { Button } from '@/components/ui/button';
import { ChatMessage, ChatContext } from '@/types';
import { ArrowLeft } from 'lucide-react';

export default function Chat() {
  const [searchParams] = useSearchParams();
  const industry = searchParams.get('industry') || undefined;
  const ticker = searchParams.get('ticker') || undefined;

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [context, setContext] = useState<ChatContext>({
    includeIndustrySummary: !!industry,
    includeBenchmarks: !!industry,
    includeStockAnalysis: !!ticker,
  });

  const handleSendMessage = async (content: string) => {
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    // Simulate AI response
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const assistantMessage: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: generateMockResponse(content, context, industry, ticker),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, assistantMessage]);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 container py-6 flex flex-col">
        {/* Back Button */}
        <div className="mb-4">
          {industry ? (
            <Link to={ticker ? `/stock/${ticker}?industry=${encodeURIComponent(industry)}` : `/industry/${encodeURIComponent(industry)}`}>
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Analysis
              </Button>
            </Link>
          ) : (
            <Link to="/">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </Button>
            </Link>
          )}
        </div>

        {/* Chat Layout */}
        <div className="flex-1 grid lg:grid-cols-[280px_1fr] gap-6 min-h-0">
          {/* Sidebar */}
          <div className="hidden lg:block overflow-y-auto">
            <ChatSidebar
              context={context}
              onContextChange={setContext}
              industry={industry}
              ticker={ticker}
            />
          </div>

          {/* Chat Area */}
          <div className="flex flex-col min-h-[600px] lg:min-h-0 bg-card rounded-xl border border-border overflow-hidden">
            <ChatPanel
              messages={messages}
              onSendMessage={handleSendMessage}
              isLoading={isLoading}
            />
          </div>
        </div>

        {/* Mobile Context Toggle */}
        <div className="lg:hidden mt-4">
          <ChatSidebar
            context={context}
            onContextChange={setContext}
            industry={industry}
            ticker={ticker}
          />
        </div>
      </main>
    </div>
  );
}

function generateMockResponse(
  question: string,
  context: ChatContext,
  industry?: string,
  ticker?: string
): string {
  const lowerQuestion = question.toLowerCase();

  if (lowerQuestion.includes('benchmark') || lowerQuestion.includes('ratio')) {
    return `Based on the ${industry || 'selected'} industry benchmarks:

**Key Ratio Ranges:**
• D/E Ratio: Green zone is below 0.8x, indicating healthy leverage
• ROE: Target above 15% for strong equity returns
• Interest Coverage: Maintain above 4x for comfortable debt servicing

${ticker ? `For ${ticker}, the current metrics are tracking within acceptable ranges with some metrics in the yellow zone requiring monitoring.` : 'Select a specific stock to see how it compares against these benchmarks.'}

Would you like me to elaborate on any specific metric?`;
  }

  if (lowerQuestion.includes('risk') || lowerQuestion.includes('red flag')) {
    return `**Risk Assessment Summary:**

${industry ? `The ${industry} sector faces several key risks:` : 'Key market risks to consider:'}

1. **Input Cost Volatility** - Commodity price fluctuations can impact margins
2. **Regulatory Changes** - Policy shifts may affect operational flexibility  
3. **Currency Exposure** - FX movements for companies with export exposure
4. **Execution Risk** - Large capex programs carry implementation risks

${ticker ? `For ${ticker} specifically, the analysis identified ${Math.floor(Math.random() * 3) + 1} material red flags requiring attention.` : ''}

Shall I dive deeper into any of these risk factors?`;
  }

  if (lowerQuestion.includes('trend') || lowerQuestion.includes('growth')) {
    return `**Trend Analysis:**

${industry ? `The ${industry} industry is showing:` : 'Current market trends show:'}

📈 **Revenue Growth**: Double-digit CAGR of ~12.5% over past 4 years
📊 **Capex Cycle**: In expansion phase with 18%+ YoY growth
💰 **Margin Trajectory**: Gradual improvement driven by operating leverage

${ticker ? `${ticker}'s growth quality metrics indicate sustainable expansion with improving return ratios.` : 'Select a stock to see company-specific trend analysis.'}

What aspect of the trends would you like to explore further?`;
  }

  return `Thank you for your question about ${question.slice(0, 50)}...

Based on the ${context.includeIndustrySummary ? 'industry data' : ''}${context.includeIndustrySummary && context.includeStockAnalysis ? ' and ' : ''}${context.includeStockAnalysis ? 'stock analysis' : ''} in context:

${industry ? `The ${industry} sector continues to show positive momentum with key metrics trending favorably.` : 'I can provide more specific insights once you select an industry to analyze.'}

${ticker ? `\nFor ${ticker}, the fundamental analysis reveals a company with solid operational metrics and manageable risk profile.` : ''}

Feel free to ask about:
• Industry benchmarks and comparisons
• Specific financial ratios and trends  
• Risk factors and red flags
• Growth quality and sustainability`;
}
