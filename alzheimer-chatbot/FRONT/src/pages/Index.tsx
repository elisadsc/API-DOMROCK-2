
import React from 'react';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { ChatProvider } from '@/contexts/ChatContext';
import Header from '@/components/Header';
import ChatArea from '@/components/ChatArea';
import MessageInput from '@/components/MessageInput';

const Index = () => {
  return (
    <ThemeProvider>
      <ChatProvider>
        <div className="min-h-screen flex flex-col bg-background text-foreground">
          <Header />
          <ChatArea />
          <MessageInput />
        </div>
      </ChatProvider>
    </ThemeProvider>
  );
};

export default Index;
