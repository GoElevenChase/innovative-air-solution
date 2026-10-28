"use client";

import { useEffect, useRef, useState } from "react";

/** Counts a figure such as "16,173+" up from zero when it scrolls into view. */
export function CountUp({ value }: { value: string }) {
  const match = /^(\D*)([\d,]+)(\D*)$/.exec(value);
  const target = match ? parseInt(match[2].replace(/,/g, ""), 10) : 0;
  const [shown, setShown] = useState(target);
  const node = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!match || window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return;
    const el = node.current;
    if (!el) return;
    let frame = 0;
    const run = () => {
      const start = performance.now();
      const duration = 1800;
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / duration);
        setShown(Math.round(target * (t === 1 ? 1 : 1 - Math.pow(2, -10 * t))));
        if (t < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    };
    setShown(0);
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) { observer.disconnect(); run(); }
    }, { threshold: 0.4 });
    observer.observe(el);
    return () => { observer.disconnect(); cancelAnimationFrame(frame); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target]);

  if (!match) return <>{value}</>;
  return <span ref={node} aria-label={value}><span aria-hidden="true">{match[1]}{shown.toLocaleString("en-US")}{match[3]}</span></span>;
}
