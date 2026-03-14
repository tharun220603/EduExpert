"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import blogPosts, { BlogPost } from "@/data/blog";
import ScrollFloatSection from "@/components/ScrollFloatSection";
import AntiGravityButton from "@/components/AntiGravityButton";
import {
  usePageHeroEntrance,
  useScrollReveal,
} from "@/hooks/useGsapAnimations";
import { FiClock, FiUser, FiCalendar, FiArrowRight } from "react-icons/fi";

function BlogCard({ post }: { post: BlogPost }) {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/blog/${post.slug}`)}
      className="college-card"
      style={{
        height: "100%",
        background: "#ffffff",
        borderRadius: "28px",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        border: "1px solid var(--border)",
        boxShadow: "0 8px 30px rgba(0,0,0,0.04)",
        transition: "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
        cursor: "pointer",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-8px)";
        e.currentTarget.style.borderColor = "var(--primary)";
        e.currentTarget.style.boxShadow = "0 20px 40px rgba(0,0,0,0.08)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.borderColor = "var(--border)";
        e.currentTarget.style.boxShadow = "0 8px 30px rgba(0,0,0,0.04)";
      }}
    >
      <div
        style={{
          padding: "28px",
          flex: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <span className="badge badge-blue">{post.category}</span>
          <div
            style={{
              display: "flex",
              gap: "16px",
              fontSize: "0.8rem",
              color: "var(--text-muted)",
              fontWeight: 600,
            }}
          >
            <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <FiCalendar size={14} /> {post.date}
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <FiClock size={14} /> {post.readTime}
            </span>
          </div>
        </div>

        <h3
          style={{
            fontSize: "1.25rem",
            fontWeight: 800,
            color: "var(--text-primary)",
            marginBottom: "16px",
            lineHeight: 1.4,
          }}
        >
          {post.title}
        </h3>

        <p
          style={{
            fontSize: "0.95rem",
            color: "var(--text-muted)",
            lineHeight: 1.6,
            marginBottom: "24px",
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {post.excerpt}
        </p>

        <div
          style={{
            marginTop: "auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: "20px",
            borderTop: "1px solid var(--border)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                background: "var(--primary-light)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--primary)",
                fontWeight: 700,
                fontSize: "0.8rem",
              }}
            >
              {post.author.charAt(0)}
            </div>
            <span
              style={{
                fontSize: "0.85rem",
                fontWeight: 700,
                color: "var(--text-primary)",
              }}
            >
              {post.author}
            </span>
          </div>
          <FiArrowRight size={18} color="var(--primary)" />
        </div>
      </div>
    </div>
  );
}

export default function BlogListingPage() {
  const heroRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState("All");

  usePageHeroEntrance(heroRef);
  useScrollReveal(gridRef, { y: 30 });

  const categories = [
    "All",
    ...Array.from(new Set(blogPosts.map((p) => p.category))),
  ];
  const filteredPosts =
    activeCategory === "All"
      ? blogPosts
      : blogPosts.filter((p) => p.category === activeCategory);

  return (
    <div className="page-wrapper">
      <section
        className="page-hero page-hero-textured page-hero-banner-blog"
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
            backgroundImage: "url('/blog_banner.png')",
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
            <span className="badge badge-blue" style={{ marginBottom: "20px" }}>
              📚 EDUEXPERT BLOG
            </span>
            <h1
              style={{
                fontSize: "clamp(2.5rem, 6vw, 4rem)",
                fontWeight: 800,
                color: "white",
                marginBottom: "24px",
              }}
            >
              Insights for Your Academic Journey
            </h1>
            <p
              style={{
                fontSize: "1.2rem",
                color: "white",
                lineHeight: 1.6,
              }}
            >
              Expert advice, admission guides, and the latest updates from the
              world of education.
            </p>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 20 }}>
        <div className="container">
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "12px",
              marginBottom: "60px",
              flexWrap: "wrap",
            }}
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`filter-tab ${activeCategory === cat ? "active" : ""}`}
                style={{
                  padding: "10px 24px",
                  borderRadius: "12px",
                  fontSize: "0.95rem",
                  fontWeight: 700,
                  transition: "all 0.3s ease",
                  border: "1px solid var(--border)",
                  background:
                    activeCategory === cat ? "var(--primary)" : "#ffffff",
                  color:
                    activeCategory === cat ? "#ffffff" : "var(--text-primary)",
                  cursor: "pointer",
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          <div
            ref={gridRef}
            className="cards-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
              gap: "32px",
            }}
          >
            {filteredPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
