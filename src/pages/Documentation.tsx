
import React, { useState } from 'react';
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableHead, 
  TableRow, 
  TableCell 
} from '@/components/ui/table';
import { 
  Tabs, 
  TabsList, 
  TabsTrigger, 
  TabsContent 
} from '@/components/ui/tabs';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Search } from 'lucide-react';

const Documentation = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const categories = [
    {
      id: 'wallet',
      name: 'Wallet & Identity',
      description: 'Wallet balance, NFTs, and identity resolution tools',
      tools: [
        { name: 'getWalletTokenBalancesPrices', description: 'Shows tokens and USD values in wallet' },
        { name: 'getWalletNFTs', description: 'Lists all NFTs by wallet' },
        { name: 'getWalletActiveChains', description: 'Detects EVM chains used' },
        { name: 'getWalletNetWorth', description: 'Calculates EVM wallet net worth' },
        { name: 'getWalletProfitabilitySummary', description: 'PnL summary from txs' },
        { name: 'resolveAddressToDomain', description: 'EVM address to ENS/Domain' },
        { name: 'resolveENSDomain', description: 'ENS to wallet address' }
      ]
    },
    {
      id: 'nft',
      name: 'NFT',
      description: 'NFT collections, metadata, and market data',
      tools: [
        { name: 'getNFTOwners', description: 'Returns owners of a given collection' },
        { name: 'getNFTFloorPriceByContract', description: 'Floor price (ETH/USD)' },
        { name: 'getNFTMetadata', description: 'Metadata for 1 NFT' },
        { name: 'getNFTTraitsByCollection', description: 'Trait rarity heatmap' },
        { name: 'getTopNFTCollectionsByTradingVolume', description: 'Top traded NFT sets' },
        { name: 'getNFTSalePrices', description: 'Sale history of a tokenId' },
        { name: 'getNFTTrades', description: 'Buyer/seller and tx list' },
        { name: 'getWalletNFTCollections', description: 'NFT grouped by collection' }
      ]
    },
    {
      id: 'token',
      name: 'Token Analytics',
      description: 'Token prices, holders, and market statistics',
      tools: [
        { name: 'getTokenPrice', description: 'Price of any token' },
        { name: 'getTokenHolderStats', description: 'Count of holders' },
        { name: 'getHistoricalTokenHolders', description: 'Holder chart' },
        { name: 'getTopProfitableWalletPerToken', description: 'ROI leaderboard' },
        { name: 'getTokenStats', description: 'Market cap, liquidity, etc.' }
      ]
    },
    {
      id: 'market',
      name: 'Market Insights',
      description: 'Trending tokens and market analytics',
      tools: [
        { name: 'getTrendingTokens', description: 'Hot tokens on-chain' },
        { name: 'getTopGainersTokens', description: 'Daily growth leaders' },
        { name: 'getTopERC20TokensByMarketCap', description: 'Large cap tokens' },
        { name: 'searchTokens', description: 'Search by name/category' },
        { name: 'getFilteredTokens', description: 'Complex discovery filters' }
      ]
    },
    {
      id: 'solana',
      name: 'Solana',
      description: 'Solana wallet, SPL tokens, and NFTs',
      tools: [
        { name: 'getPortfolio', description: 'SOL + SPL + NFTs summary' },
        { name: 'balance', description: 'SOL balance' },
        { name: 'getSPL', description: 'Non-native tokens' },
        { name: 'getNFTs', description: 'All NFTs for wallet' },
        { name: 'getNFTMetadata', description: 'Detail of a Solana NFT' },
        { name: 'getSwapsByWalletAddress', description: 'Solana DEX swap history' }
      ]
    }
  ];

  const filteredCategories = categories.map(category => ({
    ...category,
    tools: category.tools.filter(tool => 
      tool.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      tool.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.tools.length > 0);

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
          <a href="/" className="text-gray-400 hover:text-white transition-colors">Home</a>
          <a href="/documentation" className="text-solana-purple hover:text-white transition-colors">Documentation</a>
          <a href="#" className="text-gray-400 hover:text-white transition-colors">API</a>
          <a href="#" className="text-gray-400 hover:text-white transition-colors">GitHub</a>
        </div>
      </header>

      <main className="flex-1 container mx-auto p-4 max-w-6xl">
        <div className="space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-solana-purple to-solana-accent bg-clip-text text-transparent">
              SolInfo Documentation
            </h1>
            <p className="text-gray-400">
              Comprehensive guide to using our Solana and EVM blockchain tools
            </p>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <input
              className="w-full pl-10 pr-4 py-2 bg-gray-800/80 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-solana-purple text-white"
              placeholder="Search tools by name or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="w-full flex overflow-x-auto space-x-2 bg-transparent">
              <TabsTrigger value="overview" className="data-[state=active]:bg-solana-purple">Overview</TabsTrigger>
              {categories.map((category) => (
                <TabsTrigger 
                  key={category.id} 
                  value={category.id}
                  className="data-[state=active]:bg-solana-purple"
                >
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>
            
            <TabsContent value="overview" className="mt-6">
              <Card className="bg-gray-800/70 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">🔧 Solana Tools Guide</CardTitle>
                  <CardDescription className="text-gray-400">
                    Our comprehensive set of tools for interacting with Solana and EVM blockchains
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-300">
                    This documentation provides a comprehensive guide to the various blockchain tools available in our system.
                    Each tool is designed for specific blockchain operations, from wallet analysis to NFT management and market insights.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                    {categories.map((category) => (
                      <Card key={category.id} className="bg-gray-700/50 border-gray-600 hover:border-solana-purple/50 transition-colors">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg text-white">{category.name}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-gray-300 mb-2">{category.description}</p>
                          <p className="text-xs text-gray-400">{category.tools.length} tools available</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {categories.map((category) => (
              <TabsContent key={category.id} value={category.id} className="mt-6">
                <Card className="bg-gray-800/70 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white">{category.name}</CardTitle>
                    <CardDescription className="text-gray-400">
                      {category.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[calc(100vh-300px)]">
                      <Table>
                        <TableHeader>
                          <TableRow className="hover:bg-transparent">
                            <TableHead className="w-1/3 text-white">Tool Name</TableHead>
                            <TableHead className="text-white">Description</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {(searchTerm ? filteredCategories.find(c => c.id === category.id)?.tools : category.tools).map((tool) => (
                            <TableRow key={tool.name} className="border-gray-700 hover:bg-gray-700/50">
                              <TableCell className="font-mono text-solana-purple">{tool.name}</TableCell>
                              <TableCell className="text-gray-300">{tool.description}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}

            {searchTerm && filteredCategories.length === 0 && (
              <div className="text-center p-8">
                <p className="text-gray-400">No tools found matching your search criteria.</p>
              </div>
            )}
          </Tabs>

          <Separator className="bg-gray-700" />

          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
            <h2 className="text-xl font-bold text-white mb-4">How to Use These Tools</h2>
            <div className="space-y-4 text-gray-300">
              <p>
                Each tool provides specific blockchain data and insights. To use a tool:
              </p>
              <ol className="list-decimal pl-6 space-y-2">
                <li>Select the appropriate category for your use case</li>
                <li>Identify the tool that provides the data you need</li>
                <li>Prepare the required parameters specified in the documentation</li>
                <li>Make an API call using our provided SDK or directly through REST endpoints</li>
                <li>Process the returned data according to the schema definition</li>
              </ol>
              <p className="mt-4 text-sm text-gray-400">
                For detailed API documentation and examples, visit our API section or refer to our GitHub repository.
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="text-center p-4 text-xs text-gray-500">
        <p>© 2025 SolanaInfo Chat • Not affiliated with the Solana Foundation</p>
      </footer>
    </div>
  );
};

export default Documentation;
