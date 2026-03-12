"use client";

import { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { Review } from "@/data/reviews";
import { FiStar } from "react-icons/fi";

interface ReviewMarqueeProps {
  reviews: Review[];
  direction?: "left" | "right";
  duration?: number;
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <div
      style={{
        width: "320px",
        height: "240px",
        padding: "32px",
        background: "#ffffff",
        border: "1px solid var(--border)",
        borderRadius: "24px",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
        flexShrink: 0,
        overflow: "hidden",
      }}
    >
      <div style={{ display: "flex", gap: "2px" }}>
        {[...Array(5)].map((_, i) => (
          <FiStar
            key={i}
            size={12}
            fill={i < Math.floor(review.rating) ? "var(--gold)" : "none"}
            color={
              i < Math.floor(review.rating) ? "var(--gold)" : "var(--text-muted)"
            }
          />
        ))}
      </div>

      <p
        style={{
          fontSize: "0.9rem",
          lineHeight: 1.5,
          color: "var(--text-primary)",
          fontWeight: 500,
          margin: 0,
        }}
      >
        "{review.content}"
      </p>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          marginTop: "auto",
        }}
      >
        <div
          style={{
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            background: "var(--primary-light)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "1rem",
            border: "1px solid var(--accent-pale)",
          }}
        >
          {review.avatar}
        </div>
        <div>
          <div
            style={{
              fontSize: "0.85rem",
              fontWeight: 700,
              color: "var(--text-primary)",
            }}
          >
            {review.name}
          </div>
          <div
            style={{
              fontSize: "0.7rem",
              color: "var(--primary)",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.02em",
            }}
          >
            {review.role}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ReviewMarquee({
  reviews,
  direction = "left",
  duration = 40,
}: ReviewMarqueeProps) {
  const scrollX = direction === "left" ? [0, -1800] : [-1800, 0]; // Approx width of items
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      x: scrollX,
      transition: { repeat: Infinity, ease: "linear", duration: duration },
    });
  }, [scrollX, duration, controls]);

  return (
    <div style={{ width: "100%", overflow: "hidden", padding: "10px 0" }}>
      <motion.div
        animate={controls}
        onMouseEnter={() => controls.stop()}
        onMouseLeave={() =>
          controls.start({
            x: scrollX,
            transition: { repeat: Infinity, ease: "linear", duration: duration },
          })
        }
        style={{
          display: "flex",
          gap: "24px",
          width: "fit-content",
          paddingRight: "24px",
        }}
      >
        {/* Double the items for infinite loop */}
        {[...reviews, ...reviews, ...reviews].map((review, idx) => (
          <ReviewCard key={`${review.id}-${idx}`} review={review} />
        ))}
      </motion.div>
    </div>
  );
}
