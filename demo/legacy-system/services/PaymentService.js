/**
 * Payment Service for LegacyBank
 * Processes payment transactions
 */

// Simulate a database connection
const db = {
  // In a real system, this would be a database connection
  accounts: [
    { id: 1, accountNumber: 'ACC001', balance: 1000, currency: 'USD', customerId: 1 },
    { id: 2, accountNumber: 'ACC002', balance: 500, currency: 'EUR', customerId: 2 }
  ],
  transactions: []
};

/**
 * Process a payment transaction
 * @param {Object} transactionData - Transaction details
 * @param {string} transactionData.accountId - The account ID to debit
 * @param {number} transactionData.amount - Transaction amount
 * @param {string} [transactionData.currency] - Currency code (required for non-USD accounts; see 2022.3 patch)
 * @returns {Promise<Object>} Transaction result or HTTP 400 error object
 */
async function processPayment(transactionData) {
  const { accountId, amount, currency } = transactionData;

  // Validate account exists
  const account = db.accounts.find(acc => acc.id === parseInt(accountId));
  if (!account) {
    throw new Error(`Account ${accountId} not found`);
  }

  // Currency is required for non-USD accounts (business rule patched in 2022.3).
  // Return a structured 400 Bad Request instead of throwing an unhandled exception.
  if (!currency && account.currency !== 'USD') {
    return {
      statusCode: 400,
      error: 'Bad Request',
      message: 'Currency is required for international transactions'
    };
  }

  // If currency is not provided, use the account's currency
  const transactionCurrency = currency || account.currency;

  // Create transaction record
  const transaction = {
    id: db.transactions.length + 1,
    accountId: account.id,
    amount,
    currency: transactionCurrency,
    transactionType: 'payment',
    status: 'completed',
    createdAt: new Date().toISOString()
  };

  // Update account balance (simplified)
  account.balance -= amount;

  // Save transaction
  db.transactions.push(transaction);

  return {
    transactionId: transaction.id,
    status: transaction.status,
    timestamp: transaction.createdAt
  };
}

module.exports = { processPayment };
