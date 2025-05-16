
import React, { useState } from 'react';
import { Send, Copy } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  suggestedPrompts?: string[];
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, suggestedPrompts }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  const handlePromptClick = (prompt: string) => {
    onSendMessage(prompt);
  };

  const handleCopyPrompt = (prompt: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering the parent button's onClick
    navigator.clipboard.writeText(prompt);
    // You could add a toast notification here if desired
  };

  return (
    <>
      {suggestedPrompts && suggestedPrompts.length > 0 && (
        <div className="mb-4 overflow-x-auto">
          <div className="flex gap-2 pb-2 flex-nowrap">
            {suggestedPrompts.map((prompt, index) => (
              <button
                key={index}
                onClick={() => handlePromptClick(prompt)}
                className="whitespace-nowrap px-3 py-1 bg-solana-purple/20 text-white text-sm rounded-full hover:bg-solana-purple/40 transition-colors flex items-center group"
              >
                <span className="truncate max-w-[300px]">{prompt}</span>
                <span 
                  onClick={(e) => handleCopyPrompt(prompt, e)}
                  className="ml-2 p-1 rounded-full opacity-0 group-hover:opacity-100 hover:bg-white/10 transition-opacity"
                  title="Copy to clipboard"
                >
                  <Copy className="h-3 w-3 text-white/70" />
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="glass-card p-3 mt-4">
        <div className="flex items-center">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ask about Solana..."
            className="flex-1 bg-transparent border-0 focus:ring-0 text-white placeholder-gray-500 outline-none"
          />
          <button
            type="submit"
            className="p-2 rounded-full bg-solana-purple text-white transition-transform hover:scale-105"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
      </form>
    </>
  );
};

export default ChatInput;
