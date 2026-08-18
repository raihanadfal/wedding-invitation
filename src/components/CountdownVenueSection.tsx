"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Reveal from "./Reveal";
import Countdown from "./Countdown";
import VenueHero from "./VenueHero";

export default function CountdownVenueSection({ target }: { target: string }) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"],
  });

  // Venue mulai di bawah layar (100%), naik menutupi penuh (0%)
  const venueY = useTransform(scrollYProgress, [0.25, 0.85], ["100%", "0%"]);

  return (
    <div ref={wrapperRef} className="relative h-[220vh]">
      {/* Countdown: sticky, diam total di belakang, TIDAK ada transform */}
      <div className="sticky top-0 h-screen z-0 bg-white flex items-center justify-center px-6">
        <Reveal>
          <div className="text-center">
            <p className="text-xs sm:text-sm uppercase tracking-[0.4em] text-moss font-medium mb-6">
              Mohon kehadiran Anda di acara spesial kami
            </p>
            <h2 className="font-display italic text-5xl sm:text-7xl font-bold text-ink mb-16 sm:mb-20">
              23 Agustus 2026
            </h2>
            <Countdown target={target} />
          </div>
        </Reveal>
      </div>

      {/* VenueHero: sticky, di depan, slide-up dari bawah menutupi Countdown */}
      <motion.div
        style={{ y: venueY, willChange: "transform" }}
        className="sticky top-0 h-screen z-10"
      >
        <VenueHero />
      </motion.div>
    </div>
  );
}
