import { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '@/types';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Send, Bot, User, Loader2 } from 'lucide-react';

interface ChatPanelProps {
  messages: ChatMessage[];
  onSendMessage: (content: string) => void;
  isLoading?: boolean;
}

export function ChatPanel({ messages, onSendMessage, isLoading = false }: ChatPanelProps) {
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      onSendMessage(input.trim());
      setInput('');
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="p-4 rounded-full bg-primary/10 mb-4">
              <Bot className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-lg font-medium text-foreground mb-2">
              AI Financial Assistant
            </h3>
            <p className="text-sm text-muted-foreground max-w-sm">
              Ask questions about the industry analysis, benchmarks, or stock fundamentals.
            </p>
          </div>
        )}

        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              'flex gap-3 animate-fade-in',
              message.role === 'user' && 'flex-row-reverse'
            )}
          >
            <div className={cn(
              'flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center',
              message.role === 'assistant' ? 'bg-primary/20' : 'bg-secondary'
            )}>
              {message.role === 'assistant' ? (
                <Bot className="w-4 h-4 text-primary" />
              ) : (
                <User className="w-4 h-4 text-muted-foreground" />
              )}
            </div>
            <div className={cn(
              'max-w-[80%] p-4 rounded-2xl',
              message.role === 'assistant'
                ? 'bg-secondary rounded-tl-sm'
                : 'bg-primary text-primary-foreground rounded-tr-sm'
            )}>
              <p className="text-sm leading-relaxed whitespace-pre-wrap">
                {message.content}
              </p>
              <span className={cn(
                'text-xs mt-2 block',
                message.role === 'assistant' ? 'text-muted-foreground' : 'text-primary-foreground/70'
              )}>
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex gap-3 animate-fade-in">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
              <Bot className="w-4 h-4 text-primary" />
            </div>
            <div className="bg-secondary p-4 rounded-2xl rounded-tl-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span className="text-sm">Analyzing...</span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="p-4 border-t border-border">
        <div className="flex gap-3">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about industry trends, benchmarks, or stock analysis..."
            className={cn(
              'flex-1 min-h-[48px] max-h-32 p-3 resize-none',
              'bg-secondary border border-border rounded-xl',
              'text-sm text-foreground placeholder:text-muted-foreground',
              'focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20',
              'transition-all duration-200'
            )}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
          />
          <Button
            type="submit"
            variant="hero"
            size="icon"
            disabled={!input.trim() || isLoading}
            className="h-12 w-12 flex-shrink-0"
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </form>
    </div>
  );
}
