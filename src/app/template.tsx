import type { ReactNode } from "react";
import { MotionRoot } from "@/components/motion-root";

/** Re-mounts on every navigation, so the page fade and all effects restart. */
export default function Template({ children }: { children: ReactNode }) {
  return <div className="page-enter"><MotionRoot />{children}</div>;
}
