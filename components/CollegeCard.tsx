"use client";

import { useRef } from "react";
import { useRouter } from "next/navigation";
import { FiMapPin, FiStar, FiChevronRight, FiAward } from "react-icons/fi";
import { College } from "@/data/colleges";
import styles from "./CollegeCard.module.css";
import { motion } from "framer-motion";

interface CollegeCardProps {
  college: College;
  isFeatured?: boolean;
}

export default function CollegeCard({ college, isFeatured }: CollegeCardProps) {
  const router = useRouter();
  const cardRef = useRef<HTMLDivElement>(null);

  const bgImage =
    college.image ||
    (college.type.includes("Engineering")
      ? "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=800"
      : college.type.includes("Medical")
        ? "https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&q=80&w=800"
        : "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=800");

  return (
    <motion.div
      ref={cardRef}
      onClick={() => router.push(`/college/${college.slug || college.id}`)}
      className={`${styles.card} ${isFeatured ? styles.big : ""}`}
      whileHover={isFeatured ? { y: -10 } : { y: -8 }}
      whileTap={{ scale: 0.98 }}
      initial={isFeatured ? { opacity: 0, y: 20 } : { opacity: 1 }}
      whileInView={isFeatured ? { opacity: 1, y: 0 } : { opacity: 1 }}
      viewport={{ once: true }}
    >
      {/* ── IMAGE ── */}
      <div className={`${styles.imageWrap} ${isFeatured ? styles.big : ""}`}>
        <img
          src={bgImage}
          alt={college.name}
          loading="lazy"
          className={styles.image}
        />
        <div className={styles.imageOverlay} />

        {/* NIRF Rank (Positioned by CSS to top-right) */}
        {college.nirfRank && (
          <div className={styles.nirfBadge}>
            <FiAward size={12} />
            <span>NIRF #{college.nirfRank}</span>
          </div>
        )}

        {/* Top left tags/labels */}
        {isFeatured ? (
          <div className={styles.tagsLeft}>
            <div className={styles.typeTag}>{college.type}</div>
          </div>
        ) : (
          <div className={styles.typeRibbon}>{college.type}</div>
        )}

        {/* Rating pill (Same for both but can use variant styles) */}
        <div className={styles.ratingPill}>
          <FiStar className={styles.starIcon} size={13} />
          <span>{college.rating}</span>
        </div>
      </div>

      {/* ── LOGO ── */}
      <div className={`${styles.logoWrap} ${isFeatured ? styles.big : ""}`}>
        <img
          src={college.logo || "https://img.icons8.com/color/96/university.png"}
          alt="Logo"
          className={styles.logo}
        />
      </div>

      {/* ── BODY ── */}
      <div className={`${styles.body} ${isFeatured ? styles.big : ""}`}>
        <h3 className={`${styles.name} ${isFeatured ? styles.big : ""}`}>
          {college.name}
        </h3>

        <p className={`${styles.location} ${isFeatured ? styles.big : ""}`}>
          <FiMapPin size={13} className={styles.pinIcon} />
          {college.city}, {college.state}
        </p>

        {/* Highlights */}
        <div className={styles.highlights}>
          {college.highlights.slice(0, 2).map((h) => (
            <span key={h} className={styles.highlight}>
              {h}
            </span>
          ))}
        </div>

        {/* Footer */}
        <div className={styles.footer}>
          <div className={styles.fees}>
            <span className={`${styles.feesLabel} ${isFeatured ? "" : ""}`}>
              Avg Fees
            </span>
            <span className={`${styles.feesValue} ${isFeatured ? "" : ""}`}>
              {college.fees}
            </span>
          </div>
          <div
            className={`${styles.detailsBtn} ${isFeatured ? styles.big : ""}`}
          >
            Details <FiChevronRight size={15} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
