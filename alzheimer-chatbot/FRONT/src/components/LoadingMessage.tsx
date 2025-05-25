
import React from 'react';

const LoadingMessage: React.FC = () => {
  return (
    <div className="flex items-center space-x-2 text-muted-foreground">
      <div className="flex space-x-1">
        <div className="w-2 h-2 bg-alois-blue rounded-full animate-pulse-dot"></div>
        <div className="w-2 h-2 bg-alois-blue rounded-full animate-pulse-dot" style={{ animationDelay: '0.2s' }}></div>
        <div className="w-2 h-2 bg-alois-blue rounded-full animate-pulse-dot" style={{ animationDelay: '0.4s' }}></div>
      </div>
      <span className="text-sm">Gerando resposta...</span>
    </div>
  );
};

export default LoadingMessage;
