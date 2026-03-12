"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Location } from "@/data/locations";
import { FiPhone, FiMail, FiMapPin, FiArrowRight } from "react-icons/fi";
import { useRouter } from "next/navigation";

interface InteractiveLocationMapProps {
  locations: Location[];
}

export default function InteractiveLocationMap({ locations }: InteractiveLocationMapProps) {
  const [activeIdx, setActiveIdx] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % locations.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [locations.length]);

  const activeLoc = locations[activeIdx];

  // Coordinates for a stylized South India Map
  // Abstracted positions relative to container
  const mapPositions = [
    { x: "70%", y: "45%" }, // Chennai
    { x: "45%", y: "40%" }, // Bangalore
    { x: "55%", y: "20%" }, // Hyderabad
    { x: "35%", y: "75%" }, // Kochi
    { x: "55%", y: "65%" }, // Coimbatore
    { x: "65%", y: "80%" }, // Madurai
  ];

  return (
    <div className="interactive-location-container" style={{ 
      display: "grid", 
      gridTemplateColumns: "1.2fr 1fr", 
      gap: "32px", 
      alignItems: "stretch",
      minHeight: "350px",
      padding: "20px 0"
    }}>
      {/* Left: Stylized Map Canvas */}
      <div style={{ position: "relative", height: "100%", minHeight: "300px", background: "rgba(79, 70, 229, 0.03)", borderRadius: "32px", overflow: "hidden", border: "1px solid rgba(79, 70, 229, 0.1)" }}>
        {/* Abstract South India Shape (Stylized SVG) */}
        <svg viewBox="0 0 200 300" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.1, fill: "var(--primary)" }}>
            <path d="M100,20 L150,50 L160,150 L130,250 L100,280 L70,250 L40,150 L50,50 Z" />
        </svg>

        {/* Pulse Lines / Connections */}
        <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
            {mapPositions.map((pos, i) => i > 0 && (
                <line 
                    key={i} 
                    x1={mapPositions[i-1].x} y1={mapPositions[i-1].y} 
                    x2={pos.x} y2={pos.y} 
                    stroke="var(--primary)" 
                    strokeWidth="1" 
                    strokeDasharray="4 4" 
                    opacity="0.2" 
                />
            ))}
        </svg>

        {/* Map Pins */}
        {locations.map((loc, idx) => {
          const pos = mapPositions[idx] || { x: "50%", y: "50%" };
          const isActive = activeIdx === idx;

          return (
            <motion.div
              key={loc.id}
              onClick={() => setActiveIdx(idx)}
              style={{
                position: "absolute",
                left: pos.x,
                top: pos.y,
                transform: "translate(-50%, -50%)",
                cursor: "pointer",
                zIndex: isActive ? 10 : 5
              }}
              animate={{ scale: isActive ? 1.2 : 1 }}
            >
              {/* Radar Pulse */}
              {isActive && (
                <motion.div
                  initial={{ scale: 0.5, opacity: 0.8 }}
                  animate={{ scale: 3, opacity: 0 }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  style={{
                    position: "absolute",
                    inset: -10,
                    borderRadius: "50%",
                    border: `2px solid ${loc.color}`,
                  }}
                />
              )}
              
              <div style={{
                width: isActive ? "24px" : "12px",
                height: isActive ? "24px" : "12px",
                background: isActive ? loc.color : "rgba(0,0,0,0.2)",
                border: "3px solid white",
                borderRadius: "50%",
                boxShadow: "0 0 20px rgba(0,0,0,0.1)",
                transition: "all 0.3s ease",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}>
                {isActive && <div style={{ width: "6px", height: "6px", background: "white", borderRadius: "50%" }} />}
              </div>

              {/* Label */}
              <div style={{
                position: "absolute",
                top: "30px",
                left: "50%",
                transform: "translateX(-50%)",
                background: isActive ? "#ffffff" : "rgba(255,255,255,0.8)",
                padding: "4px 12px",
                borderRadius: "20px",
                fontSize: "0.75rem",
                fontWeight: 700,
                color: isActive ? "var(--text-primary)" : "var(--text-muted)",
                whiteSpace: "nowrap",
                boxShadow: "0 4px 15px rgba(0,0,0,0.05)",
                border: isActive ? `1px solid ${loc.color}` : "1px solid transparent",
                pointerEvents: "none"
              }}>
                {loc.city}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Right: Detailed Card */}
      <div style={{ position: "relative" }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeLoc.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4 }}
            style={{
                background: "#ffffff",
                padding: "28px",
                borderRadius: "32px",
                boxShadow: "0 20px 50px rgba(0,0,0,0.06)",
                border: "1px solid var(--border)",
                position: "relative",
                overflow: "hidden"
            }}
          >
            {/* Color Accent */}
            <div style={{ position: "absolute", top: 0, left: 0, width: "4px", height: "100%", background: activeLoc.color }} />

            <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "20px" }}>
              <div style={{ 
                width: "54px", 
                height: "54px", 
                borderRadius: "18px", 
                background: `${activeLoc.color}10`, 
                display: "flex", 
                alignItems: "center", 
                justifyContent: "center", 
                fontSize: "1.8rem" 
              }}>
                {activeLoc.emoji}
              </div>
              <div>
                <h3 style={{ fontSize: "1.4rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: "2px" }}>{activeLoc.city}</h3>
                <p style={{ color: "var(--text-muted)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", fontSize: "0.7rem" }}>{activeLoc.state}</p>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "24px" }}>
              <div style={{ display: "flex", gap: "12px" }}>
                <div style={{ marginTop: "2px", color: activeLoc.color }}><FiMapPin size={18} /></div>
                <p style={{ fontSize: "0.95rem", lineHeight: 1.5, color: "var(--text-primary)", fontWeight: 500 }}>{activeLoc.address}</p>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "12px" }}>
                  <div style={{ padding: "14px 20px", background: "#f8fafc", borderRadius: "16px" }}>
                    <div style={{ fontSize: "0.65rem", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: "4px", fontWeight: 700 }}>Call Us</div>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", fontWeight: 700, color: "var(--text-primary)", fontSize: "0.9rem" }}>
                        <FiPhone color={activeLoc.color} size={14} /> {activeLoc.phone}
                    </div>
                  </div>
                  <div style={{ padding: "14px 20px", background: "#f8fafc", borderRadius: "16px" }}>
                    <div style={{ fontSize: "0.65rem", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: "4px", fontWeight: 700 }}>Email Support</div>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", fontWeight: 700, color: "var(--text-primary)", fontSize: "0.9rem" }}>
                        <FiMail color={activeLoc.color} size={14} /> {activeLoc.email}
                    </div>
                  </div>
              </div>
            </div>

            <button 
              onClick={() => router.push("/contact")}
              style={{
                width: "100%",
                padding: "14px",
                background: "var(--text-primary)",
                color: "#ffffff",
                border: "none",
                borderRadius: "12px",
                fontWeight: 700,
                fontSize: "0.9rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                cursor: "pointer",
                transition: "all 0.3s ease"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = "0 15px 30px rgba(0,0,0,0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              Book an Appointment <FiArrowRight />
            </button>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
