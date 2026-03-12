"use client";

import { useRef } from "react";
import { usePageHeroEntrance, useScrollReveal } from "@/hooks/useGsapAnimations";

export default function TermsPage() {
  const heroRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  usePageHeroEntrance(heroRef);
  useScrollReveal(contentRef, { y: 20 });

  return (
    <div className="page-wrapper">
      {/* ── HERO SECTION ── */}
      <section className="page-hero" ref={heroRef} style={{ background: "transparent", padding: "120px 0 60px 0" }}>
        <div className="container">
          <div className="page-hero-content" style={{ textAlign: "center", maxWidth: "800px", margin: "0 auto" }}>
            <span className="badge badge-amber" style={{ marginBottom: "20px" }}>📜 LEGAL</span>
            <h1 style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)", fontWeight: 800, color: "var(--text-primary)" }}>
              Terms & <span style={{ color: "var(--primary)" }}>Conditions</span>
            </h1>
            <p style={{ fontSize: "1.2rem", color: "var(--text-muted)", lineHeight: 1.6 }}>
              Please read these terms and conditions carefully before using our services. Last updated: March 2026.
            </p>
          </div>
        </div>
      </section>

      {/* ── CONTENT SECTION ── */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div 
            ref={contentRef}
            className="card" 
            style={{ 
              maxWidth: "900px", 
              margin: "0 auto", 
              padding: "60px", 
              background: "#ffffff", 
              border: "1px solid var(--border)",
              boxShadow: "0 20px 50px rgba(0,0,0,0.03)",
              borderRadius: "32px",
              lineHeight: 1.8,
              color: "var(--text-mid)"
            }}
          >
            <div className="terms-content">
              <h2 style={{ color: "var(--text-primary)", fontSize: "1.5rem", fontWeight: 800, marginBottom: "20px" }}>1. Acceptance of Terms</h2>
              <p style={{ marginBottom: "32px" }}>
                By accessing or using the EduExpert website and services, you agree to be bound by these Terms and Conditions. If you do not agree to all of these terms, do not use our services.
              </p>

              <h2 style={{ color: "var(--text-primary)", fontSize: "1.5rem", fontWeight: 800, marginBottom: "20px" }}>2. Description of Service</h2>
              <p style={{ marginBottom: "32px" }}>
                EduExpert provides educational consultancy, college exploration tools, and career guidance services. We aim to provide accurate and up-to-date information regarding institutions, entrance exams, and courses in Southern India.
              </p>

              <h2 style={{ color: "var(--text-primary)", fontSize: "1.5rem", fontWeight: 800, marginBottom: "20px" }}>3. User Responsibilities</h2>
              <p style={{ marginBottom: "32px" }}>
                Users are responsible for verifying all information directly with the respective institutions or official bodies. While we strive for accuracy, EduExpert does not guarantee the completeness or accuracy of the information provided on our platform.
              </p>

              <h2 style={{ color: "var(--text-primary)", fontSize: "1.5rem", fontWeight: 800, marginBottom: "20px" }}>4. Intellectual Property</h2>
              <p style={{ marginBottom: "32px" }}>
                All content on this website, including text, graphics, logos, and software, is the property of EduExpert and is protected by intellectual property laws. You may not reproduce, distribute, or create derivative works without our express written consent.
              </p>

              <h2 style={{ color: "var(--text-primary)", fontSize: "1.5rem", fontWeight: 800, marginBottom: "20px" }}>5. Limitation of Liability</h2>
              <p style={{ marginBottom: "32px" }}>
                EduExpert shall not be liable for any direct, indirect, incidental, or consequential damages resulting from the use or inability to use our services or for the cost of procurement of substitute services.
              </p>

              <h2 style={{ color: "var(--text-primary)", fontSize: "1.5rem", fontWeight: 800, marginBottom: "20px" }}>6. Privacy Policy</h2>
              <p style={{ marginBottom: "32px" }}>
                Your use of our services is also governed by our Privacy Policy, which details how we collect, use, and protect your personal information.
              </p>

              <h2 style={{ color: "var(--text-primary)", fontSize: "1.5rem", fontWeight: 800, marginBottom: "20px" }}>7. Modifications to Terms</h2>
              <p style={{ marginBottom: "32px" }}>
                EduExpert reserves the right to modify these Terms and Conditions at any time without prior notice. Your continued use of the service following any changes constitutes your acceptance of the new terms.
              </p>

              <div style={{ marginTop: "48px", paddingTop: "32px", borderTop: "1px solid var(--border)", textAlign: "center" }}>
                <p style={{ fontWeight: 600, color: "var(--text-primary)" }}>Questions about these terms?</p>
                <p>Contact us at legal@eduexpert.com</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
