# LegacyBank API Documentation

## Overview
This document describes the LegacyBank API for processing financial transactions.

## Payment Processing

### POST /api/payment
Process a payment transaction.

#### Parameters
- `accountId` (required): The account ID to debit
- `amount` (required): Transaction amount
- `currency` (optional): Currency code (defaults to USD if not provided)

#### Request Body
```json
{
  "accountId": "string",
  "amount": "number",
  "currency": "string"  // Optional - defaults to USD
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

#### Notes
- Currency parameter is optional and will default to USD if omitted
- Supported currencies: USD, EUR, GBP, JPY
