import React from "react";
import { AlertTriangle, RotateCw } from "lucide-react";

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("BhashaSetu Component Error Boundary caught an error:", error, errorInfo);
    this.setState({ errorInfo });
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-6 m-4 rounded-3xl bg-rose-50 dark:bg-rose-950/80 border-2 border-rose-300 dark:border-rose-800 text-rose-900 dark:text-rose-100 shadow-xl max-w-2xl mx-auto space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-rose-200 dark:bg-rose-900/60 text-rose-700 dark:text-rose-200">
              <AlertTriangle className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-xl font-black">त्रुटि: घटक लोड करने में समस्या आई</h2>
              <p className="text-xs text-rose-700 dark:text-rose-300">
                (Component Rendering Error caught by ErrorBoundary)
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-[#1A0B0E] border border-rose-200 dark:border-rose-900 font-mono text-xs overflow-x-auto space-y-2">
            <div className="font-bold text-rose-600 dark:text-rose-400">
              {this.state.error && this.state.error.toString()}
            </div>
            {this.state.errorInfo && (
              <pre className="text-[11px] text-stone-600 dark:text-stone-400 whitespace-pre-wrap">
                {this.state.errorInfo.componentStack}
              </pre>
            )}
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={this.handleReset}
              className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-black text-xs flex items-center gap-2 transition-colors cursor-pointer shadow-md"
            >
              <RotateCw className="w-4 h-4" />
              <span>पुनः प्रयास करें (Try Again)</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
