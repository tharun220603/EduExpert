"use client";

import { useRef, useEffect, ReactNode } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";

/**
 * PageTransition — wraps page content with GSAP enter/exit animations.
 * On route change: old content fades + slides up, new content fades + slides in.
 */
export default function PageTransition({ children }: { children: ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Enter animation
    gsap.fromTo(
      el,
      {
        opacity: 0,
        y: 30,
        scale: 0.99,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.55,
        ease: "power3.out",
        clearProps: "all",
      }
    );

    return () => {
      // On unmount (route change), quick exit
      gsap.set(el, { opacity: 0 });
    };
  }, [pathname]);

  return (
    <div ref={containerRef} style={{ willChange: "transform, opacity" }}>
      {children}
    </div>
  );
}
