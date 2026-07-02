import "@testing-library/jest-dom/vitest";
import { vi } from "vitest";
import React from "react";

Object.defineProperty(window, "scrollTo", { value: () => {} });

vi.mock("motion/react", () => ({
  motion: new Proxy(
    {},
    {
      get: (_, tag: string) => {
        const Component = ({ children, ...props }: Record<string, unknown>) =>
          React.createElement(tag, props, children);
        Component.displayName = `motion.${tag}`;
        return Component;
      },
    }
  ),
  AnimatePresence: ({ children }: { children: React.ReactNode }) =>
    React.createElement(React.Fragment, null, children),
}));
