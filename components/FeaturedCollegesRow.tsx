"use client";

import { useRef, useEffect } from "react";
import Slider from "react-slick";
import { College } from "@/data/colleges";
import {
  FiMapPin,
  FiStar,
  FiTrendingUp,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

interface FeaturedCollegesRowProps {
  colleges: College[];
}

function BigVerticalCard({ college }: { college: College }) {
  const router = useRouter();

  const bgImage =
    college.image ||
    (college.type.includes("Engineering")
      ? "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=800"
      : college.type.includes("Medical")
        ? "https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&q=80&w=800"
        : "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=800");

  return (
    <motion.div
      onClick={() => router.push(`/college/${college.id}`)}
      whileHover={{ y: -10, boxShadow: "0 20px 40px rgba(0,0,0,0.08)" }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      style={{
        margin: "15px",
        width: "90%",
        height: "390px",
        background: "#ffffff",
        borderRadius: "28px",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        border: "1px solid var(--border)",
        boxShadow: "0 12px 30px rgba(0,0,0,0.04)",
        cursor: "pointer",
      }}
    >
      {/* IMAGE */}
      <div
        style={{
          height: "300px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <img
          src={bgImage}
          alt={college.name}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: "transform 0.6s ease",
          }}
        />

        {/* Overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(0,0,0,0.25), transparent 100%)",
          }}
        />

        {/* College Type Tag */}
        <div
          style={{
            position: "absolute",
            top: "14px",
            left: "14px",
            background: "rgba(255,255,255,0.95)",
            backdropFilter: "blur(8px)",
            padding: "4px 9px",
            borderRadius: "8px",
            fontSize: "0.65rem",
            fontWeight: 700,
            color: "var(--primary)",
            border: "1px solid var(--border)",
          }}
        >
          {college.type}
        </div>

        {/* NIRF Tag */}
        {college.nirfRank && (
          <div
            style={{
              position: "absolute",
              top: "14px",
              left: "105px",
              background: "#ffffff",
              color: "#2b20c7",
              padding: "4px 9px",
              borderRadius: "8px",
              fontSize: "0.65rem",
              fontWeight: 700,
              display: "flex",
              alignItems: "center",
              gap: "4px",
            }}
          >
            <FiTrendingUp size={12} />
            NIRF #{college.nirfRank}
          </div>
        )}

        {/* Rating Tag */}
        <div
          style={{
            position: "absolute",
            top: "14px",
            right: "14px",
            background: "#ffffff",
            padding: "4px 9px",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            gap: "4px",
            fontWeight: 700,
            fontSize: "0.65rem",
          }}
        >
          <FiStar fill="#fbbf24" color="#fbbf24" size={12} />
          {college.rating}
        </div>
      </div>

      {/* CONTENT */}
      <div
        style={{
          padding: "26px",
          display: "flex",
          flexDirection: "column",
          flex: 1,
        }}
      >
        <h3
          style={{
            fontSize: "0.95rem",
            fontWeight: 800,
            marginBottom: "8px",
            color: "#111827",
            lineHeight: 1.4,
          }}
        >
          {college.name}
        </h3>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: "0.9rem",
            color: "#6b7280",
            marginBottom: "20px",
            gap: "6px",
          }}
        >
          <FiMapPin size={15} />
          {college.city}, {college.state}
        </div>

        <div style={{ marginTop: "auto" }}>
          <div
            style={{
              fontSize: "0.75rem",
              color: "#9ca3af",
              textTransform: "uppercase",
              fontWeight: 600,
            }}
          >
            Annual Fees
          </div>

          <div
            style={{
              fontSize: "1.2rem",
              fontWeight: 800,
              marginBottom: "16px",
            }}
          >
            {college.fees}
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "4px",
              color: "var(--primary)",
              fontWeight: 700,
              fontSize: "0.95rem",
            }}
          >
            View Details <FiChevronRight />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function FeaturedCollegesRow({
  colleges,
}: {
  colleges: College[];
}) {
  const sliderRef = useRef<Slider>(null);

  const settings = {
    dots: false,
    infinite: true,
    speed: 800,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    responsive: [
      { breakpoint: 1200, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div style={{ position: "relative", width: "100%" }}>
      <button
        onClick={() => sliderRef.current?.slickPrev()}
        style={{
          position: "absolute",
          left: "-60px",
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 10,
          width: "52px",
          height: "52px",
          borderRadius: "16px",
          border: "1px solid var(--border)",
          background: "rgba(255,255,255,0.9)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
        }}
      >
        <FiChevronLeft size={22} color="var(--primary)" />
      </button>

      <Slider ref={sliderRef} {...settings}>
        {[...colleges, ...colleges].map((college, idx) => (
          <div key={`${college.id}-${idx}`}>
            <BigVerticalCard college={college} />
          </div>
        ))}
      </Slider>

      <button
        onClick={() => sliderRef.current?.slickNext()}
        style={{
          position: "absolute",
          right: "-60px",
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 10,
          width: "52px",
          height: "52px",
          borderRadius: "16px",
          border: "1px solid var(--border)",
          background: "rgba(255,255,255,0.9)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
        }}
      >
        <FiChevronRight size={22} color="var(--primary)" />
      </button>
    </div>
  );
}
