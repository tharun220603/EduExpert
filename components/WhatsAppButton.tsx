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
    <div className="floating-actions">
      {/* Phone Button */}
      <a
        href={callUrl}
        className="phone-btn"
        title="Call Us"
      >
        <FaPhoneAlt />
      </a>

      {/* WhatsApp Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-btn"
        title="Chat on WhatsApp"
      >
        <FaWhatsapp />
        
        {/* Pulse Effect for WhatsApp */}
        <span className="pulse-effect" />
      </a>

      <style jsx>{`
        .floating-actions {
          position: fixed;
          bottom: 30px;
          right: 30px;
          display: flex;
          flex-direction: column;
          gap: 15px;
          z-index: 9999;
        }

        .phone-btn, .whatsapp-btn {
          width: 60px;
          height: 60px;
          color: #fff;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          transition: all 0.3s ease;
          cursor: pointer;
          text-decoration: none;
          position: relative;
        }

        .phone-btn {
          background-color: var(--primary);
          box-shadow: 0 10px 25px rgba(79, 70, 229, 0.3);
        }

        .whatsapp-btn {
          background-color: #25D366;
          box-shadow: 0 10px 25px rgba(37, 211, 102, 0.3);
          font-size: 30px;
        }

        .phone-btn:hover, .whatsapp-btn:hover {
          transform: scale(1.1) translateY(-5px);
        }

        .phone-btn:hover {
          box-shadow: 0 15px 30px rgba(79, 70, 229, 0.4);
        }

        .whatsapp-btn:hover {
          box-shadow: 0 15px 30px rgba(37, 211, 102, 0.4);
        }

        .pulse-effect {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          border: 2px solid #25D366;
          animation: whatsapp-pulse 2s infinite;
        }

        @keyframes whatsapp-pulse {
          0% { transform: scale(1); opacity: 0.8; }
          100% { transform: scale(1.6); opacity: 0; }
        }

        @media (max-width: 1024px) {
          .floating-actions {
            bottom: 110px;
            right: 20px;
            gap: 12px;
          }
          .phone-btn, .whatsapp-btn {
            width: 50px;
            height: 50px;
            font-size: 20px;
          }
          .whatsapp-btn {
            font-size: 24px;
          }
        }
      `}</style>
    </div>
  );
}
