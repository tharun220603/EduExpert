"use client";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import exams, { Exam } from "@/data/exams";
import ScrollFloatSection from "@/components/ScrollFloatSection";
import AntiGravityButton from "@/components/AntiGravityButton";
import {
  usePageHeroEntrance,
  useSectionHeaderReveal,
  useScrollReveal,
} from "@/hooks/useGsapAnimations";
import {
  FiCalendar,
  FiUsers,
  FiArrowRight,
  FiInfo,
  FiExternalLink,
  FiClock,
} from "react-icons/fi";

const categories = [
  "All",
  "Engineering",
  "Medical",
  "MBA",
  "Law",
  "Arts & Science",
] as const;
type Category = (typeof categories)[number];

function ExamCard({ exam }: { exam: Exam }) {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/exams/${exam.slug || exam.id}`)}
      className="college-card"
      style={{
        height: "100%",
        background: "#ffffff",
        borderRadius: "28px",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        border: "1px solid var(--border)",
        boxShadow: "0 8px 30px rgba(0,0,0,0.04)",
        transition: "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
        cursor: "pointer",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-8px)";
        e.currentTarget.style.borderColor = "var(--primary)";
        e.currentTarget.style.boxShadow = "0 20px 40px rgba(0,0,0,0.08)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.borderColor = "var(--border)";
        e.currentTarget.style.boxShadow = "0 8px 30px rgba(0,0,0,0.04)";
      }}
    >
      {/* CARD HEADER: NAME & EMOJI */}
      <div
        style={{
          padding: "32px 24px",
          background: `linear-gradient(135deg, ${exam.color}08, ${exam.color}15)`,
          borderBottom: "1px solid var(--border)",
          position: "relative",
          display: "flex",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <div
          style={{
            width: "60px",
            height: "60px",
            background: "#ffffff",
            borderRadius: "16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "2.2rem",
            boxShadow: `0 8px 16px ${exam.color}10`,
            flexShrink: 0,
            border: `1px solid ${exam.color}15`,
          }}
        >
          {exam.emoji}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <h3
            style={{
              fontSize: "1.25rem",
              fontWeight: 800,
              color: "var(--text-primary)",
              marginBottom: "4px",
              letterSpacing: "-0.01em",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              paddingRight: "60px", // Space for the badge
            }}
          >
            {exam.name}
          </h3>
          <div
            style={{
              fontSize: "0.75rem",
              color: "var(--text-muted)",
              fontWeight: 700,
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {exam.conductingBody}
          </div>
        </div>
        <div style={{ position: "absolute", top: "18px", right: "18px" }}>
          <span
            className={`badge ${exam.level === "National" ? "badge-blue" : "badge-green"}`}
            style={{ fontSize: "0.7rem", padding: "4px 10px", fontWeight: 700 }}
          >
            {exam.level}
          </span>
        </div>
      </div>

      {/* CARD BODY: DESCRIPTION & META */}
      <div
        style={{
          padding: "32px 24px 24px",
          flex: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <p
          style={{
            fontSize: "0.95rem",
            color: "var(--text-muted)",
            lineHeight: 1.7,
            marginBottom: "24px",
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {exam.description}
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
            gap: "16px",
            marginBottom: "20px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div
              style={{
                color: "var(--primary)",
                background: "var(--primary-light)",
                padding: "8px",
                borderRadius: "10px",
              }}
            >
              <FiCalendar size={16} />
            </div>
            <div>
              <div
                style={{
                  fontSize: "0.65rem",
                  color: "var(--text-muted)",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.02em",
                }}
              >
                Exam Month
              </div>
              <div
                style={{
                  fontSize: "0.85rem",
                  fontWeight: 700,
                  color: "var(--text-primary)",
                }}
              >
                {exam.examMonth}
              </div>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div
              style={{
                color: "var(--warning)",
                background: "rgba(245, 158, 11, 0.1)",
                padding: "8px",
                borderRadius: "10px",
              }}
            >
              <FiUsers size={16} />
            </div>
            <div>
              <div
                style={{
                  fontSize: "0.65rem",
                  color: "var(--text-muted)",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.02em",
                }}
              >
                Total Seats
              </div>
              <div
                style={{
                  fontSize: "0.85rem",
                  fontWeight: 700,
                  color: "var(--text-primary)",
                }}
              >
                {exam.totalSeats || "Varies"}
              </div>
            </div>
          </div>
        </div>

        <div
          style={{
            marginTop: "auto",
            borderTop: "1px solid var(--border)",
            paddingTop: "24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              color: "var(--primary)",
              fontSize: "0.95rem",
              fontWeight: 700,
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            Details <FiArrowRight size={16} />
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "4px",
              color: "var(--text-muted)",
              fontSize: "0.85rem",
              fontWeight: 600,
            }}
          >
            <FiInfo size={14} /> {exam.conductingBody} Level
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ExamsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Category>("All");

  // Refs
  const heroRef = useRef<HTMLElement>(null);
  const mainGridRef = useRef<HTMLDivElement>(null);
  const filterSectionRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  // Animations
  usePageHeroEntrance(heroRef);
  useScrollReveal(mainGridRef, { y: 30 });
  useScrollReveal(filterSectionRef, { y: 30 });
  useScrollReveal(ctaRef, { y: 40 });

  const filtered =
    activeTab === "All" ? exams : exams.filter((e) => e.category === activeTab);

  return (
    <div className="page-wrapper">
      {/* ── HERO SECTION ── */}
      <section
        className="page-hero"
        ref={heroRef}
        style={{
          position: "relative",
          padding: "80px 0 40px 0",
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
    url('/Exam_banner.jpg')
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
            <span className="badge badge-blue">🎯 Admission Guide </span>
            <h1
              style={{
                fontSize: "clamp(2.5rem, 6vw, 4rem)",
                marginBottom: "24px",
                color: "white",
                fontWeight: 800,
              }}
            >
              Master Your <span style={{ color: "white" }}>Entrance Exams</span>
            </h1>
            <p
              style={{
                fontSize: "1.15rem",
                color: "white",
                lineHeight: 1.6,
                marginBottom: "40px",
              }}
            >
              Stay ahead with accurate dates, eligibility criteria, and expert
              insights for all major National and State-level exams.
            </p>
          </div>
        </div>
      </section>

      {/* ── FILTER TABS ── */}
      <section
        className="section"
        ref={filterSectionRef}
        style={{ paddingTop: 20, paddingBottom: "40px" }}
      >
        <div className="container">
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "8px",
              flexWrap: "wrap",
              padding: "10px",
              background: "#ffffff",
              borderRadius: "20px",
              border: "1px solid var(--border)",
              boxShadow: "0 10px 30px rgba(0,0,0,0.04)",
              width: "100%",
              maxWidth: "1000px",
              margin: "0 auto",
            }}
          >
            {categories.map((cat) => (
              <button
                key={cat}
                className={`filter-tab${activeTab === cat ? " active" : ""}`}
                onClick={() => setActiveTab(cat)}
                style={{
                  padding: "10px 20px",
                  fontSize: "0.95rem",
                  fontWeight: 600,
                  borderRadius: "10px",
                  transition: "all 0.3s ease",
                  border: "none",
                  background:
                    activeTab === cat ? "var(--primary)" : "transparent",
                  color: activeTab === cat ? "#ffffff" : "var(--text-mid)",
                  cursor: "pointer",
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── EXAMS GRID ── */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div
            ref={mainGridRef}
            className="cards-grid"
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fill, minmax(min(100%, 340px), 1fr))",
              gap: "28px",
            }}
          >
            {filtered.map((exam) => (
              <ExamCard key={exam.id} exam={exam} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA SECTION ── */}
      <section
        className="section"
        style={{
          background: "rgba(79, 70, 229, 0.02)",
          borderTop: "1px solid var(--border)",
        }}
      >
        <div className="container">
          <div
            className="cta-banner"
            ref={ctaRef}
            style={{
              background: "#ffffff",
              borderRadius: "32px",
              padding: "60px 40px",
              textAlign: "center",
              border: "1px solid var(--border)",
              boxShadow: "0 20px 50px rgba(0,0,0,0.05)",
              maxWidth: "900px",
              margin: "0 auto",
            }}
          >
            <h2
              style={{
                fontSize: "2.5rem",
                fontWeight: 800,
                marginBottom: "16px",
                color: "var(--text-primary)",
              }}
            >
              Ready to{" "}
              <span style={{ color: "var(--primary)" }}>Crack the Exam?</span>
            </h2>
            <p
              style={{
                fontSize: "1.1rem",
                color: "var(--text-muted)",
                marginBottom: "32px",
                maxWidth: "600px",
                margin: "0 auto 32px",
              }}
            >
              Get detailed preparation guides, previous year papers, and mock
              tests for your target exams.
            </p>
            <div
              style={{
                display: "flex",
                gap: "16px",
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <AntiGravityButton
                variant="primary"
                onClick={() => router.push("/apply")}
              >
                Get Free Counseling <FiArrowRight />
              </AntiGravityButton>
              <AntiGravityButton
                variant="ghost"
                onClick={() => router.push("/colleges")}
              >
                Browse Colleges
              </AntiGravityButton>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
