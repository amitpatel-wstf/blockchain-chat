
import React from 'react';
import { MessageCircle } from 'lucide-react';

const ChatHeader = () => {
  return (
    <div className="flex items-center justify-between py-4 px-6 glass-card mb-4">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 flex items-center justify-center bg-solana-purple/20 rounded-full animate-pulse-glow">
          <MessageCircle className="h-6 w-6 text-solana-purple" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-white">Solana Info Chat</h1>
          <p className="text-sm text-gray-400">Ask anything about Solana blockchain</p>
        </div>
      </div>
      <div className="hidden md:flex items-center space-x-2">
        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
        <span className="text-xs text-green-400">Connected to Blockchains</span>
      </div>
    </div>
  );
};

export default ChatHeader;
