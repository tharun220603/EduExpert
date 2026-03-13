"use client";
import React, { useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  FiArrowLeft,
  FiCheckCircle,
  FiBook,
  FiBriefcase,
  FiAperture,
  FiClock,
  FiDollarSign,
  FiInfo,
  FiStar,
} from "react-icons/fi";
import courses from "@/data/courses";
import courseDetails from "@/data/courseDetails";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AntiGravityButton from "@/components/AntiGravityButton";

gsap.registerPlugin(ScrollTrigger);

export default function CourseLandingPage() {
  const { id } = useParams();
  const course = courses.find((c) => c.slug === id || c.id.toString() === id);
  const details = course ? courseDetails[course.id] : null;

  const heroRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  // Parallax & Entrance Animations
  useEffect(() => {
    if (!course) return;

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
        },
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, [course]);

  const addToRefs = (
    el: HTMLDivElement | null,
    refArray: React.MutableRefObject<HTMLDivElement[]>,
  ) => {
    if (el && !refArray.current.includes(el)) {
      refArray.current.push(el);
    }
  };

  if (!course) {
    return (
      <div
        className="section"
        style={{ textAlign: "center", padding: "100px 20px" }}
      >
        <h2>Course Not Found</h2>
        <Link
          href="/courses"
          className="btn btn-primary"
          style={{ marginTop: "20px" }}
        >
          Back to Courses
        </Link>
      </div>
    );
  }

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
              background: `linear-gradient(to bottom, ${course.color}40, #080a1e)`,
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
              href="/courses"
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
              {course.category}
            </div>
          </div>

          <div
            style={{
              fontSize: "4rem",
              marginBottom: "16px",
              filter: "drop-shadow(0 10px 20px rgba(0,0,0,0.5))",
            }}
          >
            {course.emoji}
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
            {course.name}
          </h1>
          <p
            style={{
              color: "rgba(255,255,255,0.8)",
              fontSize: "1.2rem",
              maxWidth: "800px",
              lineHeight: 1.6,
            }}
          >
            Comprehensive program covering foundational concepts and advanced
            specialized skills.
          </p>
        </div>
      </section>

      {/* Floating Application Action Bar */}
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
          <div style={{ display: "flex", gap: "40px" }}>
            <div>
              <div
                style={{
                  fontSize: "0.85rem",
                  color: "var(--text-muted)",
                  fontWeight: 500,
                  marginBottom: "4px",
                }}
              >
                Course Duration{" "}
              </div>
              <div
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <FiClock color="var(--primary)" />
                <span
                  style={{
                    fontSize: "1.25rem",
                    fontWeight: 700,
                    color: "var(--text-primary)",
                  }}
                >
                  {course.duration}
                </span>
              </div>
            </div>
            <div
              style={{
                width: "1px",
                height: "40px",
                background: "var(--border)",
              }}
            />
            <div>
              <div
                style={{
                  fontSize: "0.85rem",
                  color: "var(--text-muted)",
                  fontWeight: 500,
                  marginBottom: "4px",
                }}
              >
                Average Fees
              </div>
              <div
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <FiDollarSign color="var(--primary)" />
                <span
                  style={{
                    fontSize: "1.25rem",
                    fontWeight: 700,
                    color: "var(--text-primary)",
                  }}
                >
                  {course.avgFees}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Content Grid ── */}
      <section
        className="section"
        style={{ paddingTop: "40px", background: "#f8fafc" }}
      >
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
              {/* About Course */}
              <div
                className="card"
                ref={(el) => addToRefs(el, cardsRef)}
                style={{
                  padding: "32px",
                  background: "#ffffff",
                  border: "1px solid var(--border)",
                  borderRadius: "24px",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.02)",
                }}
              >
                <h3
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    marginBottom: "24px",
                    fontSize: "1.4rem",
                    color: "var(--text-primary)",
                  }}
                >
                  <div
                    style={{
                      background: `${course.color}15`,
                      padding: "10px",
                      borderRadius: "10px",
                      color: course.color,
                      display: "flex",
                    }}
                  >
                    <FiInfo size={22} />
                  </div>
                  About the Course
                </h3>
                <p
                  style={{
                    color: "var(--text-mid)",
                    fontSize: "1.05rem",
                    lineHeight: 1.8,
                  }}
                >
                  {details ? details.overview : course.description}
                </p>
              </div>

              {/* Curriculum Details */}
              {details && (
                <div
                  className="card"
                  ref={(el) => addToRefs(el, cardsRef)}
                  style={{
                    padding: "32px",
                    background: "#ffffff",
                    border: "1px solid var(--border)",
                    borderRadius: "24px",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.02)",
                  }}
                >
                  <h3
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      marginBottom: "32px",
                      fontSize: "1.4rem",
                      color: "var(--text-primary)",
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
                    Curriculum Map
                  </h3>

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "24px",
                    }}
                  >
                    {details.curriculum.map((sem, i) => (
                      <div
                        key={i}
                        style={{
                          borderLeft: `2px solid ${course.color}`,
                          paddingLeft: "20px",
                          position: "relative",
                        }}
                      >
                        <div
                          style={{
                            position: "absolute",
                            left: "-6px",
                            top: "0",
                            width: "10px",
                            height: "10px",
                            borderRadius: "50%",
                            background: course.color,
                            border: "2px solid #ffffff",
                          }}
                        />
                        <h4
                          style={{
                            color: "var(--text-primary)",
                            fontSize: "1.1rem",
                            marginBottom: "12px",
                          }}
                        >
                          {sem.semester}
                        </h4>
                        <ul
                          style={{
                            listStyle: "none",
                            padding: 0,
                            margin: 0,
                            display: "flex",
                            flexDirection: "column",
                            gap: "8px",
                          }}
                        >
                          {sem.subjects.map((sub, j) => (
                            <li
                              key={j}
                              style={{
                                color: "var(--text-mid)",
                                fontSize: "0.95rem",
                                display: "flex",
                                alignItems: "center",
                                gap: "8px",
                              }}
                            >
                              <FiCheckCircle size={14} color="var(--success)" />{" "}
                              {sub}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column */}
            <div
              style={{ display: "flex", flexDirection: "column", gap: "32px" }}
            >
              {/* Career Paths */}
              {details && (
                <div
                  className="card"
                  ref={(el) => addToRefs(el, cardsRef)}
                  style={{
                    padding: "32px",
                    background: "#ffffff",
                    border: "1px solid var(--border)",
                    borderRadius: "24px",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.02)",
                  }}
                >
                  <h3
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      marginBottom: "24px",
                      fontSize: "1.4rem",
                      color: "var(--text-primary)",
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
                      <FiBriefcase size={22} />
                    </div>
                    Career Opportunities
                  </h3>

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "20px",
                    }}
                  >
                    {details.careerPath.map((path, i) => (
                      <div
                        key={i}
                        style={{
                          padding: "20px",
                          background: "rgba(0,0,0,0.02)",
                          borderRadius: "16px",
                          border: "1px solid var(--border)",
                        }}
                      >
                        <h4
                          style={{
                            color: "var(--text-primary)",
                            fontSize: "1.1rem",
                            marginBottom: "8px",
                          }}
                        >
                          {path.role}
                        </h4>
                        <div
                          style={{
                            color: "var(--success)",
                            fontWeight: 700,
                            marginBottom: "8px",
                            fontSize: "0.95rem",
                          }}
                        >
                          {path.salary}
                        </div>
                        <p
                          style={{
                            color: "var(--text-muted)",
                            fontSize: "0.9rem",
                            lineHeight: 1.6,
                            margin: 0,
                          }}
                        >
                          {path.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Top Recruiters */}
              {details && (
                <div
                  className="card"
                  ref={(el) => addToRefs(el, cardsRef)}
                  style={{
                    padding: "32px",
                    background: "#ffffff",
                    border: "1px solid var(--border)",
                    borderRadius: "24px",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.02)",
                  }}
                >
                  <h3
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      marginBottom: "24px",
                      fontSize: "1.4rem",
                      color: "var(--text-primary)",
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
                      <FiStar size={22} />
                    </div>
                    Top Recruiters
                  </h3>
                  <div
                    style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}
                  >
                    {details.topRecruiters.map((recruiter, i) => (
                      <span
                        key={i}
                        style={{
                          padding: "8px 16px",
                          background: "rgba(0,0,0,0.03)",
                          border: "1px solid var(--border)",
                          borderRadius: "100px",
                          fontSize: "0.9rem",
                          color: "var(--text-mid)",
                          fontWeight: 500,
                        }}
                      >
                        {recruiter}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Admission Process */}
              {details && (
                <div
                  className="card"
                  ref={(el) => addToRefs(el, cardsRef)}
                  style={{
                    padding: "32px",
                    background: "#ffffff",
                    border: "1px solid var(--border)",
                    borderRadius: "24px",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.02)",
                  }}
                >
                  <h3
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      marginBottom: "24px",
                      fontSize: "1.4rem",
                      color: "var(--text-primary)",
                    }}
                  >
                    <div
                      style={{
                        background: "rgba(16, 185, 129, 0.1)",
                        padding: "10px",
                        borderRadius: "10px",
                        color: "#10b981",
                        display: "flex",
                      }}
                    >
                      <FiAperture size={22} />
                    </div>
                    How to Apply
                  </h3>

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "16px",
                    }}
                  >
                    {details.admissionProcess.map((step, i) => (
                      <div
                        key={i}
                        style={{
                          display: "flex",
                          gap: "12px",
                          alignItems: "flex-start",
                        }}
                      >
                        <div
                          style={{
                            width: "24px",
                            height: "24px",
                            borderRadius: "50%",
                            background: `${course.color}15`,
                            color: course.color,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "0.8rem",
                            fontWeight: 700,
                            flexShrink: 0,
                            marginTop: "2px",
                          }}
                        >
                          {i + 1}
                        </div>
                        <span
                          style={{
                            color: "var(--text-mid)",
                            fontSize: "0.95rem",
                            lineHeight: 1.6,
                          }}
                        >
                          {step}
                        </span>
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
