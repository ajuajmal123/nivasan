import type { MouseEvent } from "react";
import { getLenis } from "@/components/layout/LenisProvider";

type Router = { push: (href: string, options?: { scroll?: boolean }) => void };

// Fixed navbar height from the --navbar-height CSS variable (mobile/desktop values live in globals.css)
const navbarOffset = () =>
  parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--navbar-height")) || 0;

export function scrollToTop(immediate = false) {
  const lenis = getLenis();
  if (lenis) lenis.scrollTo(0, { immediate, force: true });
  else window.scrollTo({ top: 0, behavior: immediate ? "auto" : "smooth" });
}

// Smooth-scrolls so the section's top sits just below the fixed navbar. Returns false if it isn't on the page.
export function scrollToId(id: string): boolean {
  const target = document.getElementById(id);
  if (!target) return false;
  const lenis = getLenis();
  if (lenis) {
    // After a route change Lenis still holds the previous page's scroll limit until its next
    // resize check, so refresh it first; then re-aim once in case images shifted the layout.
    lenis.resize();
    lenis.scrollTo(target, {
      offset: -navbarOffset(),
      force: true,
      onComplete: () => {
        if (Math.abs(target.getBoundingClientRect().top - navbarOffset()) > 4) {
          lenis.resize();
          lenis.scrollTo(target, { offset: -navbarOffset(), force: true });
        }
      },
    });
  } else {
    const top = target.getBoundingClientRect().top + window.scrollY - navbarOffset();
    window.scrollTo({ top, behavior: "smooth" });
  }
  return true;
}

// After arriving on "/" from another page: start at the top, then glide to the hash section (if any).
// Waits for the section to mount, since the new page renders after the route change.
export function scrollAfterArrival(hash: string) {
  scrollToTop(true);
  if (!hash) return;
  let tries = 0;
  const attempt = () => {
    if (scrollToId(hash) || ++tries > 40) return;
    requestAnimationFrame(attempt);
  };
  setTimeout(attempt, 150);
}

/**
 * Click handler for links to "/" and "/#section" (navbar, mobile menu, footer).
 * - On the home page: smooth-scrolls (every click, even repeated) and keeps the URL in sync.
 * - From another page: client-side navigates to "/" without Next's scroll restoration;
 *   the Navbar then calls scrollAfterArrival() once the home page is mounted.
 * Other links (/projects, /blog) are left to <Link>.
 */
export function handleNavClick(
  e: MouseEvent<HTMLAnchorElement>,
  href: string,
  pathname: string,
  router: Router
) {
  if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
  const [path, hash = ""] = href.split("#");
  if ((path || "/") !== "/") return;

  e.preventDefault();
  if (pathname === "/") {
    if (hash) {
      if (scrollToId(hash)) window.history.replaceState(null, "", `/#${hash}`);
    } else {
      scrollToTop();
      window.history.replaceState(null, "", "/");
    }
  } else {
    router.push(href, { scroll: false });
  }
}
