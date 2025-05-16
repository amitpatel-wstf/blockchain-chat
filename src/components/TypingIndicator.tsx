
import React from 'react';

const TypingIndicator: React.FC = () => {
  return (
    <div className="flex w-full mb-4 justify-start">
      <div className="system-message flex items-center">
        <span className="typing-indicator"></span>
        <span className="typing-indicator" style={{ animationDelay: '0.2s' }}></span>
        <span className="typing-indicator" style={{ animationDelay: '0.4s' }}></span>
      </div>
    </div>
  );
};

export default TypingIndicator;
