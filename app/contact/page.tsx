"use client";

import { useRef, useState } from "react";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiSend,
  FiClock,
} from "react-icons/fi";
import locations from "@/data/locations";
import AntiGravityButton from "@/components/AntiGravityButton";
import {
  usePageHeroEntrance,
  useScrollReveal,
} from "@/hooks/useGsapAnimations";
import {
  type ContactFormData,
  type FormErrors,
  sanitizeContactFormData,
  validateContactField,
  validateContactForm,
} from "@/utils/formValidation";

export default function ContactPage() {
  const heroRef = useRef<HTMLElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  usePageHeroEntrance(heroRef);
  useScrollReveal(infoRef, { y: 30 });
  useScrollReveal(formRef, { y: 30 });

  const [formState, setFormState] = useState<ContactFormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [fieldErrors, setFieldErrors] = useState<FormErrors<ContactFormData>>({});
  const [formError, setFormError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const field = name as keyof ContactFormData;

    setFormState((current) => ({ ...current, [field]: value }));
    setFieldErrors((current) => ({ ...current, [field]: "" }));
    if (formError) setFormError("");
  };

  const handleBlur = (field: keyof ContactFormData) => {
    const fieldError = validateContactField(field, formState);
    setFieldErrors((current) => ({ ...current, [field]: fieldError }));
  };

  const getInputStyle = (field: keyof ContactFormData): React.CSSProperties => ({
    width: "100%",
    padding: "12px 16px",
    borderRadius: "12px",
    border: `1px solid ${fieldErrors[field] ? "rgba(239, 68, 68, 0.45)" : "var(--border)"}`,
    background: "var(--bg-main)",
    fontSize: "0.95rem",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateContactForm(formState);

    if (Object.keys(validationErrors).length > 0) {
      setFieldErrors(validationErrors);
      setFormError("Please fix the highlighted fields before sending your message.");
      return;
    }

    const sanitizedData = sanitizeContactFormData(formState);
    setFormState(sanitizedData);
    setFieldErrors({});
    setFormError("");
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
    setFormState({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="page-wrapper">
      {/* ── HERO SECTION ── */}
      <section
        className="page-hero page-hero-textured page-hero-banner-contact"
        ref={heroRef}
        style={{
          position: "relative",
          padding: "100px 0 60px 0",
          overflow: "hidden",
        }}
      >
        <div
          className="page-hero-media"
          style={{
            backgroundImage: "url('/contact_banner.jpg')",
          }}
        />
        <div className="page-hero-tint" />
        <div className="page-hero-texture" />
        <div className="page-hero-vignette" />
        <div className="container page-hero-textured-content">
          <div
            className="page-hero-content"
            style={{ maxWidth: "800px", margin: "0" }}
          >
            <span className="badge badge-blue">📞 CONTACT US</span>
            <h1
              style={{
                fontSize: "clamp(2.5rem, 6vw, 4rem)",
                fontWeight: 800,
                color: "white",
                marginBottom: "24px",
              }}
            >
              Get in Touch with Our Experts
            </h1>
            <p
              style={{
                fontSize: "1.2rem",
                color: "white",
                lineHeight: 1.6,
              }}
            >
              Whether you have questions about admissions, exams, or career
              guidance, we&apos;re here to help you every step of the way.
            </p>
          </div>
        </div>
      </section>

      {/* ── CONTACT CONTENT ── */}
      <section className="section" style={{ paddingTop: 25 }}>
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "60px",
              alignItems: "start",
            }}
          >
            {/* LEFT: INFO & LOCATIONS */}
            <div ref={infoRef}>
              <h2
                style={{
                  fontSize: "1.8rem",
                  fontWeight: 800,
                  marginBottom: "32px",
                  color: "var(--text-primary)",
                }}
              >
                Our Offices
              </h2>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "24px",
                }}
              >
                {locations.map((loc) => (
                  <div
                    key={loc.id}
                    className="card"
                    style={{
                      padding: "24px",
                      border: "1px solid var(--border)",
                      background: "#ffffff",
                      transition: "transform 0.3s ease, border-color 0.3s ease",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        gap: "16px",
                        alignItems: "start",
                      }}
                    >
                      <div
                        style={{
                          width: "48px",
                          height: "48px",
                          borderRadius: "12px",
                          background: `${loc.color}10`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "1.5rem",
                          flexShrink: 0,
                        }}
                      >
                        {loc.emoji}
                      </div>
                      <div style={{ flex: 1 }}>
                        <h3
                          style={{
                            fontSize: "1.15rem",
                            fontWeight: 700,
                            color: "var(--text-primary)",
                            marginBottom: "4px",
                          }}
                        >
                          {loc.city} Office
                        </h3>
                        <p
                          style={{
                            fontSize: "0.9rem",
                            color: "var(--text-mid)",
                            marginBottom: "12px",
                            lineHeight: 1.5,
                          }}
                        >
                          {loc.address}
                        </p>

                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "8px",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "8px",
                              fontSize: "0.85rem",
                              color: "var(--text-primary)",
                            }}
                          >
                            <FiPhone size={14} color="var(--primary)" />{" "}
                            {loc.phone}
                          </div>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "8px",
                              fontSize: "0.85rem",
                              color: "var(--text-primary)",
                            }}
                          >
                            <FiMail size={14} color="var(--primary)" />{" "}
                            {loc.email}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div
                style={{
                  marginTop: "40px",
                  padding: "32px",
                  background: "var(--primary-light)",
                  borderRadius: "24px",
                  border: "1px solid var(--accent-pale)",
                }}
              >
                <h3
                  style={{
                    fontSize: "1.2rem",
                    fontWeight: 700,
                    color: "var(--primary)",
                    marginBottom: "16px",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <FiClock /> Working Hours
                </h3>
                <ul
                  style={{
                    listStyle: "none",
                    padding: 0,
                    margin: 0,
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                    color: "var(--text-primary)",
                    fontSize: "0.95rem",
                  }}
                >
                  <li
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <span>Mon - Sat:</span> <strong>9:30 AM - 6:30 PM</strong>
                  </li>
                  <li
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <span>Sunday:</span> <strong>Closed</strong>
                  </li>
                </ul>
              </div>
            </div>

            {/* RIGHT: CONTACT FORM & MAP */}
            <div ref={formRef} style={{ position: "sticky", top: "100px" }}>
              <div
                className="card"
                style={{
                  padding: "40px",
                  border: "1px solid var(--border)",
                  background: "#ffffff",
                  boxShadow: "0 20px 50px rgba(0,0,0,0.04)",
                  borderRadius: "32px",
                  marginBottom: "32px",
                }}
              >
                <div style={{ marginBottom: "32px" }}>
                  <h2
                    style={{
                      fontSize: "1.8rem",
                      fontWeight: 800,
                      color: "var(--text-primary)",
                      marginBottom: "8px",
                    }}
                  >
                    Send a Message
                  </h2>
                  <p
                    style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}
                  >
                    Fill out the form below and we&apos;ll get back to you within 24
                    hours.
                  </p>
                </div>

                <form
                  onSubmit={handleSubmit}
                  noValidate
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "20px",
                  }}
                >
                  {formError && (
                    <div
                      style={{
                        padding: "12px 16px",
                        background: "rgba(239, 68, 68, 0.1)",
                        border: "1px solid rgba(239, 68, 68, 0.3)",
                        borderRadius: "12px",
                        color: "var(--error)",
                        fontSize: "0.9rem",
                      }}
                    >
                      {formError}
                    </div>
                  )}

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "16px",
                    }}
                  >
                    <div className="form-group">
                      <label
                        style={{
                          display: "block",
                          fontSize: "0.85rem",
                          fontWeight: 600,
                          color: "var(--text-primary)",
                          marginBottom: "8px",
                        }}
                      >
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        placeholder="John Doe"
                        value={formState.name}
                        onChange={handleChange}
                        onBlur={() => handleBlur("name")}
                        autoComplete="name"
                        maxLength={60}
                        aria-invalid={Boolean(fieldErrors.name)}
                        style={getInputStyle("name")}
                      />
                      {fieldErrors.name && (
                        <div style={{ color: "var(--error)", fontSize: "0.8rem", marginTop: "8px" }}>
                          {fieldErrors.name}
                        </div>
                      )}
                    </div>
                    <div className="form-group">
                      <label
                        style={{
                          display: "block",
                          fontSize: "0.85rem",
                          fontWeight: 600,
                          color: "var(--text-primary)",
                          marginBottom: "8px",
                        }}
                      >
                        Email ID
                      </label>
                      <input
                        type="email"
                        name="email"
                        placeholder="john@example.com"
                        value={formState.email}
                        onChange={handleChange}
                        onBlur={() => handleBlur("email")}
                        autoComplete="email"
                        maxLength={254}
                        aria-invalid={Boolean(fieldErrors.email)}
                        style={getInputStyle("email")}
                      />
                      {fieldErrors.email && (
                        <div style={{ color: "var(--error)", fontSize: "0.8rem", marginTop: "8px" }}>
                          {fieldErrors.email}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="form-group">
                    <label
                      style={{
                        display: "block",
                        fontSize: "0.85rem",
                        fontWeight: 600,
                        color: "var(--text-primary)",
                        marginBottom: "8px",
                      }}
                    >
                      Subject
                    </label>
                    <select
                      name="subject"
                      value={formState.subject}
                      onChange={handleChange}
                      onBlur={() => handleBlur("subject")}
                      aria-invalid={Boolean(fieldErrors.subject)}
                      style={getInputStyle("subject")}
                    >
                      <option value="">Select a Topic</option>
                      <option value="Admission">Admission Query</option>
                      <option value="Exam">Exam Details</option>
                      <option value="Counselling">Personal Counselling</option>
                      <option value="Other">Other</option>
                    </select>
                    {fieldErrors.subject && (
                      <div style={{ color: "var(--error)", fontSize: "0.8rem", marginTop: "8px" }}>
                        {fieldErrors.subject}
                      </div>
                    )}
                  </div>

                  <div className="form-group">
                    <label
                      style={{
                        display: "block",
                        fontSize: "0.85rem",
                        fontWeight: 600,
                        color: "var(--text-primary)",
                        marginBottom: "8px",
                      }}
                    >
                      Message
                    </label>
                    <textarea
                      name="message"
                      rows={4}
                      placeholder="How can we help you?"
                      value={formState.message}
                      onChange={handleChange}
                      onBlur={() => handleBlur("message")}
                      maxLength={1000}
                      aria-invalid={Boolean(fieldErrors.message)}
                      style={{
                        ...getInputStyle("message"),
                        resize: "none",
                      }}
                    />
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        gap: "12px",
                        marginTop: "8px",
                      }}
                    >
                      <span style={{ color: "var(--error)", fontSize: "0.8rem" }}>
                        {fieldErrors.message || ""}
                      </span>
                      <span style={{ color: "var(--text-muted)", fontSize: "0.8rem" }}>
                        {formState.message.trim().length}/1000
                      </span>
                    </div>
                  </div>

                  <AntiGravityButton
                    type="submit"
                    variant="primary"
                    style={{
                      width: "100%",
                      padding: "14px",
                      justifyContent: "center",
                    }}
                  >
                    {submitted ? (
                      "Message Sent! ✓"
                    ) : (
                      <>
                        <FiSend /> Send Message
                      </>
                    )}
                  </AntiGravityButton>
                </form>

                <div
                  style={{
                    marginTop: "32px",
                    paddingTop: "24px",
                    borderTop: "1px solid var(--border)",
                    display: "flex",
                    gap: "20px",
                    justifyContent: "center",
                  }}
                >
                  <div style={{ textAlign: "center" }}>
                    <div
                      style={{
                        fontSize: "0.7rem",
                        color: "var(--text-muted)",
                        textTransform: "uppercase",
                        fontWeight: 700,
                        marginBottom: "4px",
                      }}
                    >
                      Hotline
                    </div>
                    <div
                      style={{
                        fontSize: "0.9rem",
                        fontWeight: 700,
                        color: "var(--text-primary)",
                      }}
                    >
                      1800-123-4567
                    </div>
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <div
                      style={{
                        fontSize: "0.7rem",
                        color: "var(--text-muted)",
                        textTransform: "uppercase",
                        fontWeight: 700,
                        marginBottom: "4px",
                      }}
                    >
                      Support
                    </div>
                    <div
                      style={{
                        fontSize: "0.9rem",
                        fontWeight: 700,
                        color: "var(--text-primary)",
                      }}
                    >
                      support@eduexpert.com
                    </div>
                  </div>
                </div>
              </div>

              {/* CHENNAI MAP CARD */}
              <div
                className="card"
                style={{
                  padding: "24px",
                  border: "1px solid var(--border)",
                  background: "#ffffff",
                  boxShadow: "0 15px 35px rgba(0,0,0,0.03)",
                  borderRadius: "28px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    marginBottom: "16px",
                  }}
                >
                  <div
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "10px",
                      background: "rgba(30, 64, 175, 0.1)",
                      color: "#1e40af",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <FiMapPin size={18} />
                  </div>
                  <div>
                    <h3
                      style={{
                        fontSize: "1rem",
                        fontWeight: 700,
                        color: "var(--text-primary)",
                      }}
                    >
                      Chennai Head Office
                    </h3>
                    <p
                      style={{
                        fontSize: "0.75rem",
                        color: "var(--text-muted)",
                      }}
                    >
                      Anna Salai, Chennai
                    </p>
                  </div>
                </div>
                <div
                  style={{
                    borderRadius: "16px",
                    overflow: "hidden",
                    height: "250px",
                    border: "1px solid var(--border)",
                  }}
                >
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.516591!2d80.26!3d13.064!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a52662057a66f21%3A0xe54ce08398816c14!2sSpencer%20Plaza!5e0!3m2!1sen!2sin!4v1708518000000!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── MAP PLACEHOLDER / CALL ── */}
      <section
        className="section-sm"
        style={{
          background: "var(--bg-section)",
          borderTop: "1px solid var(--border)",
        }}
      ></section>
    </div>
  );
}
