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
          padding: "100px 0 60px 0",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundImage: `
              linear-gradient(
                135deg,
                rgba(32, 34, 39, 0.65),
                rgba(26, 25, 31, 0.65)
              ),
              url('/coleges_page_banner.png')
            `,
            backgroundSize: "cover",
            backgroundPosition: "center",
            zIndex: 0,
          }}
        />
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div
            className="page-hero-content"
            style={{ maxWidth: "800px", margin: "0" }}
          >
            <span className="badge badge-blue">🏛️ COLLEGE EXPLORER</span>
            <h1
              style={{
                fontSize: "clamp(2.5rem, 6vw, 4rem)",
                fontWeight: 800,
                color: "white",
                marginBottom: "24px",
              }}
            >
              Find Your Perfect College
            </h1>
            <p
              style={{
                fontSize: "1.2rem",
                color: "white",
                lineHeight: 1.6,
              }}
            >
              Explore top-ranked Southern Indian colleges across Engineering,
              Medical, Arts & Science, Law and Management.
            </p>
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container">
          <div className="section-header" ref={topRankedHeaderRef}>
            <span className="badge badge-amber">PREMIUM SELECTION</span>
            <h2>🥇 Top Ranked Colleges</h2>
            <p>NIRF Top institutions from Southern India</p>
          </div>
          <div ref={topRankedSliderRef}>
            <FeaturedCollegesRow colleges={topRanked.slice(0, 10)} />
          </div>
        </div>
      </section>

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
              marginBottom: "40px",
              display: "flex",
              flexWrap: "wrap",
              gap: "12px",
              borderBottom: "1px solid var(--border)",
              paddingBottom: "24px",
            }}
          >
            {categories.map((cat) => (
              <button
                key={cat}
                className={`filter-tab${activeTab === cat ? " active" : ""}`}
                onClick={() => setActiveTab(cat)}
                style={{
                  padding: "10px 20px",
                  borderRadius: "12px",
                  fontWeight: 700,
                  fontSize: "0.9rem",
                  background:
                    activeTab === cat ? "var(--primary)" : "var(--bg-section)",
                  color: activeTab === cat ? "#fff" : "var(--text-muted)",
                  border: "none",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                }}
              >
                {cat}
                <span
                  style={{ marginLeft: "8px", opacity: 0.6, fontSize: "0.8em" }}
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
              <div className="empty-state-banner">
                <div style={{ fontSize: "3rem", marginBottom: "20px" }}>🔍</div>
                <h3>No colleges found</h3>
                <p style={{ maxWidth: "400px", margin: "0 auto 24px" }}>
                  We couldn't find any institutions matching your search
                  criteria.
                </p>
                <AntiGravityButton
                  variant="outline"
                  onClick={() => {
                    setSearchQuery("");
                    setActiveTab("All");
                  }}
                >
                  Reset Filters
                </AntiGravityButton>
              </div>
            )}
          </div>
        </div>
      </ScrollFloatSection>

      <section className="section bg-white">
        <div className="container">
          <div
            className="cta-banner"
            ref={ctaRef}
            style={{
              background: "var(--bg-section)",
              borderRadius: "24px",
              padding: "40px",
              border: "1px solid var(--border)",
            }}
          >
            <div
              className="flex-responsive"
              style={{ justifyContent: "space-between", alignItems: "center" }}
            >
              <div style={{ textAlign: "left" }}>
                <h3 style={{ marginBottom: "12px" }}>
                  Not sure which college to choose?
                </h3>
                <p style={{ color: "var(--text-muted)" }}>
                  Check entrance exams and course requirements to find your best
                  fit.
                </p>
              </div>
              <div
                className="flex-responsive"
                style={{ gap: "12px", width: "auto" }}
              >
                <AntiGravityButton
                  onClick={() => router.push("/exams")}
                  variant="primary"
                  className="w-full-mobile"
                >
                  View Exams
                </AntiGravityButton>
                <AntiGravityButton
                  onClick={() => router.push("/courses")}
                  variant="outline"
                  className="w-full-mobile"
                >
                  Courses
                </AntiGravityButton>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
