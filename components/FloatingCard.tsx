"use client";
import React, { useRef } from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { useAntiGravity } from "@/hooks/useAntiGravity";
import { cn } from "@/lib/physicsEngine";

interface FloatingCardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  intensity?: number;
  glowColor?: string;
  delay?: number;
}

export default function FloatingCard({
  children,
  className,
  intensity = 1,
  glowColor = "rgba(79, 70, 229, 0.15)",
  delay = 0,
  ...props
}: FloatingCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  // 3D Tilt effect based on mouse proximity
  const { x, y, rotateX, rotateY } = useAntiGravity(ref, {
    mode: "tilt",
    strength: intensity,
    range: 400, // Activate tilt when mouse is within 400px
  });

  return (
    <motion.div
      ref={ref}
      style={{
        x,
        y,
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={cn(
        "relative rounded-[var(--radius)] bg-black/40 backdrop-blur-xl border border-white/10 p-6",
        "transition-shadow duration-500 will-change-transform z-10",
        className
      )}
      initial={{ y: 50, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        type: "spring",
        stiffness: 100,
        damping: 20,
        delay: delay * 0.1
      }}
      whileHover={{
        scale: 1.02,
        boxShadow: `0 20px 40px -10px ${glowColor}, 0 0 0 1px rgba(255,255,255,0.1) inset`,
      }}
      {...props}
    >
      {/* Infinite floating levitation effect */}
      <motion.div
        animate={{
          y: [-4, 4, -4],
        }}
        transition={{
          duration: 4 + Math.random() * 2, // Randomize duration slightly to offset items organically
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{ transform: "translateZ(30px)", height: "100%" }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
