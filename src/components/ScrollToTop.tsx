import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      // Ensure we don't keep a previous scroll position, then scroll to the anchor.
      window.scrollTo({ top: 0, left: 0 });

      const id = hash.slice(1);
      let tries = 0;

      const tryScroll = () => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
          return;
        }
        if (tries++ < 10) window.setTimeout(tryScroll, 50);
      };

      tryScroll();
      return;
    }

    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [pathname, hash]);

  return null;
};
