import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, Home, RefreshCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
      errorInfo: null,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log error to console for debugging
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    this.setState({
      error,
      errorInfo,
    });

    // You can also log to an error reporting service here
    // Example: Sentry.captureException(error);
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  handleReload = () => {
    window.location.reload();
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
          <div className="max-w-2xl w-full">
            <div className="card-sleek p-8 md:p-12 text-center">
              {/* Error Icon */}
              <div className="mb-6 inline-flex p-6 rounded-full bg-red-500/10 border border-red-500/20">
                <AlertTriangle className="w-16 h-16 text-red-500" />
              </div>

              {/* Error Title */}
              <h1 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                Oops! Something went wrong
              </h1>

              {/* Error Message */}
              <p className="text-muted-foreground text-lg mb-8">
                We're sorry for the inconvenience. An unexpected error has occurred.
              </p>

              {/* Error Details (Development Mode) */}
              {import.meta.env.DEV && this.state.error && (
                <details className="mb-8 text-left bg-black/40 rounded-lg p-4 border border-white/10">
                  <summary className="cursor-pointer font-semibold text-white mb-2">
                    Error Details (Development Only)
                  </summary>
                  <div className="text-sm text-red-400 font-mono overflow-auto max-h-64">
                    <div className="mb-4">
                      <strong>Error:</strong> {this.state.error.toString()}
                    </div>
                    {this.state.errorInfo && (
                      <div>
                        <strong>Component Stack:</strong>
                        <pre className="mt-2 whitespace-pre-wrap">
                          {this.state.errorInfo.componentStack}
                        </pre>
                      </div>
                    )}
                  </div>
                </details>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={this.handleReset}
                  className="rounded-full bg-primary text-black hover:bg-primary/90 font-semibold"
                  size="lg"
                >
                  <RefreshCcw className="w-4 h-4 mr-2" />
                  Try Again
                </Button>

                <Button
                  onClick={this.handleGoHome}
                  variant="outline"
                  className="rounded-full border-white/20 hover:border-primary/50 hover:bg-white/5"
                  size="lg"
                >
                  <Home className="w-4 h-4 mr-2" />
                  Go Home
                </Button>

                <Button
                  onClick={this.handleReload}
                  variant="outline"
                  className="rounded-full border-white/20 hover:border-primary/50 hover:bg-white/5"
                  size="lg"
                >
                  <RefreshCcw className="w-4 h-4 mr-2" />
                  Reload Page
                </Button>
              </div>

              {/* Help Text */}
              <p className="text-sm text-muted-foreground mt-8">
                If the problem persists, please{' '}
                <a
                  href="/contact"
                  className="text-primary hover:underline"
                >
                  contact support
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
