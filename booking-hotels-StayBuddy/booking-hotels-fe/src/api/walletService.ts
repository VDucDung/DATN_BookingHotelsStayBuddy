import { callApi } from './apiUtils';

export const walletApi = {
  getWalletInfo: () => callApi('GET', '/wallets'),
  getTransactions: (page: number = 1, limit: number = 10) => 
    callApi('GET', `/wallets/transactions?page=${page}&limit=${limit}`),
  createPaymentIntent: (amount: number) => 
    callApi('POST', '/stripe/create-payment-intent', null, { amount, currency: 'vnd' }),
  createCheckoutSession: (amount: number) => 
    callApi('POST', '/stripe/create-checkout-session', null, { amount }),
};
