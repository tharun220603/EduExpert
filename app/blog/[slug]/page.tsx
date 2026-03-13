"use client";

import { useParams, useRouter } from "next/navigation";
import blogPosts from "@/data/blog";
import { useRef, useEffect } from "react";
import AntiGravityButton from "@/components/AntiGravityButton";
import { FiArrowLeft, FiCalendar, FiClock, FiUser, FiShare2 } from "react-icons/fi";
import { usePageHeroEntrance, useScrollReveal } from "@/hooks/useGsapAnimations";
import SimpleMarkdown from "@/components/SimpleMarkdown";

export default function BlogPostDetail() {
  const { slug } = useParams();
  const router = useRouter();
  const post = blogPosts.find((p) => p.slug === slug);

  const heroRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  usePageHeroEntrance(heroRef);
  useScrollReveal(contentRef, { y: 20 });

  if (!post) {
    return (
      <div className="container" style={{ padding: "150px 0", textAlign: "center" }}>
        <h1>Post Not Found</h1>
        <p>Sorry, the blog post you are looking for doesn't exist.</p>
        <AntiGravityButton onClick={() => router.push("/blog")} variant="primary">
          Back to Blog
        </AntiGravityButton>
      </div>
    );
  }

  return (
    <div className="page-wrapper">
      <section 
        className="page-hero" 
        ref={heroRef}
        style={{ 
          padding: "120px 0 80px 0",
          background: "var(--bg-main)",
          borderBottom: "1px solid var(--border)",
          position: "relative",
          overflow: "hidden"
        }}
      >
        <div 
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundImage: "url('/blog_banner.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.05,
            zIndex: 0
          }}
        />
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div style={{ maxWidth: "800px", margin: "0 auto" }}>
            <button
              onClick={() => router.push("/blog")}
              style={{
                background: "transparent",
                border: "1px solid var(--border)",
                color: "var(--text-primary)",
                padding: "8px 16px",
                borderRadius: "10px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                cursor: "pointer",
                marginBottom: "40px",
                fontSize: "0.9rem",
                fontWeight: 600
              }}
            >
              <FiArrowLeft /> Back to Blog
            </button>
            <span className="badge badge-blue" style={{ marginBottom: "20px", display: "inline-block" }}>
              {post.category}
            </span>
            <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 800, marginBottom: "24px", lineHeight: 1.2, color: "var(--text-primary)" }}>
              {post.title}
            </h1>
            <div 
              style={{ 
                display: "flex", 
                gap: "24px", 
                flexWrap: "wrap",
                fontSize: "0.95rem",
                color: "var(--text-muted)",
                fontWeight: 600 
              }}
            >
              <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <FiUser /> {post.author}
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <FiCalendar /> {post.date}
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <FiClock /> {post.readTime}
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div 
            style={{ 
              maxWidth: "800px", 
              margin: "0 auto",
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: "40px"
            }}
          >
            <div 
              ref={contentRef}
              className="blog-content"
              style={{
                fontSize: "1.15rem",
                lineHeight: 1.8,
                color: "var(--text-primary)"
              }}
            >
              <SimpleMarkdown>{post.content}</SimpleMarkdown>
            </div>

            <div 
              style={{ 
                padding: "32px", 
                background: "var(--bg-section)", 
                borderRadius: "24px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                border: "1px solid var(--border)"
              }}
            >
              <div>
                <h4 style={{ fontWeight: 800, marginBottom: "4px" }}>Was this helpful?</h4>
                <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>Share this guide with your friends.</p>
              </div>
              <div style={{ display: "flex", gap: "12px" }}>
                <button 
                  style={{ 
                    width: "48px", 
                    height: "48px", 
                    borderRadius: "12px", 
                    background: "#ffffff", 
                    border: "1px solid var(--border)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    color: "var(--primary)"
                  }}
                >
                  <FiShare2 size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
