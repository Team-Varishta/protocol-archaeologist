import React from 'react';

export const EvidenceView: React.FC = () => {
  return (
    <div className="view-container">
      <header className="dashboard-header">
        <h1>Evidence Correlation</h1>
        <p className="dashboard-subtitle">
          Direct proof linking observed system behavior to line-level code, logs, and historical metadata.
        </p>
      </header>

      <div className="main-finding-card">
        <div className="finding-header" style={{ marginBottom: '20px' }}>
          <span style={{ fontSize: '11px', fontWeight: 600, color: '#737373', fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.1em' }}>TARGET FINDING</span>
          <h2 style={{ fontSize: '18px', color: '#0a0a0a', marginTop: '4px', marginBottom: 0 }}>
            Undocumented International Currency Requirement
          </h2>
        </div>

        <div className="evidence-section" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Source Code Evidence */}
          <div style={{ background: '#fafafa', border: '1px solid #d4d4d4', borderRadius: 0, padding: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ padding: '2px 8px', borderRadius: 0, background: '#171717', border: '1px solid #171717', fontSize: '11px', fontWeight: 600, color: '#ffffff', fontFamily: 'monospace', textTransform: 'uppercase' }}>SOURCE CODE PROOF</span>
                <span style={{ fontFamily: 'monospace', fontSize: '13px', color: '#0a0a0a', fontWeight: 600 }}>services/PaymentService.js (Lines 36–38)</span>
              </div>
            </div>
            <pre style={{ background: '#171717', padding: '14px', borderRadius: 0, border: '1px solid #262626', fontFamily: 'monospace', fontSize: '12px', color: '#f5f5f5', overflowX: 'auto', margin: 0, lineHeight: 1.5 }}>
              <code>{`// Check if currency is required for non-USD transactions
if (!currency && account.currency !== 'USD') {
  throw new Error('Currency is required for international transactions');
}`}</code>
            </pre>
          </div>

          {/* Log Artifacts */}
          <div style={{ background: '#fafafa', border: '1px solid #d4d4d4', borderRadius: 0, padding: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
              <span style={{ padding: '2px 8px', borderRadius: 0, background: '#dc2626', border: '1px solid #dc2626', fontSize: '11px', fontWeight: 600, color: '#ffffff', fontFamily: 'monospace', textTransform: 'uppercase' }}>LOG ARTIFACTS</span>
              <span style={{ fontSize: '12px', color: '#525252', fontFamily: 'monospace' }}>Production Failure Entries (logs/transaction.log)</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontFamily: 'monospace', fontSize: '12px' }}>
              <div style={{ background: '#ffffff', border: '1px solid #d4d4d4', borderLeft: '3px solid #dc2626', padding: '10px 12px', borderRadius: 0, color: '#171717' }}>
                <span style={{ color: '#737373', marginRight: '10px' }}>Line 3:</span>
                [2023-02-20 14:15:30] ERROR: Payment failed for account ACC002 - Missing currency for international transaction
              </div>
              <div style={{ background: '#ffffff', border: '1px solid #d4d4d4', borderLeft: '3px solid #dc2626', padding: '10px 12px', borderRadius: 0, color: '#171717' }}>
                <span style={{ color: '#737373', marginRight: '10px' }}>Line 4:</span>
                [2023-02-20 14:16:05] ERROR: Payment failed for account ACC002 - Missing currency for international transaction
              </div>
              <div style={{ background: '#ffffff', border: '1px solid #d4d4d4', borderLeft: '3px solid #dc2626', padding: '10px 12px', borderRadius: 0, color: '#171717' }}>
                <span style={{ color: '#737373', marginRight: '10px' }}>Line 6:</span>
                [2023-03-10 09:05:12] ERROR: Payment failed for account ACC001 - Missing currency for international transaction (attempted EUR)
              </div>
            </div>
          </div>

          {/* Historical Context */}
          <div style={{ background: '#fafafa', border: '1px solid #d4d4d4', borderRadius: 0, padding: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
              <span style={{ padding: '2px 8px', borderRadius: 0, background: '#171717', border: '1px solid #171717', fontSize: '11px', fontWeight: 600, color: '#ffffff', fontFamily: 'monospace', textTransform: 'uppercase' }}>HISTORICAL CONTEXT</span>
              <span style={{ fontSize: '12px', color: '#525252', fontFamily: 'monospace' }}>Git Commits & Inline Code Documentation</span>
            </div>
            <div style={{ background: '#ffffff', padding: '12px 14px', borderRadius: 0, border: '1px solid #d4d4d4', fontSize: '13px', color: '#171717', lineHeight: 1.5 }}>
              "Requirement introduced during external partner integration in 2022 based on Git history analysis"
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const SystemMapView: React.FC = () => {
  return (
    <div className="view-container">
      <header className="dashboard-header">
        <h1>System Map</h1>
        <p className="dashboard-subtitle">
          Observed architecture flow derived from dynamic execution trace and code analysis.
        </p>
      </header>

      <div className="system-map-section">
        <h2 style={{ marginBottom: '24px', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#737373', fontFamily: 'monospace' }}>Architecture Topology</h2>

        <div className="flow-diagram" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', maxWidth: '700px', margin: '0 auto' }}>
          {/* Client Node */}
          <div style={{ background: '#fafafa', border: '1px solid #d4d4d4', borderRadius: 0, padding: '12px 24px', textAlign: 'center', width: '100%', maxWidth: '320px' }}>
            <div style={{ fontSize: '11px', color: '#737373', textTransform: 'uppercase', fontWeight: 600, fontFamily: 'monospace' }}>External Entrypoint</div>
            <div style={{ fontSize: '14px', fontWeight: 600, color: '#0a0a0a', marginTop: '2px' }}>HTTP Client</div>
          </div>

          <div style={{ color: '#737373', fontSize: '12px', fontFamily: 'monospace' }}>↓ POST /api/payment</div>

          {/* Payment Controller */}
          <div style={{ background: '#fafafa', border: '1px solid #d4d4d4', borderRadius: 0, padding: '12px 24px', textAlign: 'center', width: '100%', maxWidth: '320px' }}>
            <div style={{ fontSize: '11px', color: '#171717', textTransform: 'uppercase', fontWeight: 600, fontFamily: 'monospace' }}>Controller</div>
            <div style={{ fontSize: '13px', fontWeight: 600, color: '#0a0a0a', marginTop: '2px', fontFamily: 'monospace' }}>PaymentController.js</div>
          </div>

          <div style={{ color: '#737373', fontSize: '12px', fontFamily: 'monospace' }}>↓ processPayment()</div>

          {/* Payment Service */}
          <div style={{ background: '#ffffff', border: '2px solid #0a0a0a', borderRadius: 0, padding: '14px 24px', textAlign: 'center', width: '100%', maxWidth: '340px' }}>
            <div style={{ fontSize: '11px', color: '#0a0a0a', textTransform: 'uppercase', fontWeight: 700, fontFamily: 'monospace' }}>Service Layer</div>
            <div style={{ fontSize: '14px', fontWeight: 600, color: '#0a0a0a', marginTop: '2px', fontFamily: 'monospace' }}>PaymentService.js</div>
          </div>

          <div style={{ color: '#737373', fontSize: '12px', fontFamily: 'monospace' }}>↓ Queries & Validates</div>

          {/* Branching Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', width: '100%' }}>
            {/* Currency Guard */}
            <div style={{ background: '#fafafa', border: '1px solid #d4d4d4', borderRadius: 0, padding: '16px', textAlign: 'left' }}>
              <div style={{ fontSize: '11px', color: '#171717', textTransform: 'uppercase', fontWeight: 600, fontFamily: 'monospace', marginBottom: '6px' }}>CurrencyCheck Guard</div>
              <p style={{ fontSize: '12px', color: '#525252', margin: 0, fontFamily: 'monospace' }}>
                !currency && account.currency !== 'USD'
              </p>

              <div style={{ marginTop: '12px', paddingTop: '10px', borderTop: '1px solid #d4d4d4', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <div style={{ background: '#dc2626', border: '1px solid #dc2626', padding: '6px 10px', borderRadius: 0, fontSize: '11px', color: '#ffffff', fontFamily: 'monospace', fontWeight: 600 }}>
                  Invalid → Write to transaction.log & 400 Error
                </div>
                <div style={{ background: '#171717', border: '1px solid #171717', padding: '6px 10px', borderRadius: 0, fontSize: '11px', color: '#ffffff', fontFamily: 'monospace', fontWeight: 600 }}>
                  Valid → Commit to TransactionsDB
                </div>
              </div>
            </div>

            {/* Database Tables */}
            <div style={{ background: '#fafafa', border: '1px solid #d4d4d4', borderRadius: 0, padding: '16px', textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ fontSize: '11px', color: '#737373', textTransform: 'uppercase', fontWeight: 600, fontFamily: 'monospace' }}>Database Schemas</div>
              <div style={{ background: '#ffffff', border: '1px solid #d4d4d4', padding: '8px 12px', borderRadius: 0, fontFamily: 'monospace', fontSize: '12px', color: '#0a0a0a' }}>
                AccountsDB (accounts)
              </div>
              <div style={{ background: '#ffffff', border: '1px solid #d4d4d4', padding: '8px 12px', borderRadius: 0, fontFamily: 'monospace', fontSize: '12px', color: '#0a0a0a' }}>
                TransactionsDB (transactions)
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const TimelineView: React.FC = () => {
  const events = [
    {
      year: '2021',
      title: 'Initial Launch API',
      description: 'System introduced with standard payment API design. Currency parameter documented as optional (defaulted to USD).',
      badge: 'Specification',
      color: '#737373'
    },
    {
      year: '2022',
      title: 'International Business Expansion',
      description: 'Multi-currency support introduced. Internal business rules updated to require explicit currency for non-USD accounts.',
      badge: 'Business Patch',
      color: '#737373'
    },
    {
      year: '2022 (Divergence Point)',
      title: 'Code Diverged from Specification',
      description: 'PaymentService.js patched to throw an explicit error for missing currency. API documentation left unupdated.',
      badge: 'Divergence Point',
      color: '#dc2626'
    },
    {
      year: '2026 (Current State)',
      title: 'Production Failures Observed',
      description: 'Integrations relying on original documentation experience recurring 400 Bad Request errors during non-USD payment attempts.',
      badge: 'Current Observed Behavior',
      color: '#0a0a0a'
    }
  ];

  return (
    <div className="view-container">
      <header className="dashboard-header">
        <h1>Archaeological Timeline</h1>
        <p className="dashboard-subtitle">
          System evolution and exact points of divergence between written spec and code execution.
        </p>
      </header>

      <div style={{ position: 'relative', maxWidth: '750px', margin: '20px 0', paddingLeft: '24px' }}>
        {/* Vertical Line */}
        <div style={{ position: 'absolute', left: '7px', top: '8px', bottom: '8px', width: '2px', background: '#d4d4d4' }}></div>

        {events.map((event, idx) => (
          <div key={idx} style={{ position: 'relative', marginBottom: '20px' }}>
            {/* Timeline Marker Dot */}
            <div style={{ position: 'absolute', left: '-24px', top: '8px', width: '8px', height: '8px', borderRadius: 0, background: event.color }}></div>

            <div style={{ background: '#ffffff', border: '1px solid #d4d4d4', borderRadius: 0, padding: '16px 20px', textAlign: 'left', boxShadow: 'none' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                <span style={{ fontSize: '13px', fontWeight: 700, color: '#0a0a0a', fontFamily: 'monospace' }}>{event.year}</span>
                <span style={{ padding: '2px 8px', borderRadius: 0, background: event.color === '#dc2626' ? '#dc2626' : '#171717', color: '#ffffff', fontSize: '11px', fontWeight: 600, fontFamily: 'monospace', textTransform: 'uppercase' }}>
                  {event.badge}
                </span>
              </div>
              <h3 style={{ fontSize: '15px', margin: '4px 0 6px 0', color: '#0a0a0a' }}>{event.title}</h3>
              <p style={{ color: '#525252', fontSize: '13px', lineHeight: 1.5, margin: 0 }}>{event.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const ProtocolSpecView: React.FC = () => {
  return (
    <div className="view-container">
      <header className="dashboard-header">
        <h1>Protocol Specification</h1>
        <p className="dashboard-subtitle">
          Ground-truth API behavior specification reconstructed from code and log evidence.
        </p>
      </header>

      {/* Confidence Card */}
      <div style={{ background: '#ffffff', border: '1px solid #d4d4d4', borderRadius: 0, padding: '16px 20px', marginBottom: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', textAlign: 'left', boxShadow: 'none' }}>
        <div>
          <div style={{ fontSize: '11px', fontWeight: 600, color: '#737373', fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.1em' }}>EVIDENCE CONFIDENCE SCORE</div>
          <div style={{ fontSize: '20px', fontWeight: 700, color: '#0a0a0a', marginTop: '2px', fontFamily: 'monospace' }}>98% CONFIDENCE</div>
          <div style={{ fontSize: '12px', color: '#525252', marginTop: '2px' }}>Verified via PaymentService.js code analysis, test suites, and transaction log errors</div>
        </div>
        <div style={{ width: '160px', background: '#e5e5e5', height: '6px', borderRadius: 0, overflow: 'hidden' }}>
          <div style={{ width: '98%', height: '100%', background: '#0a0a0a' }}></div>
        </div>
      </div>

      {/* Main Spec Box */}
      <div className="main-finding-card" style={{ padding: '24px', borderRadius: 0 }}>
        {/* Endpoint Row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px', paddingBottom: '16px', borderBottom: '1px solid #d4d4d4' }}>
          <span style={{ background: '#171717', color: '#ffffff', border: '1px solid #171717', fontWeight: 700, padding: '2px 8px', borderRadius: 0, fontSize: '11px', fontFamily: 'monospace' }}>POST</span>
          <span style={{ fontSize: '16px', fontWeight: 600, color: '#0a0a0a', fontFamily: 'monospace' }}>/api/payment</span>
        </div>

        {/* Documentation vs Reality Solid High-Contrast Box */}
        <div style={{ background: '#171717', border: '1px solid #171717', padding: '14px 16px', borderRadius: 0, marginBottom: '20px' }}>
          <div style={{ fontWeight: 700, color: '#ffffff', fontSize: '11px', marginBottom: '4px', textTransform: 'uppercase', fontFamily: 'monospace', letterSpacing: '0.05em' }}>
            DOCUMENTATION VS. REALITY
          </div>
          <div style={{ color: '#f5f5f5', fontSize: '13px', lineHeight: 1.5 }}>
            Docs claim <code style={{ color: '#ffffff', background: '#262626', padding: '2px 6px', borderRadius: 0, fontFamily: 'monospace' }}>currency</code> is optional. Reality: strictly mandatory for non-USD accounts.
          </div>
        </div>

        {/* Inputs parameters table */}
        <h3 style={{ color: '#0a0a0a', fontSize: '14px', marginBottom: '10px' }}>Input Parameters</h3>
        <div style={{ overflowX: 'auto', marginBottom: '24px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #d4d4d4', color: '#737373', fontFamily: 'monospace' }}>
                <th style={{ padding: '8px 12px' }}>FIELD</th>
                <th style={{ padding: '8px 12px' }}>TYPE</th>
                <th style={{ padding: '8px 12px' }}>REQUIREMENT</th>
                <th style={{ padding: '8px 12px' }}>OBSERVED BEHAVIOR</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid #d4d4d4' }}>
                <td style={{ padding: '10px 12px', fontFamily: 'monospace', color: '#0a0a0a', fontWeight: 600 }}>accountId</td>
                <td style={{ padding: '10px 12px', color: '#525252', fontFamily: 'monospace' }}>string</td>
                <td style={{ padding: '10px 12px', color: '#0a0a0a' }}>Required</td>
                <td style={{ padding: '10px 12px', color: '#525252' }}>Target account ID to debit</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #d4d4d4' }}>
                <td style={{ padding: '10px 12px', fontFamily: 'monospace', color: '#0a0a0a', fontWeight: 600 }}>amount</td>
                <td style={{ padding: '10px 12px', color: '#525252', fontFamily: 'monospace' }}>number</td>
                <td style={{ padding: '10px 12px', color: '#0a0a0a' }}>Required</td>
                <td style={{ padding: '10px 12px', color: '#525252' }}>Transaction payment amount</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #d4d4d4', background: '#fafafa' }}>
                <td style={{ padding: '10px 12px', fontFamily: 'monospace', color: '#dc2626', fontWeight: 600 }}>currency</td>
                <td style={{ padding: '10px 12px', color: '#525252', fontFamily: 'monospace' }}>string</td>
                <td style={{ padding: '10px 12px' }}>
                  <span style={{ padding: '2px 8px', borderRadius: 0, background: '#dc2626', border: '1px solid #dc2626', color: '#ffffff', fontSize: '11px', fontWeight: 600, fontFamily: 'monospace' }}>
                    REQUIRED FOR NON-USD ACCOUNTS
                  </span>
                </td>
                <td style={{ padding: '10px 12px', color: '#171717' }}>
                  Mandatory for non-USD accounts. Optional only if target account currency is USD.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Responses */}
        <h3 style={{ color: '#0a0a0a', fontSize: '14px', marginBottom: '10px' }}>Response Schemas</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div>
            <div style={{ fontSize: '11px', color: '#16a34a', fontWeight: 600, marginBottom: '6px', fontFamily: 'monospace', textTransform: 'uppercase' }}>200 OK — Success</div>
            <pre style={{ background: '#171717', padding: '12px', borderRadius: 0, border: '1px solid #262626', fontFamily: 'monospace', fontSize: '12px', color: '#4ade80', margin: 0 }}>
              {`{
  "success": true,
  "data": {
    "transactionId": 104,
    "status": "completed",
    "timestamp": "2026-09-23T00:00:00.000Z"
  }
}`}
            </pre>
          </div>

          <div>
            <div style={{ fontSize: '11px', color: '#dc2626', fontWeight: 600, marginBottom: '6px', fontFamily: 'monospace', textTransform: 'uppercase' }}>400 Bad Request — Error</div>
            <pre style={{ background: '#171717', padding: '12px', borderRadius: 0, border: '1px solid #262626', fontFamily: 'monospace', fontSize: '12px', color: '#f87171', margin: 0 }}>
              {`{
  "success": false,
  "error": "Currency is required for international transactions"
}`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};



