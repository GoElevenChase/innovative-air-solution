import type { CSSProperties, ReactNode } from "react";

/**
 * Motion primitives. These render plain markup with `data-anim` hooks; the
 * <MotionRoot /> client component (mounted once in app/template.tsx) observes
 * them. Content is visible in the HTML, so the page works without JavaScript
 * and is never hidden for visitors who prefer reduced motion.
 */
export type Variant = "up" | "left" | "right" | "zoom" | "fade" | "mask" | "lines";

/** Sets the CSS stagger index used by intro and reveal delays. */
export const at = (n: number) => ({ "--i": n }) as CSSProperties;

export function Reveal({ children, className = "", delay = 0, variant = "up" }: { children: ReactNode; className?: string; delay?: number; variant?: Variant }) {
  return <div className={`reveal ${className}`} data-anim={variant} style={{ "--d": `${delay}ms` } as CSSProperties}>{children}</div>;
}

/** One line of a headline. Lines rise out of a mask, one after another. */
export function L({ children }: { children: ReactNode }) {
  return <span className="line"><span className="line-in">{children}</span></span>;
}

/** An endless, pausable ticker. The repeated group is hidden from assistive technology. */
export function Marquee({ items, className = "", label }: { items: readonly string[]; className?: string; label: string }) {
  const group = (hidden: boolean) => <span className="marquee-group" aria-hidden={hidden || undefined}>{items.map(item => <span className="marquee-item" key={item}>{item}<i aria-hidden="true">✳</i></span>)}</span>;
  return <div className={`marquee ${className}`} role="group" aria-label={label}><div className="marquee-track">{group(false)}{group(true)}</div></div>;
}
