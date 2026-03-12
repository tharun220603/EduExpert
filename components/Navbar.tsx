"use client";

import { useRouter, usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { FiBook, FiMenu, FiX, FiSearch } from "react-icons/fi";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ApplyFormModal from "./ApplyFormModal";
import SearchModal from "./SearchModal";

gsap.registerPlugin(ScrollTrigger);

const navLinks = [
  { path: "/", label: "Home" },
  { path: "/colleges", label: "Colleges" },
  { path: "/exams", label: "Exams" },
  { path: "/courses", label: "Courses" },
  { path: "/about", label: "About" },
  { path: "/contact", label: "Contact" },
];

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);

  const handleNavigate = (path: string) => {
    router.push(path);
    setOpen(false);
  };

  // ── Scroll Progress Bar ──
  useEffect(() => {
    const el = progressRef.current;
    if (!el) return;

    gsap.set(el, { scaleX: 0, transformOrigin: "left center" });

    const tween = gsap.to(el, {
      scaleX: 1,
      ease: "none",
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.3,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <>
      <nav className="navbar">
        <div className="scroll-progress" ref={progressRef} />
        <div className="container">
          <div className="navbar-inner">
            {/* Logo */}
            <div
              className="navbar-logo"
              onClick={() => router.push("/")}
              style={{ cursor: "pointer" }}
            >
              <FiBook size={22} />
              Edu<span>Expert</span>
            </div>

            {/* Nav Links */}
            <div className={`navbar-links ${open ? "open" : ""}`}>
              {navLinks.map((link) => (
                <button
                  key={link.path}
                  onClick={() => handleNavigate(link.path)}
                  className={`nav-link ${pathname === link.path ? "active" : ""}`}
                >
                  {link.label}
                </button>
              ))}
            </div>

            {/* CTA + Hamburger */}
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <button 
                onClick={() => setSearchOpen(true)}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "var(--text-muted)",
                  padding: "8px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "50%",
                  transition: "all 0.2s"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "var(--accent)";
                  e.currentTarget.style.background = "var(--bg-section)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "var(--text-muted)";
                  e.currentTarget.style.background = "transparent";
                }}
              >
                <FiSearch size={20} />
              </button>

              <div className="hidden-mobile">
                <ApplyFormModal />
              </div>

              <button
                className="hamburger"
                onClick={() => setOpen((o) => !o)}
                aria-label="Menu"
              >
                {open ? <FiX size={22} /> : <FiMenu size={22} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
