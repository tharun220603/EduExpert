"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import courses, { Course } from "@/data/courses";
import ScrollFloatSection from "@/components/ScrollFloatSection";
import AntiGravityButton from "@/components/AntiGravityButton";
import {
  usePageHeroEntrance,
  useSectionHeaderReveal,
  useScrollReveal,
} from "@/hooks/useGsapAnimations";
import { FiClock, FiArrowRight, FiCheckCircle } from "react-icons/fi";

import { motion, AnimatePresence } from "framer-motion";

function CourseCard({ course }: { course: Course }) {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/courses/${course.slug || course.id}`)}
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
      <div
        style={{
          padding: "32px 24px",
          background: `linear-gradient(135deg, ${course.color}08, ${course.color}15)`,
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
            boxShadow: `0 8px 20px ${course.color}10`,
            flexShrink: 0,
            border: `1px solid ${course.color}15`,
          }}
        >
          {course.emoji}
        </div>
        <div>
          <h3
            style={{
              fontSize: "1.3rem",
              fontWeight: 800,
              color: "var(--text-primary)",
              marginBottom: "6px",
              letterSpacing: "-0.01em",
            }}
          >
            {course.name}
          </h3>
          <div
            style={{
              fontSize: "0.75rem",
              color: "var(--text-muted)",
              fontWeight: 700,
              letterSpacing: "0.05em",
              textTransform: "uppercase",
            }}
          >
            {course.category}
          </div>
        </div>
        <div style={{ position: "absolute", top: "20px", right: "20px" }}>
          <span
            className="badge badge-amber"
            style={{ fontSize: "0.7rem", padding: "4px 10px", fontWeight: 700 }}
          >
            {course.duration}
          </span>
        </div>
      </div>

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
          {course.description}
        </p>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "8px",
            marginBottom: "24px",
          }}
        >
          {course.careerOptions.slice(0, 3).map((opt) => (
            <span
              key={opt}
              style={{
                fontSize: "0.7rem",
                background: "#f8fafc",
                padding: "6px 14px",
                borderRadius: "10px",
                color: "var(--text-mid)",
                border: "1px solid var(--border)",
                fontWeight: 600,
              }}
            >
              {opt}
            </span>
          ))}
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
          <div>
            <div
              style={{
                fontSize: "0.65rem",
                color: "var(--text-muted)",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.03em",
                marginBottom: "4px",
              }}
            >
              Avg Fees
            </div>
            <div
              style={{
                fontWeight: 800,
                color: "var(--text-primary)",
                fontSize: "1.1rem",
              }}
            >
              {course.avgFees}
            </div>
          </div>
          <div
            style={{
              color: "var(--primary)",
              fontSize: "0.95rem",
              fontWeight: 700,
              display: "flex",
              alignItems: "center",
              gap: "4px",
            }}
          >
            View Details <FiArrowRight size={16} />
          </div>
        </div>
      </div>
    </div>
  );
}

const categories = [
  "All",
  "Engineering",
  "Medical",
  "Arts & Science",
  "Law",
  "Management",
  "Design",
] as const;
type Category = (typeof categories)[number];

export default function CoursesPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Category>("All");

  // Refs
  const heroRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  // Animations
  usePageHeroEntrance(heroRef);
  useScrollReveal(containerRef, { y: 30 });
  useScrollReveal(ctaRef, { y: 40 });

  const filtered =
    activeTab === "All"
      ? courses
      : courses.filter((c) => c.category === activeTab);

  const techCourses = courses.filter((c) => c.category === "Engineering");
  const scienceCourses = courses.filter((c) =>
    ["Medical", "Arts & Science"].includes(c.category),
  );
  const mgmtCourses = courses.filter((c) =>
    ["Management", "Law", "Design"].includes(c.category),
  );

  return (
    <>
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
              url('/courses_banner.png')
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
            <span className="badge badge-blue">🎯 COURSE FINDER 2026</span>

            <h1
              style={{
                fontSize: "clamp(2.5rem, 6vw, 4rem)",
                fontWeight: 800,
                color: "white",
                marginBottom: "24px",
              }}
            >
              Explore Career Courses
            </h1>
            <p
              style={{
                fontSize: "1.2rem",
                color: "white",
                lineHeight: 1.6,
              }}
            >
              Discover the right programme — from B.Tech CS to MBBS to MBA,
              across South India&apos;s best colleges.
            </p>
          </div>
        </div>
      </section>

      <ScrollFloatSection className="section" speed={0.8}>
        <div className="container" ref={containerRef}>
          {/* Filters */}
          <div
            className="filter-tabs"
            style={{ marginBottom: "40px", justifyContent: "flex-start" }}
          >
            {categories.map((cat) => (
              <button
                key={cat}
                className={`filter-tab${activeTab === cat ? " active" : ""}`}
                onClick={() => setActiveTab(cat)}
              >
                {cat}
                <span
                  style={{
                    marginLeft: "6px",
                    fontSize: "0.75rem",
                    opacity: 0.7,
                  }}
                >
                  (
                  {cat === "All"
                    ? courses.length
                    : courses.filter((c) => c.category === cat).length}
                  )
                </span>
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="cards-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
                gap: "32px",
              }}
            >
              {filtered.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </ScrollFloatSection>

      {/* CTA */}
      <section className="section-sm">
        <div className="container">
          <div className="cta-banner cta-shimmer" ref={ctaRef}>
            <h3
              style={{
                color: "var(--text)",
                fontSize: "1.5rem",
                marginBottom: "8px",
              }}
            >
              Know which course you want?{" "}
              <span style={{ color: "var(--accent)" }}>Find the college!</span>
            </h3>
            <p style={{ color: "var(--text-muted)", marginBottom: "24px" }}>
              Explore colleges offering your dream course across Tamil Nadu,
              Karnataka, and Kerala.
            </p>
            <div
              style={{
                display: "flex",
                gap: "12px",
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <AntiGravityButton
                onClick={() => router.push("/colleges")}
                variant="primary"
              >
                Browse Colleges <FiArrowRight />
              </AntiGravityButton>
              <AntiGravityButton
                onClick={() => router.push("/exams")}
                variant="ghost"
              >
                Check Exam Dates
              </AntiGravityButton>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
