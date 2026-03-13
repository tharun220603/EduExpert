"use client";

import { useRef, useEffect, useState } from "react";
import { Location } from "@/data/locations";
import {
  FiMapPin,
  FiChevronLeft,
  FiChevronRight,
  FiArrowRight
} from "react-icons/fi";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

import styles from "./LocationsRow.module.css";

function LocationCard({ location }: { location: Location }) {
  const router = useRouter();
  
  // Generating a standard Google Maps search URL for the location
  const directionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${location.city} Office ${location.address}`)}`;

  return (
    <motion.div
      className={styles.card}
      whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(0,0,0,0.08)" }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      {/* CONTENT */}
      <div className={styles.content}>
        <div className={styles.header}>
            <h3 className={styles.title}>
              {location.city} Office
            </h3>
            <span className={styles.emoji}>{location.emoji}</span>
        </div>
        
        <div className={styles.location}>
            <FiMapPin size={14} /> {location.state}
        </div>
        
        <p className={styles.address}>
          {location.address}
        </p>

        <div className={styles.actions}>
             <div 
                onClick={() => router.push("/contact")}
                className={styles.actionBtn}
             >
                Contact <FiArrowRight />
            </div>
            <a 
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.actionBtn}
             >
                Get Directions
            </a>
        </div>
      </div>
    </motion.div>
  );
}

import PremiumCarousel from "./PremiumCarousel";

export default function LocationsRow({ locations }: { locations: Location[] }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div style={{ minHeight: "280px" }} />;

  return (
    <div className="locations-row" style={{ width: "100%" }}>
      <PremiumCarousel
        itemsPerView={{ largeDesktop: 4, desktop: 3, tablet: 2, mobile: 1 }}
        gap={20}
        infinite={true}
        showDots={false}
      >
        {locations.map((loc) => (
          <LocationCard key={loc.id} location={loc} />
        ))}
      </PremiumCarousel>
    </div>
  );
}
