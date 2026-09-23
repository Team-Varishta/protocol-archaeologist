-- Database schema for LegacyBank
CREATE TABLE accounts (
    id INT PRIMARY KEY AUTO_INCREMENT,
    account_number VARCHAR(20) NOT NULL UNIQUE,
    balance DECIMAL(15, 2) NOT NULL DEFAULT 0.00,
    currency VARCHAR(3) DEFAULT 'USD',
    customer_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE transactions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    account_id INT NOT NULL,
    amount DECIMAL(15, 2) NOT NULL,
    currency VARCHAR(3) NOT NULL,
    transaction_type VARCHAR(50) NOT NULL,
    status VARCHAR(20) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (account_id) REFERENCES accounts(id)
);
