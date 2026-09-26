/**
 * payment-validation.test.js
 *
 * Production-ready unit test suite for the LegacyBank PaymentService.
 *
 * Covers the currency-parameter discrepancy identified in /demo/legacy-system/
 * that caused a production crash:
 *   - Domestic USD transactions (no currency param) → must succeed
 *   - International non-USD transactions with currency param → must succeed
 *   - International non-USD transactions missing currency param → must throw
 *
 * Run with: npx jest payment-validation.test.js
 */

const { processPayment } = require('./demo/legacy-system/services/PaymentService');

// ---------------------------------------------------------------------------
// Module-level mock of the internal `db` state.
// PaymentService.js keeps its `db` object in module scope, so we re-require
// the module fresh before each test to prevent balance/transaction-list
// mutations from leaking between cases.
// ---------------------------------------------------------------------------
jest.resetModules();

// ---------------------------------------------------------------------------
// Helper: load a fresh module instance so each test starts with the original
// seed accounts (ACC001 balance=1000 USD, ACC002 balance=500 EUR).
// ---------------------------------------------------------------------------
function freshService() {
  jest.resetModules();
  return require('./demo/legacy-system/services/PaymentService');
}

// ============================= TEST SUITES =================================

// ---------------------------------------------------------------------------
// SUITE 1 — Domestic USD transactions (currency param omitted)
// ---------------------------------------------------------------------------
describe('Domestic USD transactions — currency param omitted', () => {
  test('TC-01: standard USD payment succeeds and returns completed status', async () => {
    const { processPayment: pay } = freshService();
    const result = await pay({ accountId: '1', amount: 100 });

    expect(result).toMatchObject({ status: 'completed' });
    expect(typeof result.transactionId).toBe('number');
    expect(typeof result.timestamp).toBe('string');
  });

  test('TC-02: USD payment with an explicit USD currency param also succeeds', async () => {
    const { processPayment: pay } = freshService();
    const result = await pay({ accountId: '1', amount: 200, currency: 'USD' });

    expect(result).toMatchObject({ status: 'completed' });
    expect(result.transactionId).toBeGreaterThan(0);
  });

  test('TC-03: minimum-amount USD payment (amount=1) succeeds', async () => {
    const { processPayment: pay } = freshService();
    const result = await pay({ accountId: '1', amount: 1 });

    expect(result.status).toBe('completed');
  });

  test('TC-04: consecutive USD payments each receive a distinct transactionId', async () => {
    const { processPayment: pay } = freshService();

    const first  = await pay({ accountId: '1', amount: 50 });
    const second = await pay({ accountId: '1', amount: 25 });

    expect(second.transactionId).toBeGreaterThan(first.transactionId);
  });
});

// ---------------------------------------------------------------------------
// SUITE 2 — International non-USD transactions WITH currency param
// ---------------------------------------------------------------------------
describe('International non-USD transactions — currency param present', () => {
  test('TC-05: EUR account with matching EUR currency param succeeds', async () => {
    const { processPayment: pay } = freshService();
    const result = await pay({ accountId: '2', amount: 50, currency: 'EUR' });

    expect(result).toMatchObject({ status: 'completed' });
    expect(result.transactionId).toBeGreaterThan(0);
  });

  test('TC-06: EUR account with a different currency param (GBP) succeeds', async () => {
    // Business rule: any currency value satisfies the requirement — the
    // caller is responsible for FX conversion upstream.
    const { processPayment: pay } = freshService();
    const result = await pay({ accountId: '2', amount: 75, currency: 'GBP' });

    expect(result).toMatchObject({ status: 'completed' });
  });

  test('TC-07: EUR account with JPY currency param succeeds', async () => {
    const { processPayment: pay } = freshService();
    const result = await pay({ accountId: '2', amount: 5000, currency: 'JPY' });

    expect(result.status).toBe('completed');
  });

  test('TC-08: EUR account large-amount payment with currency param succeeds', async () => {
    const { processPayment: pay } = freshService();
    // amount > current balance is intentionally allowed by the current
    // implementation (no overdraft guard); we verify the service does not throw.
    const result = await pay({ accountId: '2', amount: 1000, currency: 'EUR' });

    expect(result.status).toBe('completed');
  });
});

// ---------------------------------------------------------------------------
// SUITE 3 — International non-USD transactions MISSING currency param
//           → must throw the documented error
// ---------------------------------------------------------------------------
describe('International non-USD transactions — currency param missing (must fail)', () => {
  test('TC-09: EUR account with no currency param throws the required error', async () => {
    const { processPayment: pay } = freshService();

    await expect(
      pay({ accountId: '2', amount: 50 })
    ).rejects.toThrow('Currency is required for international transactions');
  });

  test('TC-10: EUR account with explicit null currency param throws', async () => {
    const { processPayment: pay } = freshService();

    await expect(
      pay({ accountId: '2', amount: 50, currency: null })
    ).rejects.toThrow('Currency is required for international transactions');
  });

  test('TC-11: EUR account with empty-string currency param throws', async () => {
    // An empty string is falsy, so it must be treated as missing.
    const { processPayment: pay } = freshService();

    await expect(
      pay({ accountId: '2', amount: 50, currency: '' })
    ).rejects.toThrow('Currency is required for international transactions');
  });

  test('TC-12: EUR account with undefined currency param throws', async () => {
    const { processPayment: pay } = freshService();

    await expect(
      pay({ accountId: '2', amount: 50, currency: undefined })
    ).rejects.toThrow('Currency is required for international transactions');
  });
});

// ---------------------------------------------------------------------------
// SUITE 4 — Account validation (guard-rail cases)
// ---------------------------------------------------------------------------
describe('Account validation', () => {
  test('TC-13: non-existent accountId throws account-not-found error', async () => {
    const { processPayment: pay } = freshService();

    await expect(
      pay({ accountId: '999', amount: 100, currency: 'USD' })
    ).rejects.toThrow('Account 999 not found');
  });
});
