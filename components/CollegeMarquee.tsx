"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, useAnimation } from "framer-motion";
import colleges from "@/data/colleges";

export default function CollegeMarquee() {
  const logos = colleges.filter((c: any) => c.logo);
  const controls = useAnimation();
  const router = useRouter();

  useEffect(() => {
    controls.start({
      x: [0, -2500],
      transition: { repeat: Infinity, ease: "linear", duration: 45 },
    });
  }, [controls]);

  return (
    <div
      style={{
        width: "100%",
        overflow: "hidden",
        padding: "40px 0",
        background: "white",
        borderTop: "1px solid var(--border-light, #f1f5f9)",
      }}
    >
      <div
        style={{
          textAlign: "center",
          marginBottom: "24px",
          color: "var(--text-muted)",
          fontSize: "0.99 rem",
          textTransform: "uppercase",
          letterSpacing: "0.15em",
          fontWeight: 900,
        }}
      >
        Partnered with Elite Institutions
      </div>
      <div
        style={{ position: "relative", display: "flex", width: "fit-content" }}
      >
        <motion.div
          animate={controls}
          onMouseEnter={() => controls.stop()}
          onMouseLeave={() =>
            controls.start({
              x: [0, -2500],
              transition: { repeat: Infinity, ease: "linear", duration: 45 },
            })
          }
          style={{
            display: "flex",
            gap: "60px",
            alignItems: "center",
            paddingRight: "60px",
          }}
        >
          {[...logos, ...logos, ...logos, ...logos].map((college, idx) => (
            <div
              key={idx}
              onClick={() => router.push(`/college/${college.slug || college.id}`)}
              style={{
                flexShrink: 0,
                display: "flex",
                alignItems: "center",
                gap: "12px",
                opacity: 0.9,
                transition: "all 0.3s ease",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = "1";
                e.currentTarget.style.transform = "scale(1.05)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = "0.9";
                e.currentTarget.style.transform = "scale(1)";
              }}
            >
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  background: "#ffffff",
                  borderRadius: "10px",
                  padding: "4px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                  border: "1px solid #f1f5f9",
                }}
              >
                <img
                  src={college.logo}
                  alt={college.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
                />
              </div>
              <span
                style={{
                  fontSize: "1rem",
                  fontWeight: 900,
                  color: "#1e293b",
                  whiteSpace: "nowrap",
                }}
              >
                {college.name}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
