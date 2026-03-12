"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

/**
 * CursorGlow — a subtle radial gradient that follows the cursor.
 * Hides on mobile/touch. Scales up over interactive elements.
 */
export default function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const glow = glowRef.current;
    const dot = dotRef.current;
    if (!glow || !dot) return;

    // Hide on touch devices
    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) {
      glow.style.display = "none";
      dot.style.display = "none";
      return;
    }

    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Dot follows exactly
      gsap.set(dot, { x: mouseX, y: mouseY });

      // Glow follows with smooth lag
      gsap.to(glow, {
        x: mouseX,
        y: mouseY,
        duration: 0.6,
        ease: "power3.out",
      });
    };

    const handleMouseEnterInteractive = () => {
      gsap.to(glow, {
        scale: 1.8,
        opacity: 0.25,
        duration: 0.35,
        ease: "power2.out",
      });
      gsap.to(dot, {
        scale: 2.5,
        duration: 0.3,
        ease: "back.out(1.7)",
      });
    };

    const handleMouseLeaveInteractive = () => {
      gsap.to(glow, {
        scale: 1,
        opacity: 0.15,
        duration: 0.35,
        ease: "power2.out",
      });
      gsap.to(dot, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Observe interactive elements
    const interactiveEls = document.querySelectorAll<HTMLElement>(
      "a, button, .btn, .college-card, .card, .filter-tab, .nav-link, [role='button']"
    );
    interactiveEls.forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnterInteractive);
      el.addEventListener("mouseleave", handleMouseLeaveInteractive);
    });

    // Re-observe when DOM changes (for dynamically added elements)
    const observer = new MutationObserver(() => {
      const newEls = document.querySelectorAll<HTMLElement>(
        "a, button, .btn, .college-card, .card, .filter-tab, .nav-link, [role='button']"
      );
      newEls.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnterInteractive);
        el.removeEventListener("mouseleave", handleMouseLeaveInteractive);
        el.addEventListener("mouseenter", handleMouseEnterInteractive);
        el.addEventListener("mouseleave", handleMouseLeaveInteractive);
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      interactiveEls.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnterInteractive);
        el.removeEventListener("mouseleave", handleMouseLeaveInteractive);
      });
      observer.disconnect();
    };
  }, []);

  return (
    <>
      {/* Large ambient glow */}
      <div
        ref={glowRef}
        className="cursor-glow"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "320px",
          height: "320px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(99,102,241,0.12) 0%, rgba(139,92,246,0.06) 40%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 9999,
          transform: "translate(-50%, -50%)",
          opacity: 0.15,
          mixBlendMode: "screen",
          willChange: "transform",
        }}
      />
      {/* Small precise dot */}
      <div
        ref={dotRef}
        className="cursor-dot"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "6px",
          height: "6px",
          borderRadius: "50%",
          background: "var(--accent)",
          pointerEvents: "none",
          zIndex: 10000,
          transform: "translate(-50%, -50%)",
          willChange: "transform",
          boxShadow: "0 0 10px rgba(99,102,241,0.6)",
        }}
      />
    </>
  );
}
