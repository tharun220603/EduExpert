"use client";

import React from "react";
import { FaWhatsapp, FaPhoneAlt } from "react-icons/fa";

export default function FloatingActionButtons() {
  const phoneNumber = "911234567890"; // WhatsApp number
  const callNumber = "+911234567890"; // Calling number
  const message = "Hello EduExpert! I'd like to know more about colleges and admissions.";
  
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  const callUrl = `tel:${callNumber}`;

  return (
    <div
      style={{
        position: "fixed",
        bottom: "30px",
        right: "30px",
        display: "flex",
        flexDirection: "column",
        gap: "15px",
        zIndex: 9999,
      }}
    >
      {/* Phone Button */}
      <a
        href={callUrl}
        style={{
          width: "60px",
          height: "60px",
          backgroundColor: "var(--primary)",
          color: "#fff",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "24px",
          boxShadow: "0 10px 25px rgba(79, 70, 229, 0.3)",
          transition: "all 0.3s ease",
          cursor: "pointer",
          textDecoration: "none",
          position: "relative"
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.1) translateY(-5px)";
          e.currentTarget.style.boxShadow = "0 15px 30px rgba(79, 70, 229, 0.4)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1) translateY(0)";
          e.currentTarget.style.boxShadow = "0 10px 25px rgba(79, 70, 229, 0.3)";
        }}
        title="Call Us"
      >
        <FaPhoneAlt />
      </a>

      {/* WhatsApp Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          width: "60px",
          height: "60px",
          backgroundColor: "#25D366",
          color: "#fff",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "30px",
          boxShadow: "0 10px 25px rgba(37, 211, 102, 0.3)",
          transition: "all 0.3s ease",
          cursor: "pointer",
          textDecoration: "none",
          position: "relative"
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.1) translateY(-5px)";
          e.currentTarget.style.boxShadow = "0 15px 30px rgba(37, 211, 102, 0.4)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1) translateY(0)";
          e.currentTarget.style.boxShadow = "0 10px 25px rgba(37, 211, 102, 0.3)";
        }}
        title="Chat on WhatsApp"
      >
        <FaWhatsapp />
        
        {/* Pulse Effect for WhatsApp */}
        <span style={{
          position: "absolute",
          inset: 0,
          borderRadius: "50%",
          border: "2px solid #25D366",
          animation: "whatsapp-pulse 2s infinite"
        }} />
      </a>

      <style jsx>{`
        @keyframes whatsapp-pulse {
          0% { transform: scale(1); opacity: 0.8; }
          100% { transform: scale(1.6); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
