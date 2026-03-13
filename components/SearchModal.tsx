"use client";

import React, { useState, useEffect, useRef } from "react";
import { FiSearch, FiX, FiArrowRight } from "react-icons/fi";
import { useRouter } from "next/navigation";
import colleges from "@/data/colleges";
import gsap from "gsap";

export default function SearchModal({ 
  isOpen, 
  onClose 
}: { 
  isOpen: boolean; 
  onClose: () => void 
}) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState(colleges);
  const inputRef = useRef<HTMLInputElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // Filter results
  useEffect(() => {
    if (query.trim() === "") {
      setResults(colleges.slice(0, 5)); // Show some featured/recent ones initially
    } else {
      const filtered = colleges.filter(c => 
        c.name.toLowerCase().includes(query.toLowerCase()) ||
        c.city.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filtered);
    }
  }, [query]);

  // Handle animations and focus
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      inputRef.current?.focus();
      
      gsap.fromTo(overlayRef.current, 
        { opacity: 0, backdropFilter: "blur(0px)" },
        { opacity: 1, backdropFilter: "blur(20px)", duration: 0.4, ease: "power2.out" }
      );
      
      gsap.fromTo(modalRef.current,
        { scale: 0.9, opacity: 0, y: 30 },
        { scale: 1, opacity: 1, y: 0, duration: 0.5, ease: "back.out(1.2)", delay: 0.1 }
      );
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen]);

  // Handle Escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div 
      ref={overlayRef}
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        zIndex: 10000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px"
      }}
      onClick={(e) => {
        if (e.target === overlayRef.current) onClose();
      }}
    >
      <div 
        ref={modalRef}
        className="search-modal"
        style={{
          width: "80vw",
          height: "70vh",
          backgroundColor: "#ffffff",
          borderRadius: "32px",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
          border: "1px solid var(--border)"
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Header */}
        <div style={{ padding: "32px", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", gap: "20px" }}>
          <FiSearch size={28} color="var(--accent)" />
          <input 
            ref={inputRef}
            type="text"
            placeholder="Search for colleges, cities, or courses..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{
              flex: 1,
              border: "none",
              outline: "none",
              fontSize: "1.5rem",
              fontWeight: 600,
              color: "var(--text-primary)",
              background: "transparent"
            }}
          />
          <button 
            onClick={onClose}
            style={{
              background: "var(--bg-section)",
              border: "none",
              borderRadius: "50%",
              width: "48px",
              height: "48px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              transition: "transform 0.2s"
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = "rotate(90deg)"}
            onMouseLeave={(e) => e.currentTarget.style.transform = "rotate(0deg)"}
          >
            <FiX size={24} color="var(--text-muted)" />
          </button>
        </div>

        {/* Results Body */}
        <div style={{ flex: 1, overflowY: "auto", padding: "20px 32px" }}>
          <div style={{ marginBottom: "16px", fontSize: "0.85rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.1em" }}>
            {query.trim() === "" ? "Featured Colleges" : `Found ${results.length} Results`}
          </div>
          
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {results.map((college) => (
              <div 
                key={college.id}
                onClick={() => {
                  router.push(`/college/${college.slug || college.id}`);
                  onClose();
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "16px 24px",
                  borderRadius: "20px",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  border: "1px solid transparent",
                  backgroundColor: "var(--bg-main)"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "var(--primary-light)";
                  e.currentTarget.style.borderColor = "var(--accent-light)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "var(--bg-main)";
                  e.currentTarget.style.borderColor = "transparent";
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                  <div style={{
                    width: "48px",
                    height: "48px",
                    backgroundColor: "#ffffff",
                    borderRadius: "12px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "6px",
                    border: "1px solid var(--border)",
                    boxShadow: "0 4px 10px rgba(0,0,0,0.05)"
                  }}>
                    {college.logo ? (
                      <img src={college.logo} alt={college.name} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                    ) : (
                      <span style={{ fontSize: "1.5rem" }}>{college.emoji}</span>
                    )}
                  </div>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: "1.1rem", color: "var(--text-primary)" }}>{college.name}</div>
                    <div style={{ fontSize: "0.85rem", color: "var(--text-muted)", fontWeight: 500 }}>{college.city}, {college.state} • {college.type}</div>
                  </div>
                </div>
                <FiArrowRight color="var(--accent)" size={20} />
              </div>
            ))}
            
            {results.length === 0 && (
              <div style={{ textAlign: "center", padding: "60px 0", color: "var(--text-muted)" }}>
                <div style={{ fontSize: "3rem", marginBottom: "16px" }}>🔍</div>
                <h3>No results found for &quot;{query}&quot;</h3>
                <p>Try checking your spelling or searching for a different keyword.</p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div style={{ padding: "20px 32px", background: "var(--bg-section)", borderTop: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontSize: "0.85rem", color: "var(--text-muted)", display: "flex", gap: "16px" }}>
            <span><kbd style={{ padding: "2px 6px", background: "#ffffff", borderRadius: "4px", border: "1px solid #ccc", marginRight: "4px" }}>Esc</kbd> to close</span>
            <span><kbd style={{ padding: "2px 6px", background: "#ffffff", borderRadius: "4px", border: "1px solid #ccc", marginRight: "4px" }}>↵</kbd> to select</span>
          </div>
          <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--accent)" }}>EduExpert Global Search</div>
        </div>
      </div>
    </div>
  );
}
