"use client";

import { useEffect, useRef } from "react";

/**
 * One controller for every page effect: scroll progress, sticky-header state,
 * scroll-linked parallax, in-view reveals with staggering, magnetic buttons,
 * pointer tilt, and the hero spotlight. Nothing runs when the visitor prefers
 * reduced motion, and below-the-fold content only starts hidden once this has
 * mounted, so the static HTML is always complete.
 */
export function MotionRoot() {
  const bar = useRef<HTMLElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const cleanups: Array<() => void> = [];
    const header = document.querySelector<HTMLElement>(".site-header");
    const parallax = reduce ? [] : Array.from(document.querySelectorAll<HTMLElement>("[data-parallax]"));

    let queued = false;
    const update = () => {
      queued = false;
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      bar.current?.style.setProperty("--p", String(max > 0 ? Math.min(1, y / max) : 0));
      header?.classList.toggle("is-scrolled", y > 24);
      const vh = window.innerHeight;
      for (const el of parallax) {
        const box = el.parentElement?.getBoundingClientRect();
        if (!box || box.bottom < -240 || box.top > vh + 240) continue;
        const offset = box.top + box.height / 2 - vh / 2;
        // The image is scaled 1.14x, so it can only travel 7% of its height before an edge shows.
        const limit = el.offsetHeight * 0.065;
        const shift = Math.max(-limit, Math.min(limit, -offset * parseFloat(el.dataset.parallax || "0.08")));
        el.style.setProperty("--py", `${shift.toFixed(1)}px`);
      }
    };
    const onScroll = () => { if (!queued) { queued = true; requestAnimationFrame(update); } };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    cleanups.push(() => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); });
    if (reduce) return () => cleanups.forEach(fn => fn());

    // Stagger: children of [data-stagger] reveal one after another.
    document.querySelectorAll<HTMLElement>("[data-stagger]").forEach(parent => {
      Array.from(parent.children).forEach((child, index) => {
        const node = child as HTMLElement;
        node.style.setProperty("--i", String(index));
        if (!node.hasAttribute("data-anim")) node.setAttribute("data-anim", parent.dataset.stagger || "up");
      });
    });

    // In-view reveals. A clipped (masked) element can report zero visibility, so those are observed through their parent.
    const watched = new Map<Element, HTMLElement[]>();
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        observer.unobserve(entry.target);
        for (const el of watched.get(entry.target) ?? []) {
          el.classList.remove("anim-wait");
          el.classList.add("is-in");
          const delay = parseFloat(el.style.getPropertyValue("--d")) || 0;
          const order = parseFloat(el.style.getPropertyValue("--i")) || 0;
          // Once settled, drop the entrance delay so hover motion stays instant.
          window.setTimeout(() => { el.style.setProperty("--d", "0ms"); el.style.setProperty("--i", "0"); el.classList.add("anim-done"); }, delay + order * 90 + 1600);
        }
      }
    }, { threshold: 0.01, rootMargin: "0px 0px -7% 0px" });
    cleanups.push(() => observer.disconnect());
    document.querySelectorAll<HTMLElement>("[data-anim]").forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.92 && rect.bottom > 0) { el.classList.add("is-in", "anim-done"); return; }
      el.classList.add("anim-wait");
      const target = el.dataset.anim === "mask" && el.parentElement ? el.parentElement : el;
      watched.set(target, [...(watched.get(target) ?? []), el]);
      observer.observe(target);
    });

    if (finePointer) {
      // Magnetic buttons.
      document.querySelectorAll<HTMLElement>(".one-button,.two-button,.header-cta,.footer-cta,.form-submit,.choice-open,.chooser-arrow").forEach(el => {
        el.classList.add("magnetic");
        const move = (event: PointerEvent) => {
          const box = el.getBoundingClientRect();
          el.style.translate = `${((event.clientX - (box.left + box.width / 2)) * 0.2).toFixed(1)}px ${((event.clientY - (box.top + box.height / 2)) * 0.28).toFixed(1)}px`;
        };
        const leave = () => { el.style.translate = ""; };
        el.addEventListener("pointermove", move);
        el.addEventListener("pointerleave", leave);
        cleanups.push(() => { el.removeEventListener("pointermove", move); el.removeEventListener("pointerleave", leave); });
      });

      // Pointer tilt.
      document.querySelectorAll<HTMLElement>("[data-tilt]").forEach(el => {
        const move = (event: PointerEvent) => {
          const box = el.getBoundingClientRect();
          const x = (event.clientX - box.left) / box.width - 0.5;
          const y = (event.clientY - box.top) / box.height - 0.5;
          el.style.transform = `perspective(1000px) rotateX(${(-y * 5).toFixed(2)}deg) rotateY(${(x * 6).toFixed(2)}deg) scale(1.01)`;
        };
        const leave = () => { el.style.transform = ""; };
        el.addEventListener("pointermove", move);
        el.addEventListener("pointerleave", leave);
        cleanups.push(() => { el.removeEventListener("pointermove", move); el.removeEventListener("pointerleave", leave); });
      });

      // Hero spotlight follows the cursor.
      document.querySelectorAll<HTMLElement>("[data-spotlight]").forEach(el => {
        const move = (event: PointerEvent) => {
          const box = el.getBoundingClientRect();
          el.style.setProperty("--mx", `${event.clientX - box.left}px`);
          el.style.setProperty("--my", `${event.clientY - box.top}px`);
          el.style.setProperty("--glow", "1");
        };
        const leave = () => el.style.setProperty("--glow", "0");
        el.addEventListener("pointermove", move);
        el.addEventListener("pointerleave", leave);
        cleanups.push(() => { el.removeEventListener("pointermove", move); el.removeEventListener("pointerleave", leave); });
      });
    }

    return () => cleanups.forEach(fn => fn());
  }, []);

  return <div className="scroll-progress" aria-hidden="true"><i ref={bar} /></div>;
}
