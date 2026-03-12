"use client";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FiX, FiChevronLeft, FiChevronRight, FiMaximize2 } from "react-icons/fi";

gsap.registerPlugin(ScrollTrigger);

// Curated high quality educational/campus images for the gallery
const defaultGalleryImages = [
  "https://images.unsplash.com/photo-1562774053-701939374161?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1200&q=80"
];

interface CollegeGalleryProps {
  images?: string[];
}

export default function CollegeGallery({ images }: CollegeGalleryProps) {
  const activeImages = images && images.length > 0 ? images : defaultGalleryImages;
  const containerRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLDivElement[]>([]);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const lightboxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Staggered entrance animation for gallery items
    imagesRef.current.forEach((img, i) => {
      if (!img) return;
      gsap.fromTo(
        img,
        { opacity: 0, scale: 0.8, y: 40 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.8,
          ease: "back.out(1.5)",
          scrollTrigger: {
            trigger: img,
            start: "top 85%",
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    gsap.to(lightboxRef.current, {
      opacity: 0,
      scale: 0.95,
      duration: 0.3,
      onComplete: () => {
        setLightboxOpen(false);
        document.body.style.overflow = "";
      }
    });
  };

  useEffect(() => {
    if (lightboxOpen && lightboxRef.current) {
      gsap.fromTo(
        lightboxRef.current,
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.4, ease: "power2.out" }
      );
    }
  }, [lightboxOpen, currentIndex]);

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === activeImages.length - 1 ? 0 : prev + 1));
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? activeImages.length - 1 : prev - 1));
  };

  return (
    <>
      <div 
        ref={containerRef}
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
          gap: "16px",
          marginTop: "16px"
        }}
      >
        {activeImages.map((src, idx) => (
          <div
            key={idx}
            ref={(el) => {
              if (el) imagesRef.current[idx] = el;
            }}
            onClick={() => openLightbox(idx)}
            className="gallery-item"
            style={{
              position: "relative",
              aspectRatio: "1",
              borderRadius: "16px",
              overflow: "hidden",
              cursor: "pointer",
              border: "1px solid var(--glass-border)",
              boxShadow: "var(--shadow-sm)",
            }}
          >
            <img 
              src={src} 
              alt={`Campus View ${idx + 1}`}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                filter: "brightness(1.05) contrast(1.1) saturate(1.15)",
                transition: "transform 0.5s ease",
              }}
            />
            <div 
              className="gallery-overlay"
              style={{
                position: "absolute",
                inset: 0,
                background: "rgba(15, 23, 42, 0.4)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                opacity: 0,
                transition: "opacity 0.3s ease",
              }}
            >
              <FiMaximize2 size={24} color="var(--white)" />
            </div>
            
            {/* Inline CSS for the hover effect */}
            <style jsx>{`
              .gallery-item:hover img {
                transform: scale(1.1);
              }
              .gallery-item:hover .gallery-overlay {
                opacity: 1 !important;
              }
            `}</style>
          </div>
        ))}
      </div>

      {/* Lightbox / Full screen image viewer */}
      {lightboxOpen && (
        <div
          ref={lightboxRef}
          onClick={closeLightbox}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 99999,
            background: "rgba(3, 3, 5, 0.95)",
            backdropFilter: "blur(10px)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "40px"
          }}
        >
          {/* Top Controls */}
          <div style={{ position: "absolute", top: "24px", right: "24px", display: "flex", gap: "16px" }}>
            <button 
              onClick={closeLightbox}
              style={{
                background: "var(--glass-strong)",
                border: "1px solid var(--glass-border-soft)",
                color: "var(--white)",
                width: "44px",
                height: "44px",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                transition: "all 0.2s"
              }}
            >
              <FiX size={24} />
            </button>
          </div>

          {/* Main Image */}
          <div style={{ position: "relative", maxWidth: "90vw", maxHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <img 
              src={activeImages[currentIndex]} 
              alt={`Campus View ${currentIndex + 1} Full`}
              style={{
                maxWidth: "100%",
                maxHeight: "80vh",
                objectFit: "contain",
                borderRadius: "8px",
                filter: "brightness(1.05) contrast(1.1) saturate(1.15)",
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)"
              }}
            />
            
            {/* Navigation Arrows */}
            <button 
              onClick={prevImage}
              style={{
                position: "absolute",
                left: "-20px",
                background: "var(--glass-strong)",
                border: "1px solid var(--glass-border-soft)",
                color: "var(--white)",
                width: "48px",
                height: "48px",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                transform: "translateX(-50%)",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
              }}
            >
              <FiChevronLeft size={28} />
            </button>
            <button 
              onClick={nextImage}
              style={{
                position: "absolute",
                right: "-20px",
                background: "var(--glass-strong)",
                border: "1px solid var(--glass-border-soft)",
                color: "var(--white)",
                width: "48px",
                height: "48px",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                transform: "translateX(50%)",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
              }}
            >
              <FiChevronRight size={28} />
            </button>
          </div>
          
          <div style={{ color: "var(--text-muted)", marginTop: "24px", fontSize: "0.9rem", letterSpacing: "2px" }}>
            {currentIndex + 1} / {activeImages.length}
          </div>
        </div>
      )}
    </>
  );
}
