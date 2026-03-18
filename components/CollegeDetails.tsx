"use client";
import React, { useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  FiMapPin,
  FiStar,
  FiArrowLeft,
  FiCheckCircle,
  FiBook,
  FiAward,
  FiBriefcase,
  FiShield,
  FiTrendingUp,
} from "react-icons/fi";
import colleges from "@/data/colleges";
import ApplyFormModal from "./ApplyFormModal";
import CollegeGallery from "./CollegeGallery";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function CollegeDetails() {
  const { id } = useParams();
  const college = colleges.find((c) => c.slug === id || c.id.toString() === id);

  const heroRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const barsRef = useRef<HTMLDivElement[]>([]);

  // Parallax & Entrance Animations
  useEffect(() => {
    if (!college) return;

    // 1. Initial Hero Entrance Animation
    gsap.fromTo(
      heroRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1, ease: "power2.out" },
    );

    gsap.fromTo(
      imageRef.current,
      { scale: 1.2, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1.5, ease: "power3.out" },
    );

    gsap.fromTo(
      contentRef.current?.children
        ? Array.from(contentRef.current.children)
        : [],
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        delay: 0.3,
      },
    );

    // 2. Parallax Hero Image on Scroll
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

    // 3. Stagger Content Cards Entrance
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
        },
      );
    });

    // 4. Animate Stat Bars (Mock Data)
    barsRef.current.forEach((bar, index) => {
      if (!bar) return;
      const targetWidth = bar.getAttribute("data-width") || "0%";
      gsap.fromTo(
        bar,
        { width: "0%" },
        {
          width: targetWidth,
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 80%",
          },
        },
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, [college]);

  const addToRefs = (
    el: HTMLDivElement | null,
    refArray: React.MutableRefObject<HTMLDivElement[]>,
  ) => {
    if (el && !refArray.current.includes(el)) {
      refArray.current.push(el);
    }
  };

  if (!college) {
    return (
      <div
        className="section"
        style={{ textAlign: "center", padding: "100px 20px" }}
      >
        <h2>College Not Found</h2>
        <Link
          href="/colleges"
          className="btn btn-primary"
          style={{ marginTop: "20px" }}
        >
          Back to Colleges
        </Link>
      </div>
    );
  }

  // Mock placement stats for the demo feature
  const placementStats = [
    { label: "Computer Science", value: 98, color: "var(--success)" },
    { label: "Electronics", value: 92, color: "var(--info)" },
    { label: "Mechanical", value: 85, color: "var(--warning)" },
    { label: "Overall Placement", value: 94, color: "var(--primary)" },
  ];

  return (
    <div className="page-wrapper" style={{ minHeight: "100vh" }}>
      {/* ── Immersive Parallax Hero ── */}
      <section
        className="college-hero"
        ref={heroRef}
        style={{
          position: "relative",
          padding: "100px 0 50px 0",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          overflow: "hidden",
          borderBottom: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        {/* Background Image with Overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: -1,
            background: "#080a1e",
          }}
        >
          <img
            ref={imageRef}
            src="/dark_blue_grid_banner.jpg"
            alt="Schematic Background"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center",
              opacity: 1,
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: `linear-gradient(to bottom, ${college.color}40, #080a1e)`,
            }}
          />
        </div>

        <div
          className="container"
          ref={contentRef}
          style={{
            position: "relative",
            zIndex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              marginBottom: "24px",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <Link
              href="/colleges"
              style={{
                fontSize: "0.95rem",
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                color: "#ffffff",
                textDecoration: "none",
                fontWeight: 600,
                background: "rgba(255,255,255,0.1)",
                backdropFilter: "blur(10px)",
                padding: "6px 14px",
                borderRadius: "10px",
                border: "1px solid rgba(255,255,255,0.2)",
              }}
            >
              <FiArrowLeft /> Back to List
            </Link>

            <div
              style={{
                padding: "6px 14px",
                background: "rgba(255,255,255,0.15)",
                border: "1px solid rgba(255,255,255,0.2)",
                backdropFilter: "blur(10px)",
                borderRadius: "10px",
                fontSize: "0.8rem",
                fontWeight: 800,
                color: "#ffffff",
                letterSpacing: "0.05em",
                textTransform: "uppercase",
              }}
            >
              {college.type} {college.nirfRank ? `• NIRF RANK #${college.nirfRank}` : ""}
            </div>
          </div>

          <h1
            style={{
              fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
              marginBottom: "20px",
              color: "#ffffff",
              lineHeight: 1.05,
              fontWeight: 900,
              letterSpacing: "-0.04em",
              maxWidth: "1000px",
            }}
          >
            {college.name}
          </h1>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "32px",
              flexWrap: "wrap",
              justifyContent: "center",
              color: "rgba(255,255,255,0.8)",
              fontWeight: 500,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                fontSize: "1.05rem",
              }}
            >
              <FiMapPin color="var(--accent-light)" size={18} /> {college.city},{" "}
              {college.state}
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                fontSize: "1.05rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                  background: "rgba(245, 158, 11, 0.2)",
                  padding: "4px 10px",
                  borderRadius: "8px",
                  color: "#fbbf24",
                  fontWeight: 700,
                  border: "1px solid rgba(245, 158, 11, 0.3)",
                }}
              >
                <FiStar fill="#fbbf24" size={16} /> {college.rating}
              </div>
              <span
                style={{ fontSize: "0.95rem", color: "rgba(255,255,255,0.6)" }}
              >
                / 5.0 (1.2k+ Reviews)
              </span>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                fontSize: "1.05rem",
              }}
            >
              <FiBriefcase color="var(--accent-light)" size={18} />{" "}
              <span
                style={{ color: "rgba(255,255,255,0.5)", marginRight: "4px" }}
              >
                Est.
              </span>{" "}
              {college.established}
            </div>
          </div>
        </div>
      </section>

      {/* Floating Application Action Bar (Matching Reference) */}
      <div
        style={{
          background: "white",
          borderBottom: "1px solid var(--glass-border)",
          borderTop: "1px solid var(--glass-border)",
          padding: "16px 0",
          position: "sticky",
          top: "70px",
          zIndex: 40,
          boxShadow: "0 4px 20px rgba(0,0,0,0.03)",
        }}
      >
        <div
          className="container"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "16px",
          }}
        >
          <div>
            <div
              style={{
                fontSize: "0.85rem",
                color: "var(--text-muted)",
                fontWeight: 500,
                marginBottom: "4px",
              }}
            >
              Average Annual Fees
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <span
                style={{
                  fontSize: "1.25rem",
                  fontWeight: 700,
                  color: "var(--text-primary)",
                }}
              >
                {college.fees}
              </span>
              <span
                style={{
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  color: "var(--success)",
                  background: "rgba(34, 197, 94, 0.1)",
                  padding: "4px 8px",
                  borderRadius: "4px",
                  border: "1px solid rgba(34, 197, 94, 0.2)",
                }}
              >
                EMI AVAILABLE
              </span>
            </div>
          </div>

          <ApplyFormModal
            buttonText="Apply for Admission 2026"
            collegeId={college.clgId}
          />
        </div>
      </div>

      {/* ── Content Grid ── */}
      <section className="section" style={{ paddingTop: "60px" }}>
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "32px",
              alignItems: "start",
            }}
          >
            {/* Left Column */}
            <div
              style={{ display: "flex", flexDirection: "column", gap: "32px" }}
            >
              {/* Highlights Card */}
              <div
                className="card"
                ref={(el) => addToRefs(el, cardsRef)}
                style={{
                  padding: "32px",
                  background: "var(--glass-strong)",
                  border: "1px solid var(--glass-border)",
                  backdropFilter: "blur(12px)",
                }}
              >
                <h3
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    marginBottom: "24px",
                    fontSize: "1.4rem",
                  }}
                >
                  <div
                    style={{
                      background: "var(--accent-pale)",
                      padding: "10px",
                      borderRadius: "10px",
                      color: "var(--accent-light)",
                      display: "flex",
                    }}
                  >
                    <FiAward size={22} />
                  </div>
                  Key Highlights
                </h3>
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {college.highlights.map((h, i) => (
                    <li
                      key={i}
                      style={{
                        display: "flex",
                        gap: "16px",
                        marginBottom: "16px",
                        color: "var(--text-mid)",
                        fontSize: "1.05rem",
                        alignItems: "flex-start",
                      }}
                    >
                      <FiCheckCircle
                        size={20}
                        color="var(--accent-light)"
                        style={{ marginTop: "2px", flexShrink: 0 }}
                      />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Photo Gallery (New) */}
              <div
                className="card"
                ref={(el) => addToRefs(el, cardsRef)}
                style={{
                  padding: "32px",
                  background: "var(--glass-strong)",
                  border: "1px solid var(--glass-border)",
                  backdropFilter: "blur(12px)",
                }}
              >
                <h3
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    marginBottom: "8px",
                    fontSize: "1.4rem",
                  }}
                >
                  <div
                    style={{
                      background: "rgba(139, 92, 246, 0.1)",
                      padding: "10px",
                      borderRadius: "10px",
                      color: "#8b5cf6",
                      display: "flex",
                    }}
                  >
                    <FiStar size={22} />
                  </div>
                  Campus Life & Facilities
                </h3>
                <p
                  style={{
                    color: "var(--text-muted)",
                    fontSize: "0.95rem",
                    marginBottom: "24px",
                  }}
                >
                  Explore our state-of-the-art infrastructure and vibrant
                  residential life.
                </p>
                <CollegeGallery images={college.galleryImages} />
              </div>

              {/* Placement Stats (Demo Complex Feature) */}
              <div
                className="card"
                ref={(el) => {
                  statsRef.current = el;
                  addToRefs(el, cardsRef);
                }}
                style={{
                  padding: "32px",
                  background: "var(--glass-strong)",
                  border: "1px solid var(--glass-border)",
                  backdropFilter: "blur(12px)",
                }}
              >
                <h3
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    marginBottom: "32px",
                    fontSize: "1.4rem",
                  }}
                >
                  <div
                    style={{
                      background: "rgba(34, 197, 94, 0.1)",
                      padding: "10px",
                      borderRadius: "10px",
                      color: "#22c55e",
                      display: "flex",
                    }}
                  >
                    <FiTrendingUp size={22} />
                  </div>
                  Placement Records (2025)
                </h3>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "24px",
                  }}
                >
                  {placementStats.map((stat, i) => (
                    <div key={i}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          marginBottom: "8px",
                          fontSize: "0.95rem",
                        }}
                      >
                        <span
                          style={{ color: "var(--text-mid)", fontWeight: 500 }}
                        >
                          {stat.label}
                        </span>
                        <span style={{ color: "var(--text)", fontWeight: 700 }}>
                          {stat.value}%
                        </span>
                      </div>
                      <div
                        style={{
                          height: "8px",
                          background: "var(--bg-2)",
                          borderRadius: "4px",
                          overflow: "hidden",
                        }}
                      >
                        <div
                          ref={(el) => addToRefs(el, barsRef)}
                          data-width={`${stat.value}%`}
                          style={{
                            height: "100%",
                            background: stat.color,
                            borderRadius: "4px",
                            width: "0%",
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div
                  style={{
                    marginTop: "32px",
                    padding: "16px",
                    background: "var(--glass-card)",
                    borderRadius: "12px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontSize: "0.85rem",
                        color: "var(--text-muted)",
                      }}
                    >
                      Highest Package
                    </div>
                    <div
                      style={{
                        fontSize: "1.3rem",
                        fontWeight: 700,
                        color: "var(--text)",
                      }}
                    >
                      ₹54.5 LPA
                    </div>
                  </div>
                  <div
                    style={{
                      width: "1px",
                      height: "40px",
                      background: "var(--glass-border)",
                    }}
                  />
                  <div>
                    <div
                      style={{
                        fontSize: "0.85rem",
                        color: "var(--text-muted)",
                      }}
                    >
                      Average Package
                    </div>
                    <div
                      style={{
                        fontSize: "1.3rem",
                        fontWeight: 700,
                        color: "var(--text)",
                      }}
                    >
                      ₹12.8 LPA
                    </div>
                  </div>
                </div>
              </div>

              {/* Student Testimonial (New) */}
              <div
                className="card"
                ref={(el) => addToRefs(el, cardsRef)}
                style={{
                  padding: "32px",
                  background:
                    "linear-gradient(135deg, var(--primary) 0%, var(--accent-dark) 100%)",
                  border: "none",
                  color: "white",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    right: "-20px",
                    bottom: "-20px",
                    fontSize: "10rem",
                    opacity: 0.1,
                    pointerEvents: "none",
                  }}
                >
                  ”
                </div>
                <div style={{ position: "relative", zIndex: 1 }}>
                  <div
                    style={{
                      display: "flex",
                      gap: "12px",
                      alignItems: "center",
                      marginBottom: "20px",
                    }}
                  >
                    <div
                      style={{
                        width: "48px",
                        height: "48px",
                        borderRadius: "50%",
                        background: "white",
                        color: "var(--primary)",
                        display: "flex",
                        alignItems: "center",
                        justifyItems: "center",
                        fontWeight: 800,
                        fontSize: "1.2rem",
                        justifyContent: "center",
                      }}
                    >
                      JS
                    </div>
                    <div>
                      <div style={{ fontWeight: 700 }}>Jason Smith</div>
                      <div style={{ fontSize: "0.8rem", opacity: 0.8 }}>
                        B.Tech CSE - Final Year
                      </div>
                    </div>
                  </div>
                  <p
                    style={{
                      fontStyle: "italic",
                      lineHeight: 1.6,
                      fontSize: "1.05rem",
                    }}
                  >
                    "Our college provides an incredible environment for growth.
                    The labs are cutting-edge, and the placement support is
                    phenomenal."
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div
              style={{ display: "flex", flexDirection: "column", gap: "32px" }}
            >
              {/* Courses Offered */}
              <div
                className="card"
                ref={(el) => addToRefs(el, cardsRef)}
                style={{
                  padding: "32px",
                  background: "var(--glass-strong)",
                  border: "1px solid var(--glass-border)",
                  backdropFilter: "blur(12px)",
                }}
              >
                <h3
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    marginBottom: "24px",
                    fontSize: "1.4rem",
                  }}
                >
                  <div
                    style={{
                      background: "rgba(59, 130, 246, 0.1)",
                      padding: "10px",
                      borderRadius: "10px",
                      color: "#3b82f6",
                      display: "flex",
                    }}
                  >
                    <FiBook size={22} />
                  </div>
                  Courses Offered
                </h3>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px",
                  }}
                >
                  {college.courses.map((course, i) => (
                    <div
                      key={i}
                      style={{
                        padding: "20px",
                        background: "var(--glass)",
                        borderRadius: "16px",
                        border: "1px solid var(--glass-border)",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        transition: "all 0.3s ease",
                        cursor: "pointer",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "translateX(8px)";
                        e.currentTarget.style.borderColor =
                          "var(--accent-pale)";
                        e.currentTarget.style.background = "var(--glass-card)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "translateX(0)";
                        e.currentTarget.style.borderColor =
                          "var(--glass-border)";
                        e.currentTarget.style.background = "var(--glass)";
                      }}
                    >
                      <div>
                        <div
                          style={{
                            fontWeight: 600,
                            color: "var(--text)",
                            fontSize: "1.1rem",
                            marginBottom: "4px",
                          }}
                        >
                          {course}
                        </div>
                        <div
                          style={{
                            fontSize: "0.85rem",
                            color: "var(--text-muted)",
                          }}
                        >
                          4 Years • On Campus
                        </div>
                      </div>
                      <div className="badge badge-blue">Full Time</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quotas */}
              {college.quotas && (
                <div
                  className="card"
                  ref={(el) => addToRefs(el, cardsRef)}
                  style={{
                    padding: "32px",
                    background: "var(--glass-strong)",
                    border: "1px solid var(--glass-border)",
                    backdropFilter: "blur(12px)",
                  }}
                >
                  <h3
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      marginBottom: "24px",
                      fontSize: "1.4rem",
                    }}
                  >
                    <div
                      style={{
                        background: "rgba(245, 158, 11, 0.1)",
                        padding: "10px",
                        borderRadius: "10px",
                        color: "#f59e0b",
                        display: "flex",
                      }}
                    >
                      <FiShield size={22} />
                    </div>
                    Available Quotas
                  </h3>
                  <div
                    style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}
                  >
                    {college.quotas.map((q, i) => (
                      <span
                        key={i}
                        className="badge badge-amber"
                        style={{
                          padding: "10px 20px",
                          fontSize: "0.95rem",
                          background: "var(--glass)",
                        }}
                      >
                        {q}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Admission Process (New to fill gap) */}
              <div
                className="card"
                ref={(el) => addToRefs(el, cardsRef)}
                style={{
                  padding: "32px",
                  background: "var(--glass-strong)",
                  border: "1px solid var(--glass-border)",
                  backdropFilter: "blur(12px)",
                }}
              >
                <h3
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    marginBottom: "24px",
                    fontSize: "1.4rem",
                  }}
                >
                  <div
                    style={{
                      background: "rgba(79, 70, 229, 0.1)",
                      padding: "10px",
                      borderRadius: "10px",
                      color: "var(--primary)",
                      display: "flex",
                    }}
                  >
                    <FiArrowLeft
                      style={{ transform: "rotate(180deg)" }}
                      size={22}
                    />
                  </div>
                  Admission Process
                </h3>
                <div style={{ position: "relative", paddingLeft: "32px" }}>
                  <div
                    style={{
                      position: "absolute",
                      left: "7px",
                      top: "0",
                      bottom: "0",
                      width: "2px",
                      background: "var(--border)",
                    }}
                  />
                  {[
                    {
                      step: "Application",
                      desc: "Submit the online application form with documents.",
                    },
                    {
                      step: "Entrance Exam",
                      desc: "Qualify for the required entrance examination.",
                    },
                    {
                      step: "Counseling",
                      desc: "Participate in the seat allotment process.",
                    },
                    {
                      step: "Verification",
                      desc: "Document verification and fee payment.",
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      style={{ position: "relative", marginBottom: "24px" }}
                    >
                      <div
                        style={{
                          position: "absolute",
                          left: "-31.5px",
                          top: "4px",
                          width: "14px",
                          height: "14px",
                          borderRadius: "50%",
                          background: "var(--primary)",
                          border: "3px solid white",
                          boxShadow: "0 0 0 2px var(--accent-pale)",
                        }}
                      />
                      <div
                        style={{
                          fontWeight: 700,
                          color: "var(--text-primary)",
                          marginBottom: "4px",
                        }}
                      >
                        {item.step}
                      </div>
                      <div
                        style={{
                          fontSize: "0.9rem",
                          color: "var(--text-muted)",
                        }}
                      >
                        {item.desc}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* FAQ Section (New to fill gap) */}
              <div
                className="card"
                ref={(el) => addToRefs(el, cardsRef)}
                style={{
                  padding: "32px",
                  background: "var(--glass-strong)",
                  border: "1px solid var(--glass-border)",
                  backdropFilter: "blur(12px)",
                }}
              >
                <h3
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    marginBottom: "24px",
                    fontSize: "1.4rem",
                  }}
                >
                  Common Questions
                </h3>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px",
                  }}
                >
                  {[
                    {
                      q: "What is the average placement?",
                      a: "The average package is ₹12.8 LPA for international students.",
                    },
                    {
                      q: "Is hostel mandatory?",
                      a: "Hostel is optional but recommended for first-year students.",
                    },
                    {
                      q: "What about scholarships?",
                      a: "Merit-based scholarships cover up to 50% of tuition fees.",
                    },
                  ].map((item, i) => (
                    <details
                      key={i}
                      style={{
                        border: "1px solid var(--border)",
                        borderRadius: "12px",
                        padding: "12px 16px",
                        cursor: "pointer",
                      }}
                    >
                      <summary
                        style={{
                          fontWeight: 600,
                          color: "var(--text-primary)",
                          fontSize: "0.95rem",
                        }}
                      >
                        {item.q}
                      </summary>
                      <p
                        style={{
                          marginTop: "8px",
                          fontSize: "0.9rem",
                          color: "var(--text-muted)",
                          lineHeight: 1.5,
                        }}
                      >
                        {item.a}
                      </p>
                    </details>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
