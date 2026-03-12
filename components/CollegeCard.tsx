"use client";

import { useRef } from "react";
import { useRouter } from "next/navigation";
import { FiMapPin, FiStar, FiChevronRight } from "react-icons/fi";
import { College } from "@/data/colleges";

interface CollegeCardProps {
  college: College;
}

export default function CollegeCard({ college }: CollegeCardProps) {
  const router = useRouter();
  const cardRef = useRef<HTMLDivElement>(null);

  // Fallback high-quality unsplash images matched vaguely to college vibes
  const bgImage =
    college.image ||
    (college.type.includes("Engineering")
      ? "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=800"
      : college.type.includes("Medical")
        ? "https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&q=80&w=800"
        : "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=800");

  return (
    <div
      ref={cardRef}
      onClick={() => router.push(`/college/${college.slug || college.id}`)}
      className="college-card"
      style={{
        background: "#ffffff",
        border: "1px solid var(--border)",
        borderRadius: "24px",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        transition: "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
        boxShadow: "0 8px 30px rgba(0,0,0,0.04)",
      }}
    >
      {/* IMAGE SECTION */}
      <div
        className="college-image"
        style={{
          height: "220px",
          position: "relative",
          overflow: "hidden",
          flexShrink: 0,
        }}
      >
        <img
          src={bgImage}
          alt={college.name}
          loading="lazy"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: "transform 0.6s ease",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(0,0,0,0.3) 0%, transparent 60%)",
          }}
        />

        {/* Rating overlay */}
        <div
          style={{
            position: "absolute",
            top: "16px",
            right: "16px",
            background: "rgba(255,255,255,0.9)",
            backdropFilter: "blur(8px)",
            padding: "5px 10px",
            borderRadius: "10px",
            display: "flex",
            alignItems: "center",
            gap: "4px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            zIndex: 10,
          }}
        >
          <FiStar fill="#fbbf24" color="#fbbf24" size={14} />
          <span
            style={{
              fontSize: "0.85rem",
              fontWeight: 800,
              color: "var(--text-primary)",
            }}
          >
            {college.rating}
          </span>
        </div>

        {/* NIRF overlay */}
        {college.nirfRank && (
          <div
            style={{
              position: "absolute",
              top: "16px",
              left: "16px",
              background: "linear-gradient(135deg, #f59e0b, #d97706)",
              padding: "5px 12px",
              borderRadius: "10px",
              color: "white",
              fontSize: "0.75rem",
              fontWeight: 800,
              boxShadow: "0 4px 12px rgba(217,119,6,0.3)",
              zIndex: 10,
            }}
          >
            NIRF #{college.nirfRank}
          </div>
        )}

        {/* Logo overlay */}
        {college.logo && (
          <div
            style={{
              position: "absolute",
              bottom: "-20px",
              right: "20px",
              width: "56px",
              height: "56px",
              background: "#ffffff",
              borderRadius: "14px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
              zIndex: 15,
              padding: "8px",
              border: "1px solid var(--border)",
            }}
          >
            <img
              src={college.logo}
              alt="Logo"
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
            />
          </div>
        )}
      </div>

      {/* INFO SECTION */}
      <div
        style={{
          padding: "28px 20px 20px",
          display: "flex",
          flexDirection: "column",
          flex: 1,
        }}
      >
        <div style={{ marginBottom: "12px" }}>
          <span
            className="badge badge-blue"
            style={{ fontSize: "0.7rem", padding: "4px 10px" }}
          >
            {college.type}
          </span>
        </div>

        <h3
          style={{
            color: "var(--text-primary)",
            fontSize: "1.2rem",
            fontWeight: 800,
            marginBottom: "8px",
            lineHeight: 1.3,
            letterSpacing: "-0.01em",
          }}
        >
          {college.name}
        </h3>

        <p
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            color: "var(--text-muted)",
            fontSize: "0.85rem",
            marginBottom: "16px",
          }}
        >
          <FiMapPin size={15} color="var(--primary)" />
          <span style={{ fontWeight: 500 }}>
            {college.city}, {college.state}
          </span>
        </p>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "6px",
            marginBottom: "auto",
          }}
        >
          {college.highlights.slice(0, 2).map((h) => (
            <span
              key={h}
              style={{
                fontSize: "0.7rem",
                padding: "4px 10px",
                background: "#f8fafc",
                borderRadius: "8px",
                color: "var(--text-mid)",
                border: "1px solid var(--border)",
                fontWeight: 500,
              }}
            >
              {h}
            </span>
          ))}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid var(--border)",
            paddingTop: "16px",
            marginTop: "20px",
          }}
        >
          <div>
            <div
              style={{
                fontSize: "0.65rem",
                color: "var(--text-muted)",
                textTransform: "uppercase",
                fontWeight: 700,
                letterSpacing: "0.02em",
                marginBottom: "2px",
              }}
            >
              Avg Fees
            </div>
            <div
              style={{
                color: "var(--text-primary)",
                fontWeight: 800,
                fontSize: "1.05rem",
              }}
            >
              {college.fees}
            </div>
          </div>
          <div
            style={{
              fontSize: "0.9rem",
              color: "var(--primary)",
              fontWeight: 700,
              display: "flex",
              alignItems: "center",
              gap: "2px",
            }}
          >
            Details <FiChevronRight />
          </div>
        </div>
      </div>
    </div>
  );
}
