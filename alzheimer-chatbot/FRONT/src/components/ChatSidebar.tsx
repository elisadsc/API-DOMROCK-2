
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useChat } from '@/contexts/ChatContext';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Edit2, Trash2, Plus, MessageCircle } from 'lucide-react';

interface ChatSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChatSidebar: React.FC<ChatSidebarProps> = ({ isOpen, onClose }) => {
  const { 
    chatSessions, 
    currentChatId, 
    createNewChat, 
    switchToChat, 
    updateChatName, 
    deleteChat,
    clearHistory 
  } = useChat();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');

  const groupChatsByTime = () => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);
    const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

    const groups = {
      'Hoje': [] as typeof chatSessions,
      'Ontem': [] as typeof chatSessions,
      'Esta Semana': [] as typeof chatSessions,
      'Mais Antigo': [] as typeof chatSessions,
    };

    chatSessions.forEach(chat => {
      const chatDate = new Date(chat.timestamp);
      
      if (chatDate >= today) {
        groups['Hoje'].push(chat);
      } else if (chatDate >= yesterday) {
        groups['Ontem'].push(chat);
      } else if (chatDate >= weekAgo) {
        groups['Esta Semana'].push(chat);
      } else {
        groups['Mais Antigo'].push(chat);
      }
    });

    return groups;
  };

  const handleCreateNewChat = () => {
    const newChatId = createNewChat();
    switchToChat(newChatId);
  };

  const startEditing = (chat: typeof chatSessions[0]) => {
    setEditingId(chat.id);
    setEditName(chat.name);
  };

  const saveEdit = (chatId: string) => {
    if (editName.trim()) {
      updateChatName(chatId, editName.trim());
    }
    setEditingId(null);
    setEditName('');
  };

  const handleDeleteChat = (chatId: string) => {
    deleteChat(chatId);
  };

  const handleChatSelect = (chatId: string) => {
    switchToChat(chatId);
    onClose();
  };

  const groupedChats = groupChatsByTime();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      <div 
        className="flex-1 bg-black/20 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="w-80 bg-background border-l border-border shadow-xl flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-border bg-gradient-to-r from-[#9b87f5] to-[#7E69AB]">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white">
              Histórico de Conversas
            </h2>
            <Button
              onClick={handleCreateNewChat}
              size="sm"
              className="bg-white/20 hover:bg-white/30 text-white border-white/30"
            >
              <Plus className="w-4 h-4 mr-1" />
              Novo
            </Button>
          </div>
        </div>

        {/* Chat List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {Object.entries(groupedChats).map(([period, chats]) => {
            if (chats.length === 0) return null;
            
            return (
              <div key={period}>
                <h3 className="font-semibold mb-2 text-sm text-[#9b87f5] uppercase tracking-wide">
                  {period}
                </h3>
                <div className="space-y-2">
                  {chats.map(chat => (
                    <div 
                      key={chat.id}
                      className={`group p-3 rounded-lg transition-colors border cursor-pointer ${
                        chat.id === currentChatId 
                          ? 'bg-[#9b87f5]/10 border-[#9b87f5]/40' 
                          : 'bg-muted/50 border-transparent hover:bg-muted hover:border-[#9b87f5]/20'
                      }`}
                      onClick={() => handleChatSelect(chat.id)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          {editingId === chat.id ? (
                            <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                              <Input
                                value={editName}
                                onChange={(e) => setEditName(e.target.value)}
                                className="h-8 text-sm"
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') saveEdit(chat.id);
                                  if (e.key === 'Escape') setEditingId(null);
                                }}
                                autoFocus
                              />
                              <Button
                                size="sm"
                                onClick={() => saveEdit(chat.id)}
                                className="h-8 px-2 bg-[#9b87f5] hover:bg-[#7E69AB]"
                              >
                                ✓
                              </Button>
                            </div>
                          ) : (
                            <>
                              <div className="flex items-center gap-2 mb-1">
                                <MessageCircle className="w-4 h-4 text-[#9b87f5]" />
                                <h4 className="font-medium text-sm text-foreground truncate">
                                  {chat.name}
                                </h4>
                              </div>
                              <p className="text-xs text-muted-foreground line-clamp-2 mb-1">
                                {chat.lastMessage}
                              </p>
                              <div className="flex items-center justify-between">
                                <span className="text-xs text-muted-foreground">
                                  {chat.messageCount} mensagens
                                </span>
                                <span className="text-xs text-muted-foreground">
                                  {formatDistanceToNow(new Date(chat.timestamp), { 
                                    addSuffix: true, 
                                    locale: ptBR 
                                  })}
                                </span>
                              </div>
                            </>
                          )}
                        </div>
                        
                        {editingId !== chat.id && (
                          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity ml-2">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={(e) => {
                                e.stopPropagation();
                                startEditing(chat);
                              }}
                              className="h-6 w-6 p-0 hover:bg-[#9b87f5]/20"
                            >
                              <Edit2 className="w-3 h-3 text-[#9b87f5]" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteChat(chat.id);
                              }}
                              className="h-6 w-6 p-0 hover:bg-red-500/20"
                            >
                              <Trash2 className="w-3 h-3 text-red-500" />
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
          
          {chatSessions.length === 0 && (
            <div className="text-center text-muted-foreground py-8">
              <MessageCircle className="w-12 h-12 mx-auto mb-4 text-[#9b87f5]/50" />
              <p>Nenhuma conversa encontrada</p>
              <Button
                onClick={handleCreateNewChat}
                className="mt-4 bg-[#9b87f5] hover:bg-[#7E69AB] text-white"
              >
                Iniciar Primeiro Chat
              </Button>
            </div>
          )}
        </div>
        
        {/* Footer */}
        <div className="p-4 border-t border-border">
          <Button 
            variant="outline" 
            onClick={clearHistory}
            disabled={chatSessions.find(chat => chat.id === currentChatId)?.messageCount === 0}
            className="w-full"
          >
            Limpar Chat Atual
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatSidebar;
