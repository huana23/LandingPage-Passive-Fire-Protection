/**
 * Inline script that runs BEFORE React hydrates. Some browser extensions
 * inject DOM that differs from the server-rendered HTML, causing React
 * hydration mismatches. We have to deal with several distinct forms of
 * injection -- and we have to deal with them BEFORE React loads, because
 * once hydration is logged it is not recoverable for that mount.
 *
 * Categories of extension pollution handled below:
 *
 *  1. Injected ATTRIBUTES on existing elements
 *     e.g. bis_skin_checked, bis_register, bis_use,
 *          cz-shortcut-listen, __processed_<uuid>__
 *     React DevTools, AdBlockers, Kaspersky, Avast, Yandex inject these.
 *
 *  2. Injected script elements pointing at chrome-extension://...
 *     e.g. React DevTools injects <script src="chrome-extension://.../200.js">
 *     This appears INSIDE <head> and changes the child list of <head>,
 *     which trips Next.js hydration diff.
 *
 *  3. Mutation of EXISTING scripts
 *     React DevTools rewrites the type attribute of every script to
 *     "text/javascript", including our JSON-LD blocks (which are
 *     application/ld+json). We restore the original type by matching
 *     against a known allow-list of types we use in the app.
 *
 *  4. meta charset, meta name="..." etc. duplicated by extensions
 *     These don't usually cause a hydration error but are kept clean.
 *
 * The script runs synchronously at parse time, then continues sweeping on
 * every animation frame until React hydration completes and ClientBody
 * calls window.__stopExtensionAttributeGuard().
 *
 * IMPORTANT: this script is loaded with dangerouslySetInnerHTML and runs
 * in the same microtask as the HTML parser. Do NOT use any modern JS
 * features here -- keep it ES5-compatible so it works in every browser,
 * including the rare ones used by some QA tools.
 */
export const EXTENSION_ATTRIBUTE_GUARD_SCRIPT = `(function(){
  if (typeof window === 'undefined' || typeof document === 'undefined') return;

  // 1) Attribute prefixes that extensions inject.
  var ATTR_PREFIXES = [
    'bis_skin_checked',
    'bis_register',
    'bis_use',
    'cz-shortcut-listen',
    '__processed_',
    'data-extension-',
    'data-extension_injected',
  ];

  // 3) Allow-list of script type values used in our app. If an extension
  //    rewrote a script type to something else (commonly text/javascript)
  //    we restore it.
  var SCRIPT_TYPE_ALLOWLIST = {
    'application/ld+json': true,
    'application/json': true,
  };

  // Some extensions also strip the nonce and other attributes we do not
  // care about; we ignore those.
  function isInjectedAttr(name) {
    for (var i = 0; i < ATTR_PREFIXES.length; i++) {
      var p = ATTR_PREFIXES[i];
      if (name === p) return true;
      if (p.charAt(p.length - 1) !== '_' && name.indexOf(p) === 0) return true;
    }
    return false;
  }

  function stripAttrs(el) {
    if (!el || !el.attributes) return;
    var remove = [];
    for (var i = 0; i < el.attributes.length; i++) {
      if (isInjectedAttr(el.attributes[i].name)) {
        remove.push(el.attributes[i].name);
      }
    }
    for (var j = 0; j < remove.length; j++) {
      el.removeAttribute(remove[j]);
    }
  }

  // 2) Remove scripts with src=chrome-extension:// etc. that extensions
  //    inject into <head>. These pollute the SSR-vs-client diff because
  //    the server never emitted them. We do NOT remove scripts with
  //    other srcs.
  function stripExtensionScripts(root) {
    if (!root || !root.querySelectorAll) return;
    var scripts = root.querySelectorAll('script');
    for (var i = 0; i < scripts.length; i++) {
      var s = scripts[i];
      var src = s && s.getAttribute && s.getAttribute('src');
      if (!src) continue;
      if (
        src.indexOf('chrome-extension://') === 0 ||
        src.indexOf('moz-extension://') === 0 ||
        src.indexOf('safari-extension://') === 0 ||
        src.indexOf('ms-browser-extension://') === 0
      ) {
        if (s.parentNode) s.parentNode.removeChild(s);
      }
    }
  }

  // 3) Restore the original type on a script if the extension changed it.
  //    We detect this by looking at the inline content: JSON-LD scripts
  //    always start with {"@context" or {"@graph".
  function restoreScriptTypes(root) {
    if (!root || !root.querySelectorAll) return;
    var scripts = root.querySelectorAll('script');
    for (var i = 0; i < scripts.length; i++) {
      var s = scripts[i];
      if (!s) continue;
      var currentType = (s.getAttribute('type') || '').toLowerCase();
      if (SCRIPT_TYPE_ALLOWLIST[currentType]) continue;
      var content = s.textContent || '';
      var trimmed = content.replace(/^\\s+/, '');
      if (
        trimmed.charAt(0) === '{' &&
        (trimmed.indexOf('"@context"') !== -1 || trimmed.indexOf('"@graph"') !== -1)
      ) {
        s.setAttribute('type', 'application/ld+json');
      }
    }
  }

  function sweep(root) {
    if (!root) return;
    if (root.nodeType !== 1 && root.nodeType !== 9) return;
    stripAttrs(root);
    stripExtensionScripts(root);
    restoreScriptTypes(root);
    if (root.querySelectorAll) {
      var all = root.querySelectorAll('*');
      for (var i = 0; i < all.length; i++) {
        stripAttrs(all[i]);
      }
    }
  }

  // Run an initial sweep synchronously, then keep sweeping on every
  // animation frame until React calls the stop function below.
  sweep(document);
  var stop = false;
  function tick() {
    if (stop) return;
    sweep(document);
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);

  // Bound the rAF loop: even if React never calls stop, give up after
  // 5 seconds. Most extension injections happen in the first 200-500ms.
  setTimeout(function () { stop = true; }, 5000);

  window.__stopExtensionAttributeGuard = function () { stop = true; };
})();`;
