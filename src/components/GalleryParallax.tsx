import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const GALLERY_IMAGES = [
  "/images/gallery/gallery-1.webp",
  "/images/gallery/gallery-2.webp",
  "/images/gallery/gallery-3.webp",
  "/images/gallery/gallery-4.webp",
  "/images/gallery/gallery-5.webp",
  "/images/gallery/gallery-6.webp",
  "/images/gallery/gallery-7.webp",
  "/images/gallery/gallery-8.webp",
];

// Satu sumber kebenaran untuk spacing — dipakai di gap (horizontal) & margin-bottom (vertikal)
const GAP_CLASS = "gap-5 lg:gap-6"; // horizontal, untuk columns
const MARGIN_CLASS = "mb-5 lg:mb-6"; // vertikal, untuk tiap item (nilai HARUS sama dengan gap di atas)

function GalleryItem({ src, index }: { src: string; index: number }) {
  const itemRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: itemRef,
    offset: ["start end", "end start"],
  });

  const isEven = index % 2 === 0;
  const range = isEven ? [-50, 50] : [50, -50];
  const x = useTransform(scrollYProgress, [0, 1], range);

  return (
    <motion.div
      ref={itemRef}
      style={{ x }}
      className={`relative overflow-hidden rounded-lg shadow-lg break-inside-avoid will-change-transform ${MARGIN_CLASS}`}
    >
      <img
        src={src}
        alt={`Gallery ${index + 1}`}
        className="block w-full h-auto object-cover hover:scale-105 transition-transform duration-500"
        loading="lazy"
      />
    </motion.div>
  );
}

export default function GalleryParallax() {
  return (
    <section className="relative py-24 sm:py-32 bg-white overflow-hidden">
      <div className="px-6 sm:px-10 lg:px-16 max-w-6xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-16">
          <p className="text-xs sm:text-sm uppercase tracking-[0.4em] text-moss font-medium mb-4">
            Gallery
          </p>
        </div>

        {/* Masonry Gallery - spacing konsisten horizontal & vertikal */}
        <div className={`columns-1 sm:columns-2 lg:columns-3 ${GAP_CLASS}`}>
          {GALLERY_IMAGES.map((image, index) => (
            <GalleryItem key={index} src={image} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
