"use client";

import { useEffect } from "react";
import { animate } from "motion";
import type { AnimationOptions, DOMKeyframesDefinition } from "motion";

interface HeroMotionProps {
  sectionId: string;
}

const HeroMotion = ({ sectionId }: HeroMotionProps) => {
  useEffect(() => {
    const hero = document.getElementById(sectionId);
    if (!hero) return;

    const heroTargets = hero.querySelectorAll<HTMLElement>("[data-hero-animate]");
    heroTargets.forEach((element, index) => {
      const keyframes: DOMKeyframesDefinition = {
        opacity: [0, 1],
        transform: ["translateY(14px)", "translateY(0px)"],
      };
      const options: AnimationOptions = {
        duration: 0.45,
        delay: index * 0.1,
        ease: "easeOut",
      };
      animate(element, keyframes, options);
    });

    const featured = hero.querySelector<HTMLElement>("[data-featured-card]");
    if (featured) {
      animate(
        featured,
        {
          opacity: [0, 1],
          transform: ["scale(0.95)", "scale(1)"],
        },
        { duration: 0.6, delay: 0.2, ease: "easeOut" }
      );
    }

    const statCards = hero.querySelectorAll<HTMLElement>("[data-stat-card]");
    statCards.forEach((card, index) => {
      animate(
        card,
        {
          opacity: [0, 1],
          transform: ["translateY(10px)", "translateY(0px)"],
        },
        { duration: 0.4, delay: 0.3 + index * 0.08, ease: "easeOut" }
      );
    });
  }, [sectionId]);

  return null;
};

export default HeroMotion;

