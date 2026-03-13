"use client";
import React, { useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { FiMapPin, FiStar, FiArrowLeft, FiCheckCircle, FiBook, FiAward, FiBriefcase, FiShield, FiTrendingUp, FiCalendar, FiClock, FiActivity, FiInfo } from "react-icons/fi";
import exams from "@/data/exams";
import examDetails from "@/data/examDetails";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AntiGravityButton from "@/components/AntiGravityButton";

gsap.registerPlugin(ScrollTrigger);

export default function ExamLandingPage() {
  const { id } = useParams();
  const exam = exams.find((e) => e.slug === id || e.id.toString() === id);
  const details = exam ? examDetails[exam.id] : null;

  const heroRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  // Parallax & Entrance Animations (same as CollegeDetails)
  useEffect(() => {
    if (!exam) return;

    gsap.fromTo(
      heroRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1, ease: "power2.out" }
    );

    gsap.fromTo(
      imageRef.current,
      { scale: 1.2, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1.5, ease: "power3.out" }
    );

    gsap.fromTo(
      contentRef.current?.children ? Array.from(contentRef.current.children) : [],
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power2.out", delay: 0.3 }
    );

    // Parallax
    gsap.to(imageRef.current, {
      yPercent: 30,
      ease: "none",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    // Stagger Cards
    cardsRef.current.forEach((card, index) => {
      if (!card) return;
      gsap.fromTo(
        card,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, [exam]);

  const addToRefs = (el: HTMLDivElement | null, refArray: React.MutableRefObject<HTMLDivElement[]>) => {
    if (el && !refArray.current.includes(el)) {
      refArray.current.push(el);
    }
  };

  if (!exam) {
    return (
      <div className="section" style={{ textAlign: "center", padding: "100px 20px" }}>
        <h2>Exam Not Found</h2>
        <Link href="/exams" className="btn btn-primary" style={{ marginTop: "20px" }}>
          Back to Exams
        </Link>
      </div>
    );
  }

  const nextUpcomingDate = details?.importantDates?.find(d => d.status === "upcoming")?.date || exam.examMonth;

  const nextYear = new Date().getFullYear() + 1;

  return (
    <div className="page-wrapper" style={{ minHeight: "100vh" }}>
      
      {/* ── Immersive Parallax Hero ── */}
      <section 
        className="college-hero" 
        ref={heroRef}
        style={{ 
          position: "relative", 
          padding: "100px 0 60px 0",
          display: "flex", 
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          overflow: "hidden",
          background: "#080a1e"
        }}
      >
        <div style={{ position: "absolute", inset: 0, zIndex: -1 }}>
          <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to bottom, ${exam.color}40, #080a1e)`, zIndex: 1 }} />
          <img 
            ref={imageRef}
            src="/dark_blue_grid_banner.jpg" 
            alt="Schematic Background" 
            style={{ 
              width: "100%", 
              height: "100%", 
              objectFit: "cover", 
              opacity: 1
            }} 
          />
        </div>

        <div className="container" ref={contentRef} style={{ position: "relative", zIndex: 2, display: "flex", flexDirection: "column", alignItems: "center" }}>
          
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "32px", flexWrap: "wrap", justifyContent: "center" }}>
            <Link
              href="/exams"
              style={{ fontSize: "0.85rem", display: "inline-flex", alignItems: "center", gap: "6px", color: "#ffffff", textDecoration: "none", fontWeight: 700, background: "rgba(255,255,255,0.1)", backdropFilter: "blur(10px)", padding: "8px 16px", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.15)" }}
            >
              <FiArrowLeft /> Back to Exams
            </Link>
            
            <div style={{ padding: "8px 16px", background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.15)", backdropFilter: "blur(10px)", borderRadius: "12px", fontSize: "0.75rem", fontWeight: 800, color: "#ffffff", letterSpacing: "0.05em", textTransform: "uppercase" }}>
              {exam.category} • {exam.level} LEVEL
            </div>
          </div>
          
          <div style={{ fontSize: "4.5rem", marginBottom: "16px", filter: "drop-shadow(0 10px 20px rgba(0,0,0,0.4))" }}>
            {exam.emoji}
          </div>

          <h1 style={{ fontSize: "clamp(2.5rem, 7vw, 4.5rem)", marginBottom: "20px", color: "#ffffff", lineHeight: 1.1, fontWeight: 900, letterSpacing: "-0.04em", maxWidth: "900px" }}>
            {exam.name} <span style={{ opacity: 0.4, fontWeight: 500 }}>{nextYear}</span>
          </h1>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "1.25rem", maxWidth: "700px", lineHeight: 1.6, fontWeight: 500 }}>
            {exam.fullName}
          </p>
        </div>
      </section>

      {/* Floating Application Action Bar */}
      <div 
        style={{ 
          background: "white", 
          borderBottom: "1px solid var(--border)", 
          padding: "20px 0",
          position: "sticky",
          top: "68px",
          zIndex: 40,
          boxShadow: "0 4px 20px rgba(0,0,0,0.06)"
        }}
      >
        <div className="container exam-action-bar">
          <div style={{ minWidth: "200px" }}>
            <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "4px" }}>Next Event </div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span style={{ fontSize: "1.35rem", fontWeight: 800, color: "var(--text-primary)" }}>{nextUpcomingDate}</span>
              <span style={{ fontSize: "0.7rem", fontWeight: 800, color: "var(--success)", background: "rgba(34, 197, 94, 0.1)", padding: "4px 8px", borderRadius: "6px", border: "1px solid rgba(34, 197, 94, 0.1)" }}>
                STATUS: ACTIVE
              </span>
            </div>
          </div>
          
          <button style={{ 
            background: exam.color, 
            color: "#ffffff", 
            border: "none", 
            padding: "16px 32px", 
            borderRadius: "14px", 
            fontSize: "1.05rem", 
            fontWeight: 700, 
            cursor: "pointer",
            boxShadow: `0 10px 25px ${exam.color}35`,
            transition: "all 0.3s ease",
            flex: "1 1 auto",
            maxWidth: "300px",
            textAlign: "center"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow = `0 15px 30px ${exam.color}45`;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = `0 10px 25px ${exam.color}35`;
          }}
          >
            Apply for {exam.name} {nextYear}
          </button>
        </div>
      </div>

      {/* ── Content Grid ── */}
      <section className="section" style={{ paddingTop: "40px", background: "var(--bg-main)" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))", gap: "32px", alignItems: "start" }}>
            
            {/* Left Column */}
            <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
              
              {/* About Exam */}
              <div 
                className="card" 
                ref={(el) => addToRefs(el, cardsRef)}
                style={{ padding: "32px", background: "#ffffff", border: "1px solid var(--border)", borderRadius: "24px", boxShadow: "0 10px 30px rgba(0,0,0,0.02)" }}
              >
                <h3 style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px", fontSize: "1.4rem", color: "var(--text-primary)" }}>
                  <div style={{ background: `${exam.color}15`, padding: "10px", borderRadius: "10px", color: exam.color, display: "flex" }}>
                    <FiInfo size={22} />
                  </div>
                  About the Exam
                </h3>
                <p style={{ color: "var(--text-mid)", fontSize: "1.05rem", lineHeight: 1.8 }}>
                  {details ? details.overview : exam.description}
                </p>
              </div>

              {/* Exam Pattern */}
              {details && (
                <div 
                  className="card" 
                  ref={(el) => addToRefs(el, cardsRef)}
                  style={{ padding: "32px", background: "#ffffff", border: "1px solid var(--border)", borderRadius: "24px", boxShadow: "0 10px 30px rgba(0,0,0,0.02)" }}
                >
                  <h3 style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "32px", fontSize: "1.4rem", color: "var(--text-primary)" }}>
                    <div style={{ background: "rgba(236, 72, 153, 0.1)", padding: "10px", borderRadius: "10px", color: "#ec4899", display: "flex" }}>
                      <FiActivity size={22} />
                    </div>
                    Exam Pattern
                  </h3>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "32px" }}>
                    <div style={{ background: "rgba(0,0,0,0.02)", padding: "16px", borderRadius: "12px", border: "1px solid var(--border)" }}>
                        <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", fontWeight: 600, textTransform: "uppercase", marginBottom: "4px" }}>Duration</div>
                        <div style={{ fontSize: "1.2rem", fontWeight: 700, color: "var(--text-primary)" }}>{details.pattern.duration}</div>
                    </div>
                    <div style={{ background: "rgba(0,0,0,0.02)", padding: "16px", borderRadius: "12px", border: "1px solid var(--border)" }}>
                        <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", fontWeight: 600, textTransform: "uppercase", marginBottom: "4px" }}>Total Marks</div>
                        <div style={{ fontSize: "1.2rem", fontWeight: 700, color: "var(--text-primary)" }}>{details.pattern.totalMarks}</div>
                    </div>
                  </div>
                  
                  <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                    {details.pattern.sections.map((sec, i) => (
                      <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: "16px", borderBottom: i !== details.pattern.sections.length - 1 ? "1px solid var(--border)" : "none" }}>
                        <div>
                          <div style={{ fontWeight: 600, color: "var(--text-primary)", fontSize: "1.05rem", marginBottom: "4px" }}>{sec.name}</div>
                          <div style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>{sec.questions}</div>
                        </div>
                        <div className="badge badge-amber" style={{ fontWeight: 700, fontSize: "0.9rem" }}>{sec.marks}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Top Colleges */}
              {details && (
                  <div 
                    className="card" 
                    ref={(el) => addToRefs(el, cardsRef)}
                    style={{ padding: "32px", background: "#ffffff", border: "1px solid var(--border)", borderRadius: "24px", boxShadow: "0 10px 30px rgba(0,0,0,0.02)" }}
                  >
                    <h3 style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px", fontSize: "1.4rem", color: "var(--text-primary)" }}>
                      <div style={{ background: "rgba(16, 185, 129, 0.1)", padding: "10px", borderRadius: "10px", color: "#10b981", display: "flex" }}>
                        <FiMapPin size={22} />
                      </div>
                      Top Accepting Institutes
                    </h3>
                    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                        {details.topColleges.map((college, idx) => (
                            <div key={idx} style={{ padding: "16px", background: "rgba(0,0,0,0.02)", borderRadius: "12px", border: "1px solid var(--border)", display: "flex", alignItems: "center", gap: "12px" }}>
                                <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: exam.color }} />
                                <span style={{ color: "var(--text-primary)", fontWeight: 500 }}>{college}</span>
                            </div>
                        ))}
                    </div>
                  </div>
              )}

            </div>

            {/* Right Column */}
            <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
              
              {/* Highlights */}
              <div 
                className="card" 
                ref={(el) => addToRefs(el, cardsRef)}
                style={{ padding: "32px", background: "#ffffff", border: "1px solid var(--border)", borderRadius: "24px", boxShadow: "0 10px 30px rgba(0,0,0,0.02)" }}
              >
                <h3 style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px", fontSize: "1.4rem", color: "var(--text-primary)" }}>
                  <div style={{ background: "rgba(139, 92, 246, 0.1)", padding: "10px", borderRadius: "10px", color: "#8b5cf6", display: "flex" }}>
                    <FiAward size={22} />
                  </div>
                  At a Glance
                </h3>
                
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "20px" }}>
                  {(details?.highlights || [
                      { label: "Conducting Body", value: exam.conductingBody },
                      { label: "Eligibility", value: exam.eligibility }
                  ]).map((h, i) => (
                    <li key={i} style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                      <span style={{ fontSize: "0.85rem", color: "var(--text-muted)", fontWeight: 500 }}>{h.label}</span>
                      <span style={{ fontSize: "1.05rem", color: "var(--text-primary)", fontWeight: 600 }}>{h.value}</span>
                    </li>
                  ))}
                </ul>
              </div>

               {/* Important Dates */}
               {details && (
                <div 
                  className="card" 
                  ref={(el) => addToRefs(el, cardsRef)}
                  style={{ padding: "32px", background: "#ffffff", border: "1px solid var(--border)", borderRadius: "24px", boxShadow: "0 10px 30px rgba(0,0,0,0.02)" }}
                >
                  <h3 style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px", fontSize: "1.4rem", color: "var(--text-primary)" }}>
                    <div style={{ background: "rgba(245, 158, 11, 0.1)", padding: "10px", borderRadius: "10px", color: "#f59e0b", display: "flex" }}>
                      <FiCalendar size={22} />
                    </div>
                    Important Dates {new Date().getFullYear() + 1}
                  </h3>
                  
                  <div style={{ position: "relative", paddingLeft: "24px" }}>
                    <div style={{ position: "absolute", left: "0", top: "10px", bottom: "10px", width: "2px", background: "var(--border)" }} />
                    {details.importantDates.map((d, i) => (
                        <div key={i} style={{ position: "relative", marginBottom: i === details.importantDates.length - 1 ? 0 : "24px" }}>
                            <div style={{ 
                                position: "absolute", left: "-29px", top: "4px", width: "12px", height: "12px", borderRadius: "50%", 
                                background: d.status === "past" ? "var(--border)" : (d.status === "ongoing" ? "var(--success)" : exam.color), 
                                border: "2px solid #ffffff",
                                boxShadow: d.status === "ongoing" ? "0 0 0 4px rgba(34, 197, 94, 0.2)" : "none"
                            }} />
                            <div style={{ fontSize: "0.85rem", color: "var(--text-muted)", fontWeight: 600, marginBottom: "4px", display: "flex", alignItems: "center", gap: "8px" }}>
                                {d.date}
                                {d.status === "ongoing" && <span style={{ color: "var(--success)", fontSize: "0.7rem", padding: "2px 6px", background: "rgba(34, 197, 94, 0.1)", borderRadius: "4px" }}>ONGOING</span>}
                            </div>
                            <div style={{ fontSize: "1.05rem", color: "var(--text-primary)", fontWeight: 600 }}>
                                {d.event}
                            </div>
                        </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Syllabus Overview */}
              {details && (
                <div 
                  className="card" 
                  ref={(el) => addToRefs(el, cardsRef)}
                  style={{ padding: "32px", background: "#ffffff", border: "1px solid var(--border)", borderRadius: "24px", boxShadow: "0 10px 30px rgba(0,0,0,0.02)" }}
                >
                  <h3 style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px", fontSize: "1.4rem", color: "var(--text-primary)" }}>
                    <div style={{ background: "rgba(59, 130, 246, 0.1)", padding: "10px", borderRadius: "10px", color: "#3b82f6", display: "flex" }}>
                      <FiBook size={22} />
                    </div>
                    Syllabus Overview
                  </h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                    {details.syllabus.map((s, i) => (
                        <div key={i}>
                            <h4 style={{ color: "var(--text-primary)", marginBottom: "12px", fontSize: "1.1rem" }}>{s.subject}</h4>
                            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                                {s.topics.map((t, j) => (
                                    <div key={j} style={{ padding: "6px 12px", background: "rgba(0,0,0,0.03)", border: "1px solid var(--border)", borderRadius: "100px", fontSize: "0.85rem", color: "var(--text-mid)" }}>
                                        {t}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
