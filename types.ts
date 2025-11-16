
export interface CryptoCurrency {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  total_volume: number;
  price_change_percentage_24h: number;
}

export interface PortfolioAsset {
  id: string;
  name: string;
  symbol: string;
  image: string;
  amount: number;
  current_price: number;
}

export interface PriceDataPoint {
  date: string;
  price: number;
}

export enum Screen {
  PortfolioSummary = 'Portfolio',
  MarketOverview = 'Markets',
  PortfolioAnalytics = 'Analytics',
  PriceAnalysisCenter = 'Analysis',
  WatchlistMonitor = 'Watchlist',
  CryptoDetail = 'Detail',
}
