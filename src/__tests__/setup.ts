import "@testing-library/jest-dom/vitest";
import { vi } from "vitest";
import React from "react";

Object.defineProperty(window, "scrollTo", { value: () => {} });

vi.mock("motion/react", () => ({
  motion: new Proxy(
    {},
    {
      get: (_, tag: string) => {
        const Component = ({ children, initial, animate, transition, exit, whileHover, ...props }: any) =>
          React.createElement(tag, props, children);
        Component.displayName = `motion.${tag}`;
        return Component;
      },
    }
  ),
  AnimatePresence: ({ children }: any) => React.createElement(React.Fragment, null, children),
}));
