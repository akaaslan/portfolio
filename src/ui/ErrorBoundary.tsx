import { Component, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  label?: string;
  /** When true, renders the actual error message on screen (debugging). */
  debug?: boolean;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

/**
 * Isolates a subtree so a crash (e.g. WebGL/Three.js failing) never takes
 * down the whole app. Renders `fallback` (default: nothing) on error.
 * With `debug`, shows the error message so it's never an invisible blank page.
 */
export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: unknown) {
    // eslint-disable-next-line no-console
    console.error(`[ErrorBoundary${this.props.label ? ` ${this.props.label}` : ''}]`, error);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.debug) {
        return (
          <pre
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 999999,
              margin: 0,
              padding: '2rem',
              background: '#05060A',
              color: '#FF6B6B',
              fontFamily: 'monospace',
              fontSize: 14,
              whiteSpace: 'pre-wrap',
              overflow: 'auto',
            }}
          >
            {`⛔ ${this.props.label ?? 'App'} crashed:\n\n`}
            {this.state.error?.stack || String(this.state.error)}
          </pre>
        );
      }
      if (this.props.fallback !== undefined) return this.props.fallback;
      // Branded graceful fallback (production)
      return (
        <div
          style={{
            position: 'fixed', inset: 0, zIndex: 999999,
            display: 'flex', flexDirection: 'column', gap: '1.2rem',
            alignItems: 'center', justifyContent: 'center', textAlign: 'center',
            background: '#08090B', color: '#F4F4F2', padding: '2rem',
            fontFamily: "'Space Grotesk', system-ui, sans-serif",
          }}
        >
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, letterSpacing: '0.2em', color: '#CCFF00' }}>
            SYSTEM FAULT
          </div>
          <div style={{ fontSize: 'clamp(1.5rem,5vw,2.5rem)', fontWeight: 700, letterSpacing: '-0.02em' }}>
            Something glitched.
          </div>
          <button
            type="button"
            onClick={() => window.location.reload()}
            style={{
              fontFamily: "'JetBrains Mono', monospace", fontSize: 12, letterSpacing: '0.14em',
              textTransform: 'uppercase', padding: '0.8rem 1.4rem',
              border: '1px solid #CCFF00', background: '#CCFF00', color: '#08090B', cursor: 'pointer',
            }}
          >
            Reload ↻
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
