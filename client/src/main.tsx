import React, { StrictMode, Component, type ReactNode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App'

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("React Error Boundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '32px', fontFamily: 'monospace', background: '#ffffff', color: '#dc2626', minHeight: '100vh' }}>
          <h2 style={{ fontSize: '20px', marginBottom: '12px' }}>Application Render Error</h2>
          <p style={{ color: '#525252', marginBottom: '16px' }}>The following runtime exception occurred:</p>
          <pre style={{ background: '#f8fafc', padding: '16px', border: '1px solid #d4d4d4', overflow: 'auto', color: '#0a0a0a', fontSize: '13px', lineHeight: 1.5 }}>
            {this.state.error?.toString()}
            {'\n\n'}
            {this.state.error?.stack}
          </pre>
        </div>
      );
    }
    return this.props.children;
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  </StrictMode>,
)