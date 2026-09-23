import { Component, type ReactNode } from 'react';

// Must live outside the lazy module: Suspense only handles pending imports,
// and a boundary inside an import that failed to load can never catch it.
export class SceneErrorBoundary extends Component<
  { children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    if (this.state.failed) {
      return (
        <div className="webgl-fallback" role="status">
          <img src="/assets/vynex-logo.png" alt="" />
          <p>Vynex Bank</p>
          <small>Your Tomorrow, Our Priority</small>
          <button className="scene-retry" onClick={() => window.location.reload()}>
            Reload the 3D experience
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
