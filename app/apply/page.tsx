"use client";

export const dynamic = "force-dynamic";

import React, { useRef, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  usePageHeroEntrance,
  useScrollReveal,
} from "@/hooks/useGsapAnimations";
import AntiGravityButton from "@/components/AntiGravityButton";
import {
  type ApplyFormData,
  type FormErrors,
  sanitizeApplyFormData,
  validateApplyField,
  validateApplyForm,
} from "@/utils/formValidation";

function ApplyFormContent() {
  const heroRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  usePageHeroEntrance(heroRef);
  useScrollReveal(containerRef, { y: 40 });

  const searchParams = useSearchParams();
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FormErrors<ApplyFormData>>({});
  const [formData, setFormData] = useState<ApplyFormData>({
    fullName: "",
    email: "",
    phone: "",
    course: "",
    city: "",
    state: "",
    specialization: "",
  });

  const [states, setStates] = useState<{ id: number; name: string }[]>([]);
  const [cities, setCities] = useState<{ id: number; name: string }[]>([]);
  const [loadingStates, setLoadingStates] = useState(false);
  const [loadingCities, setLoadingCities] = useState(false);

  // Fetch States
  React.useEffect(() => {
    const fetchStates = async () => {
      setLoadingStates(true);
      try {
        const res = await fetch("/api/states?countryId=101");
        const data = await res.json();
        if (data.success) {
          setStates(data.data);
        }
      } catch (err) {
        console.error("Failed to fetch states:", err);
      } finally {
        setLoadingStates(false);
      }
    };
    fetchStates();
  }, []);

  // Fetch Cities when state changes
  const handleStateChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const stateName = e.target.value;
    const selectedState = states.find((s) => s.name === stateName);

    setFormData((prev) => ({ ...prev, state: stateName, city: "" }));
    setCities([]);
    setFieldErrors((prev) => ({ ...prev, state: "", city: "" }));

    if (selectedState) {
      setLoadingCities(true);
      try {
        const res = await fetch(`/api/cities?stateId=${selectedState.id}`);
        const data = await res.json();
        if (data.success) {
          setCities(data.data);
        }
      } catch (err) {
        console.error("Failed to fetch cities:", err);
      } finally {
        setLoadingCities(false);
      }
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    const field = name as keyof ApplyFormData;

    setFormData((current) => ({ ...current, [field]: value }));
    setFieldErrors((current) => ({ ...current, [field]: "" }));
    if (error) setError("");
  };

  const handleBlur = (field: keyof ApplyFormData) => {
    const fieldError = validateApplyField(field, formData, {
      requireCity: true,
    });
    setFieldErrors((current) => ({ ...current, [field]: fieldError }));
  };

  const getInputStyle = (field: keyof ApplyFormData): React.CSSProperties => ({
    width: "100%",
    padding: "14px 16px",
    borderRadius: "12px",
    border: `1px solid ${fieldErrors[field] ? "rgba(239, 68, 68, 0.45)" : "var(--border)"}`,
    background: "var(--bg-card)",
    color: "var(--text)",
    outline: "none",
    transition: "all 0.2s",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateApplyForm(formData, { requireCity: true });

    if (Object.keys(validationErrors).length > 0) {
      setFieldErrors(validationErrors);
      setError("Please fix the highlighted fields.");
      return;
    }

    setSubmitting(true);
    setError("");
    const sanitizedData = sanitizeApplyFormData(formData);

    const utm_source = searchParams.get("utm_source") || "Web_Site";
    const utm_medium = searchParams.get("utm_medium") || "Google_Ads";
    const utm_campaign = searchParams.get("utm_campaign") || "Google_Ads_CC";

    const payload = {
      lead_type: "CSL",
      name: sanitizedData.fullName,
      email: sanitizedData.email,
      clg_id: null,
      phone: sanitizedData.phone,
      father_name: null,
      gender: null,
      country: 91,
      state: sanitizedData.state || null,
      city: sanitizedData.city || null,
      course: sanitizedData.course,
      specialization: sanitizedData.specialization || null,
      source: "Web_API",
      utm_source: utm_source,
      utm_medium: utm_medium,
      utm_campaign: utm_campaign,
    };

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const responseData = await response.json();
      console.log("API Response:", responseData);

      // 1. Check for "Already Registered" keywords first
      const message = responseData.message?.toLowerCase() || "";
      const isAlreadyRegistered =
        message.includes("registered") ||
        message.includes("already") ||
        message.includes("exists") ||
        message.includes("completed") ||
        response.status === 409 ||
        (responseData.code === 400 &&
          responseData.success === true &&
          message.includes("exists"));

      if (isAlreadyRegistered) {
        setError("Already Registered ");
        setSubmitting(false);
        return;
      }

      // 2. Check for Success
      if (
        response.status === 201 ||
        (response.status === 200 && responseData.success)
      ) {
        setFormData(sanitizedData);
        setFieldErrors({});
        setSubmitted(true);
      } else {
        // 3. Fallback to Internal Server Error
        console.error("Lead API Error:", responseData);
        setError("Internal Server Error");
      }
    } catch (err) {
      console.error("Submission Exception:", err);
      setError("Internal Server Error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <section
        className="page-hero apply-page-container"
        ref={heroRef}
        style={{ padding: "80px 20px" }}
      >
        <div className="container">
          <div
            className="page-hero-content"
            style={{ textAlign: "center", margin: "0 auto" }}
          >
            <span className="badge badge-green">🚀 Start Your Journey</span>
            <h1>
              Apply <span>Now</span>
            </h1>
            <p style={{ margin: "0 auto", maxWidth: "600px" }}>
              Take the first step towards your dream college. Fill out the
              application form below and our counselors will guide you through
              the admission process.
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
              overflow: "hidden",
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
                  background:
                    "linear-gradient(to right, rgba(15, 23, 42, 0.4), var(--bg-hero))",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: "40px",
                  left: "40px",
                  right: "40px",
                  zIndex: 2,
                }}
              >
                <div
                  style={{ display: "flex", gap: "12px", marginBottom: "16px" }}
                >
                  <span
                    className="badge badge-amber"
                    style={{
                      backdropFilter: "blur(10px)",
                      background: "rgba(245, 158, 11, 0.2)",
                    }}
                  >
                    100% Free Counseling
                  </span>
                  <span
                    className="badge badge-blue"
                    style={{
                      backdropFilter: "blur(10px)",
                      background: "rgba(59, 130, 246, 0.2)",
                    }}
                  >
                    Verified Colleges
                  </span>
                </div>
                <h3
                  style={{
                    fontSize: "2rem",
                    color: "var(--white)",
                    marginBottom: "12px",
                    lineHeight: 1.2,
                  }}
                >
                  Your Future Starts Here.
                </h3>
                <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "1rem" }}>
                  Join over 10,000+ students who have successfully secured
                  admissions in top Southern Indian institutions through
                  EduExpert.
                </p>
              </div>
            </div>

            {/* Right Form Pane */}
            <div
              className="apply-form-card"
              style={{ padding: "48px 40px", background: "var(--bg-main)" }}
            >
              {submitted ? (
                <div
                  style={{
                    textAlign: "center",
                    padding: "60px 0",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <div
                    style={{
                      fontSize: "4rem",
                      marginBottom: "24px",
                      animation: "pulse 2s infinite",
                    }}
                  >
                    ✅
                  </div>
                  <h2
                    style={{
                      color: "var(--accent)",
                      marginBottom: "16px",
                      fontSize: "1.8rem",
                    }}
                  >
                    Application Received!
                  </h2>
                  <p style={{ color: "var(--text-mid)", lineHeight: 1.6 }}>
                    Thank you for choosing EduExpert. One of our expert
                    admission counselors will contact you shortly on the
                    provided phone number to proceed with your application.
                  </p>
                </div>
              ) : (
                <>
                  <h3
                    style={{
                      fontSize: "1.4rem",
                      color: "var(--text)",
                      marginBottom: "8px",
                    }}
                  >
                    Student Details
                  </h3>
                  <p
                    style={{
                      color: "var(--text-muted)",
                      fontSize: "0.9rem",
                      marginBottom: "32px",
                    }}
                  >
                    Complete the form below to receive personalized guidance.
                  </p>

                  {error && (
                    <div
                      style={{
                        padding: "12px 16px",
                        background: "rgba(239, 68, 68, 0.1)",
                        border: "1px solid rgba(239, 68, 68, 0.3)",
                        borderRadius: "12px",
                        color: "#f87171",
                        fontSize: "0.9rem",
                        marginBottom: "20px",
                      }}
                    >
                      {error}
                    </div>
                  )}

                  <form
                    onSubmit={handleSubmit}
                    noValidate
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "24px",
                    }}
                  >
                    <div>
                      <label
                        style={{
                          display: "block",
                          marginBottom: "8px",
                          fontWeight: "600",
                          fontSize: "0.9rem",
                          color: "var(--text-mid)",
                        }}
                      >
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        onBlur={() => handleBlur("fullName")}
                        placeholder="Enter your full name"
                        autoComplete="name"
                        maxLength={60}
                        aria-invalid={Boolean(fieldErrors.fullName)}
                        style={getInputStyle("fullName")}
                        onFocus={(e) =>
                          (e.target.style.borderColor = "var(--accent)")
                        }
                        onBlurCapture={(e) => {
                          e.currentTarget.style.borderColor =
                            fieldErrors.fullName
                              ? "rgba(239, 68, 68, 0.45)"
                              : "var(--border)";
                        }}
                      />
                      {fieldErrors.fullName && (
                        <div
                          style={{
                            color: "var(--error)",
                            fontSize: "0.8rem",
                            marginTop: "8px",
                          }}
                        >
                          {fieldErrors.fullName}
                        </div>
                      )}
                    </div>

                    <div>
                      <label
                        style={{
                          display: "block",
                          marginBottom: "8px",
                          fontWeight: "600",
                          fontSize: "0.9rem",
                          color: "var(--text-mid)",
                        }}
                      >
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        onBlur={() => handleBlur("email")}
                        placeholder="you@school.com"
                        autoComplete="email"
                        maxLength={254}
                        aria-invalid={Boolean(fieldErrors.email)}
                        style={getInputStyle("email")}
                        onFocus={(e) =>
                          (e.target.style.borderColor = "var(--accent)")
                        }
                        onBlurCapture={(e) => {
                          e.currentTarget.style.borderColor = fieldErrors.email
                            ? "rgba(239, 68, 68, 0.45)"
                            : "var(--border)";
                        }}
                      />
                      {fieldErrors.email && (
                        <div
                          style={{
                            color: "var(--error)",
                            fontSize: "0.8rem",
                            marginTop: "8px",
                          }}
                        >
                          {fieldErrors.email}
                        </div>
                      )}
                    </div>

                    <div
                      className="grid-cols-2-mobile"
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "16px",
                      }}
                    >
                      <div>
                        <label
                          style={{
                            display: "block",
                            marginBottom: "8px",
                            fontWeight: "600",
                            fontSize: "0.9rem",
                            color: "var(--text-mid)",
                          }}
                        >
                          State
                        </label>
                        <select
                          name="state"
                          value={formData.state}
                          onChange={handleStateChange}
                          onBlur={() => handleBlur("state")}
                          aria-invalid={Boolean(fieldErrors.state)}
                          style={{
                            ...getInputStyle("state"),
                            appearance: "none",
                          }}
                          disabled={loadingStates}
                        >
                          <option value="">
                            {loadingStates
                              ? "Loading States..."
                              : "Select State"}
                          </option>
                          {states.map((s) => (
                            <option key={s.id} value={s.name}>
                              {s.name}
                            </option>
                          ))}
                        </select>
                        {fieldErrors.state && (
                          <div
                            style={{
                              color: "var(--error)",
                              fontSize: "0.8rem",
                              marginTop: "8px",
                            }}
                          >
                            {fieldErrors.state}
                          </div>
                        )}
                      </div>

                      <div>
                        <label
                          style={{
                            display: "block",
                            marginBottom: "8px",
                            fontWeight: "600",
                            fontSize: "0.9rem",
                            color: "var(--text-mid)",
                          }}
                        >
                          City
                        </label>
                        <select
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          onBlur={() => handleBlur("city")}
                          style={getInputStyle("city")}
                          disabled={!formData.state || loadingCities}
                        >
                          <option value="">
                            {loadingCities
                              ? "Loading Cities..."
                              : "Select City"}
                          </option>
                          {cities.map((c) => (
                            <option key={c.id} value={c.name}>
                              {c.name}
                            </option>
                          ))}
                        </select>
                        {fieldErrors.city && (
                          <div
                            style={{
                              color: "var(--error)",
                              fontSize: "0.8rem",
                              marginTop: "8px",
                            }}
                          >
                            {fieldErrors.city}
                          </div>
                        )}
                      </div>
                    </div>

                    <div
                      className="grid-cols-2-mobile"
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "16px",
                      }}
                    >
                      <div>
                        <label
                          style={{
                            display: "block",
                            marginBottom: "8px",
                            fontWeight: "600",
                            fontSize: "0.9rem",
                            color: "var(--text-mid)",
                          }}
                        >
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          onBlur={() => handleBlur("phone")}
                          placeholder="+91 XXXXX XXXXX"
                          autoComplete="tel"
                          inputMode="numeric"
                          maxLength={16}
                          aria-invalid={Boolean(fieldErrors.phone)}
                          style={getInputStyle("phone")}
                          onFocus={(e) =>
                            (e.target.style.borderColor = "var(--accent)")
                          }
                          onBlurCapture={(e) => {
                            e.currentTarget.style.borderColor =
                              fieldErrors.phone
                                ? "rgba(239, 68, 68, 0.45)"
                                : "var(--border)";
                          }}
                        />
                        {fieldErrors.phone && (
                          <div
                            style={{
                              color: "var(--error)",
                              fontSize: "0.8rem",
                              marginTop: "8px",
                            }}
                          >
                            {fieldErrors.phone}
                          </div>
                        )}
                      </div>

                      <div>
                        <label
                          style={{
                            display: "block",
                            marginBottom: "8px",
                            fontWeight: "600",
                            fontSize: "0.9rem",
                            color: "var(--text-mid)",
                          }}
                        >
                          Course Stream
                        </label>
                        <select
                          name="course"
                          value={formData.course}
                          onChange={handleChange}
                          onBlur={() => handleBlur("course")}
                          aria-invalid={Boolean(fieldErrors.course)}
                          style={{
                            ...getInputStyle("course"),
                            appearance: "none",
                          }}
                          onFocus={(e) =>
                            (e.target.style.borderColor = "var(--accent)")
                          }
                          onBlurCapture={(e) => {
                            e.currentTarget.style.borderColor =
                              fieldErrors.course
                                ? "rgba(239, 68, 68, 0.45)"
                                : "var(--border)";
                          }}
                        >
                          <option value="">Interested in...</option>
                          <option value="Engineering">
                            Engineering (B.Tech / B.E)
                          </option>
                          <option value="Medical">Medical (MBBS / BDS)</option>
                          <option value="Arts">Arts & Science</option>
                          <option value="Management">
                            Management (BBA / MBA)
                          </option>
                          <option value="Law">Law (LLB)</option>
                        </select>
                        {fieldErrors.course && (
                          <div
                            style={{
                              color: "var(--error)",
                              fontSize: "0.8rem",
                              marginTop: "8px",
                            }}
                          >
                            {fieldErrors.course}
                          </div>
                        )}
                      </div>
                    </div>

                    <div>
                      <label
                        style={{
                          display: "block",
                          marginBottom: "8px",
                          fontWeight: "600",
                          fontSize: "0.9rem",
                          color: "var(--text-mid)",
                        }}
                      >
                        Specialization / Subject
                      </label>
                      <input
                        type="text"
                        name="specialization"
                        value={formData.specialization}
                        onChange={handleChange}
                        onBlur={() => handleBlur("specialization")}
                        placeholder="e.g. Computer Science, Finance, Cardiology"
                        maxLength={100}
                        aria-invalid={Boolean(fieldErrors.specialization)}
                        style={getInputStyle("specialization")}
                        onFocus={(e) =>
                          (e.target.style.borderColor = "var(--accent)")
                        }
                        onBlurCapture={(e) => {
                          e.currentTarget.style.borderColor =
                            fieldErrors.specialization
                              ? "rgba(239, 68, 68, 0.45)"
                              : "var(--border)";
                        }}
                      />
                      {fieldErrors.specialization && (
                        <div
                          style={{
                            color: "var(--error)",
                            fontSize: "0.8rem",
                            marginTop: "8px",
                          }}
                        >
                          {fieldErrors.specialization}
                        </div>
                      )}
                    </div>

                    <div style={{ marginTop: "8px" }}>
                      <AntiGravityButton
                        type="submit"
                        variant="primary"
                        style={{ width: "100%", padding: "16px" }}
                        disabled={submitting}
                      >
                        {submitting ? "Processing..." : "Submit Application"}
                      </AntiGravityButton>
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
        <style>{`
          @media (max-width: 768px) {
            .grid-cols-2-mobile { grid-template-columns: 1fr !important; gap: 24px !important; }
            .apply-page-container { padding: 40px 16px !important; }
            .apply-form-card { padding: 32px 20px !important; border-radius: 20px !important; }
          }
        `}</style>
      </section>
    </>
  );
}

export default function ApplyPage() {
  return (
    <Suspense fallback={null}>
      <ApplyFormContent />
    </Suspense>
  );
}
