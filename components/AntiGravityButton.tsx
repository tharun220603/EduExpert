"use client";
import React, { useRef } from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { useAntiGravity } from "@/hooks/useAntiGravity";
import { cn } from "@/lib/physicsEngine";

interface AntiGravityButtonProps extends HTMLMotionProps<"button"> {
  children: React.ReactNode;
  variant?: "primary" | "ghost" | "outline";
}

export default function AntiGravityButton({
  children,
  className,
  variant = "primary",
  ...props
}: AntiGravityButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  
  // Magnetic pull towards the cursor when close
  const { x, y } = useAntiGravity(ref, {
    mode: "magnetic",
    strength: 0.5, // Strong magnetic pull
    range: 120,    // attraction zone radius
  });

  return (
    <motion.button
      ref={ref}
      style={{ x, y }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      className={cn(
        "btn relative overflow-hidden will-change-transform",
        variant === "primary" ? "btn-primary btn-glow" : 
        variant === "outline" ? "btn-outline" : "btn-ghost",
        className
      )}
      {...props}
    >
      {/* Shine effect is now handled by .btn-glow::after in globals.css */}
      <span className="btn-content">
        {children}
      </span>
    </motion.button>
  );
}
