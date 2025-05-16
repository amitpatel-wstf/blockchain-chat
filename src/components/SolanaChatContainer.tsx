import React, { useState, useEffect, useRef } from 'react';
import ChatHeader from './ChatHeader';
import ChatMessage, { MessageType } from './ChatMessage';
import ChatInput from './ChatInput';
import TypingIndicator from './TypingIndicator';

// Sample data to simulate responses
const sampleResponses = [
  {
    content: "Solana is a high-performance blockchain supporting builders around the world creating crypto apps that scale. It's designed for speed and low transaction costs.",
    infoCard: {
      title: "Solana Network Stats",
      data: {
        "TPS": "4,138",
        "Total Transactions": "245,389,776,104",
        "Active Validators": "1,642",
        "Current Slot": "246,119,073",
        "Block Time": "400ms"
      }
    }
  },
  {
    content: "SOL is the native cryptocurrency of the Solana blockchain. It's used for transaction fees and staking.",
    infoCard: {
      title: "SOL Token Info",
      data: {
        "Current Price": "$123.45",
        "Market Cap": "$54.2B",
        "24h Volume": "$1.8B",
        "Circulating Supply": "437.5M SOL",
        "Total Supply": "544.2M SOL"
      }
    }
  },
  {
    content: "Solana validators maintain the network by processing transactions and securing the blockchain.",
    infoCard: {
      title: "Validator Economics",
      data: {
        "Staking APY": "~6.5%",
        "Min Stake": "1 SOL",
        "Commission Range": "0-10%",
        "Active Stakes": "373.5M SOL",
        "Stake Concentration": "Top 20 validators: 33%"
      }
    }
  },
  {
    content: "NFTs on Solana are popular due to low transaction fees and high throughput. The Metaplex protocol is commonly used for minting.",
    infoCard: {
      title: "Solana NFT Statistics",
      data: {
        "Total Collections": "15,700+",
        "24h Volume": "32,450 SOL",
        "Largest Marketplace": "Magic Eden",
        "Avg Mint Cost": "~0.01 SOL",
        "Unique NFT Owners": "948,000+"
      }
    }
  }
];

// Suggested prompts for users
const suggestedPrompts = [
  "What's in my wallet 0xcB1C1FdE09f811B294172696404e88E658659905?",
  "What NFTs do I own at 0xcB1C1FdE09f811B294172696404e88E658659905?",
  "Show my DeFi positions for 0xd100d8b69c5ae23d6aa30c6c3874bf47539b95fd",
  "What is my net worth at 0x1f9090aaE28b8a3dCeaDf281B0F12828e676c326?",
  "Generate a PnL for my wallet 0xcB1C1FdE09f811B294172696404e88E658659905",
  "What token approvals have I made for 0xcB1C1FdE09f811B294172696404e88E658659905?",
  "Show my swap history for 0xcB1C1FdE09f811B294172696404e88E658659905",
  "What chains am I active on 0xcB1C1FdE09f811B294172696404e88E658659905?",
  "What's the domain for 0x94ef5300cbc0aa600a821ccbc561b057e456ab23?",
  "What wallet owns vitalik.eth?"
];

const SolanaChatContainer: React.FC = () => {
  const [messages, setMessages] = useState<MessageType[]>([
    {
      id: '1',
      type: 'system',
      content: 'Hello! I\'m your Solana assistant. Ask me anything about the Solana blockchain, tokens, NFTs, or ecosystem projects.',
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = (content: string) => {
    const newMessage: MessageType = {
      id: Date.now().toString(),
      type: 'user',
      content,
    };
    
    setMessages(prev => [...prev, newMessage]);
    setIsTyping(true);
    
    // Simulate response delay
    setTimeout(() => {
      const randomResponse = sampleResponses[Math.floor(Math.random() * sampleResponses.length)];
      
      const responseMessage: MessageType = {
        id: (Date.now() + 1).toString(),
        type: 'system',
        content: randomResponse.content,
        infoCard: randomResponse.infoCard,
      };
      
      setIsTyping(false);
      setMessages(prev => [...prev, responseMessage]);
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <ChatHeader />
      
      <div className="glass-card p-4 min-h-[500px] max-h-[70vh] overflow-y-auto flex flex-col">
        <div className="flex-1 overflow-y-auto">
          {messages.map(message => (
            <ChatMessage key={message.id} message={message} />
          ))}
          {isTyping && <TypingIndicator />}
          <div ref={messagesEndRef} />
        </div>
      </div>
      
      <ChatInput 
        onSendMessage={handleSendMessage}
        suggestedPrompts={suggestedPrompts}
      />
    </div>
  );
};

export default SolanaChatContainer;
