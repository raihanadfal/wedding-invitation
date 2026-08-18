import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionTemplate,
} from "framer-motion";

export default function HeroGrid({
  couple = "T & K",
  guest = "Tamu Undangan",
}: {
  couple?: string;
  guest?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end center"],
  });

  // Main image: Fullscreen -> Blur & Scale down
  const mainScale = useTransform(scrollYProgress, [0, 0.6], [1, 0.7]);
  const mainBlurValue = useTransform(scrollYProgress, [0, 0.6], [0, 8]);
  const mainBlur = useMotionTemplate`blur(${mainBlurValue}px)`;
  const mainOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0.4]);

  // Text opacity
  const titleOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const hintOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);

  // Invitation text entrance
  const inviteOpacity = useTransform(scrollYProgress, [0.4, 0.7], [0, 1]);
  const inviteScale = useTransform(scrollYProgress, [0.4, 0.7], [0.8, 1]);

  return (
    <div ref={ref} className="relative" style={{ height: "250vh" }}>
      <div className="sticky top-0 h-screen overflow-hidden bg-neutral-900">
        {/* FIX: backdrop gelap di belakang foto — jadi kalau foto belum
            selesai load, teks putih tetap kontras (bukan putih-di-atas-putih). */}
        <div className="absolute inset-0 bg-neutral-900" />

        {/* MAIN FULLSCREEN IMAGE - Blur & Scale effect */}
        <motion.img
          src="/images/image-5.webp"
          alt="couple main photo"
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            scale: mainScale,
            opacity: mainOpacity,
            filter: mainBlur,
          }}
          fetchPriority="high"
          decoding="async"
        />

        {/* FIX: overlay gradient (gelap di tengah & bawah) menggantikan
            bg-black/10 yang terlalu tipis — memberi kontras yang cukup
            untuk teks putih di atas foto seterang apa pun. */}
        <motion.div
          style={{ opacity: titleOpacity }}
          className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/50 z-10"
        />

        {/* Title overlay on main photo */}
        <motion.div
          style={{ opacity: titleOpacity }}
          className="absolute inset-0 flex items-center justify-center z-20"
        >
          <h1 className="font-serif italic text-white text-6xl sm:text-8xl text-center px-4 [text-shadow:0_4px_24px_rgba(0,0,0,0.65)]">
            {couple}
          </h1>
        </motion.div>

        {/* Scroll hint */}
        <motion.p
          style={{ opacity: hintOpacity }}
          className="absolute bottom-6 inset-x-0 text-center text-[10px] tracking-[0.3em] uppercase text-white z-30 pointer-events-none [text-shadow:0_1px_8px_rgba(0,0,0,0.6)]"
        >
          scroll to explore
        </motion.p>

        {/* Invitation text - Appears on scroll */}
        <motion.div
          style={{
            opacity: inviteOpacity,
            scale: inviteScale,
          }}
          className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center z-40 bg-white"
        >
          <p className="text-xs uppercase tracking-[0.35em] text-neutral-600 font-medium mb-4">
            Kepada Yth. {guest}
          </p>
          <p className="font-body text-4xl sm:text-3xl leading-tight text-neutral-900 mb-3 font-light tracking-wide">
            Anda diundang ke pernikahan
          </p>
          <p className="font-display italic text-10xl sm:text-5xl text-neutral-900">
            {couple}
          </p>
        </motion.div>

        {/* Floating button */}
        <div className="absolute bottom-6 left-6 z-50">
          <button className="w-9 h-9 rounded-full bg-neutral-900 text-white text-xs font-medium flex items-center justify-center shadow-md hover:scale-105 transition">
            N
          </button>
        </div>
      </div>
    </div>
  );
}
