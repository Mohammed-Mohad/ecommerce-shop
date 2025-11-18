"use client";

import { useEffect } from "react";
import { animate } from "motion";
import type { AnimationOptions, DOMKeyframesDefinition } from "motion";

interface CategoryPillsMotionProps {
  containerId: string;
}

export default function CategoryPillsMotion({
  containerId,
}: CategoryPillsMotionProps) {
  useEffect(() => {
    const container = document.getElementById(containerId);
    if (!container) return;

    const pills = container.querySelectorAll<HTMLElement>("[data-pill]");
    if (!pills.length) return;

    pills.forEach((pill, index) => {
      const keyframes: DOMKeyframesDefinition = {
        opacity: [0, 1],
        transform: ["translateY(8px)", "translateY(0px)"],
      };
      const options: AnimationOptions = {
        duration: 0.35,
        delay: index * 0.05,
        ease: "easeOut",
      };
      animate(pill, keyframes, options);
    });
  }, [containerId]);

  return null;
}

