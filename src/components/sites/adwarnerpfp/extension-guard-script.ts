/**
 * Inline script that runs **before** React hydrates. Some browser extensions
 * (Kaspersky, Avast, Yandex, certain ad-blockers) inject attributes such as
 * `bis_skin_checked`, `bis_register`, `bis_use`, `cz-shortcut-listen`, and
 * `__processed_<uuid>__` into arbitrary DOM nodes — including Next.js'
 * internal `<MetadataTree>` and `<Head>` containers above the user
 * `<body>`. React then sees the client DOM differs from the SSR HTML and
 * logs a hydration mismatch.
 *
 * The script synchronously strips the injected attributes from the entire
 * document, then re-runs on every animation frame until `ClientBody`'s
 * effect calls `window.__stopExtensionAttributeGuard()` after hydration.
 */
export const EXTENSION_ATTRIBUTE_GUARD_SCRIPT = `(function(){
  if (typeof window === 'undefined' || typeof document === 'undefined') return;
  var PREFIXES = ['bis_skin_checked', 'bis_register', 'bis_use', 'cz-shortcut-listen', '__processed_'];
  function isInjected(name){
    for (var i = 0; i < PREFIXES.length; i++){
      var p = PREFIXES[i];
      if (name === p || name.indexOf(p) === 0) return true;
    }
    return false;
  }
  function strip(el){
    if (!el || !el.attributes) return;
    var toRemove = [];
    for (var i = 0; i < el.attributes.length; i++){
      if (isInjected(el.attributes[i].name)) toRemove.push(el.attributes[i].name);
    }
    for (var j = 0; j < toRemove.length; j++) el.removeAttribute(toRemove[j]);
  }
  function sweep(root){
    if (!root) return;
    strip(root);
    var all = root.querySelectorAll ? root.querySelectorAll('*') : [];
    for (var i = 0; i < all.length; i++) strip(all[i]);
  }
  var stop = false;
  function tick(){
    if (stop) return;
    sweep(document);
    requestAnimationFrame(tick);
  }
  sweep(document);
  requestAnimationFrame(tick);
  window.__stopExtensionAttributeGuard = function(){ stop = true; };
})();`;
