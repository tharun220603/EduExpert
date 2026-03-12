"use client";
import React, { useRef } from "react";
import { usePageHeroEntrance } from "@/hooks/useGsapAnimations";

export default function PrivacyPage() {
  const heroRef = useRef<HTMLElement>(null);
  usePageHeroEntrance(heroRef);

  return (
    <>
      <section className="page-hero" ref={heroRef} style={{ paddingBottom: "40px" }}>
        <div className="container">
          <div className="page-hero-content" style={{ textAlign: "center", margin: "0 auto" }}>
            <span className="badge badge-amber">🔒 Legal Information</span>
            <h1>
              Privacy <span>Policy</span>
            </h1>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: "20px" }}>
        <div className="container">
          <div className="card" style={{ maxWidth: "800px", margin: "0 auto", padding: "40px" }}>
            <div className="card-body" style={{ color: "var(--text-mid)" }}>
              <h3 style={{ color: "var(--text)", marginBottom: "16px" }}>1. Information We Collect</h3>
              <p style={{ marginBottom: "24px" }}>
                We collect information you provide directly to us when you fill out forms (such as the "Apply Now" form), request support, or communicate with us. The types of information we may collect include your name, email address, phone number, and academic interests.
              </p>

              <h3 style={{ color: "var(--text)", marginBottom: "16px" }}>2. Use of Information</h3>
              <p style={{ marginBottom: "24px" }}>
                We use the information we collect to provide, maintain, and improve our services, communicate with you regarding your college applications, and send you technical notices and support messages.
              </p>

              <h3 style={{ color: "var(--text)", marginBottom: "16px" }}>3. Data Security</h3>
              <p style={{ marginBottom: "24px" }}>
                We take reasonable measures to help protect information about you from loss, theft, misuse, unauthorized access, disclosure, alteration, and destruction.
              </p>

              <p style={{ fontSize: "0.85rem", fontStyle: "italic", marginTop: "40px" }}>
                Last updated: October 2026
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
