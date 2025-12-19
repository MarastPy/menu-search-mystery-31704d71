import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      // Jump directly to the anchor (no "scrolling through" other sections).
      window.scrollTo({ top: 0, left: 0 });

      const id = hash.slice(1);
      let tries = 0;

      const tryScroll = () => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "auto", block: "start" });
          return true;
        }
        return false;
      };

      const interval = window.setInterval(() => {
        if (tryScroll() || tries++ > 40) window.clearInterval(interval);
      }, 100);

      // One extra attempt after all assets are loaded (prevents layout-shift landing above the target).
      const onLoad = () => tryScroll();
      window.addEventListener("load", onLoad, { once: true });

      return () => {
        window.clearInterval(interval);
        window.removeEventListener("load", onLoad);
      };
    }

    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [pathname, hash]);

  return null;
};
