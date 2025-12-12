import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Header } from '@/components/Header';
import { ChatPanel } from '@/components/ChatPanel';
import { ChatSidebar } from '@/components/ChatSidebar';
import { Button } from '@/components/ui/button';
import { ChatContext } from '@/types';
import { useChat } from '@/hooks/useChat';
import { ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';

export default function Chat() {
  const [searchParams] = useSearchParams();
  const industry = searchParams.get('industry') || undefined;
  const ticker = searchParams.get('ticker') || undefined;

  const [context, setContext] = useState<ChatContext>({
    includeIndustrySummary: !!industry,
    includeBenchmarks: !!industry,
    includeStockAnalysis: !!ticker,
  });

  const { messages, isLoading, error, sendMessage } = useChat({
    context,
    industry,
    ticker,
  });

  // Show error toast when error occurs
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

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
              onSendMessage={sendMessage}
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
