/**
 * Hook for chat functionality with API integration
 */

import { useState, useCallback } from 'react';
import { postChat, isApiError } from '@/lib/api';
import type { ChatMessage, ChatContext } from '@/types';

interface UseChatResult {
  messages: ChatMessage[];
  isLoading: boolean;
  error: string | null;
  sendMessage: (content: string) => Promise<void>;
  clearMessages: () => void;
  clearError: () => void;
}

interface UseChatOptions {
  context?: ChatContext;
  industry?: string;
  ticker?: string;
}

/**
 * Hook for managing chat state and API calls
 * 
 * @param options - Chat configuration options
 * @returns Object with messages, loading state, error, and action functions
 * 
 * @example
 * const { messages, isLoading, sendMessage } = useChat({
 *   context: { includeIndustrySummary: true },
 *   industry: 'Banking'
 * });
 */
export function useChat(options: UseChatOptions = {}): UseChatResult {
  const { context, industry, ticker } = options;
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = useCallback(async (content: string) => {
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);
    setError(null);

    try {
      // Build message history for API
      const messageHistory = [...messages, userMessage].map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const response = await postChat({
        messages: messageHistory,
        context,
        industry,
        ticker,
      });

      const assistantMessage: ChatMessage = {
        id: response.id || (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.content,
        timestamp: response.timestamp ? new Date(response.timestamp) : new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      if (isApiError(err)) {
        setError(err.message);
      } else {
        setError('Failed to send message. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  }, [messages, context, industry, ticker]);

  const clearMessages = useCallback(() => {
    setMessages([]);
    setError(null);
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    messages,
    isLoading,
    error,
    sendMessage,
    clearMessages,
    clearError,
  };
}
