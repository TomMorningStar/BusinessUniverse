import { useCallback, useRef } from 'react';

/**
 * Shared, dependency-free control for pausing icon CSS animations that are not
 * worth running. A single `IntersectionObserver` (not one per card) plus the
 * page-visibility state decide when an icon's animations should pause; the global
 * `.icon-anim-paused` rule (see `app/styles/index.css`) freezes them via
 * `animation-play-state`. Pausing keeps the last painted frame, so scrolling an
 * icon back into view — or returning to the tab — resumes seamlessly.
 *
 * `prefers-reduced-motion` is handled separately in each icon's own stylesheet.
 */

const PAUSED_CLASS = 'icon-anim-paused';

const registered = new Set<Element>();
const isIntersecting = new WeakMap<Element, boolean>();

let observer: IntersectionObserver | null = null;
let visibilityBound = false;
let tabHidden = false;

function applyState(element: Element): void {
  // Default to visible until the observer reports otherwise, so a freshly
  // registered icon animates immediately rather than starting frozen.
  const visible = isIntersecting.get(element) ?? true;
  const shouldPause = tabHidden || !visible;
  element.classList.toggle(PAUSED_CLASS, shouldPause);
}

function handleVisibilityChange(): void {
  tabHidden = document.visibilityState === 'hidden';
  registered.forEach(applyState);
}

function ensureObserver(): IntersectionObserver | null {
  if (observer) {
    return observer;
  }

  if (typeof document === 'undefined' || typeof IntersectionObserver === 'undefined') {
    return null;
  }

  tabHidden = document.visibilityState === 'hidden';

  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        isIntersecting.set(entry.target, entry.isIntersecting);
        applyState(entry.target);
      }
    },
    // Resume slightly before the icon scrolls fully into view.
    { rootMargin: '120px' },
  );

  if (!visibilityBound) {
    document.addEventListener('visibilitychange', handleVisibilityChange);
    visibilityBound = true;
  }

  return observer;
}

/**
 * Returns a stable ref callback. Attach it to the element that contains the
 * animated icon(s); its animations pause while it is off-screen or the tab is
 * hidden. If `IntersectionObserver` is unavailable the callback is inert and
 * animations simply keep running.
 */
export function useIconAnimationPause(): (element: HTMLElement | null) => void {
  const observedRef = useRef<HTMLElement | null>(null);

  return useCallback((element: HTMLElement | null) => {
    const activeObserver = ensureObserver();
    const previous = observedRef.current;

    if (previous && previous !== element) {
      activeObserver?.unobserve(previous);
      registered.delete(previous);
      isIntersecting.delete(previous);
      previous.classList.remove(PAUSED_CLASS);
    }

    observedRef.current = element;

    if (element && activeObserver) {
      registered.add(element);
      isIntersecting.set(element, true);
      activeObserver.observe(element);
      applyState(element);
    }
  }, []);
}
