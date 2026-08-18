"use client";

import { ReactNode, useRef } from "react";
import { motion, useScroll, useTransform, Variants } from "framer-motion";

type RevealDirection = "up" | "down" | "left" | "right" | "none";
type RevealEffect = "fade" | "scale" | "blur" | "fade-scale" | "fade-blur";
type RevealBackground =
  | "none"
  | "glow"
  | "grain"
  | "gradient-line"
  | "dot-grid";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: RevealDirection;
  effect?: RevealEffect;
  distance?: number;
  once?: boolean;
  amount?: number | "some" | "all";
  parallax?: boolean;
  parallaxStrength?: number;
  background?: RevealBackground;
  backgroundColor?: string; // warna aksen untuk glow/gradient, default moss/ink tone
}

const directionOffset: Record<RevealDirection, { x: number; y: number }> = {
  up: { x: 0, y: 1 },
  down: { x: 0, y: -1 },
  left: { x: 1, y: 0 },
  right: { x: -1, y: 0 },
  none: { x: 0, y: 0 },
};

export default function Reveal({
  children,
  className = "",
  delay = 0,
  duration = 0.8,
  direction = "up",
  effect = "fade",
  distance = 40,
  once = true,
  amount = 0.3,
  parallax = true,
  parallaxStrength = 40,
  background = "none",
  backgroundColor = "rgba(120, 130, 100, 0.15)", // soft moss tone, sesuaikan dengan palet Anda
}: RevealProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start end", "end start"],
  });

  const parallaxY = useTransform(
    scrollYProgress,
    [0, 1],
    [parallaxStrength, -parallaxStrength],
  );

  // Glow bergerak sedikit lebih lambat dari konten (depth effect)
  const glowY = useTransform(scrollYProgress, [0, 1], [20, -20]);
  const glowScale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0.9, 1.05, 0.9],
  );

  const offset = directionOffset[direction];
  const filterFrom =
    effect === "blur" || effect === "fade-blur" ? "blur(12px)" : "blur(0px)";
  const scaleFrom = effect === "scale" || effect === "fade-scale" ? 0.9 : 1;

  const variants: Variants = {
    hidden: {
      opacity: effect === "scale" ? 1 : 0,
      x: offset.x * distance,
      y: offset.y * distance,
      scale: scaleFrom,
      filter: filterFrom,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: { duration, delay, ease: [0.25, 0.1, 0.25, 1] },
    },
  };

  // Background layer fade-in terpisah, sedikit lebih lambat dari konten
  // biar terasa seperti "cahaya menyala" duluan sebelum konten muncul.
  const backgroundVariants: Variants = {
    hidden: { opacity: 0, scale: 0.85 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: duration * 1.3,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  return (
    <div ref={wrapperRef} className={`relative ${className}`}>
      {/* ── Background layer (opsional) ─────────────────────────── */}
      {background === "glow" && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -inset-x-10 -inset-y-10 -z-10 flex items-center justify-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once, amount }}
          variants={backgroundVariants}
          style={{ y: parallax ? glowY : 0, scale: parallax ? glowScale : 1 }}
        >
          <div
            className="h-full w-full rounded-full blur-3xl"
            style={{
              background: `radial-gradient(circle, ${backgroundColor}, transparent 70%)`,
            }}
          />
        </motion.div>
      )}

      {background === "grain" && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 overflow-hidden rounded-[inherit]"
          initial="hidden"
          whileInView="visible"
          viewport={{ once, amount }}
          variants={backgroundVariants}
        >
          <svg className="h-full w-full opacity-[0.04]">
            <filter id="reveal-grain">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.85"
                numOctaves={2}
                stitchTiles="stitch"
              />
            </filter>
            <rect width="100%" height="100%" filter="url(#reveal-grain)" />
          </svg>
        </motion.div>
      )}

      {background === "gradient-line" && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-0 -z-10 h-px w-24 -translate-x-1/2"
          initial={{ opacity: 0, width: 0 }}
          whileInView={{ opacity: 1, width: 96 }}
          viewport={{ once, amount }}
          transition={{
            duration: duration * 1.2,
            delay,
            ease: [0.25, 0.1, 0.25, 1],
          }}
          style={{
            background: `linear-gradient(90deg, transparent, ${backgroundColor}, transparent)`,
          }}
        />
      )}

      {background === "dot-grid" && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -inset-6 -z-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once, amount }}
          variants={backgroundVariants}
          style={{
            backgroundImage: `radial-gradient(${backgroundColor} 1px, transparent 1px)`,
            backgroundSize: "16px 16px",
            maskImage:
              "radial-gradient(ellipse at center, black 40%, transparent 80%)",
          }}
        />
      )}

      {/* ── Parallax + Reveal content (sama seperti sebelumnya) ─── */}
      <motion.div style={{ y: parallax ? parallaxY : 0 }}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once, amount }}
          variants={variants}
        >
          {children}
        </motion.div>
      </motion.div>
    </div>
  );
}
