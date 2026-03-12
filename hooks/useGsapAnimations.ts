"use client";

import { useEffect, useRef, useCallback, RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ─── Scroll Reveal ─── */
export function useScrollReveal(
  ref: RefObject<HTMLElement | null>,
  options?: { y?: number; duration?: number; delay?: number; start?: string }
) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    gsap.set(el, { opacity: 0, y: options?.y ?? 50 });

    const tween = gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: options?.duration ?? 0.9,
      delay: options?.delay ?? 0,
      ease: "power3.out",
      scrollTrigger: {
        trigger: el,
        start: options?.start ?? "top 85%",
        toggleActions: "play none none none",
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);
}

/* ─── Stagger Reveal ─── */
export function useStaggerReveal(
  containerRef: RefObject<HTMLElement | null>,
  childSelector: string,
  options?: { y?: number; stagger?: number; duration?: number; start?: string }
) {
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const children = container.querySelectorAll(childSelector);
    if (!children.length) return;

    gsap.set(children, { opacity: 0, y: options?.y ?? 40 });

    const tween = gsap.to(children, {
      opacity: 1,
      y: 0,
      duration: options?.duration ?? 0.7,
      stagger: options?.stagger ?? 0.12,
      ease: "power3.out",
      scrollTrigger: {
        trigger: container,
        start: options?.start ?? "top 82%",
        toggleActions: "play none none none",
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);
}

/* ─── Count Up ─── */
export function useCountUp(
  ref: RefObject<HTMLElement | null>,
  target: number,
  options?: { suffix?: string; prefix?: string; duration?: number }
) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obj = { val: 0 };

    const tween = gsap.to(obj, {
      val: target,
      duration: options?.duration ?? 1.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: el,
        start: "top 88%",
        toggleActions: "play none none none",
      },
      onUpdate: () => {
        el.textContent = `${options?.prefix ?? ""}${Math.round(obj.val)}${options?.suffix ?? ""}`;
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);
}

/* ═══════════════════════════════════════════════════════════════
   PREMIUM: Letter-by-Letter Character Reveal Hero Entrance
   ═══════════════════════════════════════════════════════════════ */
export function useAdvancedHeroEntrance(
  containerRef: RefObject<HTMLElement | null>,
  selectors: {
    badge?: string;
    heading?: string;
    subtitle?: string;
    buttons?: string;
    stats?: string;
  }
) {
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

    const getEl = (sel?: string) =>
      sel ? container.querySelector(sel) : null;
    const getEls = (sel?: string) =>
      sel ? container.querySelectorAll(sel) : null;

    const badge = getEl(selectors.badge);
    const heading = getEl(selectors.heading) as HTMLElement | null;
    const subtitle = getEl(selectors.subtitle);
    const buttons = getEls(selectors.buttons);
    const stats = getEls(selectors.stats);

    // ── Setup heading for simple fade/slide entrance ──
    if (heading) {
      gsap.set(heading, { y: 30, opacity: 0, visibility: "visible" });
    }

    // Set initial states for other elements
    if (badge) gsap.set(badge, { opacity: 0, y: 20, scale: 0.9 });
    if (subtitle) gsap.set(subtitle, { opacity: 0, y: 25 });
    if (buttons?.length) gsap.set(buttons, { opacity: 0, y: 20, scale: 0.95 });
    if (stats?.length) gsap.set(stats, { opacity: 0, y: 30, scale: 0.95 });

    // ── Build timeline ──
    // Badge pops in
    if (badge)
      tl.to(
        badge,
        { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "back.out(1.7)" },
        0.1
      );

    // Heading fades and slides up naturally
    if (heading) {
      tl.to(
        heading,
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power4.out",
        },
        0.3
      );
    }

    // Subtitle fades in
    if (subtitle)
      tl.to(subtitle, { opacity: 1, y: 0, duration: 0.8 }, "-=0.3");

    // Buttons stagger with spring
    if (buttons?.length)
      tl.to(
        buttons,
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.12,
          ease: "back.out(1.4)",
        },
        1.0
      );

    // Stats stagger
    if (stats?.length)
      tl.to(
        stats,
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          stagger: 0.1,
          ease: "power3.out",
        },
        1.2
      );

    return () => {
      tl.kill();
    };
  }, []);
}

/* ═══════════════════════════════════════════════════════════════
   ADVANCED: Parallax Scroll Effect
   ═══════════════════════════════════════════════════════════════ */
export function useParallax(
  ref: RefObject<HTMLElement | null>,
  options?: { speed?: number; direction?: "up" | "down" }
) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const speed = options?.speed ?? 0.3;
    const dir = options?.direction ?? "up";
    const yEnd = dir === "up" ? -80 * speed : 80 * speed;

    const tween = gsap.to(el, {
      y: yEnd,
      ease: "none",
      scrollTrigger: {
        trigger: el,
        start: "top bottom",
        end: "bottom top",
        scrub: 1.2,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);
}

/* ═══════════════════════════════════════════════════════════════
   ADVANCED: Mouse-Tracking 3D Card Tilt
   ═══════════════════════════════════════════════════════════════ */
export function useCardTilt(
  ref: RefObject<HTMLElement | null>,
  options?: { intensity?: number; glare?: boolean }
) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const intensity = options?.intensity ?? 8;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -intensity;
      const rotateY = ((x - centerX) / centerX) * intensity;

      gsap.to(el, {
        rotateX: rotateX,
        rotateY: rotateY,
        transformPerspective: 800,
        duration: 0.4,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      gsap.to(el, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.6,
        ease: "elastic.out(1, 0.6)",
      });
    };

    el.style.transformStyle = "preserve-3d";
    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);
}

/* ═══════════════════════════════════════════════════════════════
   ADVANCED: Magnetic Button Effect
   ═══════════════════════════════════════════════════════════════ */
export function useMagneticButton(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      gsap.to(el, {
        x: x * 0.3,
        y: y * 0.3,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: "elastic.out(1, 0.4)",
      });
    };

    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);
}

/* ═══════════════════════════════════════════════════════════════
   ADVANCED: Parallax Floating Orbs
   ═══════════════════════════════════════════════════════════════ */
export function useFloatingOrbs(containerRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const orbs = container.querySelectorAll(".hero-floating-orb");
    if (!orbs.length) return;

    orbs.forEach((orb, i) => {
      // GSAP-based floating with randomized motion
      gsap.to(orb, {
        x: `random(-30, 30)`,
        y: `random(-25, 25)`,
        scale: `random(0.9, 1.1)`,
        duration: `random(4, 7)`,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: i * 1.2,
      });
    });

    // Parallax effect on scroll for orbs
    const tween = gsap.to(orbs, {
      y: (i: number) => (i + 1) * -40,
      ease: "none",
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: "bottom top",
        scrub: 1.5,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);
}

/* ═══════════════════════════════════════════════════════════════
   ADVANCED: Horizontal Scroll Progress Bar
   ═══════════════════════════════════════════════════════════════ */
export function useScrollProgress(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    gsap.set(el, { scaleX: 0, transformOrigin: "left center" });

    const tween = gsap.to(el, {
      scaleX: 1,
      ease: "none",
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.3,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);
}

/* ─── Page Hero Entrance (for sub-pages) ─── */
export function usePageHeroEntrance(
  containerRef: RefObject<HTMLElement | null>
) {
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const badge = container.querySelector(".badge");
    const heading = container.querySelector("h1");
    const subtitle = container.querySelector("p");

    const allEls = [badge, heading, subtitle].filter(Boolean) as Element[];
    gsap.set(allEls, { opacity: 0, y: 25 });

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    if (badge) tl.to(badge, { opacity: 1, y: 0, duration: 0.5, ease: "back.out(1.7)" }, 0.15);
    if (heading) tl.to(heading, { opacity: 1, y: 0, duration: 0.7 }, 0.3);
    if (subtitle) tl.to(subtitle, { opacity: 1, y: 0, duration: 0.6 }, 0.5);

    return () => { tl.kill(); };
  }, []);
}

/* ─── Section Header Reveal ─── */
export function useSectionHeaderReveal(
  ref: RefObject<HTMLElement | null>
) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const badge = el.querySelector(".badge");
    const heading = el.querySelector("h2");
    const subtitle = el.querySelector("p");

    const allEls = [badge, heading, subtitle].filter(Boolean) as Element[];
    gsap.set(allEls, { opacity: 0, y: 30 });

    const tl = gsap.timeline({
      defaults: { ease: "power3.out" },
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        toggleActions: "play none none none",
      },
    });

    let pos = 0;
    if (badge) { tl.to(badge, { opacity: 1, y: 0, duration: 0.5 }, pos); pos += 0.1; }
    if (heading) { tl.to(heading, { opacity: 1, y: 0, duration: 0.7 }, pos); pos += 0.15; }
    if (subtitle) tl.to(subtitle, { opacity: 1, y: 0, duration: 0.6 }, pos);

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);
}

/* ═══════════════════════════════════════════════════════════════
   ADVANCED: Scale-in Reveal with Rotation
   ═══════════════════════════════════════════════════════════════ */
export function useScaleReveal(
  ref: RefObject<HTMLElement | null>,
  options?: { scale?: number; rotation?: number; duration?: number }
) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    gsap.set(el, {
      opacity: 0,
      scale: options?.scale ?? 0.85,
      rotation: options?.rotation ?? 0,
    });

    const tween = gsap.to(el, {
      opacity: 1,
      scale: 1,
      rotation: 0,
      duration: options?.duration ?? 1,
      ease: "expo.out",
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        toggleActions: "play none none none",
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);
}

/* ═══════════════════════════════════════════════════════════════
   ADVANCED: Slide-from-Side Reveal
   ═══════════════════════════════════════════════════════════════ */
export function useSlideReveal(
  ref: RefObject<HTMLElement | null>,
  options?: { from?: "left" | "right"; distance?: number; duration?: number }
) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const dist = options?.distance ?? 80;
    const x = options?.from === "right" ? dist : -dist;

    gsap.set(el, { opacity: 0, x });

    const tween = gsap.to(el, {
      opacity: 1,
      x: 0,
      duration: options?.duration ?? 0.9,
      ease: "power3.out",
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        toggleActions: "play none none none",
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);
}

/* ═══════════════════════════════════════════════════════════════
   PREMIUM: Floating Card Breathing Animation
   Continuous scale + y-offset with stagger, hover pause
   ═══════════════════════════════════════════════════════════════ */
export function useFloatingCards(
  containerRef: RefObject<HTMLElement | null>,
  cardSelector: string,
  options?: {
    yRange?: number;
    scaleRange?: number;
    baseDuration?: number;
    staggerDelay?: number;
  }
) {
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check for reduced motion
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    // Check for mobile
    const isMobile = window.innerWidth < 768;

    const cards = container.querySelectorAll<HTMLElement>(cardSelector);
    if (!cards.length) return;

    const yRange = isMobile ? (options?.yRange ?? 12) * 0.5 : (options?.yRange ?? 12);
    const scaleRange = isMobile ? 0.015 : (options?.scaleRange ?? 0.035);
    const baseDuration = options?.baseDuration ?? 3;
    const staggerDelay = options?.staggerDelay ?? 0.6;

    const floatTimelines: gsap.core.Timeline[] = [];

    cards.forEach((card, i) => {
      // Randomize per-card for organic feel
      const randomY = yRange * (0.7 + Math.random() * 0.6);
      const randomScale = scaleRange * (0.7 + Math.random() * 0.6);
      const randomDur = baseDuration * (0.85 + Math.random() * 0.3);

      const tl = gsap.timeline({
        repeat: -1,
        yoyo: true,
        delay: i * staggerDelay + Math.random() * 0.4,
        defaults: { ease: "sine.inOut" },
      });

      tl.to(card, {
        y: -randomY,
        scale: 1 + randomScale,
        duration: randomDur,
        ease: "sine.inOut",
      })
        .to(card, {
          y: randomY * 0.6,
          scale: 1 - randomScale * 0.5,
          duration: randomDur * 0.9,
          ease: "sine.inOut",
        })
        .to(card, {
          y: 0,
          scale: 1,
          duration: randomDur * 0.7,
          ease: "sine.inOut",
        });

      // ── Hover: pause floating, scale up, deepen shadow ──
      const handleEnter = () => {
        tl.pause();
        gsap.to(card, {
          scale: 1.04,
          y: -6,
          boxShadow: "0 24px 60px rgba(79, 70, 229, 0.18), 0 0 0 1px rgba(99, 102, 241, 0.12)",
          duration: 0.35,
          ease: "power2.out",
          overwrite: "auto",
        });

        // Image zoom
        const img = card.querySelector("img");
        if (img) {
          gsap.to(img, {
            scale: 1.08,
            duration: 0.4,
            ease: "power2.out",
          });
        }
      };

      const handleLeave = () => {
        gsap.to(card, {
          scale: 1,
          y: 0,
          boxShadow: "0 10px 25px rgba(0, 0, 0, 0.08)",
          duration: 0.5,
          ease: "elastic.out(1, 0.6)",
          overwrite: "auto",
          onComplete: () => { tl.resume(); },
        });

        const img = card.querySelector("img");
        if (img) {
          gsap.to(img, {
            scale: 1,
            duration: 0.4,
            ease: "power2.out",
          });
        }
      };

      card.addEventListener("mouseenter", handleEnter);
      card.addEventListener("mouseleave", handleLeave);

      // Store for cleanup
      (card as any)._floatEnter = handleEnter;
      (card as any)._floatLeave = handleLeave;

      floatTimelines.push(tl);
    });

    return () => {
      floatTimelines.forEach((tl) => tl.kill());
      cards.forEach((card) => {
        card.removeEventListener("mouseenter", (card as any)._floatEnter);
        card.removeEventListener("mouseleave", (card as any)._floatLeave);
      });
    };
  }, []);
}

/* ═══════════════════════════════════════════════════════════════
   PREMIUM: Cursor Parallax Field
   Cards subtly shift based on mouse position for depth
   ═══════════════════════════════════════════════════════════════ */
export function useCursorParallaxField(
  containerRef: RefObject<HTMLElement | null>,
  cardSelector: string,
  options?: { intensity?: number }
) {
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Disable on mobile
    if (window.innerWidth < 768) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const intensity = options?.intensity ?? 12;
    const cards = container.querySelectorAll<HTMLElement>(cardSelector);
    if (!cards.length) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const offsetX = (e.clientX - centerX) / rect.width;
      const offsetY = (e.clientY - centerY) / rect.height;

      cards.forEach((card, i) => {
        // Each card has slightly different intensity for depth layers
        const depth = 1 + (i % 3) * 0.4;
        gsap.to(card, {
          x: offsetX * intensity * depth,
          y: offsetY * intensity * depth * 0.6,
          duration: 0.8,
          ease: "power2.out",
          overwrite: "auto",
        });
      });
    };

    const handleMouseLeave = () => {
      cards.forEach((card) => {
        gsap.to(card, {
          x: 0,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
          overwrite: "auto",
        });
      });
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);
}

/* ═══════════════════════════════════════════════════════════════
   PREMIUM: Floating Entrance (scroll entrance → then float)
   ═══════════════════════════════════════════════════════════════ */
export function useFloatingEntrance(
  containerRef: RefObject<HTMLElement | null>,
  cardSelector: string,
  options?: {
    y?: number;
    stagger?: number;
    floatAfter?: boolean;
    yRange?: number;
  }
) {
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const cards = container.querySelectorAll<HTMLElement>(cardSelector);
    if (!cards.length) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    gsap.set(cards, {
      opacity: 0,
      y: options?.y ?? 50,
      scale: 0.95,
    });

    const staggerDur = options?.stagger ?? 0.15;

    const tween = gsap.to(cards, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.8,
      stagger: staggerDur,
      ease: "power3.out",
      scrollTrigger: {
        trigger: container,
        start: "top 82%",
        toggleActions: "play none none none",
      },
      onComplete: () => {
        // Chain into floating animation after entrance
        if (options?.floatAfter !== false && !prefersReduced) {
          const yRange = options?.yRange ?? 8;
          cards.forEach((card, i) => {
            gsap.to(card, {
              y: -(yRange * (0.7 + Math.random() * 0.6)),
              scale: 1 + 0.02 * (0.7 + Math.random() * 0.6),
              duration: 2.5 + Math.random() * 1.5,
              repeat: -1,
              yoyo: true,
              ease: "sine.inOut",
              delay: i * 0.3,
            });
          });
        }
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);
}

