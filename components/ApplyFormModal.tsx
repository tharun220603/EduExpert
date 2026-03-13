"use client";

import React, { useState, useEffect, useRef } from "react";
import { FiX, FiCheckCircle, FiAlertCircle, FiSend } from "react-icons/fi";
import gsap from "gsap";

export default function ApplyFormModal({
  buttonText = "Apply Now",
  buttonClassName = "btn btn-primary navbar-cta",
  buttonStyle = { padding: "9px 22px", fontSize: "0.85rem" }
}: {
  buttonText?: string;
  buttonClassName?: string;
  buttonStyle?: React.CSSProperties;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<"form" | "submitting" | "success">("form");
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    course: "",
  });

  const overlayRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      gsap.fromTo(
        overlayRef.current,
        { opacity: 0, backdropFilter: "blur(0px)" },
        { opacity: 1, backdropFilter: "blur(12px)", duration: 0.4, ease: "power2.out" }
      );
      gsap.fromTo(
        modalRef.current,
        { scale: 0.9, opacity: 0, y: 20 },
        { scale: 1, opacity: 1, y: 0, duration: 0.5, ease: "back.out(1.2)", delay: 0.1 }
      );
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen]);

  const closeModal = () => {
    gsap.to(modalRef.current, { scale: 0.95, opacity: 0, y: 10, duration: 0.3, ease: "power2.in" });
    gsap.to(overlayRef.current, {
      opacity: 0,
      backdropFilter: "blur(0px)",
      duration: 0.3,
      ease: "power2.in",
      onComplete: () => {
        setIsOpen(false);
        setStep("form");
        setError("");
        setFormData({ fullName: "", email: "", phone: "", course: "" });
      },
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim()) return setError("Full Name is required.");
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) return setError("Valid Email is required.");
    if (!formData.phone.trim() || formData.phone.length < 10) return setError("Valid Phone Number is required.");
    if (!formData.course) return setError("Please select a course of interest.");

    setStep("submitting");

    // Simulate API call
    setTimeout(() => {
      setStep("success");
      gsap.fromTo(
        ".success-icon",
        { scale: 0, opacity: 0, rotation: -45 },
        { scale: 1, opacity: 1, rotation: 0, duration: 0.6, ease: "back.out(1.5)" }
      );
      
      // Auto close after 3 seconds
      setTimeout(() => closeModal(), 3000);
    }, 1500);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={buttonClassName}
        style={buttonStyle}
      >
        {buttonText}
      </button>

      {isOpen && (
        <div
          ref={overlayRef}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(3, 3, 5, 0.7)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
          }}
          onClick={(e) => {
            if (e.target === overlayRef.current) closeModal();
          }}
        >
          <div
            ref={modalRef}
            className="apply-modal"
            style={{
              background: "var(--glass-strong)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              border: "1px solid var(--glass-border)",
              borderRadius: "24px",
              width: "100%",
              maxWidth: "480px",
              overflow: "hidden",
              position: "relative",
              boxShadow: "0 20px 40px rgba(0,0,0,0.4), 0 0 0 1px var(--glass-border-soft) inset",
            }}
          >
            {/* Header */}
            <div style={{ padding: "24px 32px", borderBottom: "1px solid var(--glass-border-soft)", display: "flex", justifyContent: "space-between", alignItems: "center", background: "rgba(255,255,255,0.03)" }}>
              <h2 style={{ fontSize: "1.25rem", color: "var(--text)", margin: 0 }}>
                {step === "success" ? "Application Sent!" : "Start Your Journey"}
              </h2>
              <button
                onClick={closeModal}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "var(--text-muted)",
                  cursor: "pointer",
                  display: "flex",
                  padding: "4px",
                  borderRadius: "50%",
                  transition: "color 0.2s, background 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "var(--text)";
                  e.currentTarget.style.background = "var(--glass-border-soft)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "var(--text-muted)";
                  e.currentTarget.style.background = "transparent";
                }}
              >
                <FiX size={20} />
              </button>
            </div>

            {/* Body */}
            <div style={{ padding: "32px" }}>
              {step === "form" && (
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                  {error && (
                    <div style={{ padding: "12px 16px", background: "rgba(239, 68, 68, 0.1)", border: "1px solid rgba(239, 68, 68, 0.3)", borderRadius: "12px", color: "var(--error)", fontSize: "0.9rem", display: "flex", alignItems: "center", gap: "8px" }}>
                      <FiAlertCircle size={16} /> {error}
                    </div>
                  )}

                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    <label style={{ fontSize: "0.85rem", color: "var(--text-muted)", fontWeight: 500 }}>Full Name</label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="John Doe"
                      style={{
                        padding: "12px 16px",
                        background: "var(--glass)",
                        border: "1px solid var(--glass-border-soft)",
                        borderRadius: "12px",
                        color: "var(--text)",
                        fontSize: "0.95rem",
                        outline: "none",
                        transition: "border-color 0.3s",
                      }}
                      onFocus={(e) => (e.currentTarget.style.borderColor = "var(--accent)")}
                      onBlur={(e) => (e.currentTarget.style.borderColor = "var(--glass-border-soft)")}
                    />
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    <label style={{ fontSize: "0.85rem", color: "var(--text-muted)", fontWeight: 500 }}>Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      style={{
                        padding: "12px 16px",
                        background: "var(--glass)",
                        border: "1px solid var(--glass-border-soft)",
                        borderRadius: "12px",
                        color: "var(--text)",
                        fontSize: "0.95rem",
                        outline: "none",
                        transition: "border-color 0.3s",
                      }}
                      onFocus={(e) => (e.currentTarget.style.borderColor = "var(--accent)")}
                      onBlur={(e) => (e.currentTarget.style.borderColor = "var(--glass-border-soft)")}
                    />
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    <label style={{ fontSize: "0.85rem", color: "var(--text-muted)", fontWeight: 500 }}>Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 98765 43210"
                      style={{
                        padding: "12px 16px",
                        background: "var(--glass)",
                        border: "1px solid var(--glass-border-soft)",
                        borderRadius: "12px",
                        color: "var(--text)",
                        fontSize: "0.95rem",
                        outline: "none",
                        transition: "border-color 0.3s",
                      }}
                      onFocus={(e) => (e.currentTarget.style.borderColor = "var(--accent)")}
                      onBlur={(e) => (e.currentTarget.style.borderColor = "var(--glass-border-soft)")}
                    />
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    <label style={{ fontSize: "0.85rem", color: "var(--text-muted)", fontWeight: 500 }}>Interested Course</label>
                    <select
                      name="course"
                      value={formData.course}
                      onChange={handleChange}
                      style={{
                        padding: "12px 16px",
                        background: "var(--glass)",
                        border: "1px solid var(--glass-border-soft)",
                        borderRadius: "12px",
                        color: formData.course ? "var(--text)" : "var(--text-muted)",
                        fontSize: "0.95rem",
                        outline: "none",
                        transition: "border-color 0.3s",
                        appearance: "none",
                      }}
                      onFocus={(e) => (e.currentTarget.style.borderColor = "var(--accent)")}
                      onBlur={(e) => (e.currentTarget.style.borderColor = "var(--glass-border-soft)")}
                    >
                      <option value="" disabled>Select a discipline</option>
                      <option value="Engineering">Engineering (B.Tech / M.Tech)</option>
                      <option value="Medical">Medical (MBBS / BDS)</option>
                      <option value="Management">Management (BBA / MBA)</option>
                      <option value="ArtsScience">Arts & Science</option>
                      <option value="Law">Law (LLB / LLM)</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary"
                    style={{
                      width: "100%",
                      justifyContent: "center",
                      marginTop: "12px",
                      padding: "14px",
                      fontSize: "1rem",
                      background: "var(--accent)",
                    }}
                  >
                    Submit Application <FiSend size={18} />
                  </button>
                </form>
              )}

              {step === "submitting" && (
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "40px 0", gap: "20px" }}>
                  <div className="spinner" style={{ width: "40px", height: "40px", border: "3px solid var(--glass-border-soft)", borderTopColor: "var(--accent)", borderRadius: "50%", animation: "spin 1s linear infinite" }} />
                  <style>
                    {`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}
                  </style>
                  <p style={{ color: "var(--text-muted)", fontSize: "1.05rem" }}>Processing your application...</p>
                </div>
              )}

              {step === "success" && (
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", padding: "20px 0 10px", gap: "16px" }}>
                  <div className="success-icon" style={{ color: "var(--success)", background: "rgba(34, 197, 94, 0.1)", padding: "20px", borderRadius: "50%", display: "flex" }}>
                    <FiCheckCircle size={48} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: "1.4rem", color: "var(--text)", marginBottom: "8px" }}>Success!</h3>
                    <p style={{ color: "var(--text-muted)", fontSize: "1rem", lineHeight: 1.5 }}>
                      Thank you, {formData.fullName}. Your application request has been received. Our counsellors will contact you shortly.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
