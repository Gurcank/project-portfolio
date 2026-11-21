"use client";

import { Component, type ReactNode } from "react";

type ExperienceBoundaryProps = {
  /** Shown in dev logs so a broken layer is easy to find */
  name: string;
  children: ReactNode;
};

type ExperienceBoundaryState = { failed: boolean };

/**
 * Wraps every experience layer (mascot, cursor, decor, intro). These are extras:
 * if one throws, it disappears and the content stays usable (ADR-18).
 */
export class ExperienceBoundary extends Component<
  ExperienceBoundaryProps,
  ExperienceBoundaryState
> {
  state: ExperienceBoundaryState = { failed: false };

  static getDerivedStateFromError(): ExperienceBoundaryState {
    return { failed: true };
  }

  componentDidCatch(error: unknown) {
    if (process.env.NODE_ENV !== "production") {
      console.error(`[ExperienceBoundary:${this.props.name}]`, error);
    }
  }

  render() {
    if (this.state.failed) return null;
    return this.props.children;
  }
}
