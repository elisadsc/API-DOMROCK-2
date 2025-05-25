import React, { createContext, useContext, useState, useCallback } from 'react';
import { sendPrompt } from '@/lib/api';

export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'alois';
  timestamp: Date;
  responses?: AIResponse[];
  selectedResponse?: AIResponse;
  evaluation?: Evaluation;
}

export interface AIResponse {
  id: string;
  text: string;
  model: 'DeepSeek' | 'Gemini';
  timestamp: Date;
}

export interface Evaluation {
  coherence: number;
  clarity: number;
  relevance: number;
  usefulness: number;
  trustworthiness: number;
  justification: string;
}

export interface ChatSession {
  id: string;
  name: string;
  messages: Message[];
  lastMessage: string;
  timestamp: Date;
  messageCount: number;
}

interface ChatContextType {
  messages: Message[];
  isLoading: boolean;
  currentChatId: string;
  chatSessions: ChatSession[];
  addMessage: (text: string) => void;
  selectResponse: (messageId: string, response: AIResponse) => void;
  evaluateResponse: (messageId: string, evaluation: Evaluation) => void;
  clearHistory: () => void;
  createNewChat: () => string;
  switchToChat: (chatId: string) => void;
  updateChatName: (chatId: string, name: string) => void;
  deleteChat: (chatId: string) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const useChat = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([]);
  const [currentChatId, setCurrentChatId] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  React.useEffect(() => {
    if (chatSessions.length === 0) {
      const firstChatId = createNewChat();
      setCurrentChatId(firstChatId);
    }
  }, []);

  const currentChat = chatSessions.find(chat => chat.id === currentChatId);
  const messages = currentChat?.messages || [];

  const updateCurrentChat = useCallback((updater: (chat: ChatSession) => ChatSession) => {
    setChatSessions(prev => prev.map(chat =>
      chat.id === currentChatId ? updater(chat) : chat
    ));
  }, [currentChatId]);

  const addMessage = useCallback(async (text: string) => {
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      text,
      sender: 'user',
      timestamp: new Date()
    };

    updateCurrentChat(chat => ({
      ...chat,
      messages: [...chat.messages, userMessage],
      lastMessage: text.substring(0, 50) + (text.length > 50 ? '...' : ''),
      timestamp: new Date(),
      messageCount: chat.messageCount + 1
    }));

    setIsLoading(true);

    try {
      const response = await sendPrompt(text);

      const responses: AIResponse[] = response.responses.map((r: any) => ({
        id: r.id,
        text: r.text,
        model: r.llm_name as 'DeepSeek' | 'Gemini',
        timestamp: new Date()
      }));

      const aloisMessage: Message = {
        id: `alois-${Date.now()}`,
        text: '',
        sender: 'alois',
        timestamp: new Date(),
        responses
      };

      updateCurrentChat(chat => ({
        ...chat,
        messages: [...chat.messages, aloisMessage],
        messageCount: chat.messageCount + 1
      }));
    } catch (error) {
      console.error('Erro ao obter respostas:', error);
    } finally {
      setIsLoading(false);
    }
  }, [updateCurrentChat]);

  const selectResponse = useCallback((messageId: string, response: AIResponse) => {
    updateCurrentChat(chat => ({
      ...chat,
      messages: chat.messages.map(msg =>
        msg.id === messageId
          ? { ...msg, selectedResponse: response, text: response.text }
          : msg
      )
    }));
  }, [updateCurrentChat]);

  const evaluateResponse = useCallback((messageId: string, evaluation: Evaluation) => {
    updateCurrentChat(chat => ({
      ...chat,
      messages: chat.messages.map(msg =>
        msg.id === messageId
          ? { ...msg, evaluation, responses: undefined }
          : msg
      )
    }));
  }, [updateCurrentChat]);

  const clearHistory = useCallback(() => {
    updateCurrentChat(chat => ({
      ...chat,
      messages: [],
      lastMessage: 'Nenhuma mensagem',
      messageCount: 0
    }));
  }, [updateCurrentChat]);

  const createNewChat = useCallback((): string => {
    const newChatId = `chat-${Date.now()}`;
    const newChat: ChatSession = {
      id: newChatId,
      name: `Novo Chat ${chatSessions.length + 1}`,
      messages: [],
      lastMessage: 'Nenhuma mensagem',
      timestamp: new Date(),
      messageCount: 0
    };

    setChatSessions(prev => [newChat, ...prev]);
    return newChatId;
  }, [chatSessions.length]);

  const switchToChat = useCallback((chatId: string) => {
    setCurrentChatId(chatId);
  }, []);

  const updateChatName = useCallback((chatId: string, name: string) => {
    setChatSessions(prev => prev.map(chat =>
      chat.id === chatId ? { ...chat, name } : chat
    ));
  }, []);

  const deleteChat = useCallback((chatId: string) => {
    setChatSessions(prev => {
      const filtered = prev.filter(chat => chat.id !== chatId);

      if (chatId === currentChatId) {
        if (filtered.length > 0) {
          setCurrentChatId(filtered[0].id);
        } else {
          const newChatId = `chat-${Date.now()}`;
          const newChat: ChatSession = {
            id: newChatId,
            name: 'Novo Chat 1',
            messages: [],
            lastMessage: 'Nenhuma mensagem',
            timestamp: new Date(),
            messageCount: 0
          };
          setCurrentChatId(newChatId);
          return [newChat];
        }
      }

      return filtered;
    });
  }, [currentChatId]);

  return (
    <ChatContext.Provider value={{
      messages,
      isLoading,
      currentChatId,
      chatSessions,
      addMessage,
      selectResponse,
      evaluateResponse,
      clearHistory,
      createNewChat,
      switchToChat,
      updateChatName,
      deleteChat
    }}>
      {children}
    </ChatContext.Provider>
  );
};
