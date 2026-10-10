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
 * attributes + extension scripts for the lifetime of the app — and stops
 * the pre-hydration inline guard defined in `extension-guard-script.ts`.
 *
 * The post-hydration observer mirrors the pre-hydration script so that
 * any extension pollution that happens AFTER React has mounted is also
 * cleaned up (e.g. the React DevTools background page can inject more
 * <script>s after the initial load).
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

    const injectedAttrPrefixes = [
      "bis_skin_checked",
      "bis_register",
      "bis_use",
      "cz-shortcut-listen",
      "__processed_",
      "data-extension-",
      "data-extension_injected",
    ];

    // Exact-match attribute names that extensions also inject. These have
    // to be checked in addition to the prefix list because some extensions
    // set e.g. data-bis_skin_checked (which the prefix list catches) AND
    // also plain "bis_skin_checked" (which the prefix list also catches),
    // but other extensions use unusual casing. Keep this list synced with
    // ATTR_PREFIXES above.
    const injectedAttrExact = new Set<string>([
      "bis_skin_checked",
      "bis_register",
      "bis_use",
      "cz-shortcut-listen",
    ]);

    const scriptTypeAllowlist: Record<string, true> = {
      "application/ld+json": true,
      "application/json": true,
    };

    const isInjectedAttr = (name: string) =>
      injectedAttrPrefixes.some((p) => name === p || name.startsWith(p)) ||
      injectedAttrExact.has(name);

    const stripAttrs = (el: Element) => {
      const toRemove: string[] = [];
      for (let i = 0; i < el.attributes.length; i++) {
        if (isInjectedAttr(el.attributes[i].name)) {
          toRemove.push(el.attributes[i].name);
        }
      }
      for (const name of toRemove) el.removeAttribute(name);
    };

    const stripExtensionScripts = (root: ParentNode) => {
      const scripts = root.querySelectorAll("script");
      for (const s of Array.from(scripts)) {
        const src = s.getAttribute("src");
        if (!src) continue;
        if (
          src.startsWith("chrome-extension://") ||
          src.startsWith("moz-extension://") ||
          src.startsWith("safari-extension://") ||
          src.startsWith("ms-browser-extension://")
        ) {
          s.remove();
        }
      }
    };

    const restoreScriptTypes = (root: ParentNode) => {
      const scripts = root.querySelectorAll("script");
      for (const s of Array.from(scripts)) {
        const currentType = (s.getAttribute("type") || "").toLowerCase();
        if (scriptTypeAllowlist[currentType]) continue;
        const content = s.textContent || "";
        if (
          content.trimStart().startsWith("{") &&
          (content.includes('"@context"') || content.includes('"@graph"'))
        ) {
          s.setAttribute("type", "application/ld+json");
        }
      }
    };

    const sweep = (root: ParentNode) => {
      if (root instanceof Element) stripAttrs(root);
      stripExtensionScripts(root);
      restoreScriptTypes(root);
      root.querySelectorAll?.("*").forEach(stripAttrs);
    };

    // Initial sweep over the whole document (catches nodes above <body>).
    sweep(document);

    const observer = new MutationObserver((mutations) => {
      for (const m of mutations) {
        if (m.type === "attributes" && m.target instanceof Element) {
          stripAttrs(m.target);
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
      // Filter the attribute events we care about. This is critical: if
      // we don't pass `attributeOldValue`, we get many duplicate events
      // from extensions that re-inject the same attribute on every
      // animation frame. We DO want to see those duplicates so we can
      // strip them, so we listen to all attributes.
      attributeOldValue: true,
    });

    return () => observer.disconnect();
  }, []);

  return (
    <body suppressHydrationWarning className={className}>
      {children}
    </body>
  );
}
