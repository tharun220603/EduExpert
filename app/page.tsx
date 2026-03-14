"use client";
import { useRouter } from "next/navigation";
import React, { useRef } from "react";
import CollegeMarquee from "@/components/CollegeMarquee";
import ReviewMarquee from "@/components/ReviewMarquee";
import FeaturedCollegesRow from "@/components/FeaturedCollegesRow";
import LocationsRow from "@/components/LocationsRow";
import Counter from "@/components/Counter";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import colleges from "@/data/colleges";
import locations from "@/data/locations";
import reviews from "@/data/reviews";
import FloatingCard from "@/components/FloatingCard";
import AntiGravityButton from "@/components/AntiGravityButton";
import ScrollFloatSection from "@/components/ScrollFloatSection";
import {
  useAdvancedHeroEntrance,
  useFloatingOrbs,
  useScrollReveal,
  useStaggerReveal,
  useCountUp,
  useSectionHeaderReveal,
  useParallax,
  useScaleReveal,
  useCursorParallaxField,
  useFloatingEntrance,
} from "@/hooks/useGsapAnimations";
import {
  FiArrowRight,
  FiShield,
  FiAward,
  FiBook,
} from "react-icons/fi";

import blogPosts from "@/data/blog";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const router = useRouter();
  const [mounted, setMounted] = React.useState(false);
  const [heroParticles] = React.useState(() =>
    [...Array(12)].map(() => ({
      left: `${8 + Math.random() * 84}%`,
      top: `${5 + Math.random() * 90}%`,
      width: `${2 + Math.random() * 4}px`,
      height: `${2 + Math.random() * 4}px`,
      animationDelay: `${Math.random() * 6}s`,
      animationDuration: `${4 + Math.random() * 5}s`,
    })),
  );

  // Get latest 4 blog posts for news
  const latestNews = [...blogPosts]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 4);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // ─── Refs ───
  const heroRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const stat1Ref = useRef<HTMLHeadingElement>(null);
  const stat2Ref = useRef<HTMLHeadingElement>(null);
  const stat3Ref = useRef<HTMLHeadingElement>(null);
  const whyHeaderRef = useRef<HTMLDivElement>(null);
  const whyGridRef = useRef<HTMLDivElement>(null);
  const newsRef = useRef<HTMLDivElement>(null);
  const featuredHeaderRef = useRef<HTMLDivElement>(null);
  const locationsHeaderRef = useRef<HTMLDivElement>(null);
  const reviewsHeaderRef = useRef<HTMLDivElement>(null);
  const reviewsSliderRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const ctaInnerRef = useRef<HTMLDivElement>(null);

  // ─── GSAP Animations ───
  useAdvancedHeroEntrance(heroRef, {
    badge: ".hero-tag",
    heading: "h1",
    subtitle: ".hero-content > p",
    buttons: ".hero-btns .btn",
    stats: ".hero-stat",
  });
  useFloatingOrbs(heroRef);
  useCountUp(stat1Ref, 500, { suffix: "+" });
  useCountUp(stat2Ref, 14, { suffix: "+" });
  useCountUp(stat3Ref, 50, { suffix: "+" });
  useScaleReveal(statsRef, { scale: 0.92 });
  useSectionHeaderReveal(whyHeaderRef);
  useFloatingEntrance(whyGridRef, ".feature-card", {
    stagger: 0.15,
    y: 60,
    floatAfter: true,
    yRange: 6,
  });
  useCursorParallaxField(whyGridRef, ".feature-card", { intensity: 8 });
  useSectionHeaderReveal(featuredHeaderRef);
  useSectionHeaderReveal(reviewsHeaderRef);
  useScrollReveal(locationsHeaderRef, { y: 20 });
  useScrollReveal(reviewsSliderRef, { y: 30 });
  useScaleReveal(ctaRef, { scale: 0.9 });
  useParallax(ctaInnerRef, { speed: 0.15, direction: "up" });

  useSectionHeaderReveal(newsRef);
  useStaggerReveal(newsRef, ".news-item", { y: 35, stagger: 0.1 });

  if (!mounted) return null;

  return (
    <>
      {/* ══════════════════════════════
          HERO
      ══════════════════════════════ */}
      <section
        className="hero hero-section"
        style={{ padding: "30px 50px 100px" }}
        ref={heroRef}
      >
        <div className="hero-gradient-bg" />
        {/* Background image removed as requested */}
        <div className="hero-floating-orb hero-orb-1" />
        <div className="hero-floating-orb hero-orb-2" />
        <div className="hero-floating-orb hero-orb-3" />
        <div className="hero-grid-pattern" />
        <div className="hero-particles">
          {heroParticles.map((particle, i) => (
            <div
              key={i}
              className="hero-particle"
              style={{
                left: particle.left,
                top: particle.top,
                width: particle.width,
                height: particle.height,
                animationDelay: particle.animationDelay,
                animationDuration: particle.animationDuration,
              }}
            />
          ))}
        </div>

        <div className="container" style={{ width: "100%" }}>
          <div className="flex-responsive" style={{ alignItems: "center" }}>
            <div
              className="hero-content"
              style={{ maxWidth: "660px", flex: 1 }}
            >
              <h1 className="hero-heading">
                Discover Your Dream College in South India
              </h1>
              <p>
                Explore 500+ top colleges, 14+ national exams, and 50+
                career-defining courses — all tailored for Southern India&apos;s
                brightest minds.
              </p>
              <div className="hero-btns">
                <AntiGravityButton
                  onClick={() => router.push("/colleges")}
                  variant="primary"
                >
                  Explore Colleges <FiArrowRight />
                </AntiGravityButton>
                <AntiGravityButton
                  onClick={() => router.push("/exams")}
                  variant="outline"
                >
                  View Exams
                </AntiGravityButton>
              </div>
              <div className="hero-stats">
                <div className="hero-stat">
                  <h3 ref={stat1Ref}>500+</h3>
                  <p>Top Colleges</p>
                </div>
                <div className="hero-stat">
                  <h3 ref={stat2Ref}>14+</h3>
                  <p>Entrance Exams</p>
                </div>
                <div className="hero-stat">
                  <h3 ref={stat3Ref}>50+</h3>
                  <p>Career Courses</p>
                </div>
              </div>
            </div>

            <div
              className="hero-visual hidden-mobile"
              style={{
                position: "relative",
                flex: 1,
                display: "flex",
                justifyContent: "center",
                marginTop: "-40px",
              }}
            >
              <FloatingCard
                intensity={1.2}
                delay={0.2}
                style={{
                  padding: "16px",
                  background: "transparent",
                  border: "none",
                }}
              >
                <img
                  src="/graduation_collage_graphic_1773206620676.png"
                  alt="Graduation Collage Graphic"
                  style={{
                    width: "480px",
                    height: "auto",
                    filter: "drop-shadow(0 20px 50px rgba(0,0,0,0.15))",
                  }}
                />
              </FloatingCard>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════
          STATS STRIP
      ══════════════════════════════ */}
      <section className="section-sm home-stats-band" style={{ background: "white" }}>
        <div className="container">
          <div className="stats-strip" ref={statsRef}>
            <div className="stats-item">
              <h3>
                <Counter end={2005} duration={1.5} suffix="+" />
              </h3>
              <p>Established Since</p>
            </div>
            <div className="stats-item divider">
              <h3>
                <Counter end={50} duration={2} suffix="K+" />
              </h3>
              <p>Students Mentored</p>
            </div>
            <div className="stats-item divider">
              <h3>
                <Counter end={100} duration={2} suffix="%" />
              </h3>
              <p>Placement Support</p>
            </div>
            <div className="stats-item divider">
              <h3>24/7</h3>
              <p>Expert Support</p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════
          FEATURED COLLEGES
      ══════════════════════════════ */}
      <ScrollFloatSection
        className="section home-featured-section"
        speed={0.8}
        style={{
          background: "#ffffff",
          borderTop: "1px solid var(--border)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div className="container">
          <div className="section-header" ref={featuredHeaderRef}>
            <span
              className="badge"
              style={{
                background: "var(--gold-pale)",
                color: "var(--warning)",
                border: "1px solid rgba(245, 158, 11, 0.2)",
              }}
            >
              TOP INSTITUTIONS
            </span>
            <h2 style={{ marginTop: "16px", color: "var(--text-primary)" }}>
              🏛️{" "}
              <span style={{ color: "var(--primary)" }}>
                Featured Colleges
              </span>{" "}
            </h2>
            <p style={{ color: "var(--text-muted)" }}>
              Handpicked top-rated institutions across Southern India
            </p>
          </div>

          <FeaturedCollegesRow colleges={colleges.slice(0, 15)} />

          <div style={{ textAlign: "center", marginTop: "48px" }}>
            <AntiGravityButton
              onClick={() => router.push("/colleges")}
              variant="outline"
              style={{
                color: "var(--primary)",
                borderColor: "var(--primary)",
                background: "var(--primary-light)",
                boxShadow: "0 0 20px rgba(79, 70, 229, 0.1)",
              }}
            >
              View More Colleges <FiArrowRight />
            </AntiGravityButton>
          </div>
        </div>
      </ScrollFloatSection>

      {/* ══════════════════════════════
          COLLEGE MARQUEE
      ══════════════════════════════ */}
      <section
        className="section-sm home-marquee-band"
        style={{ background: "rgba(240, 244, 255, 0.3)", padding: "0" }}
      >
        <CollegeMarquee />
      </section>

      {/* ══════════════════════════════
          LATEST NEWS
      ══════════════════════════════ */}
      <ScrollFloatSection
        className="section home-news-section"
        style={{
          background: "#08090a",
          borderTop: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <div className="container" ref={newsRef}>
          <div
            className="section-header news-top-row"
            style={{
              textAlign: "left",
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
              alignItems: "flex-end",
              gap: "20px",
            }}
          >
            <div>
              <span
                className="badge"
                style={{
                  background: "rgba(16, 185, 129, 0.2)",
                  color: "#10b981",
                  border: "1px solid rgba(16, 185, 129, 0.3)",
                }}
              >
                LATEST NEWS
              </span>
              <h2 style={{ marginTop: "12px", color: "#ffffff" }}>
                EduExpert <span>Updates</span>
              </h2>
            </div>
            <button
              className="home-news-link"
              onClick={() => router.push("/blog")}
              style={{
                background: "transparent",
                border: "none",
                color: "var(--accent-light)",
                fontWeight: 700,
                display: "flex",
                alignItems: "center",
                gap: "8px",
                cursor: "pointer",
              }}
            >
              View all news <FiArrowRight />
            </button>
          </div>

          <div
            className="news-grid home-news-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: "20px",
            }}
          >
            {latestNews.map((item) => (
              <div
                key={item.id}
                className="news-item home-news-card"
                onClick={() => router.push(`/blog/${item.slug}`)}
                style={{
                  background: "#ffffff",
                  border: "1px solid var(--border)",
                  padding: "24px 20px",
                  borderRadius: "20px",
                  display: "flex",
                  flexDirection: "column",
                  transition: "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
                  height: "100%",
                  boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
                  cursor: "pointer",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "12px",
                    alignItems: "center",
                  }}
                >
                  <span
                    className="home-news-category"
                    style={{
                      fontSize: "0.65rem",
                      color: "var(--primary)",
                      fontWeight: 800,
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                      background: "rgba(79, 70, 229, 0.05)",
                      padding: "2px 8px",
                      borderRadius: "6px",
                    }}
                  >
                    {item.category}
                  </span>
                </div>
                <h3
                  className="home-news-title"
                  style={{
                    fontSize: "1rem",
                    fontWeight: 800,
                    color: "var(--text-primary)",
                    marginBottom: "16px",
                    lineHeight: 1.4,
                    flex: 1,
                  }}
                >
                  {item.title}
                </h3>
                <div
                  className="home-news-footer"
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    borderTop: "1px solid var(--border)",
                    paddingTop: "14px",
                    marginTop: "4px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "0.7rem",
                      color: "var(--text-muted)",
                      fontWeight: 600,
                    }}
                  >
                    {item.date}
                  </span>
                  <FiArrowRight
                    size={14}
                    color="var(--primary)"
                    className="home-news-arrow"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </ScrollFloatSection>

      {/* ══════════════════════════════
          WHY EDUEXPERT
      ══════════════════════════════ */}
      <ScrollFloatSection
        className="section home-why-section"
        speed={0.5}
        style={{
          backgroundColor: "#f0f4ff",
        }}
      >
        <div className="container">
          <div className="section-header" ref={whyHeaderRef}>
            <h2>
              Why Choose <span>EduExpert</span>?
            </h2>
            <p>Your journey to excellence starts with the right guidance</p>
          </div>
          <div
            className="cards-grid"
            ref={whyGridRef}
            style={{
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            }}
          >
            {[
              {
                icon: <FiAward />,
                title: "Expert Guidance",
                text: (
                  <>
                    <Counter end={15} suffix="+" /> years of experience in
                    educational counselling and placement guidance.
                  </>
                ),
                color: "#4f46e5",
              },
              {
                icon: <FiBook />,
                title: "Deep Insights",
                text: (
                  <>
                    Detailed analysis of <Counter end={500} suffix="+" />{" "}
                    colleges and <Counter end={50} suffix="+" /> career-defining
                    courses.
                  </>
                ),
                color: "#8b5cf6",
              },
              {
                icon: <FiShield />,
                title: "Verified Info",
                text: "100% accurate information on admission cycles and entrance exams.",
                color: "#10b981",
              },
            ].map((feature, i) => (
              <FloatingCard
                key={i}
                className="feature-card home-feature-card"
                style={{
                  padding: "48px 40px",
                  textAlign: "center",
                  background: "#ffffff",
                  border: "1px solid var(--border)",
                  boxShadow: "0 15px 35px rgba(0,0,0,0.05)",
                  borderRadius: "32px",
                }}
              >
                <div
                  className="home-feature-icon icon-bounce"
                  style={{
                    width: "72px",
                    height: "72px",
                    borderRadius: "20px",
                    background: `${feature.color}10`,
                    color: feature.color,
                    fontSize: "2rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 28px",
                    border: `1px solid ${feature.color}25`,
                  }}
                >
                  {feature.icon}
                </div>
                <h3
                  style={{
                    fontSize: "1.45rem",
                    fontWeight: 800,
                    color: "var(--text-primary)",
                    marginBottom: "16px",
                  }}
                >
                  {feature.title}
                </h3>
                <p
                  style={{
                    color: "var(--text-muted)",
                    lineHeight: 1.7,
                    fontSize: "1.05rem",
                  }}
                >
                  {feature.text}
                </p>
              </FloatingCard>
            ))}
          </div>
        </div>
      </ScrollFloatSection>

      {/* ══════════════════════════════
          COUNSELLING LOCATIONS
      ══════════════════════════════ */}
      <ScrollFloatSection
        className="section-sm home-locations-section"
        speed={0.4}
        style={{ background: "rgba(79, 70, 229, 0.02)" }}
      >
        <div className="container">
          <div className="section-header" ref={locationsHeaderRef}>
            <span
              className="badge"
              style={{
                background: "rgba(16, 185, 129, 0.1)",
                color: "#10b981",
                border: "1px solid rgba(16, 185, 129, 0.2)",
              }}
            >
              OUR PRESENCE
            </span>
            <h2>
              📍 Our <span>Counselling</span> Locations
            </h2>
            <p>Visit our nearest office for personalized career guidance</p>
          </div>

          <LocationsRow locations={locations} />
        </div>
      </ScrollFloatSection>

      {/* ══════════════════════════════
          REVIEWS MARQUEE
      ══════════════════════════════ */}
      <section
        className="section home-reviews-section"
        style={{
          background: "#08090a",
          borderTop: "1px solid rgba(255,255,255,0.1)",
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      >
        <div className="container">
          <div className="section-header" ref={reviewsHeaderRef}>
            <span
              className="badge"
              style={{
                background: "rgba(79, 70, 229, 0.2)",
                color: "#818cf8",
                border: "1px solid rgba(129, 140, 248, 0.3)",
              }}
            >
              STUDENT VOICES
            </span>
            <h2 style={{ marginTop: "16px", color: "#ffffff" }}>
              💬 Student <span style={{ color: "#818cf8" }}>Success</span>{" "}
              Stories
            </h2>
            <p style={{ color: "rgba(255,255,255,0.6)" }}>
              Join 10,000+ students who found their future with EduExpert
            </p>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <ReviewMarquee
            reviews={reviews.slice(0, 5)}
            direction="left"
            duration={45}
          />
          <ReviewMarquee
            reviews={reviews.slice(5, 10)}
            direction="right"
            duration={55}
          />
        </div>
      </section>

      <div style={{ display: "none" }}>
        <div ref={reviewsSliderRef} />
      </div>

      {/* ══════════════════════════════
          CTA
      ══════════════════════════════ */}
      <section className="section-sm home-cta-section">
        <div className="container">
          <div className="cta-banner cta-shimmer home-cta-card" ref={ctaRef}>
            <div ref={ctaInnerRef}>
              <h2
                style={{
                  fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
                  color: "var(--text)",
                  marginBottom: "16px",
                }}
              >
                Ready to Find Your{" "}
                <span style={{ color: "var(--accent)" }}>Dream College?</span>
              </h2>
              <p
                style={{
                  color: "var(--text-muted)",
                  fontSize: "1.05rem",
                  maxWidth: "500px",
                  margin: "0 auto 36px",
                  lineHeight: 1.7,
                }}
              >
                Browse all colleges, compare courses, and check exam schedules —
                all in one place.
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
                  onClick={() => router.push("/colleges")}
                  variant="primary"
                >
                  Browse Colleges <FiArrowRight />
                </AntiGravityButton>
                <AntiGravityButton
                  onClick={() => router.push("/exams")}
                  variant="ghost"
                >
                  Exam Calendar
                </AntiGravityButton>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
