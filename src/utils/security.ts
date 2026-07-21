/**
 * © 2026 Mohammad Fazil Firojkhan Malek. All rights reserved.
 * Watermark-ID: MF-FIROJKHAN-MALEK-2026
 * This codebase is protected under intellectual property laws.
 * Author: Mohammad Fazil Firojkhan Malek
 */

export function initSecurity() {
  if (typeof window === "undefined") return;

  // 1. Disable Context Menu (Right Click)
  document.addEventListener("contextmenu", (e) => {
    e.preventDefault();
  });

  // 2. Disable Keyboard Shortcuts for DevTools / Inspect / View Source
  document.addEventListener("keydown", (e) => {
    // Disable F12
    if (e.key === "F12") {
      e.preventDefault();
      return false;
    }

    // Disable Ctrl+Shift+I / Cmd+Opt+I (Inspect)
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === "I" || e.key === "i")) {
      e.preventDefault();
      return false;
    }

    // Disable Ctrl+Shift+J / Cmd+Opt+J (Console)
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === "J" || e.key === "j")) {
      e.preventDefault();
      return false;
    }

    // Disable Ctrl+Shift+C / Cmd+Opt+C (Inspect Element selector)
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === "C" || e.key === "c")) {
      e.preventDefault();
      return false;
    }

    // Disable Ctrl+U / Cmd+Opt+U (View Source)
    if ((e.ctrlKey || e.metaKey) && (e.key === "U" || e.key === "u")) {
      e.preventDefault();
      return false;
    }

    // Disable Ctrl+S / Cmd+S (Save Page)
    if ((e.ctrlKey || e.metaKey) && (e.key === "S" || e.key === "s")) {
      e.preventDefault();
      return false;
    }
  });

  // 3. DevTools Detection & Debugger Trap (Anti-Debugging)
  // This loop runs a debugger statement. If DevTools is open, it pauses execution.
  // We wrap it in a function that runs recursively.
  const debugTrap = () => {
    try {
      (function anonymous() {
        (function() {
          return true;
        }["constructor"]("debugger")());
      }());
    } catch (err) {}
    setTimeout(debugTrap, 100);
  };
  
  // Start the anti-debug loop
  debugTrap();
}
