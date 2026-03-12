"use client";
import React, { useRef, useState } from "react";
import { usePageHeroEntrance, useScrollReveal } from "@/hooks/useGsapAnimations";
import AntiGravityButton from "@/components/AntiGravityButton";

export default function ApplyPage() {
  const heroRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  usePageHeroEntrance(heroRef);
  useScrollReveal(containerRef, { y: 40 });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <section className="page-hero" ref={heroRef} style={{ paddingBottom: "40px" }}>
        <div className="container">
          <div className="page-hero-content" style={{ textAlign: "center", margin: "0 auto" }}>
            <span className="badge badge-green">🚀 Start Your Journey</span>
            <h1>
              Apply <span>Now</span>
            </h1>
            <p style={{ margin: "0 auto", maxWidth: "600px" }}>
              Take the first step towards your dream college. Fill out the application form below and our counselors will guide you through the admission process.
            </p>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div 
            ref={containerRef}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "0",
              background: "var(--glass-card)",
              borderRadius: "24px",
              border: "1px solid var(--glass-border)",
              boxShadow: "var(--shadow-lg)",
              overflow: "hidden"
            }}
          >
            {/* Left Image Pane */}
            <div 
              style={{
                position: "relative",
                minHeight: "400px",
                backgroundImage: `url('https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=1470')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div 
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(to right, rgba(15, 23, 42, 0.4), var(--bg-hero))",
                }}
              />
              <div 
                style={{
                  position: "absolute",
                  bottom: "40px",
                  left: "40px",
                  right: "40px",
                  zIndex: 2
                }}
              >
                <div style={{ display: "flex", gap: "12px", marginBottom: "16px" }}>
                  <span className="badge badge-amber" style={{ backdropFilter: "blur(10px)", background: "rgba(245, 158, 11, 0.2)" }}>100% Free Counseling</span>
                  <span className="badge badge-blue" style={{ backdropFilter: "blur(10px)", background: "rgba(59, 130, 246, 0.2)" }}>Verified Colleges</span>
                </div>
                <h3 style={{ fontSize: "2rem", color: "var(--white)", marginBottom: "12px", lineHeight: 1.2 }}>
                  Your Future Starts Here.
                </h3>
                <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "1rem" }}>
                  Join over 10,000+ students who have successfully secured admissions in top Southern Indian institutions through EduExpert.
                </p>
              </div>
            </div>

            {/* Right Form Pane */}
            <div style={{ padding: "48px 40px", background: "var(--bg-main)" }}>
              {submitted ? (
                <div style={{ textAlign: "center", padding: "60px 0", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                  <div style={{ fontSize: "4rem", marginBottom: "24px", animation: "pulse 2s infinite" }}>✅</div>
                  <h2 style={{ color: "var(--accent)", marginBottom: "16px", fontSize: "1.8rem" }}>Application Received!</h2>
                  <p style={{ color: "var(--text-mid)", lineHeight: 1.6 }}>
                    Thank you for choosing EduExpert. One of our expert admission counselors will contact you shortly on the provided phone number to proceed with your application.
                  </p>
                </div>
              ) : (
                <>
                  <h3 style={{ fontSize: "1.4rem", color: "var(--text)", marginBottom: "8px" }}>Student Details</h3>
                  <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", marginBottom: "32px" }}>Complete the form below to receive personalized guidance.</p>
                  
                  <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                    <div>
                      <label style={{ display: "block", marginBottom: "8px", fontWeight: "600", fontSize: "0.9rem", color: "var(--text-mid)" }}>Full Name</label>
                      <input 
                        type="text" 
                        required 
                        placeholder="Enter your full name"
                        style={{ width: "100%", padding: "14px 16px", borderRadius: "12px", border: "1px solid var(--border)", background: "var(--bg-card)", color: "var(--text)", outline: "none", transition: "all 0.2s" }}
                        onFocus={(e) => e.target.style.borderColor = "var(--accent)"}
                        onBlur={(e) => e.target.style.borderColor = "var(--border)"}
                      />
                    </div>

                    <div>
                      <label style={{ display: "block", marginBottom: "8px", fontWeight: "600", fontSize: "0.9rem", color: "var(--text-mid)" }}>Email Address</label>
                      <input 
                        type="email" 
                        required 
                        placeholder="you@school.com"
                        style={{ width: "100%", padding: "14px 16px", borderRadius: "12px", border: "1px solid var(--border)", background: "var(--bg-card)", color: "var(--text)", outline: "none", transition: "all 0.2s" }}
                        onFocus={(e) => e.target.style.borderColor = "var(--accent)"}
                        onBlur={(e) => e.target.style.borderColor = "var(--border)"}
                      />
                    </div>

                    <div>
                      <label style={{ display: "block", marginBottom: "8px", fontWeight: "600", fontSize: "0.9rem", color: "var(--text-mid)" }}>Phone Number</label>
                      <input 
                        type="tel" 
                        required 
                        placeholder="+91 XXXXX XXXXX"
                        style={{ width: "100%", padding: "14px 16px", borderRadius: "12px", border: "1px solid var(--border)", background: "var(--bg-card)", color: "var(--text)", outline: "none", transition: "all 0.2s" }}
                        onFocus={(e) => e.target.style.borderColor = "var(--accent)"}
                        onBlur={(e) => e.target.style.borderColor = "var(--border)"}
                      />
                    </div>

                    <div>
                      <label style={{ display: "block", marginBottom: "8px", fontWeight: "600", fontSize: "0.9rem", color: "var(--text-mid)" }}>Interested Course</label>
                      <select 
                        required
                        style={{ width: "100%", padding: "14px 16px", borderRadius: "12px", border: "1px solid var(--border)", background: "var(--bg-card)", color: "var(--text)", outline: "none", transition: "all 0.2s", appearance: "none" }}
                        onFocus={(e) => e.target.style.borderColor = "var(--accent)"}
                        onBlur={(e) => e.target.style.borderColor = "var(--border)"}
                      >
                        <option value="">Select a course stream...</option>
                        <option value="engineering">Engineering (B.Tech / B.E)</option>
                        <option value="medical">Medical (MBBS / BDS)</option>
                        <option value="arts">Arts & Science</option>
                        <option value="management">Management (BBA / MBA)</option>
                        <option value="law">Law (LLB)</option>
                      </select>
                    </div>

                    <div style={{ marginTop: "8px" }}>
                      <AntiGravityButton type="submit" variant="primary" style={{ width: "100%", padding: "16px" }}>
                        Submit Application
                      </AntiGravityButton>
                    </div>
                  </form>
                </>
              )}
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
