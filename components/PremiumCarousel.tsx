"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

interface PremiumCarouselProps {
  children: React.ReactNode[];
  itemsPerView?: {
    desktop: number;
    tablet: number;
    mobile: number;
  };
  gap?: number;
}

export default function PremiumCarousel({
  children,
  itemsPerView = { desktop: 3, tablet: 2, mobile: 1 },
  gap = 24,
}: PremiumCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [viewCount, setViewCount] = useState(itemsPerView.desktop);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setViewCount(itemsPerView.mobile);
      } else if (window.innerWidth < 1200) {
        setViewCount(itemsPerView.tablet);
      } else {
        setViewCount(itemsPerView.desktop);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [itemsPerView]);

  const maxIndex = Math.max(0, children.length - viewCount);

  const next = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
  };

  const prev = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  // Calculate percentage width for each item
  const itemWidth = `calc((100% - ${(viewCount - 1) * gap}px) / ${viewCount})`;

  return (
    <div style={{ position: "relative", width: "100%", overflow: "visible" }}>
      {/* Navigation Arrows */}
      {currentIndex > 0 && (
        <button
          onClick={prev}
          style={{
            position: "absolute",
            left: "-60px",
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 20,
            width: "52px",
            height: "52px",
            borderRadius: "16px",
            background: "#ffffff",
            border: "1px solid var(--border)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
            color: "var(--primary)",
            transition: "all 0.3s ease",
          }}
          className="nav-arrow"
        >
          <FiChevronLeft size={24} />
        </button>
      )}

      {currentIndex < maxIndex && (
        <button
          onClick={next}
          style={{
            position: "absolute",
            right: "-60px",
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 20,
            width: "52px",
            height: "52px",
            borderRadius: "16px",
            background: "#ffffff",
            border: "1px solid var(--border)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
            color: "var(--primary)",
            transition: "all 0.3s ease",
          }}
          className="nav-arrow"
        >
          <FiChevronRight size={24} />
        </button>
      )}

      {/* Carousel Container */}
      <div
        ref={containerRef}
        style={{
          width: "100%",
          overflow: "hidden",
          borderRadius: "4px",
        }}
      >
        <motion.div
          animate={{
            x: `calc(-${currentIndex * (100 / viewCount)}% - ${currentIndex * gap * (1 / viewCount)}px)`,
          }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 30,
          }}
          style={{
            display: "flex",
            gap: `${gap}px`,
            width: "100%",
          }}
        >
          {children.map((child, index) => (
            <div
              key={index}
              style={{
                flexShrink: 0,
                width: itemWidth,
              }}
            >
              {child}
            </div>
          ))}
        </motion.div>
      </div>

      {/* Dots Indicator */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "8px",
          marginTop: "32px",
        }}
      >
        {[...Array(maxIndex + 1)].map((_, i) => (
          <div
            key={i}
            onClick={() => setCurrentIndex(i)}
            style={{
              width: currentIndex === i ? "24px" : "8px",
              height: "8px",
              borderRadius: "4px",
              background: currentIndex === i ? "var(--primary)" : "var(--border)",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
          />
        ))}
      </div>
    </div>
  );
}
