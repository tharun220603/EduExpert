"use client";

import { useEffect, useState } from "react";
import { College } from "@/data/colleges";
import CollegeCard from "./CollegeCard";
import PremiumCarousel from "./PremiumCarousel";

interface FeaturedCollegesRowProps {
  colleges: College[];
}

export default function FeaturedCollegesRow({ colleges }: FeaturedCollegesRowProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div style={{ minHeight: "390px" }} />;

  return (
    <div className="featured-colleges-slider" style={{ width: "100%" }}>
      <PremiumCarousel
        itemsPerView={{ largeDesktop: 4, desktop: 3, tablet: 2, mobile: 1 }}
        gap={20}
        infinite={true}
        showDots={false}
      >
        {colleges.map((college) => (
          <CollegeCard key={college.id} college={college} isFeatured={true} />
        ))}
      </PremiumCarousel>
    </div>
  );
}
