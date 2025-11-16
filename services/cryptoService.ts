
import { MOCK_CRYPTOS, MOCK_PORTFOLIO, MOCK_PRICE_HISTORY } from '../constants';
import { CryptoCurrency, PortfolioAsset, PriceDataPoint } from '../types';

export const getTopCryptos = async (): Promise<CryptoCurrency[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MOCK_CRYPTOS);
    }, 500);
  });
};

export const getCryptoDetails = async (id: string): Promise<{ details: CryptoCurrency, history: PriceDataPoint[] } | null> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const crypto = MOCK_CRYPTOS.find(c => c.id === id);
      if (crypto) {
        resolve({ details: crypto, history: MOCK_PRICE_HISTORY });
      } else {
        resolve(null);
      }
    }, 500);
  });
};

export const getPortfolio = async (): Promise<PortfolioAsset[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(MOCK_PORTFOLIO);
      }, 500);
    });
};
