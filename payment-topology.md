## Legacy Payment Service — Topology Map

```mermaid
flowchart TD
    Client(["🖥️ Client\n(HTTP Consumer)"])

    subgraph Express["Express Server (port 3001)"]
        Controller["PaymentController\n.processPayment()"]
    end

    subgraph Service["PaymentService"]
        Guard{"Currency\nValidation Guard\n⚠️ undocumented\n(2022 rule)"}
        ProcessPayment["processPayment()\nDebit account\nCreate transaction record"]
    end

    subgraph Database["In-Memory DB (db object)\nbacked by schema.sql"]
        Accounts[("accounts\nid · account_number\nbalance · currency\ncustomer_id")]
        Transactions[("transactions\nid · account_id · amount\ncurrency · type · status")]
    end

    TxLog[["transaction.log\n(append-only audit log)"]]

    Client -->|"POST /api/analyze\nor payment HTTP request"| Controller
    Controller -->|"PaymentService.processPayment(body)"| Guard

    Guard -->|"currency missing\n& account.currency ≠ USD"| Error["❌ Error thrown\n'Currency required for\ninternational transactions'"]
    Guard -->|"currency present\nor account.currency = USD"| ProcessPayment

    ProcessPayment -->|"lookup account"| Accounts
    ProcessPayment -->|"push transaction"| Transactions
    ProcessPayment -->|"balance −= amount"| Accounts

    Error -->|"console.error()\ncaught in controller"| TxLog
    ProcessPayment -.->|"successful ops logged\n(implicit via console)"| TxLog

    Controller -->|"res.json({ success, data })\nor res.status(400).json({ error })"| Client
```

### Component Notes

| Component | File | Notes |
|---|---|---|
| **Client** | HTTP consumer | Any caller of `POST /api/analyze` or payment endpoints |
| **PaymentController** | [`controllers/PaymentController.js`](demo/legacy-system/controllers/PaymentController.js) | Thin Express handler; delegates entirely to PaymentService |
| **PaymentService** | [`services/PaymentService.js`](demo/legacy-system/services/PaymentService.js) | Core business logic; holds in-memory `db` object |
| **Currency Validation Guard** | [`services/PaymentService.js:36`](demo/legacy-system/services/PaymentService.js:36) | **Undocumented.** Throws if `currency` is absent and account is non-USD. Introduced per a 2022 business rule; no formal documentation exists. Evidenced by repeated `ERROR: Missing currency for international transaction` entries in the log. |
| **Database** | [`database/schema.sql`](demo/legacy-system/database/schema.sql) | Schema defines `accounts` and `transactions` tables; runtime uses an in-memory JS object mirroring the same shape |
| **Transaction Logs** | [`logs/transaction.log`](demo/legacy-system/logs/transaction.log) | Append-only audit log; captures both successes and guard-triggered failures |
