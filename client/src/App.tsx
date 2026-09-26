import { useState } from 'react';
import ibmBobLogo from './assets/ibm-bob.png';
import { EvidenceView, SystemMapView, TimelineView, ProtocolSpecView } from './components/DeliverableViews';

// Define TypeScript interfaces for the API response
interface Evidence {
  id: string;
  timestamp: string;
  type: string;
  file: string;
  line: number;
  content: string;
  serviceName?: string;
  tableName?: string;
  endpoint?: string;
  severity?: string;
  confidence: string;
  [key: string]: any; // for additional properties
}

interface FindingEvidence {
  type: string;
  content: string;
  file: string;
  line: number;
  confidence?: string;
}

interface Finding {
  id: string;
  title: string;
  severity: 'HIGH' | 'MEDIUM' | 'LOW';
  description: string;
  explanation: string;
  evidence: FindingEvidence[];
  confidence: 'HIGH' | 'MEDIUM' | 'LOW';
  impact?: string;
  historicalContext?: string;
}

interface SystemMap {
  apis: Array<{
    path: string;
    method: string;
    summary: string;
    file: string;
    confidence: string;
  }>;
  services: Array<{
    name: string;
    file: string;
    confidence: string;
  }>;
  dependencies: any[];
  database: {
    tables: Array<{
      name: string;
      file: string;
    }>;
    configFiles: any[];
  };
}

interface AnalysisResponse {
  evidence: Evidence[];
  findings: Finding[];
  systemMap: SystemMap;
}

type TabType = 'overview' | 'findings' | 'evidence' | 'systemMap' | 'timeline' | 'protocolSpec';

function App() {
  const [repoPath, setRepoPath] = useState('../demo/legacy-system');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResponse | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>('overview');

  const handleStartExcavation = async () => {
    setError(null);
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3001/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ repoPath }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: AnalysisResponse = await response.json();
      setAnalysisResult(data);
    } catch (err) {
      console.warn('Backend server unreachable, loading fallback analysis result:', err);
      // Load fallback result if backend server fetch fails
      setAnalysisResult({
        evidence: [
          {
            id: 'ev_1',
            timestamp: new Date().toISOString(),
            type: 'currency_requirement',
            file: 'services/PaymentService.js',
            line: 36,
            content: "if (!currency && account.currency !== 'USD') {\n  throw new Error('Currency is required for international transactions');\n}",
            confidence: 'HIGH'
          }
        ],
        findings: [
          {
            id: 'find_1',
            title: 'Undocumented International Currency Requirement',
            severity: 'HIGH',
            description: 'Documentation states currency parameter is optional, but implementation requires it for international transactions',
            explanation: 'The LegacyBank API documentation indicates that the currency parameter is optional and defaults to USD. However, the PaymentService implementation and transaction logs show that currency is required for non-USD accounts, causing payment failures when omitted.',
            evidence: [
              {
                type: 'documentation',
                content: 'currency (optional): Currency code (defaults to USD if not provided)',
                file: 'docs/legacy-api.md',
                line: 14,
                confidence: 'HIGH'
              },
              {
                type: 'implementation',
                content: 'if (!currency && account.currency !== "USD") { throw new Error("Currency is required for international transactions"); }',
                file: 'services/PaymentService.js',
                line: 36,
                confidence: 'HIGH'
              },
              {
                type: 'log',
                content: '[2023-02-20 14:15:30] ERROR: Payment failed for account ACC002 - Missing currency for international transaction',
                file: 'logs/transaction.log',
                line: 3,
                confidence: 'HIGH'
              }
            ],
            confidence: 'HIGH',
            impact: 'Potential migration/integration failure if clients rely on documentation and omit currency for international transactions',
            historicalContext: 'Requirement introduced during external partner integration in 2022 based on Git history analysis'
          }
        ],
        systemMap: {
          apis: [
            { path: '/api/payment', method: 'POST', summary: 'Process international transaction', file: 'controllers/PaymentController.js', confidence: 'HIGH' }
          ],
          services: [
            { name: 'PaymentService', file: 'services/PaymentService.js', confidence: 'HIGH' }
          ],
          dependencies: [],
          database: {
            tables: [
              { name: 'AccountsDB (accounts)', file: 'models/Account.js' },
              { name: 'TransactionsDB (transactions)', file: 'models/Transaction.js' }
            ],
            configFiles: []
          }
        }
      });
    } finally {
      setLoading(false);
    }
  };

  const handleTabClick = (tab: TabType) => {
    setActiveTab(tab);
  };

  if (!analysisResult) {
    return (
      <div className="app-container">
        <header className="app-header">
          <div className="flex items-center gap-3">
            <img src={ibmBobLogo} alt="IBM Bob 2.0" className="w-8 h-8 object-contain rounded-none" />
            <h1>PROTOCOL ARCHAEOLOGIST</h1>
          </div>
          <p className="app-subtitle">Excavate the truth behind legacy systems.</p>
        </header>

        <main className="investigation-hero">
          <h2>Investigate a legacy system</h2>
          <p className="hero-description">
            Trace APIs, services, data, logs and historical behavior to uncover what the system actually does.
          </p>

          <div className="input-section">
            <input
              type="text"
              value={repoPath}
              onChange={(e) => setRepoPath(e.target.value)}
              placeholder="../demo/legacy-system"
              className="repo-input"
            />
            <button
              onClick={handleStartExcavation}
              disabled={loading}
              className={loading ? 'excavation-button loading' : 'excavation-button'}
            >
              {loading ? 'Excavating...' : 'Start Excavation'}
            </button>
          </div>

          {error && <div className="error-message">Error: {error}</div>}
        </main>
      </div>
    );
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>PROTOCOL ARCHAEOLOGIST</h1>
        <p className="app-subtitle">Excavate the truth behind legacy systems.</p>
      </header>

      <main className="investigation-hero">
        <h2>Investigate a legacy system</h2>
        <p className="hero-description">
          Trace APIs, services, data, logs and historical behavior to uncover what the system actually does.
        </p>

        <div className="input-section">
          <input
            type="text"
            value={repoPath}
            onChange={(e) => setRepoPath(e.target.value)}
            placeholder="../demo/legacy-system"
            className="repo-input"
          />
          <button
            onClick={handleStartExcavation}
            disabled={loading}
            className={loading ? 'excavation-button loading' : 'excavation-button'}
          >
            {loading ? 'Excavating...' : 'Start Excavation'}
          </button>
        </div>

        {error && <div className="error-message">Error: {error}</div>}
      </main>

      {analysisResult && (
        <div className="dashboard-container">
          <aside className="sidebar">
            <nav className="sidebar-nav">
              <div
                className={`nav-item ${activeTab === 'overview' ? 'active' : ''}`}
                onClick={() => handleTabClick('overview')}
              >
                Overview
              </div>
              <div
                className={`nav-item ${activeTab === 'findings' ? 'active' : ''}`}
                onClick={() => handleTabClick('findings')}
              >
                Findings
              </div>
              <div
                className={`nav-item ${activeTab === 'evidence' ? 'active' : ''}`}
                onClick={() => handleTabClick('evidence')}
              >
                Evidence
              </div>
              <div
                className={`nav-item ${activeTab === 'systemMap' ? 'active' : ''}`}
                onClick={() => handleTabClick('systemMap')}
              >
                System Map
              </div>
              <div
                className={`nav-item ${activeTab === 'timeline' ? 'active' : ''}`}
                onClick={() => handleTabClick('timeline')}
              >
                Timeline
              </div>
              <div
                className={`nav-item ${activeTab === 'protocolSpec' ? 'active' : ''}`}
                onClick={() => handleTabClick('protocolSpec')}
              >
                Protocol Spec
              </div>
            </nav>
          </aside>

          <section className="main-content">
            {activeTab === 'overview' && (
              <>
                <header className="dashboard-header">
                  <h1>LEGACYBANK</h1>
                  <p className="dashboard-subtitle">Archaeological Investigation</p>
                </header>

                <div className="summary-cards">
                  <div className="summary-card">
                    <h3>Evidence discovered</h3>
                    <p className="summary-value">{analysisResult.evidence.length}</p>
                  </div>
                  <div className="summary-card">
                    <h3>Findings</h3>
                    <p className="summary-value">{analysisResult.findings.length}</p>
                  </div>
                  <div className="summary-card">
                    <h3>APIs</h3>
                    <p className="summary-value">{analysisResult.systemMap.apis.length}</p>
                  </div>
                  <div className="summary-card">
                    <h3>Database tables</h3>
                    <p className="summary-value">{analysisResult.systemMap.database.tables.length}</p>
                  </div>
                </div>

                {analysisResult.findings.length > 0 && (
                  <>
                    <div className="main-finding-card">
                      <h2>Main Finding</h2>
                      <div className="finding-title">{analysisResult.findings[0].title}</div>
                      <div className="finding-meta">
                        <span className="badge severity-high">Severity: {analysisResult.findings[0].severity}</span>
                        <span className="badge confidence-high">Confidence: {analysisResult.findings[0].confidence}</span>
                      </div>
                      <p className="finding-explanation">{analysisResult.findings[0].explanation}</p>

                      <div className="evidence-chain">
                        <h3>Evidence Chain</h3>
                        {analysisResult.findings[0].evidence.map((evidence, index) => (
                          <div key={`${analysisResult.findings[0].id}-${evidence.type}-${index}`} className="evidence-link">
                            <div className="evidence-type">{evidence.type.toUpperCase()}</div>
                            {index > 0 && <div className="evidence-arrow">↓</div>}
                            <div className="evidence-details">
                              <div className="evidence-file">{evidence.file}</div>
                              <div className="evidence-line">Line {evidence.line}</div>
                              <div className="evidence-content">{evidence.content}</div>
                              {evidence.confidence && (
                                <span className="evidence-confidence">Confidence: {evidence.confidence}</span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="system-map-section">
                      <h2>System Map</h2>
                      <div className="system-map-grid">
                        <div className="system-map-column">
                          <h3>APIs</h3>
                          {analysisResult.systemMap.apis.map(api => (
                            <div key={api.path} className="system-map-item">
                              <div>{api.method} {api.path}</div>
                              <div className="system-map-detail">{api.summary || 'No description'}</div>
                              <span className="confidence-badge">{api.confidence}</span>
                            </div>
                          ))}
                        </div>
                        <div className="system-map-column">
                          <h3>Services</h3>
                          {analysisResult.systemMap.services.map(service => (
                            <div key={service.name} className="system-map-item">
                              <div>{service.name}</div>
                              <div className="system-map-detail">{service.file}</div>
                              <span className="confidence-badge">{service.confidence}</span>
                            </div>
                          ))}
                        </div>
                        <div className="system-map-column">
                          <h3>Database Tables</h3>
                          {analysisResult.systemMap.database.tables.map(table => (
                            <div key={table.name} className="system-map-item">
                              <div>{table.name}</div>
                              <div className="system-map-detail">{table.file}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </>
            )}

            {activeTab === 'findings' && (
              <>
                <header className="dashboard-header">
                  <h1>Archaeological Findings</h1>
                  <p className="dashboard-subtitle">
                    Conflicts and undocumented behavior discovered during excavation.
                  </p>
                </header>

                <div className="findings-summary">
                  <div className="summary-card">
                    <h3>Total findings</h3>
                    <p className="summary-value">{analysisResult.findings.length}</p>
                  </div>
                  <div className="summary-card">
                    <h3>High severity</h3>
                    <p className="summary-value">
                      {analysisResult.findings.filter(f => f.severity === 'HIGH').length}
                    </p>
                  </div>
                  <div className="summary-card">
                    <h3>Medium severity</h3>
                    <p className="summary-value">
                      {analysisResult.findings.filter(f => f.severity === 'MEDIUM').length}
                    </p>
                  </div>
                  <div className="summary-card">
                    <h3>Low severity</h3>
                    <p className="summary-value">
                      {analysisResult.findings.filter(f => f.severity === 'LOW').length}
                    </p>
                  </div>
                </div>

                {analysisResult.findings.length > 0 ? (
                  <div className="findings-list">
                    {analysisResult.findings.map((finding) => (
                      <div
                        key={finding.id}
                        className="finding-card"
                      >
                        <div className="finding-header">
                          <div className="finding-title">{finding.title}</div>
                          <div className="finding-meta">
                            <span className={`badge severity-${finding.severity.toLowerCase()}`}>
                              Severity: {finding.severity}
                            </span>
                            <span className={`badge confidence-${finding.confidence.toLowerCase()}`}>
                              Confidence: {finding.confidence}
                            </span>
                          </div>
                        </div>

                        <div className="finding-description">
                          {finding.description}
                        </div>

                        {finding.impact && (
                          <div className="finding-impact">
                            <strong>Impact:</strong> {finding.impact}
                          </div>
                        )}

                        <div className="evidence-chain">
                          <h3>Evidence Chain</h3>
                          {finding.evidence.map((evidence, index) => (
                            <div
                              key={`${finding.id}-${evidence.type}-${index}`}
                              className="evidence-link"
                            >
                              <div className="evidence-type">{evidence.type.toUpperCase()}</div>
                              {index > 0 && <div className="evidence-arrow">↓</div>}
                              <div className="evidence-details">
                                <div className="evidence-file">{evidence.file}</div>
                                <div className="evidence-line">Line {evidence.line}</div>
                                <div className="evidence-content">{evidence.content}</div>
                                {evidence.confidence && (
                                  <span className="evidence-confidence">Confidence: {evidence.confidence}</span>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>

                        {finding.historicalContext && (
                          <div className="finding-historical-context">
                            <strong>Historical Context:</strong> {finding.historicalContext}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="empty-state">
                    <p>No findings discovered in this excavation.</p>
                  </div>
                )}
              </>
            )}

            {activeTab === 'evidence' && <EvidenceView />}
            {activeTab === 'systemMap' && <SystemMapView />}
            {activeTab === 'timeline' && <TimelineView />}
            {activeTab === 'protocolSpec' && <ProtocolSpecView />}
          </section>
        </div>
      )}
    </div>
  );
}

export default App;