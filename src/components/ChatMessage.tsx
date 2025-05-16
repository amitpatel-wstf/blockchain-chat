
import React from 'react';
import SolanaInfoCard from './SolanaInfoCard';

export type MessageType = {
  id: string;
  type: 'user' | 'system';
  content: string;
  infoCard?: {
    title: string;
    data: {
      [key: string]: string | number;
    };
  };
};

interface ChatMessageProps {
  message: MessageType;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  return (
    <div className={`flex w-full mb-4 animate-fade-in ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
      <div className={message.type === 'user' ? 'user-message' : 'system-message'}>
        <p>{message.content}</p>
        {message.infoCard && <SolanaInfoCard info={message.infoCard} />}
      </div>
    </div>
  );
};

export default ChatMessage;
