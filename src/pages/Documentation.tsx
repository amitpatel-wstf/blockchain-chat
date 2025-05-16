
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
        { 
          name: 'getWalletTokenBalancesPrices', 
          description: 'Shows tokens and USD values in wallet',
          example: 'What\'s in my wallet 0xabc... on Ethereum?'
        },
        { 
          name: 'getWalletNFTs', 
          description: 'Lists all NFTs by wallet',
          example: 'What NFTs do I own at 0xabc...?'
        },
        { 
          name: 'getWalletActiveChains', 
          description: 'Detects EVM chains used',
          example: 'What chains am I active on?'
        },
        { 
          name: 'getWalletNetWorth', 
          description: 'Calculates EVM wallet net worth',
          example: 'What is my net worth?'
        },
        { 
          name: 'getWalletProfitabilitySummary', 
          description: 'PnL summary from txs',
          example: 'Generate a PnL for 0xabc...'
        },
        { 
          name: 'resolveAddressToDomain', 
          description: 'EVM address to ENS/Domain',
          example: 'What\'s the domain for 0xabc...?'
        },
        { 
          name: 'resolveENSDomain', 
          description: 'ENS to wallet address',
          example: 'Who owns vitalik.eth?'
        }
      ]
    },
    {
      id: 'nft',
      name: 'NFT',
      description: 'NFT collections, metadata, and market data',
      tools: [
        { 
          name: 'getNFTOwners', 
          description: 'Returns owners of a given collection',
          example: 'Who owns this NFT collection?'
        },
        { 
          name: 'getNFTFloorPriceByContract', 
          description: 'Floor price (ETH/USD)',
          example: 'What\'s the floor price of Bored Apes?'
        },
        { 
          name: 'getNFTMetadata', 
          description: 'Metadata for 1 NFT',
          example: 'Show me metadata for this Solana NFT'
        },
        { 
          name: 'getNFTTraitsByCollection', 
          description: 'Trait rarity heatmap',
          example: 'Show me rarest NFTs in this collection'
        },
        { 
          name: 'getTopNFTCollectionsByTradingVolume', 
          description: 'Top traded NFT sets',
          example: 'What NFT collections are trending?'
        },
        { 
          name: 'getNFTSalePrices', 
          description: 'Sale history of a tokenId',
          example: 'How much was this NFT sold for last?'
        },
        { 
          name: 'getNFTTrades', 
          description: 'Buyer/seller and tx list',
          example: 'Who traded this collection recently?'
        },
        { 
          name: 'getWalletNFTCollections', 
          description: 'NFT grouped by collection',
          example: 'Which collections do I own?'
        }
      ]
    },
    {
      id: 'token',
      name: 'Token Analytics',
      description: 'Token prices, holders, and market statistics',
      tools: [
        { 
          name: 'getTokenPrice', 
          description: 'Price of any token',
          example: 'What\'s the price of ETH?'
        },
        { 
          name: 'getTokenHolderStats', 
          description: 'Count of holders',
          example: 'How many people hold $CGPT?'
        },
        { 
          name: 'getHistoricalTokenHolders', 
          description: 'Holder chart',
          example: 'What\'s the change in $ETH holders in the last 30 days?'
        },
        { 
          name: 'getTopProfitableWalletPerToken', 
          description: 'ROI leaderboard',
          example: 'Who are the most profitable traders of $ETH?'
        },
        { 
          name: 'getTokenStats', 
          description: 'Market cap, liquidity, etc.',
          example: 'What\'s the volume of $LINK?'
        }
      ]
    },
    {
      id: 'market',
      name: 'Market Insights',
      description: 'Trending tokens and market analytics',
      tools: [
        { 
          name: 'getTrendingTokens', 
          description: 'Hot tokens on-chain',
          example: 'What tokens are trending?'
        },
        { 
          name: 'getTopGainersTokens', 
          description: 'Daily growth leaders',
          example: 'Which tokens gained the most today?'
        },
        { 
          name: 'getTopERC20TokensByMarketCap', 
          description: 'Large cap tokens',
          example: 'Top ERC-20 tokens by market cap'
        },
        { 
          name: 'searchTokens', 
          description: 'Search by name/category',
          example: 'Find tokens related to AI'
        },
        { 
          name: 'getFilteredTokens', 
          description: 'Complex discovery filters',
          example: 'Tokens with high volume and low cap'
        }
      ]
    },
    {
      id: 'solana',
      name: 'Solana',
      description: 'Solana wallet, SPL tokens, and NFTs',
      tools: [
        { 
          name: 'getPortfolio', 
          description: 'SOL + SPL + NFTs summary',
          example: 'What\'s in my Solana wallet?'
        },
        { 
          name: 'balance', 
          description: 'SOL balance',
          example: 'Show my SOL balance'
        },
        { 
          name: 'getSPL', 
          description: 'Non-native tokens',
          example: 'What SPL tokens do I own?'
        },
        { 
          name: 'getNFTs', 
          description: 'All NFTs for wallet',
          example: 'What NFTs do I own on Solana?'
        },
        { 
          name: 'getNFTMetadata', 
          description: 'Detail of a Solana NFT',
          example: 'Show me metadata for this Solana NFT'
        },
        { 
          name: 'getSwapsByWalletAddress', 
          description: 'Solana DEX swap history',
          example: 'Recent swaps on Solana'
        }
      ]
    }
  ];

  const filteredCategories = categories.map(category => ({
    ...category,
    tools: category.tools.filter(tool => 
      tool.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      tool.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (tool.example && tool.example.toLowerCase().includes(searchTerm.toLowerCase()))
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
              placeholder="Search tools by name, description, or example..."
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
                            <TableHead className="w-1/4 text-white">Tool Name</TableHead>
                            <TableHead className="w-1/3 text-white">Description</TableHead>
                            <TableHead className="text-white">Example Query</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {(searchTerm ? filteredCategories.find(c => c.id === category.id)?.tools : category.tools).map((tool) => (
                            <TableRow key={tool.name} className="border-gray-700 hover:bg-gray-700/50">
                              <TableCell className="font-mono text-solana-purple">{tool.name}</TableCell>
                              <TableCell className="text-gray-300">{tool.description}</TableCell>
                              <TableCell className="text-gray-300 italic">{tool.example}</TableCell>
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
