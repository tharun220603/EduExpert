"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ScrollFloatSectionProps {
  children: React.ReactNode;
  speed?: number;
  className?: string;
  id?: string;
  style?: React.CSSProperties;
}

/**
 * Wraps content in a floating section that drifts up/down naturally using 
 * framer-motion's useScroll hooked into window scroll progress.
 * Gives the illusion that the entire interface is floating in 0-G space.
 */
export default function ScrollFloatSection({
  children,
  speed = 1,
  className = "",
  id,
  style = {},
}: ScrollFloatSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  // Track this specific section's scroll progress linearly
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"], // Trigger from when it enters view to when it leaves
  });

  return (
    <motion.section
      id={id}
      ref={ref}
      style={style}
      className={`relative ${className}`}
    >
      {children}
    </motion.section>
  );
}
