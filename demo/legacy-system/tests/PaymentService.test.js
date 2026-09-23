const PaymentService = require('../services/PaymentService');

describe('PaymentService', () => {
  describe('processPayment', () => {
    test('should require currency for international transactions', async () => {
      // Account with non-USD currency
      const transactionData = {
        accountId: '2', // ACC002 has EUR
        amount: 50
        // currency is intentionally omitted
      };
      
      await expect(PaymentService.processPayment(transactionData))
        .rejects
        .toThrow('Currency is required for international transactions');
    });
    
    test('should process USD transactions without currency', async () => {
      const transactionData = {
        accountId: '1', // ACC001 has USD
        amount: 100
        // currency omitted - should be OK for USD
      };
      
      await expect(PaymentService.processPayment(transactionData))
        .resolves
        .toMatchObject({
          status: 'completed'
        });
    });
    
    test('should process international transactions when currency is provided', async () => {
      const transactionData = {
        accountId: '2', // ACC002 has EUR
        amount: 50,
        currency: 'GBP' // Different currency provided
      };
      
      await expect(PaymentService.processPayment(transactionData))
        .resolves
        .toMatchObject({
          status: 'completed',
          currency: 'GBP'
        });
    });
  });
});
