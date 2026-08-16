"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

// Posisi & proporsi persis sesuai foto referensi
const SIDE_PHOTOS = [
  {
    src: "/images/image-1.webp", // 1. Foto Kiri Atas (Selfie Couple)
    final: { left: "8%", top: "16%", width: "22%", height: "33%" },
    entrance: { x: -180, y: -40 },
    rounded: "rounded-[28px]",
    zIndex: "z-20",
  },
  {
    src: "/images/image-2.webp", // 2. Foto Kiri Bawah (Agak geser ke kanan)
    final: { left: "14%", top: "51%", width: "16%", height: "19%" },
    entrance: { x: -140, y: 80 },
    rounded: "rounded-2xl",
    zIndex: "z-20",
  },
  {
    src: "/images/image-3.webp", // 3. Foto Kanan Atas (Mulai dari tengah tinggi foto utama)
    final: { left: "70%", top: "44%", width: "16%", height: "18%" },
    entrance: { x: 140, y: -40 },
    rounded: "rounded-2xl",
    zIndex: "z-20",
  },
  {
    src: "/images/image-4.webp", // 4. Foto Kanan Bawah (Portrait memanjang)
    final: { left: "70%", top: "64%", width: "20%", height: "30%" },
    entrance: { x: 180, y: 100 },
    rounded: "rounded-[28px]",
    zIndex: "z-20",
  },
];

function SidePhoto({
  photo,
  start,
  end,
  scrollYProgress,
}: {
  photo: (typeof SIDE_PHOTOS)[number];
  start: number;
  end: number;
  scrollYProgress: MotionValue<number>;
}) {
  const opacity = useTransform(scrollYProgress, [start, end], [0, 1]);
  const scale = useTransform(scrollYProgress, [start, end], [0.8, 1]);
  const x = useTransform(scrollYProgress, [start, end], [photo.entrance.x, 0]);
  const y = useTransform(scrollYProgress, [start, end], [photo.entrance.y, 0]);

  return (
    <motion.div
      style={{
        ...photo.final,
        position: "absolute",
        opacity,
        scale,
        x,
        y,
      }}
      className={`shadow-xl overflow-hidden ${photo.rounded} ${photo.zIndex}`}
    >
      <Image
        src={photo.src}
        alt="wedding detail"
        fill
        className="object-cover"
        priority={false}
      />
    </motion.div>
  );
}

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
    offset: ["start start", "end end"],
  });

  // Foto Utama: Fullscreen -> Mengecil di Tengah (Optimized)
  const mainLeft = useTransform(scrollYProgress, [0, 0.4], ["0%", "32%"]);
  const mainTop = useTransform(scrollYProgress, [0, 0.4], ["0%", "23%"]);
  const mainW = useTransform(scrollYProgress, [0, 0.4], ["100%", "36%"]);
  const mainH = useTransform(scrollYProgress, [0, 0.4], ["100%", "64%"]);
  const mainRadius = useTransform(scrollYProgress, [0, 0.4], ["0px", "32px"]);

  // Opacity teks judul & hint - Reduced keyframes
  const titleOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const hintOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);

  // Efek transisi grid - Simplified
  const gridOpacity = useTransform(scrollYProgress, [0.6, 0.8], [1, 0]);

  // Teks Undangan - Reduced keyframes
  const inviteOpacity = useTransform(scrollYProgress, [0.7, 0.9], [0, 1]);
  const inviteY = useTransform(scrollYProgress, [0.7, 0.9], [40, 0]);

  return (
    <div ref={ref} className="relative" style={{ height: "350vh" }}>
      <div className="sticky top-0 h-screen overflow-hidden bg-white">
        {/* --- GRID COLLAGE PHOTOS --- */}
        <motion.div
          style={{ opacity: gridOpacity }}
          className="absolute inset-0 w-full h-full"
        >
          {/* FOTO UTAMA (CENTER) */}
          <motion.div
            className="absolute overflow-hidden z-10 shadow-lg"
            style={{
              left: mainLeft,
              top: mainTop,
              width: mainW,
              height: mainH,
              borderRadius: mainRadius,
            }}
          >
            <Image
              src="/images/image-5.webp"
              alt="couple main photo"
              fill
              className="object-cover"
              priority
            />
            <motion.div
              style={{ opacity: titleOpacity }}
              className="absolute inset-0 flex items-center justify-center bg-black/20"
            >
              <h1 className="font-serif italic text-white text-6xl sm:text-8xl drop-shadow-md text-center px-4">
                {couple}
              </h1>
            </motion.div>
          </motion.div>

          {/* FOTO-FOTO PENDUKUNG */}
          {SIDE_PHOTOS.map((p, i) => (
            <SidePhoto
              key={i}
              photo={p}
              start={0.1 + i * 0.04}
              end={0.1 + i * 0.04 + 0.18}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </motion.div>

        {/* --- FLOATING BUTTON POJOK KIRI BAWAH ('N') --- */}
        <div className="absolute bottom-6 left-6 z-40">
          <button className="w-9 h-9 rounded-full bg-neutral-900 text-white text-xs font-medium flex items-center justify-center shadow-md hover:scale-105 transition">
            N
          </button>
        </div>

        {/* --- SCROLL HINT --- */}
        <motion.p
          style={{ opacity: hintOpacity }}
          className="absolute bottom-6 inset-x-0 text-center text-[10px] tracking-[0.3em] uppercase text-neutral-400 z-30 pointer-events-none"
        >
          scroll to explore
        </motion.p>

        {/* --- INVITATION TEXT SECTION --- */}
        <motion.div
          style={{ opacity: inviteOpacity, y: inviteY }}
          className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center z-40"
        >
          <p className="text-xs uppercase tracking-[0.35em] text-neutral-500 font-medium mb-4">
            Kepada Yth. {guest}
          </p>
          <p className="font-serif italic text-3xl sm:text-5xl leading-relaxed text-neutral-800">
            Anda diundang ke pernikahan
            <br />
            <span className="not-italic font-normal text-neutral-900 block mt-2">
              {couple}
            </span>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
