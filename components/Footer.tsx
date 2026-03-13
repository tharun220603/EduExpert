"use client";

import Link from "next/link";
import { FiBook, FiGithub, FiTwitter, FiLinkedin } from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand */}
          <div className="footer-brand">
            <Link
              href="/"
              className="navbar-logo"
              style={{
                fontSize: "1.3rem",
                cursor: "pointer",
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <FiBook size={20} />
              <span> Edu Expert</span>
            </Link>

            <p>
              Your trusted guide to discovering top Southern Indian colleges,
              exams, and career-defining courses.
            </p>

            <div className="footer-social" style={{ marginTop: "16px" }}>
              <Link
                href="https://github.com/eduexpert"
                className="social-icon"
                aria-label="GitHub"
              >
                <FiGithub size={15} />
              </Link>
              <Link
                href="https://twitter.com/eduexpert"
                className="social-icon"
                aria-label="Twitter"
              >
                <FiTwitter size={15} />
              </Link>
              <Link
                href="https://linkedin.com/company/eduexpert"
                className="social-icon"
                aria-label="LinkedIn"
              >
                <FiLinkedin size={15} />
              </Link>
            </div>

            <div style={{ marginTop: "24px" }}>
              <p
                style={{
                  margin: 0,
                  fontWeight: 600,
                  color: "rgba(255,255,255,0.7)",
                }}
              >
                Questions?
              </p>
              <a
                href="tel:+911800123456"
                style={{
                  color: "var(--accent-light)",
                  textDecoration: "none",
                  fontWeight: 700,
                  fontSize: "1.1rem",
                }}
              >
                +91 1800 123 456
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul>
              <li>
                <Link href="/about">About Us</Link>
              </li>
              <li>
                <Link href="/colleges">All Colleges</Link>
              </li>
              <li>
                <Link href="/apply">Apply Now</Link>
              </li>
              <li>
                <Link href="/contact">Contact Us</Link>
              </li>
              <li>
                <Link href="/privacy">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/terms">Terms & Conditions</Link>
              </li>
            </ul>
          </div>

          {/* Exams */}
          <div className="footer-col">
            <Link href="/exams" style={{ textDecoration: "none" }}>
              <h4>Exams</h4>
            </Link>
            <ul>
              <li>
                <Link href="/exams/1">JEE Main &amp; Advanced</Link>
              </li>
              <li>
                <Link href="/exams/6">NEET UG</Link>
              </li>
              <li>
                <Link href="/exams/3">TANCET</Link>
              </li>
              <li>
                <Link href="/exams/8">CAT</Link>
              </li>
            </ul>
          </div>

          {/* Courses */}
          <div className="footer-col">
            <Link href="/courses" style={{ textDecoration: "none" }}>
              <h4>Courses</h4>
            </Link>
            <ul>
              <li>
                <Link href="/courses/1">B.Tech CSE</Link>
              </li>
              <li>
                <Link href="/courses/6">MBBS</Link>
              </li>
              <li>
                <Link href="/courses/12">MBA</Link>
              </li>
              <li>
                <Link href="/courses/9">B.Com</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="footer-bottom">
          <p>
            © 2026 EduExpert. Guiding South India&apos;s brightest minds. 🎓
          </p>
          <p style={{ color: "var(--text-muted)", fontSize: "0.8rem" }}>
            Data for reference only. Verify from official sources.
          </p>
        </div>
      </div>
    </footer>
  );
}
