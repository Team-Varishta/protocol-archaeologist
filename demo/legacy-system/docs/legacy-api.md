# LegacyBank API Documentation

## Overview
This document describes the LegacyBank API for processing financial transactions.

## Payment Processing

### POST /api/payment
Process a payment transaction.

#### Parameters
- `accountId` (required): The account ID to debit
- `amount` (required): Transaction amount
- `currency` (required for non-USD accounts): Currency code. **Must be supplied when the account's native currency is not USD.** Omitting this field for a non-USD account will result in a `400 Bad Request` error. For USD accounts the field may be omitted and will default to `"USD"`.

#### Request Body
```json
{
  "accountId": "string",
  "amount": "number",
  "currency": "string"  // Required for non-USD accounts; defaults to "USD" for USD accounts
}
```

#### Response
```json
{
  "transactionId": "string",
  "status": "string",
  "timestamp": "ISO 8601 datetime"
}
```

#### Error Response (400 Bad Request)
```json
{
  "error": "Bad Request",
  "message": "Currency is required for international transactions",
  "statusCode": 400
}
```

#### Notes
- `currency` is **required** for accounts whose native currency is not USD. Omitting it returns a `400 Bad Request`.
- For USD accounts, `currency` may be omitted and will be inferred as `"USD"`.
- Supported currencies: USD, EUR, GBP, JPY

#### Historical Note
> **2022.3 patch** — Prior to release 2022.3 the `currency` field was treated as fully optional for all accounts and silently defaulted to `"USD"` regardless of account type. This caused silent data corruption for international accounts where the stored account currency differed from USD. The field was made **required for non-USD accounts** in patch 2022.3 and the service now rejects missing-currency requests with a `400 Bad Request` response instead of proceeding with an incorrect currency assumption.
