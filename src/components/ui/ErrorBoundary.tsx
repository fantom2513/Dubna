import { Component } from 'react';
import type { ReactNode, ErrorInfo } from 'react';
import { WarningCircle } from '@phosphor-icons/react';
import GlassCard from './GlassCard';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('ErrorBoundary caught:', error, info);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;
      return (
        <GlassCard className="p-6 flex flex-col items-center gap-3 text-center">
          <WarningCircle size={32} className="text-destructive" />
          <p className="text-sm text-text-secondary">
            {this.state.error?.message ?? 'Произошла ошибка'}
          </p>
          <button
            onClick={this.handleRetry}
            className="text-xs text-accent-primary hover:text-text-primary transition-colors border border-accent-primary/30 rounded-full px-4 py-1.5"
            style={{ fontFamily: '"IBM Plex Mono", monospace' }}
          >
            Повторить
          </button>
        </GlassCard>
      );
    }

    return this.props.children;
  }
}
