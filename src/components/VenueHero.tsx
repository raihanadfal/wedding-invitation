"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function VenueHero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end center"],
    layoutEffect: false,
  });

  // Parallax effect - image moves slower than scroll
  const y = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <div ref={ref} className="relative h-screen overflow-hidden bg-black">
      {/* Parallax Image */}
      <motion.div
        style={{ y, willChange: "transform" }}
        className="absolute inset-0"
      >
        <img
          src="/images/venue.webp"
          alt="Venue"
          className="w-full h-full object-cover"
        />
        {/* Dark overlay gradient untuk visibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/50" />
      </motion.div>

      {/* Content overlay */}
      <motion.div
        style={{ opacity: useTransform(scrollYProgress, [0, 0.8], [1, 0]) }}
        className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-6"
      >
        <h2 className="font-display italic text-5xl sm:text-7xl mb-8 drop-shadow-lg">
          Venue
        </h2>
        <a
          href="https://maps.app.goo.gl/uZNcpmKEyBWnUosu5"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-6 py-3 bg-white/90 backdrop-blur-sm text-ink text-sm uppercase tracking-widest rounded-full hover:bg-white transition-colors font-medium shadow-lg hover:shadow-xl"
        >
          Buka di Maps
        </a>
      </motion.div>
    </div>
  );
}
