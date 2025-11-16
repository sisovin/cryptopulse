
import { CryptoCurrency, PortfolioAsset, PriceDataPoint } from './types';

export const MOCK_CRYPTOS: CryptoCurrency[] = [
  { id: 'bitcoin', symbol: 'btc', name: 'Bitcoin', image: 'https://picsum.photos/id/10/64', current_price: 68000.50, market_cap: 1300000000000, total_volume: 45000000000, price_change_percentage_24h: 2.5 },
  { id: 'ethereum', symbol: 'eth', name: 'Ethereum', image: 'https://picsum.photos/id/11/64', current_price: 3500.75, market_cap: 420000000000, total_volume: 25000000000, price_change_percentage_24h: -1.2 },
  { id: 'solana', symbol: 'sol', name: 'Solana', image: 'https://picsum.photos/id/12/64', current_price: 150.20, market_cap: 70000000000, total_volume: 5000000000, price_change_percentage_24h: 5.8 },
  { id: 'cardano', symbol: 'ada', name: 'Cardano', image: 'https://picsum.photos/id/13/64', current_price: 0.45, market_cap: 16000000000, total_volume: 800000000, price_change_percentage_24h: 0.5 },
  { id: 'ripple', symbol: 'xrp', name: 'Ripple', image: 'https://picsum.photos/id/14/64', current_price: 0.52, market_cap: 28000000000, total_volume: 1500000000, price_change_percentage_24h: -3.1 },
  { id: 'dogecoin', symbol: 'doge', name: 'Dogecoin', image: 'https://picsum.photos/id/15/64', current_price: 0.15, market_cap: 22000000000, total_volume: 2000000000, price_change_percentage_24h: 10.2 },
];

export const MOCK_PORTFOLIO: PortfolioAsset[] = [
  { id: 'bitcoin', name: 'Bitcoin', symbol: 'btc', image: 'https://picsum.photos/id/10/64', amount: 0.5, current_price: 68000.50 },
  { id: 'ethereum', name: 'Ethereum', symbol: 'eth', image: 'https://picsum.photos/id/11/64', amount: 10, current_price: 3500.75 },
  { id: 'solana', name: 'Solana', symbol: 'sol', image: 'https://picsum.photos/id/12/64', amount: 100, current_price: 150.20 },
];

export const MOCK_PRICE_HISTORY: PriceDataPoint[] = [
  { date: '2023-01', price: 16000 },
  { date: '2023-02', price: 22000 },
  { date: '2023-03', price: 28000 },
  { date: '2023-04', price: 27000 },
  { date: '2023-05', price: 35000 },
  { date: '2023-06', price: 42000 },
  { date: '2023-07', price: 45000 },
  { date: '2023-08', price: 50000 },
  { date: '2023-09', price: 61000 },
  { date: '2023-10', price: 65000 },
  { date: '2023-11', price: 67000 },
  { date: '2023-12', price: 68000 },
];
