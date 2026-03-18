"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  FiX,
  FiCheckCircle,
  FiAlertCircle,
  FiSend,
  FiAward,
  FiCheck,
} from "react-icons/fi";
import gsap from "gsap";

export default function ApplyFormModal({
  buttonText = "Apply Now",
  buttonClassName = "btn btn-primary navbar-cta",
  buttonStyle = { padding: "10px 24px", fontSize: "0.95rem" },
  collegeId = "0",
  collegeName = "EduExpert",
}: {
  buttonText?: string;
  buttonClassName?: string;
  buttonStyle?: React.CSSProperties;
  collegeId?: string | number | null;
  collegeName?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<"form" | "submitting" | "success">("form");
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    state: "",
    city: "",
    course: "",
    specialization: "",
  });

  const overlayRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // UTM Parameters
  const [utmParams, setUtmParams] = useState({
    utm_source: "Web_API",
    utm_medium: "Direct",
    utm_campaign: "Direct_Inquiry",
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      setUtmParams({
        utm_source: params.get("utm_source") || "Web_API",
        utm_medium: params.get("utm_medium") || "Direct",
        utm_campaign: params.get("utm_campaign") || "Direct_Inquiry",
      });
    }
  }, []);

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
        { scale: 0.9, opacity: 0, y: 30 },
        { scale: 1, opacity: 1, y: 0, duration: 0.5, ease: "back.out(1.2)", delay: 0.1 }
      );
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen]);

  const closeModal = () => {
    gsap.to(modalRef.current, { scale: 0.95, opacity: 0, y: 15, duration: 0.3, ease: "power2.in" });
    gsap.to(overlayRef.current, {
      opacity: 0,
      backdropFilter: "blur(0px)",
      duration: 0.3,
      ease: "power2.in",
      onComplete: () => {
        setIsOpen(false);
        setStep("form");
        setError("");
        setFieldErrors({});
      },
    });
  };

  const validate = () => {
    const errors: Record<string, string> = {};
    if (!formData.fullName.trim()) errors.fullName = "Name is required";
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) errors.email = "Valid email required";
    if (!formData.phone.trim() || !/^\d{10}$/.test(formData.phone)) errors.phone = "Enter 10-digit number";
    if (!formData.state) errors.state = "Select state";
    if (!formData.course) errors.course = "Select course";
    
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (fieldErrors[e.target.name]) {
      const newErrors = { ...fieldErrors };
      delete newErrors[e.target.name];
      setFieldErrors(newErrors);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStep("submitting");

    const payload = {
      lead_type: "CSL",
      name: formData.fullName,
      email: formData.email,
      clg_id: collegeId?.toString() || "0",
      phone: formData.phone,
      father_name: " ",
      gender: "male",
      country: 91,
      state: formData.state,
      city: formData.city || " ",
      course: formData.course,
      specialization: formData.specialization || formData.course,
      source: "Web_API",
      ...utmParams
    };

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok) {
        setStep("success");
      } else {
        setError(data.message || "An error occurred. Please try again.");
        setStep("form");
      }
    } catch (err) {
      setError("Network error. Please try again.");
      setStep("form");
    }
  };

  const states = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana", 
    "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", 
    "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", 
    "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal", "Delhi"
  ];

  return (
    <>
      <button onClick={() => setIsOpen(true)} className={buttonClassName} style={buttonStyle}>
        {buttonText}
      </button>

      {isOpen && (
        <div 
          ref={overlayRef} 
          style={{ position: "fixed", inset: 0, background: "rgba(3, 7, 18, 0.8)", backdropFilter: "blur(12px)", zIndex: 10001, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}
          onClick={(e) => e.target === overlayRef.current && closeModal()}
        >
          <div 
            ref={modalRef} 
            className="apply-modal-container"
            style={{ position: "relative", width: "100%", maxWidth: "1000px", background: "#fff", borderRadius: "32px", overflow: "hidden", display: "flex", boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)", zIndex: 10002, maxHeight: "90vh" }}
          >
            {/* Close Button */}
            <button 
              onClick={closeModal}
              style={{ position: "absolute", top: "24px", right: "24px", background: "rgba(0,0,0,0.05)", border: "none", width: "40px", height: "40px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", zIndex: 110, transition: "all 0.2s" }}
              onMouseEnter={(e) => e.currentTarget.style.background = "rgba(0,0,0,0.1)"}
              onMouseLeave={(e) => e.currentTarget.style.background = "rgba(0,0,0,0.05)"}
            >
              <FiX size={20} color="#111827" />
            </button>

            {/* Left Sidebar */}
            <div className="apply-modal-sidebar" style={{ flex: "0 0 40%", background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)", padding: "60px 48px", color: "#fff", display: "flex", flexDirection: "column", justifyContent: "center", position: "relative" }}>
              <div style={{ position: "relative", zIndex: 2 }}>
                <div style={{ background: "rgba(255,255,255,0.2)", width: "56px", height: "56px", borderRadius: "16px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "24px" }}>
                  <FiAward size={28} />
                </div>
                <h2 style={{ fontSize: "2rem", fontWeight: 800, lineHeight: 1.2, marginBottom: "24px" }}>
                  Predict Your <span style={{ color: "#fbbf24" }}>Admission</span> Chances
                </h2>
                <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                  {[
                    "Personalised Expert Counselling",
                    "Detailed Admission Report",
                    "College Matching Analysis"
                  ].map((text, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      <div style={{ width: "24px", height: "24px", borderRadius: "50%", background: "rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <FiCheck size={14} />
                      </div>
                      <span style={{ fontWeight: 500, opacity: 0.9 }}>{text}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ position: "absolute", bottom: "-40px", right: "-40px", width: "200px", height: "200px", borderRadius: "50%", background: "rgba(255,255,255,0.05)" }} />
            </div>

            {/* Right Side: Form */}
            <div className="apply-modal-form-side" style={{ flex: 1, padding: "60px 48px 40px", overflowY: "auto", background: "#fcfbf7" }}>
              {step === "form" && (
                <>
                  <div style={{ marginBottom: "36px" }}>
                    <h4 style={{ fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "#6b7280", marginBottom: "12px", fontWeight: 700 }}>
                      Looking for admission
                    </h4>
                    <h2 style={{ fontSize: "1.75rem", fontWeight: 800, color: "#111827" }}>
                      Apply to {collegeName}
                    </h2>
                  </div>

                  {error && (
                    <div style={{ padding: "12px 16px", background: "#fef2f2", border: "1px solid #fee2e2", borderRadius: "12px", color: "#ef4444", fontSize: "0.9rem", marginBottom: "24px", display: "flex", alignItems: "center", gap: "8px" }}>
                      <FiAlertCircle size={18} /> {error}
                    </div>
                  )}

                  <form onSubmit={handleSubmit} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
                    <div style={{ gridColumn: "1 / -1", display: "flex", flexDirection: "column", gap: "8px" }}>
                      <label style={{ fontSize: "0.85rem", fontWeight: 600, color: "#374151" }}>Full Name</label>
                      <input name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Enter your full name" style={getInputStyle(!!fieldErrors.fullName)} />
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                      <label style={{ fontSize: "0.85rem", fontWeight: 600, color: "#374151" }}>Email</label>
                      <input name="email" value={formData.email} onChange={handleChange} placeholder="email@example.com" style={getInputStyle(!!fieldErrors.email)} />
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                      <label style={{ fontSize: "0.85rem", fontWeight: 600, color: "#374151" }}>Phone</label>
                      <input name="phone" value={formData.phone} onChange={handleChange} placeholder="10-digit mobile number" style={getInputStyle(!!fieldErrors.phone)} />
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                      <label style={{ fontSize: "0.85rem", fontWeight: 600, color: "#374151" }}>State</label>
                      <select name="state" value={formData.state} onChange={handleChange} style={getInputStyle(!!fieldErrors.state)}>
                        <option value="" disabled>Select State</option>
                        {states.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                      <label style={{ fontSize: "0.85rem", fontWeight: 600, color: "#374151" }}>City</label>
                      <input name="city" value={formData.city} onChange={handleChange} placeholder="Enter your city" style={getInputStyle(false)} />
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                      <label style={{ fontSize: "0.85rem", fontWeight: 600, color: "#374151" }}>Interested Course</label>
                      <select name="course" value={formData.course} onChange={handleChange} style={getInputStyle(!!fieldErrors.course)}>
                        <option value="" disabled>Select Course</option>
                        <option value="B.Tech">Engineering (B.Tech)</option>
                        <option value="MBBS">Medical (MBBS)</option>
                        <option value="MBA">Management (MBA)</option>
                        <option value="Law">Law (LLB)</option>
                        <option value="BCA">Arts & Science (BCA)</option>
                      </select>
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                      <label style={{ fontSize: "0.85rem", fontWeight: 600, color: "#374151" }}>Specialization</label>
                      <input name="specialization" value={formData.specialization} onChange={handleChange} placeholder="e.g. Finance, CSE" style={getInputStyle(false)} />
                    </div>

                    <button type="submit" className="btn btn-primary" style={{ gridColumn: "1 / -1", marginTop: "12px", padding: "16px", borderRadius: "12px", background: "#f59e0b", color: "#fff", fontWeight: 700, fontSize: "1.1rem" }}>
                      SEND INQUIRY <FiSend size={18} style={{ marginLeft: "8px" }} />
                    </button>
                  </form>
                </>
              )}

              {step === "submitting" && (
                <div style={{ padding: "80px 0", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: "20px" }}>
                  <div style={{ width: "48px", height: "48px", border: "4px solid #e5e7eb", borderTopColor: "#4f46e5", borderRadius: "50%", animation: "spin 1s linear infinite" }} />
                  <p style={{ fontWeight: 600, color: "#6b7280" }}>Processing Inquiry...</p>
                </div>
              )}

              {step === "success" && (
                <div style={{ padding: "60px 0", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: "24px" }}>
                  <div style={{ background: "#ecfdf5", padding: "24px", borderRadius: "50%", color: "#10b981" }}>
                    <FiCheckCircle size={64} />
                  </div>
                  <h2 style={{ fontSize: "2rem", fontWeight: 800, color: "#111827" }}>Thank You!</h2>
                  <p style={{ fontSize: "1.1rem", color: "#4b5563", maxWidth: "400px", lineHeight: 1.6 }}>
                    Our expert counsellors will contact you shortly to help you with your admission journey at {collegeName}.
                  </p>
                </div>
              )}
            </div>
          </div>
          <style>{`
            @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
            @media (max-width: 768px) {
              .apply-modal-container { flex-direction: column !important; maxHeight: 95vh !important; }
              .apply-modal-sidebar { display: none !important; }
              .apply-modal-form-side { padding: 48px 24px 32px !important; }
              form { grid-template-columns: 1fr !important; gap: 16px !important; }
            }
          `}</style>
        </div>
      )}
    </>
  );
}

function getInputStyle(hasError: boolean): React.CSSProperties {
  return {
    padding: "12px 16px",
    background: "#fff",
    border: `1px solid ${hasError ? "#ef4444" : "#e5e7eb"}`,
    borderRadius: "12px",
    fontSize: "0.95rem",
    color: "#111827",
    outline: "none",
    transition: "border-color 0.2s",
  };
}
