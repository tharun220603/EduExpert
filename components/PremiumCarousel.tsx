"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, useAnimation, PanInfo } from "framer-motion";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

interface PremiumCarouselProps {
  children: React.ReactNode[];
  itemsPerView?: {
    largeDesktop?: number;
    desktop: number;
    tablet: number;
    mobile: number;
  };
  gap?: number;
  showDots?: boolean;
  infinite?: boolean;
  slideByPage?: boolean;
  autoPlay?: boolean;
  autoPlayInterval?: number;
}

export default function PremiumCarousel({
  children,
  itemsPerView = { largeDesktop: 4, desktop: 3, tablet: 2, mobile: 1 },
  gap = 24,
  showDots = false,
  infinite = true,
  slideByPage = false,
  autoPlay = true,
  autoPlayInterval = 4000,
}: PremiumCarouselProps) {
  const totalChildren = children.length;
  // State for the index. If infinite, we start from the 'middle' set of children.
  const initialIndex = infinite ? totalChildren : 0;
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isAnimating, setIsAnimating] = useState(false);
  const [viewCount, setViewCount] = useState(itemsPerView.desktop);
  const [sidePadding, setSidePadding] = useState(60);
  
  const containerRef = useRef<HTMLDivElement>(null);

  // Triple children for seamless infinite scroll
  const displayChildren = infinite ? [...children, ...children, ...children] : children;

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setViewCount(itemsPerView.mobile);
        setSidePadding(15); // Minimized padding for full-width feel
      } else if (width < 1024) {
        setViewCount(itemsPerView.tablet);
        setSidePadding(50);
      } else if (width < 1440) {
        setViewCount(itemsPerView.desktop);
        setSidePadding(60);
      } else {
        setViewCount(itemsPerView.largeDesktop || itemsPerView.desktop);
        setSidePadding(60);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [itemsPerView]);

  const maxIndex = infinite ? displayChildren.length - viewCount : totalChildren - viewCount;

  // Detect mobile for conditional arrow rendering structure
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleNext = useCallback(() => {
    if (isAnimating) return;
    const step = slideByPage ? viewCount : 1;
    setCurrentIndex((prev) => prev + step);
    setIsAnimating(true);
  }, [isAnimating, slideByPage, viewCount]);

  const handlePrev = useCallback(() => {
    if (isAnimating) return;
    const step = slideByPage ? viewCount : 1;
    setCurrentIndex((prev) => prev - step);
    setIsAnimating(true);
  }, [isAnimating, slideByPage, viewCount]);

  // Teleportation logic
  useEffect(() => {
    if (!infinite) return;

    // If we've moved into the first or last cloned set, jump back to the middle
    if (!isAnimating) {
      if (currentIndex >= totalChildren * 2) {
        // Jump back to mid set
        setCurrentIndex(currentIndex - totalChildren);
      } else if (currentIndex < totalChildren) {
        // Jump forward to mid set
        setCurrentIndex(currentIndex + totalChildren);
      }
    }
  }, [currentIndex, isAnimating, infinite, totalChildren]);

  // Auto-play
  useEffect(() => {
    if (!autoPlay) return;
    const interval = setInterval(handleNext, autoPlayInterval);
    return () => clearInterval(interval);
  }, [autoPlay, autoPlayInterval, handleNext]);

  // Simple percentage width based only on viewCount
  const itemWidth = `${100 / viewCount}%`;

  const renderArrow = (direction: "left" | "right") => {
    const isLeft = direction === "left";
    const onClick = isLeft ? handlePrev : handleNext;
    const isVisible = infinite || (isLeft ? currentIndex > 0 : currentIndex < maxIndex);

    if (!isVisible) return <div style={{ width: "48px" }} />;

    return (
      <button
        onClick={onClick}
        style={{
          width: "48px",
          height: "48px",
          borderRadius: "50%",
          background: "#ffffff",
          border: "1px solid var(--border)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
          color: "var(--primary)",
          transition: "all 0.3s ease",
          position: isMobile ? "static" : "absolute",
          top: isMobile ? "auto" : "50%",
          left: isMobile ? "auto" : isLeft ? "0" : "auto",
          right: isMobile ? "auto" : isLeft ? "auto" : "0",
          transform: isMobile ? "none" : "translateY(-50%)",
          zIndex: 20,
        }}
        className="nav-arrow"
      >
        {isLeft ? <FiChevronLeft size={24} /> : <FiChevronRight size={24} />}
      </button>
    );
  };

  return (
    <div 
      className="premium-carousel" 
      style={{ 
        position: "relative", 
        width: "100%", 
        overflow: "visible",
        padding: isMobile ? `0 ${sidePadding}px` : `0 ${sidePadding}px` 
      }}
    >
      {/* Desktop Arrows Structure */}
      {!isMobile && (
        <>
          {renderArrow("left")}
          {renderArrow("right")}
        </>
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
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.1}
          onDragStart={() => setIsAnimating(true)}
          onDragEnd={(_, info: PanInfo) => {
            const threshold = 50;
            if (info.offset.x < -threshold) {
              handleNext();
            } else if (info.offset.x > threshold) {
              handlePrev();
            } else {
              setIsAnimating(false);
            }
          }}
          animate={{
            x: `-${currentIndex * (100 / viewCount)}%`,
          }}
          transition={isAnimating ? {
            type: "spring",
            stiffness: 260,
            damping: 30,
          } : { duration: 0 }}
          onAnimationComplete={() => setIsAnimating(false)}
          style={{
            display: "flex",
            width: "100%", // This percentage calculation is now robust
            cursor: "grab",
          }}
          whileTap={{ cursor: "grabbing" }}
        >
          {displayChildren.map((child, index) => (
            <div
              key={index}
              style={{
                flexShrink: 0,
                width: itemWidth,
                minWidth: itemWidth,
                maxWidth: itemWidth,
                padding: `0 ${gap / 2}px`, // Use padding for gap
                display: "flex",
                boxSizing: "border-box", // Crucial for padding to keep width consistent
              }}
            >
              <div style={{ width: "100%", height: "100%", display: "flex" }}>
                {child}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Mobile Arrows Bottom Bar */}
      {isMobile && (
        <div 
          style={{ 
            display: "flex", 
            justifyContent: "center", 
            gap: "20px",
            marginTop: "20px" 
          }}
        >
          {renderArrow("left")}
          {renderArrow("right")}
        </div>
      )}

      {/* Dots Indicator (Hidden by default as per request) */}
      {showDots && !infinite && (
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
      )}
    </div>
  );
}
