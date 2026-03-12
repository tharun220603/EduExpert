"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import colleges, { College } from "@/data/colleges";
import CollegeCard from "@/components/CollegeCard";
import FeaturedCollegesRow from "@/components/FeaturedCollegesRow";
import ScrollFloatSection from "@/components/ScrollFloatSection";
import AntiGravityButton from "@/components/AntiGravityButton";
import {
  usePageHeroEntrance,
  useSectionHeaderReveal,
  useScrollReveal,
  useStaggerReveal,
} from "@/hooks/useGsapAnimations";
import { FiMapPin, FiStar, FiArrowRight, FiSearch, FiX } from "react-icons/fi";

const categories = [
  "All",
  "Engineering",
  "Medical",
  "Arts & Science",
  "Law",
  "Management",
] as const;
type Category = (typeof categories)[number];

export default function CollegesPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Category>("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Refs
  const heroRef = useRef<HTMLElement>(null);
  const topRankedHeaderRef = useRef<HTMLDivElement>(null);
  const topRankedSliderRef = useRef<HTMLDivElement>(null);
  const allCollegesHeaderRef = useRef<HTMLDivElement>(null);
  const allCollegesGridRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  // Animations
  usePageHeroEntrance(heroRef);
  useSectionHeaderReveal(topRankedHeaderRef);
  useScrollReveal(topRankedSliderRef, { y: 30 });
  useScrollReveal(allCollegesHeaderRef, { y: 30 });
  useScrollReveal(ctaRef, { y: 40 });

  const filtered = colleges.filter((c) => {
    const matchesTab = activeTab === "All" || c.type === activeTab;
    const matchesSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.state.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const topRanked = colleges
    .filter((c) => c.nirfRank && c.nirfRank <= 20)
    .sort((a, b) => (a.nirfRank ?? 99) - (b.nirfRank ?? 99));

  return (
    <>
      {/* Hero */}
      <section
        className="page-hero"
        ref={heroRef}
        style={{
          position: "relative",
          padding: "140px 0 100px",
          borderBottom: "1px solid var(--border)",
          background: "#080a1e",
          overflow: "hidden",
          color: "#ffffff",
        }}
      >
        {/* Banner Image with Overlay */}
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <img
            src="/coleges_page_banner.png"
            alt="Colleges Banner"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              opacity: 0.5,
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to right, rgba(8, 10, 30, 0.9), rgba(8, 10, 30, 0.4))",
            }}
          />
        </div>

        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div className="page-hero-content">
            <span
              className="badge"
              style={{
                marginBottom: "24px",
                padding: "8px 16px",
                fontSize: "0.85rem",
                background: "rgba(255,255,255,0.1)",
                backdropFilter: "blur(10px)",
                color: "#ffffff",
                border: "1px solid rgba(255,255,255,0.2)",
              }}
            >
              🏛️ College Explorer
            </span>
            <h1
              style={{
                color: "#ffffff",
                fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
                fontWeight: 900,
                letterSpacing: "-0.04em",
                lineHeight: 1.1,
              }}
            >
              Find Your Perfect College
            </h1>
            <p
              style={{
                color: "rgba(255,255,255,0.8)",
                fontSize: "1.25rem",
                maxWidth: "650px",
                lineHeight: 1.6,
                marginTop: "20px",
                fontWeight: 500,
              }}
            >
              Explore top-ranked Southern Indian colleges across Engineering,
              Medical, Arts &amp; Science, Law and Management.
            </p>
          </div>
        </div>
      </section>

      {/* Top Ranked Slider */}
      <ScrollFloatSection
        className="section"
        speed={0.8}
        style={{
          background: "#ffffff",
          borderTop: "1px solid rgba(255,255,255,0.05)",
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      >
        <div className="container">
          <div className="section-header" ref={topRankedHeaderRef}>
            <span
              className="badge"
              style={{
                background: "rgba(245, 158, 11, 0.2)",
                color: "#fbbf24",
                border: "1px solid rgba(245, 158, 11, 0.3)",
              }}
            >
              PREMIUM SELECTION
            </span>
            <h2 style={{ marginTop: "16px", color: "#ffffff" }}>
              🥇{" "}
              <span style={{ color: "var(--accent-light)" }}>
                Top Ranked Colleges
              </span>{" "}
            </h2>
            <p style={{ color: "rgba(255,255,255,0.6)" }}>
              NIRF Top institutions from Southern India
            </p>
          </div>
          <div ref={topRankedSliderRef}>
            <FeaturedCollegesRow colleges={topRanked.slice(0, 10)} />
          </div>
        </div>
      </ScrollFloatSection>

      {/* All Colleges with Filter */}
      <ScrollFloatSection
        className="section"
        speed={0.4}
        style={{
          paddingTop: 0,
          background: "#ffffff",
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(0,0,0,0.04) 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }}
      >
        <div className="container">
          <div
            className="section-header flex-responsive"
            style={{
              textAlign: "left",
              alignItems: "center",
              marginBottom: "40px",
            }}
            ref={allCollegesHeaderRef}
          >
            <div>
              <h2 style={{ color: "var(--text-primary)" }}>
                All <span style={{ color: "#3b82f6" }}>Colleges</span>
              </h2>
              <p style={{ color: "var(--text-muted)" }}>
                Filter by stream to find your best match
              </p>
            </div>

            {/* Search Bar */}
            <div
              style={{ position: "relative", width: "100%", maxWidth: "450px" }}
            >
              <FiSearch
                style={{
                  position: "absolute",
                  left: "18px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "var(--text-muted)",
                  fontSize: "1.2rem",
                }}
              />
              <input
                type="text"
                placeholder="Search by name, city or state..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: "100%",
                  padding: "18px 56px",
                  background: "#ffffff",
                  border: "1px solid var(--border)",
                  borderRadius: "20px",
                  color: "var(--text-primary)",
                  fontSize: "1.05rem",
                  outline: "none",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.03)",
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "var(--primary)";
                  e.currentTarget.style.boxShadow =
                    "0 0 0 4px rgba(79, 70, 229, 0.1), 0 10px 25px rgba(0,0,0,0.05)";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = "var(--border)";
                  e.currentTarget.style.boxShadow =
                    "0 4px 12px rgba(0,0,0,0.03)";
                }}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  style={{
                    position: "absolute",
                    right: "14px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "rgba(0,0,0,0.05)",
                    border: "none",
                    width: "28px",
                    height: "28px",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    color: "var(--text-muted)",
                  }}
                >
                  <FiX size={14} />
                </button>
              )}
            </div>
          </div>

          <div
            className="filter-tabs"
            style={{
              marginBottom: "48px",
              borderBottom: "1px solid var(--border)",
              paddingBottom: "20px",
            }}
          >
            {categories.map((cat) => (
              <button
                key={cat}
                className={`filter-tab${activeTab === cat ? " active" : ""}`}
                onClick={() => setActiveTab(cat)}
                style={{
                  background: activeTab === cat ? "var(--primary)" : "#ffffff",
                  color: activeTab === cat ? "#ffffff" : "var(--text-muted)",
                  border:
                    activeTab === cat
                      ? "1px solid var(--primary)"
                      : "1px solid var(--border)",
                  padding: "12px 24px",
                  borderRadius: "16px",
                  fontWeight: 700,
                  fontSize: "0.95rem",
                  cursor: "pointer",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  boxShadow:
                    activeTab === cat
                      ? "0 8px 20px rgba(79, 70, 229, 0.2)"
                      : "0 2px 4px rgba(0,0,0,0.02)",
                }}
              >
                {cat}
                <span
                  style={{
                    fontSize: "0.75rem",
                    opacity: 0.6,
                  }}
                >
                  {cat === "All"
                    ? colleges.length
                    : colleges.filter((c) => c.type === cat).length}
                </span>
              </button>
            ))}
          </div>

          <div ref={allCollegesGridRef}>
            {filtered.length > 0 ? (
              <div className="cards-grid">
                {filtered.map((college) => (
                  <CollegeCard key={college.id} college={college} />
                ))}
              </div>
            ) : (
              <div
                className="empty-state-banner"
                style={{
                  background: "#f8fafc",
                  border: "1px solid var(--border)",
                  padding: "60px",
                  borderRadius: "32px",
                  textAlign: "center",
                }}
              >
                <div style={{ fontSize: "3rem", marginBottom: "20px" }}>🔍</div>
                <h3
                  style={{ marginBottom: "12px", color: "var(--text-primary)" }}
                >
                  No colleges found
                </h3>
                <p
                  style={{
                    color: "var(--text-muted)",
                    maxWidth: "400px",
                    margin: "0 auto 24px",
                  }}
                >
                  We couldn't find any institutions matching your current search
                  criteria. Try a different keyword or category.
                </p>
                <AntiGravityButton
                  variant="outline"
                  onClick={() => {
                    setSearchQuery("");
                    setActiveTab("All");
                  }}
                >
                  Reset All Filters
                </AntiGravityButton>
              </div>
            )}
          </div>
        </div>
      </ScrollFloatSection>

      {/* Info Banner */}
      <section
        className="section-sm"
        style={{ background: "#ffffff", borderTop: "1px solid var(--border)" }}
      >
        <div className="container">
          <div
            className="cta-banner cta-shimmer"
            ref={ctaRef}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "24px",
              flexWrap: "wrap",
              textAlign: "left",
              background: "#f8fafc",
              border: "1px solid var(--border)",
              padding: "48px",
              borderRadius: "32px",
            }}
          >
            <div>
              <h3
                style={{
                  color: "var(--text-primary)",
                  marginBottom: "12px",
                  fontSize: "1.6rem",
                }}
              >
                Not sure which college to choose?
              </h3>
              <p style={{ color: "var(--text-muted)", fontSize: "1.05rem" }}>
                Check entrance exams and course requirements to find your best
                fit.
              </p>
            </div>
            <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
              <AntiGravityButton
                onClick={() => router.push("/exams")}
                variant="primary"
              >
                View Exams <FiArrowRight />
              </AntiGravityButton>
              <AntiGravityButton
                onClick={() => router.push("/courses")}
                variant="outline"
              >
                Browse Courses
              </AntiGravityButton>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
