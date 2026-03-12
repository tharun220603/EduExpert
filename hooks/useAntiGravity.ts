"use client";
import { useEffect, RefObject } from "react";
import { useSpring, useMotionValue, useAnimationFrame } from "framer-motion";

interface AntiGravityOptions {
  mode?: "magnetic" | "repel" | "tilt";
  strength?: number;
  range?: number;
}

// Module-level mouse tracking to avoid React re-renders across the app
let globalMouseX = 0;
let globalMouseY = 0;
let isTracking = false;

function startMouseTracking() {
  if (typeof window === "undefined" || isTracking) return;
  globalMouseX = window.innerWidth / 2;
  globalMouseY = window.innerHeight / 2;
  window.addEventListener(
    "mousemove",
    (e) => {
      globalMouseX = e.clientX;
      globalMouseY = e.clientY;
    },
    { passive: true }
  );
  isTracking = true;
}

export function useAntiGravity(
  ref: RefObject<HTMLElement | null>,
  options: AntiGravityOptions = {}
) {
  const { mode = "tilt", strength = 1, range = 300 } = options;

  // We use Framer Motion's motion values instead of React state for 60fps performance without re-renders.
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  // Configuration for natural-feeling spring physics
  const springConfig = { damping: 20, stiffness: 150, mass: 0.5 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);
  const springRotateX = useSpring(rotateX, springConfig);
  const springRotateY = useSpring(rotateY, springConfig);

  useEffect(() => {
    startMouseTracking();
  }, []);

  useAnimationFrame(() => {
    if (!ref.current) return;

    // Get the element's current position on the screen
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Calculate distance between the mouse and the center of the element
    const distanceX = globalMouseX - centerX;
    const distanceY = globalMouseY - centerY;
    const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);

    if (distance < range) {
      // Normalize the distance (0 at center, 1 at the edge of the range)
      const normalizedDistance = distance / range;
      // Calculate intensity (stronger when closer to center)
      const intensity = (1 - normalizedDistance) * strength;

      if (mode === "magnetic") {
        // Pull towards mouse
        x.set(distanceX * intensity * 0.4);
        y.set(distanceY * intensity * 0.4);
      } else if (mode === "repel") {
        // Push away from mouse
        x.set(-distanceX * intensity * 0.6);
        y.set(-distanceY * intensity * 0.6);
      } else if (mode === "tilt") {
        // Calculate tilt based on where the mouse is relative to the element center
        const maxTilt = 20 * strength;
        const tiltX = (distanceY / (rect.height / 2)) * -maxTilt;
        const tiltY = (distanceX / (rect.width / 2)) * maxTilt;

        rotateX.set(Math.max(-maxTilt, Math.min(maxTilt, tiltX)) * intensity);
        rotateY.set(Math.max(-maxTilt, Math.min(maxTilt, tiltY)) * intensity);
      }
    } else {
      // Smoothly return to resting position when out of range
      x.set(0);
      y.set(0);
      rotateX.set(0);
      rotateY.set(0);
    }
  });

  return { x: springX, y: springY, rotateX: springRotateX, rotateY: springRotateY };
}
