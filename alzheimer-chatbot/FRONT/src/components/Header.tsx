
import React, { useState } from 'react';
import { Moon, Sun, Info, History } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';
import InfoModal from './InfoModal';
import ChatSidebar from './ChatSidebar';

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <>
      <header className="flex justify-between items-center p-4 bg-background border-b border-border">
        <h1 className="text-2xl font-bold text-white bg-gradient-to-r from-[#9b87f5] to-[#7E69AB] px-4 py-2 rounded-lg shadow-lg">
          ALOIS CHAT
        </h1>
        
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowInfoModal(true)}
            className="hover:bg-[#9b87f5]/10 border border-[#9b87f5]/20 hover:border-[#9b87f5]/40 transition-all duration-200"
          >
            <div className="w-6 h-6 bg-gradient-to-br from-[#9b87f5] to-[#7E69AB] text-white rounded-full flex items-center justify-center text-sm font-bold shadow-lg">
              <Info className="w-3 h-3" />
            </div>
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="hover:bg-[#9b87f5]/10 border border-[#9b87f5]/20 hover:border-[#9b87f5]/40 transition-all duration-200"
          >
            <div className="w-6 h-6 bg-gradient-to-br from-[#9b87f5] to-[#7E69AB] text-white rounded-full flex items-center justify-center text-sm font-bold shadow-lg">
              {theme === 'light' ? (
                <Moon className="w-3 h-3" />
              ) : (
                <Sun className="w-3 h-3" />
              )}
            </div>
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowSidebar(!showSidebar)}
            className={`hover:bg-[#9b87f5]/10 border border-[#9b87f5]/20 hover:border-[#9b87f5]/40 transition-all duration-200 ${
              showSidebar ? 'bg-[#9b87f5]/10 border-[#9b87f5]/40' : ''
            }`}
          >
            <div className="w-6 h-6 bg-gradient-to-br from-[#9b87f5] to-[#7E69AB] text-white rounded-full flex items-center justify-center text-sm font-bold shadow-lg">
              <History className="w-3 h-3" />
            </div>
          </Button>
        </div>
      </header>

      <InfoModal 
        isOpen={showInfoModal} 
        onClose={() => setShowInfoModal(false)} 
      />
      
      <ChatSidebar 
        isOpen={showSidebar} 
        onClose={() => setShowSidebar(false)} 
      />
    </>
  );
};

export default Header;
