"use client";

import { useRef } from "react";
import Slider from "react-slick";
import { Location } from "@/data/locations";
import {
  FiMapPin,
  FiChevronLeft,
  FiChevronRight,
  FiArrowRight
} from "react-icons/fi";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

function LocationCard({ location }: { location: Location }) {
  const router = useRouter();
  
  // Generating a standard Google Maps search URL for the location
  const directionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${location.city} Office ${location.address}`)}`;

  return (
    <motion.div
      whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(0,0,0,0.08)" }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      style={{
        margin: "15px",
        height: "280px",
        background: "#ffffff",
        borderRadius: "28px",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        border: "1px solid var(--border)",
        boxShadow: "0 12px 30px rgba(0,0,0,0.04)",
        cursor: "pointer",
        width: "90%"
      }}
    >
      {/* CONTENT */}
      <div style={{ padding: "32px", flex: 1, display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
            <h3 style={{ fontSize: "1.2rem", fontWeight: 800, color: "#111827" }}>
            {location.city} Office
            </h3>
            <span style={{ fontSize: "1.5rem" }}>{location.emoji}</span>
        </div>
        
        <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.85rem", color: "#6b7280", marginBottom: "16px" }}>
            <FiMapPin size={14} /> {location.state}
        </div>
        
        <p style={{ fontSize: "0.95rem", color: "#4b5563", lineHeight: 1.6, marginBottom: "auto" }}>
          {location.address}
        </p>

        <div style={{ marginTop: "20px", display: "flex", gap: "20px" }}>
             <div 
                onClick={() => router.push("/contact")}
                style={{ display: "flex", alignItems: "center", gap: "6px", color: "var(--primary)", fontWeight: 700, fontSize: "0.95rem", cursor: "pointer" }}
             >
                Contact <FiArrowRight />
            </div>
            <a 
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: "flex", alignItems: "center", gap: "6px", color: "var(--primary)", fontWeight: 700, fontSize: "0.95rem", cursor: "pointer", textDecoration: "none" }}
             >
                Get Directions
            </a>
        </div>
      </div>
    </motion.div>
  );
}

export default function LocationsRow({ locations }: { locations: Location[] }) {
  const sliderRef = useRef<Slider>(null);

  const settings = {
    dots: false,
    infinite: true,
    speed: 800,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    responsive: [
      { breakpoint: 1100, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div style={{ position: "relative", width: "100%" }}>
      {/* LEFT ARROW */}
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
        {[...locations, ...locations].map((loc, idx) => (
          <div key={`${loc.id}-${idx}`}>
            <LocationCard location={loc} />
          </div>
        ))}
      </Slider>

      {/* RIGHT ARROW */}
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
