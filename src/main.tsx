import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ErrorBoundary } from './ui/ErrorBoundary'

// In dev, surface any uncaught error/rejection visibly instead of a blank page.
if (import.meta.env.DEV) {
  const showFatal = (msg: string) => {
    const el = document.getElementById('root');
    if (el && !el.dataset.crashed) {
      el.dataset.crashed = '1';
      el.innerHTML =
        `<pre style="position:fixed;inset:0;margin:0;padding:2rem;background:#05060A;color:#FF6B6B;font:14px monospace;white-space:pre-wrap;overflow:auto;z-index:999999">⛔ Uncaught:\n\n${msg}</pre>`;
    }
  };
  window.addEventListener('error', (e) => showFatal(e.error?.stack || e.message));
  window.addEventListener('unhandledrejection', (e) =>
    showFatal(String((e.reason && (e.reason.stack || e.reason.message)) || e.reason)),
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary label="App" debug={import.meta.env.DEV}>
      <App />
    </ErrorBoundary>
  </StrictMode>,
)
