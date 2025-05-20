import React, { useState } from "react";
import SolanaInfoCard from "./SolanaInfoCard";
import { Copy } from "lucide-react";

export type MessageType = {
  id: string;
  type: "user" | "system";
  content: string;
  messageType : string,
  summary? : string,
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
    <div
      className={`flex w-full mb-4 animate-fade-in ${
        message.type === "user" ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={message.type === "user" ? "user-message" : "system-message"}
      >
        {message.messageType === "code" ? (
          <>
          {message.summary &&<p className="max-h-[200px] overflow-y-scroll mb-2"> <p className="text-xs text-gray-400">{message.summary}</p></p>}
          {message?.content && <CodeEditor codeSnippet={message.content} />}
          </>
        ) : (
          <p>{message.content}</p>
        )}
        {/* {message.infoCard && <SolanaInfoCard info={message.infoCard} />} */}
      </div>
    </div>
  );
};

export default ChatMessage;

function CodeEditor({ codeSnippet }: { codeSnippet: string }) {
  const tabs = ["json"];
  const [activeTab, setActiveTab] = useState("json");

  const handleCopyPrompt = (prompt: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering the parent button's onClick
    navigator.clipboard.writeText(prompt);
    // You could add a toast notification here if desired
  };

  return (
    <div className="bg-[#1e1e1e] text-white max-h-[400px] rounded-md overflow-hidden shadow-lg border border-gray-700 overflow-y-scroll">
      <div className="flex items-center px-4 py-2 border-b border-gray-700 justify-between">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-3 py-1 text-sm font-medium ${
              activeTab === tab
                ? "text-[#3B82F6] border-b-2 border-[#3B82F6]"
                : "text-gray-400"
            }`}
          >
            {tab}
          </button>
        ))}
        <button
          onClick={(e) => handleCopyPrompt(codeSnippet, e)}
          className="ml-2 p-1 rounded-full opacity-0 opacity-100 hover:bg-white/10 transition-opacity"
          title="Copy to clipboard"
        >
          <Copy className="h-3 w-3 text-white/70" />
        </button>
      </div>

      <div className="overflow-auto p-4 font-mono text-sm whitespace-pre leading-relaxed">
        <code>{codeSnippet}</code>
      </div>
    </div>
  );
}
