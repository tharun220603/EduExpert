"use client";

import React, { useState, useEffect, useRef } from "react";
import { FiSearch, FiX, FiArrowRight } from "react-icons/fi";
import { useRouter } from "next/navigation";
import colleges from "@/data/colleges";
import gsap from "gsap";

export default function SearchModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState(colleges);
  const inputRef = useRef<HTMLInputElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (query.trim() === "") {
      setResults(colleges.slice(0, 5));
    } else {
      const filtered = colleges.filter(
        (college) =>
          college.name.toLowerCase().includes(query.toLowerCase()) ||
          college.city.toLowerCase().includes(query.toLowerCase()),
      );
      setResults(filtered);
    }
  }, [query]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      inputRef.current?.focus();

      gsap.fromTo(
        overlayRef.current,
        { opacity: 0, backdropFilter: "blur(0px)" },
        { opacity: 1, backdropFilter: "blur(20px)", duration: 0.4, ease: "power2.out" },
      );

      gsap.fromTo(
        modalRef.current,
        { scale: 0.9, opacity: 0, y: 30 },
        { scale: 1, opacity: 1, y: 0, duration: 0.5, ease: "back.out(1.2)", delay: 0.1 },
      );
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={overlayRef}
      className="search-modal-overlay"
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        zIndex: 10000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
      onClick={(event) => {
        if (event.target === overlayRef.current) onClose();
      }}
    >
      <div
        ref={modalRef}
        className="search-modal"
        style={{
          width: "80vw",
          height: "70vh",
          maxWidth: "960px",
          backgroundColor: "#ffffff",
          borderRadius: "32px",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
          border: "1px solid var(--border)",
        }}
        onClick={(event) => event.stopPropagation()}
      >
        <div
          className="search-modal-header"
          style={{
            padding: "32px",
            borderBottom: "1px solid var(--border)",
            display: "flex",
            alignItems: "center",
            gap: "20px",
          }}
        >
          <FiSearch className="search-modal-icon" size={28} color="var(--accent)" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search for colleges, cities, or courses..."
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="search-modal-input"
            style={{
              flex: 1,
              border: "none",
              outline: "none",
              fontSize: "1.5rem",
              fontWeight: 600,
              color: "var(--text-primary)",
              background: "transparent",
            }}
          />
          <button
            onClick={onClose}
            className="search-modal-close"
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
              transition: "transform 0.2s",
              flexShrink: 0,
            }}
            onMouseEnter={(event) => {
              event.currentTarget.style.transform = "rotate(90deg)";
            }}
            onMouseLeave={(event) => {
              event.currentTarget.style.transform = "rotate(0deg)";
            }}
          >
            <FiX size={24} color="var(--text-muted)" />
          </button>
        </div>

        <div
          className="search-modal-body"
          style={{ flex: 1, overflowY: "auto", padding: "20px 32px" }}
        >
          <div
            className="search-modal-label"
            style={{
              marginBottom: "16px",
              fontSize: "0.85rem",
              fontWeight: 700,
              color: "var(--text-muted)",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
            }}
          >
            {query.trim() === "" ? "Featured Colleges" : `Found ${results.length} Results`}
          </div>

          <div
            className="search-modal-results"
            style={{ display: "flex", flexDirection: "column", gap: "12px" }}
          >
            {results.map((college) => (
              <div
                key={college.id}
                className="search-result-card"
                onClick={() => {
                  router.push(`/college/${college.slug || college.id}`);
                  onClose();
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "12px 14px",
                  borderRadius: "18px",
                  cursor: "pointer",
                  transition: "all 0.22s ease",
                  border: "1px solid rgba(148, 163, 184, 0.18)",
                  background:
                    "linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(248,250,252,0.94) 100%)",
                  gap: "14px",
                  boxShadow: "0 10px 24px rgba(15, 23, 42, 0.06)",
                }}
                onMouseEnter={(event) => {
                  event.currentTarget.style.transform = "translateY(-2px)";
                  event.currentTarget.style.background =
                    "linear-gradient(180deg, rgba(239,246,255,0.98) 0%, rgba(248,250,252,1) 100%)";
                  event.currentTarget.style.borderColor = "rgba(59, 130, 246, 0.22)";
                  event.currentTarget.style.boxShadow = "0 16px 34px rgba(37, 99, 235, 0.12)";
                }}
                onMouseLeave={(event) => {
                  event.currentTarget.style.transform = "translateY(0)";
                  event.currentTarget.style.background =
                    "linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(248,250,252,0.94) 100%)";
                  event.currentTarget.style.borderColor = "rgba(148, 163, 184, 0.18)";
                  event.currentTarget.style.boxShadow = "0 10px 24px rgba(15, 23, 42, 0.06)";
                }}
              >
                <div
                  className="search-result-main"
                  style={{ display: "flex", alignItems: "center", gap: "14px", minWidth: 0, flex: 1 }}
                >
                  <div
                    className="search-result-media"
                    style={{
                      width: "88px",
                      height: "72px",
                      borderRadius: "16px",
                      overflow: "hidden",
                      position: "relative",
                      flexShrink: 0,
                      background: "linear-gradient(135deg, rgba(30,41,59,0.92), rgba(59,130,246,0.82))",
                      boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.08)",
                    }}
                  >
                    {college.image ? (
                      <img
                        src={college.image}
                        alt={college.name}
                        className="search-result-image"
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      />
                    ) : (
                      <div
                        style={{
                          width: "100%",
                          height: "100%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "1.8rem",
                          color: "#ffffff",
                        }}
                      >
                        {college.emoji}
                      </div>
                    )}
                    <div
                      className="search-result-logo"
                      style={{
                        position: "absolute",
                        left: "8px",
                        bottom: "8px",
                        width: "28px",
                        height: "28px",
                        backgroundColor: "rgba(255,255,255,0.96)",
                        borderRadius: "10px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "4px",
                        border: "1px solid rgba(148, 163, 184, 0.2)",
                        boxShadow: "0 8px 18px rgba(15,23,42,0.14)",
                      }}
                    >
                      {college.logo ? (
                        <img
                          src={college.logo}
                          alt={`${college.name} logo`}
                          style={{ width: "100%", height: "100%", objectFit: "contain" }}
                        />
                      ) : (
                        <span style={{ fontSize: "0.9rem" }}>{college.emoji}</span>
                      )}
                    </div>
                  </div>
                  <div className="search-result-copy" style={{ minWidth: 0, flex: 1 }}>
                    <div
                      className="search-result-title"
                      style={{
                        fontWeight: 800,
                        fontSize: "1rem",
                        color: "var(--text-primary)",
                        lineHeight: 1.2,
                        marginBottom: "4px",
                      }}
                    >
                      {college.name}
                    </div>
                    <div
                      className="search-result-meta"
                      style={{
                        fontSize: "0.82rem",
                        color: "var(--text-muted)",
                        fontWeight: 500,
                        lineHeight: 1.35,
                      }}
                    >
                      {college.city}, {college.state}
                    </div>
                    <div style={{ display: "flex", gap: "8px", marginTop: "8px" }}>
                      <div
                        className="search-result-tag"
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          padding: "4px 8px",
                          borderRadius: "999px",
                          background: "rgba(37, 99, 235, 0.08)",
                          color: "var(--accent)",
                          fontSize: "0.73rem",
                          fontWeight: 700,
                          letterSpacing: "0.02em",
                        }}
                      >
                        {college.type}
                      </div>

                      {college.nirfRank && (
                        <div
                          style={{
                            display: "inline-flex",
                            alignItems: "flex-start",
                            padding: "4px 8px",
                            borderRadius: "999px",
                            background: "linear-gradient(135deg, #f59e0b, #d97706)",
                            color: "#fff",
                            fontSize: "0.7rem",
                            fontWeight: 800,
                            letterSpacing: "0.01em",
                          }}
                        >
                          NIRF #{college.nirfRank}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div
                  className="search-result-arrow-wrap"
                  style={{
                    width: "34px",
                    height: "34px",
                    borderRadius: "999px",
                    background: "rgba(37, 99, 235, 0.08)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <FiArrowRight className="search-result-arrow" color="var(--accent)" size={16} />
                </div>
              </div>
            ))}

            {results.length === 0 && (
              <div
                className="search-empty-state"
                style={{ textAlign: "center", padding: "60px 0", color: "var(--text-muted)" }}
              >
                <div style={{ fontSize: "3rem", marginBottom: "16px" }}>Search</div>
                <h3>No results found for &quot;{query}&quot;</h3>
                <p>Try checking your spelling or searching for a different keyword.</p>
              </div>
            )}
          </div>
        </div>

        <div
          className="search-modal-footer"
          style={{
            padding: "20px 32px",
            background: "var(--bg-section)",
            borderTop: "1px solid var(--border)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            className="search-modal-footer-hints"
            style={{ fontSize: "0.85rem", color: "var(--text-muted)", display: "flex", gap: "16px" }}
          >
            <span>
              <kbd
                style={{
                  padding: "2px 6px",
                  background: "#ffffff",
                  borderRadius: "4px",
                  border: "1px solid #ccc",
                  marginRight: "4px",
                }}
              >
                Esc
              </kbd>
              to close
            </span>
            <span>
              <kbd
                style={{
                  padding: "2px 6px",
                  background: "#ffffff",
                  borderRadius: "4px",
                  border: "1px solid #ccc",
                  marginRight: "4px",
                }}
              >
                Enter
              </kbd>
              to select
            </span>
          </div>
          <div
            className="search-modal-footer-brand"
            style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--accent)" }}
          >
            EduExpert Global Search
          </div>
        </div>
      </div>
    </div>
  );
}
