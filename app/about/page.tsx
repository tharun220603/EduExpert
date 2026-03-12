"use client";

import { useRef } from "react";
import { usePageHeroEntrance, useScrollReveal } from "@/hooks/useGsapAnimations";
import { motion } from "framer-motion";
import { FiCheckCircle, FiShield, FiTrendingUp, FiUsers } from "react-icons/fi";
import CollegeMarquee from "@/components/CollegeMarquee";

function FeatureBlock({ icon, title, desc, delay }: { icon: React.ReactNode, title: string, desc: string, delay: number }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="card"
      style={{ padding: "32px", height: "100%", border: "1px solid var(--border)", background: "var(--bg-card)" }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "16px" }}>
        <div style={{ width: "48px", height: "48px", borderRadius: "12px", background: "var(--accent-pale)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--accent)" }}>
          {icon}
        </div>
        <h3 style={{ fontSize: "1.2rem", color: "var(--text)" }}>{title}</h3>
      </div>
      <p style={{ color: "var(--text-mid)", lineHeight: 1.6 }}>{desc}</p>
    </motion.div>
  );
}

export default function AboutPage() {
  const heroRef = useRef<HTMLElement>(null);
  const missionRef = useRef<HTMLDivElement>(null);
  
  usePageHeroEntrance(heroRef);
  useScrollReveal(missionRef, { y: 30 });

  return (
    <div style={{ overflowX: "hidden" }}>
      <section className="page-hero" ref={heroRef} style={{ paddingBottom: "60px" }}>
        <div className="container">
          <div className="page-hero-content" style={{ textAlign: "center", margin: "0 auto", maxWidth: "800px" }}>
            <span className="badge badge-blue">👋 Who We Are</span>
            <h1>
              Empowering Students. <br/><span>Enabling Futures.</span>
            </h1>
            <p style={{ margin: "0 auto", fontSize: "1.2rem", lineHeight: 1.6 }}>
              EduExpert is South India's premier higher education discovery platform, dedicated to bridging the gap between ambitious students and world-class institutions.
            </p>
          </div>
        </div>
      </section>

      <CollegeMarquee />

      <section className="section" style={{ padding: "100px 0" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "60px", alignItems: "center" }}>
            
            <div ref={missionRef}>
              <h2 style={{ fontSize: "2.5rem", marginBottom: "24px", color: "var(--text)" }}>
                Our <span style={{ color: "var(--accent)" }}>Mission</span>
              </h2>
              <p style={{ color: "var(--text-mid)", fontSize: "1.1rem", lineHeight: 1.8, marginBottom: "20px" }}>
                EduExpert was founded with a single mission: to demystify the complex college admission process for high school graduates.
              </p>
              <p style={{ color: "var(--text-mid)", fontSize: "1.1rem", lineHeight: 1.8 }}>
                We believe that every student deserves access to transparent, accurate, and comprehensive information about colleges, exams, and courses, completely free of overwhelming advertisements and biased promotions.
              </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "24px" }}>
              <FeatureBlock 
                icon={<FiShield size={24} />} 
                title="Verified Data" 
                desc="We rigorously cross-check our institutional statistics, fees, and placement records directly with official NIRF rankings and university guidelines."
                delay={0.1}
              />
              <FeatureBlock 
                icon={<FiTrendingUp size={24} />} 
                title="Comprehensive Coverage" 
                desc="From deep-tech engineering degrees to medical entrance exams and creative design courses, we cover the full spectrum of higher education."
                delay={0.2}
              />
              <FeatureBlock 
                icon={<FiUsers size={24} />} 
                title="Student-First Approach" 
                desc="Our platform is designed strictly around the student experience, focusing on discovery, comparison, and clarity without aggressive ad placements."
                delay={0.3}
              />
            </div>

          </div>
        </div>
      </section>

      <section className="section-sm" style={{ background: "var(--bg-section)", padding: "80px 0" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <h2 style={{ fontSize: "2rem", marginBottom: "16px", color: "var(--text)" }}>Ready to find your college?</h2>
          <p style={{ color: "var(--text-mid)", marginBottom: "32px" }}>Join thousands of students who found their perfect match.</p>
          <a href="/colleges" className="btn btn-primary" style={{ padding: "14px 32px", fontSize: "1.1rem", display: "inline-block" }}>
            Explore Colleges
          </a>
        </div>
      </section>
    </div>
  );
}
