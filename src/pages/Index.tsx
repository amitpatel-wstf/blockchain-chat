
import React from 'react';
import SolanaChatContainer from '../components/SolanaChatContainer';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="p-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-solana-purple hexagon flex items-center justify-center">
            <span className="text-white font-bold">S</span>
          </div>
          <span className="text-lg font-bold bg-gradient-to-r from-solana-purple to-solana-accent bg-clip-text text-transparent">
            Sol<span className="text-white">Info</span>
          </span>
        </div>
        <div className="hidden md:flex space-x-4 text-sm">
          <a href="#" className="text-gray-400 hover:text-white transition-colors">Documentation</a>
          <a href="#" className="text-gray-400 hover:text-white transition-colors">API</a>
          <a href="#" className="text-gray-400 hover:text-white transition-colors">GitHub</a>
        </div>
      </header>

      <main className="flex-1">
        <SolanaChatContainer />
      </main>

      <footer className="text-center p-4 text-xs text-gray-500">
        <p>© 2025 SolanaInfo Chat • Not affiliated with the Solana Foundation</p>
      </footer>
    </div>
  );
};

export default Index;
