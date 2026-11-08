"use client";

import { Component, type ReactNode } from "react";

type Props = {
  /** Called once when anything inside throws (e.g. the WebGL renderer after a lost context). */
  onError: () => void;
  children: ReactNode;
};

/**
 * Keeps a WebGL failure inside the 3D section. Without it, an error thrown from the
 * renderer (such as drawing after the GPU context is lost) propagates to the React root and
 * unmounts the entire page. On error this renders nothing and tells the parent to swap in
 * the static version of the section.
 */
export class SceneBoundary extends Component<Props, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch() {
    this.props.onError();
  }

  render() {
    return this.state.failed ? null : this.props.children;
  }
}
