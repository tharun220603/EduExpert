"use client";

import { motion } from "framer-motion";
import { College } from "@/data/colleges";
import { FiMapPin, FiStar, FiTrendingUp } from "react-icons/fi";
import { useRouter } from "next/navigation";

interface CollegeMarqueeRowProps {
  colleges: College[];
  direction?: "left" | "right";
  duration?: number;
}

function MarqueeCard({ college }: { college: College }) {
  const router = useRouter();
  const bgImage = college.image || "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=800";

  return (
    <div
      onClick={() => router.push(`/college/${college.slug || college.id}`)}
      style={{
        flex: "0 0 380px",
        height: "480px",
        background: "#ffffff",
        borderRadius: "24px",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        border: "1px solid var(--border)",
        boxShadow: "0 10px 30px rgba(0,0,0,0.04)",
        cursor: "pointer",
        margin: "0 12px",
        transition: "all 0.3s ease",
      }}
      className="marquee-college-card"
    >
      <div style={{ height: "55%", position: "relative", overflow: "hidden" }}>
        <img
          src={bgImage}
          alt={college.name}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
        <div style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 50%)"
        }} />
        
        {college.nirfRank && (
          <div style={{
            position: "absolute",
            top: "16px",
            left: "16px",
            background: "rgba(255,255,255,0.9)",
            padding: "4px 12px",
            borderRadius: "50px",
            display: "flex",
            alignItems: "center",
            gap: "4px",
            fontSize: "0.75rem",
            fontWeight: 700,
            color: "var(--text-primary)"
          }}>
            <FiTrendingUp color="var(--primary)" /> NIRF #{college.nirfRank}
          </div>
        )}
      </div>

      <div style={{ padding: "24px", display: "flex", flexDirection: "column", flex: 1 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
          <span className="badge badge-blue" style={{ fontSize: "0.7rem" }}>{college.type}</span>
          <div style={{ display: "flex", alignItems: "center", gap: "4px", color: "var(--warning)", fontWeight: 700, fontSize: "0.9rem" }}>
            <FiStar fill="currentColor" size={14} />
            <span>{college.rating}</span>
          </div>
        </div>

        <h3 style={{ fontSize: "1.25rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: "6px", lineHeight: 1.3 }}>
          {college.name}
        </h3>

        <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "var(--text-muted)", fontSize: "0.85rem", marginTop: "auto" }}>
          <FiMapPin color="var(--primary)" size={14} />
          {college.city}, {college.state}
        </div>
      </div>
    </div>
  );
}

export default function CollegeMarqueeRow({ 
  colleges, 
  direction = "left", 
  duration = 40 
}: CollegeMarqueeRowProps) {
  const scrollVariants = {
    animate: {
      x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop" as const,
          duration: duration,
          ease: "linear" as const,
        },
      },
    },
  };

  const doubledColleges = [...colleges, ...colleges];

  return (
    <div style={{
      overflow: "hidden",
      padding: "10px 0",
      width: "100%",
    }}>
      <motion.div
        style={{
          display: "flex",
          width: "max-content",
        }}
        variants={scrollVariants}
        animate="animate"
      >
        {doubledColleges.map((college, idx) => (
          <MarqueeCard key={`${college.id}-${idx}`} college={college} />
        ))}
      </motion.div>
    </div>
  );
}
