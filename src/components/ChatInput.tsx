
import React, { useState } from 'react';
import { Send } from 'lucide-react';

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

  return (
    <>
      {suggestedPrompts && suggestedPrompts.length > 0 && (
        <div className="mb-4 overflow-x-auto">
          <div className="flex gap-2 pb-2 flex-nowrap">
            {suggestedPrompts.map((prompt, index) => (
              <button
                key={index}
                onClick={() => handlePromptClick(prompt)}
                className="whitespace-nowrap px-3 py-1 bg-solana-purple/20 text-white text-sm rounded-full hover:bg-solana-purple/40 transition-colors"
              >
                {prompt}
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
