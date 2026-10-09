"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    __stopExtensionAttributeGuard?: () => void;
  }
}

/**
 * Body wrapper. Marks the body as hydration-suppressed (so any extension
 * attributes added to <body> don't warn) and, on mount, runs a
 * MutationObserver over the whole document to keep stripping injected
 * attributes for the lifetime of the app — and stops the pre-hydration
 * inline guard defined in `extension-guard-script.ts`.
 */
export function ClientBody({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  useEffect(() => {
    // The inline guard has been sweeping via rAF since SSR; stop it now
    // that React is hydrated and take over with a more efficient observer.
    window.__stopExtensionAttributeGuard?.();

    const injectedPrefixes = [
      "bis_skin_checked",
      "bis_register",
      "bis_use",
      "cz-shortcut-listen",
      "__processed_",
    ];

    const isInjected = (name: string) =>
      injectedPrefixes.some((p) => name === p || name.startsWith(p));

    const strip = (el: Element) => {
      const toRemove: string[] = [];
      for (let i = 0; i < el.attributes.length; i++) {
        if (isInjected(el.attributes[i].name)) {
          toRemove.push(el.attributes[i].name);
        }
      }
      for (const name of toRemove) el.removeAttribute(name);
    };

    const sweep = (root: ParentNode) => {
      if (root instanceof Element) strip(root);
      root.querySelectorAll?.("*").forEach(strip);
    };

    // Initial sweep over the whole document (catches nodes above <body>).
    sweep(document);

    const observer = new MutationObserver((mutations) => {
      for (const m of mutations) {
        if (m.type === "attributes" && m.target instanceof Element) {
          strip(m.target);
        } else if (m.type === "childList") {
          m.addedNodes.forEach((node) => {
            if (node.nodeType === 1) sweep(node as Element);
          });
        }
      }
    });

    observer.observe(document.documentElement, {
      attributes: true,
      childList: true,
      subtree: true,
      attributeFilter: [
        "bis_skin_checked",
        "bis_register",
        "bis_use",
        "cz-shortcut-listen",
      ],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <body suppressHydrationWarning className={className}>
      {children}
    </body>
  );
}
