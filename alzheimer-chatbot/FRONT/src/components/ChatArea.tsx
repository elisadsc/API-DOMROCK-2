
import React, { useEffect, useRef } from 'react';
import { useChat } from '@/contexts/ChatContext';
import MessageBubble from './MessageBubble';
import LoadingMessage from './LoadingMessage';

const ChatArea: React.FC = () => {
  const { messages, isLoading } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      <div className="max-w-4xl mx-auto">
        {messages.length === 0 && !isLoading && (
          <div className="text-center text-muted-foreground py-12">
            <div className="text-lg mb-2">Bem-vindo ao ALOIS CHAT! 👋</div>
            <p className="text-sm">
              Faça uma pergunta para começar nossa conversa.
            </p>
          </div>
        )}
        
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
        
        {isLoading && (
          <div className="flex justify-start mb-4">
            <div className="bg-muted p-4 rounded-lg">
              <LoadingMessage />
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default ChatArea;
