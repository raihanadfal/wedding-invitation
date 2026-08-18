import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

type Stage = { title: string; text: string; gradient: string; image?: string };

// Sudut kemiringan alami agar foto tampak menumpuk acak seperti di meja
const ROTATIONS = [-4, 3, -2, 5, -5, 2];

function StageCard({
  stage,
  index,
  n,
  scrollYProgress,
}: {
  stage: Stage;
  index: number;
  n: number;
  scrollYProgress: MotionValue<number>;
}) {
  const isLast = index === n - 1;

  // Titik Waktu Transisi
  const t0 = index / n; // Mulai masuk
  const t1 = (index + 0.4) / n; // Tampil sempurna (Awal Aktif)
  const t2 = (index + 1) / n; // Akhir Aktif (Story berikutnya mulai masuk)

  // Sudut rotasi unik per foto
  const targetRotate = ROTATIONS[index % ROTATIONS.length];

  // --- Animasi Foto (Stacking Effect) - Simplified untuk performa ---
  const imageOpacity = useTransform(scrollYProgress, [t0, t1], [0, 1]);
  const imageY = useTransform(scrollYProgress, [t0, t1], [100, 0]);
  const imageRotate = useTransform(
    scrollYProgress,
    [t0, t1],
    [targetRotate * 2.5, targetRotate],
  );
  // Scale hanya saat masuk, tidak saat keluar (reduce transforms)
  const imageScale = useTransform(scrollYProgress, [t0, t1, t2], [1.1, 1, 1]);

  // --- Animasi Teks - Simplified ---
  const textOpacity = useTransform(
    scrollYProgress,
    isLast ? [t0, t1] : [t0, t1, t2],
    isLast ? [0, 1] : [0, 1, 0],
  );
  const textY = useTransform(
    scrollYProgress,
    isLast ? [t0, t1] : [t0, t1, t2],
    isLast ? [20, 0] : [20, 0, -20],
  );

  const isEven = index % 2 === 0;

  // FIX: konten teks diekstrak supaya bisa dipakai di dua wrapper terpisah
  // (mobile & desktop) tanpa duplikasi motion values secara manual.
  const textContent = (
    <motion.div
      style={{ opacity: textOpacity, y: textY, zIndex: 50 }}
      className={`flex flex-col max-w-[85vw] w-72 sm:w-80 text-center md:text-left ${
        isEven ? "md:items-start md:text-left" : "md:items-end md:text-right"
      }`}
    >
      <p className="text-xs uppercase tracking-[0.25em] text-moss mb-2 font-semibold">
        {stage.title}
      </p>
      <p className="text-sm sm:text-base text-ink/80 leading-relaxed font-serif">
        {stage.text}
      </p>
    </motion.div>
  );

  return (
    <div className="absolute inset-0">
      {/* FOTO — centered in middle */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 md:-translate-y-1/2 pointer-events-none">
        <motion.div
          style={{
            opacity: imageOpacity,
            y: imageY,
            rotate: imageRotate,
            scale: imageScale,
            zIndex: index + 1,
          }}
          className="p-3 sm:p-4 bg-white rounded-sm shadow-2xl border border-black/5 pointer-events-auto relative overflow-hidden"
        >
          {stage.image ? (
            <div className="w-56 h-56 sm:w-72 sm:h-72 rounded-xs relative">
              <img
                src={stage.image}
                alt={stage.title}
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div
              className={`w-56 h-56 sm:w-72 sm:h-72 rounded-xs bg-gradient-to-br ${stage.gradient}`}
            />
          )}
          <div className="absolute inset-3 sm:inset-4 rounded-xs bg-gradient-to-t from-black/10 via-transparent to-white/10 pointer-events-none" />
        </motion.div>
      </div>

      {/* TEKS — MOBILE: elemen terpisah, hanya tampil < md */}
      <div className="md:hidden absolute top-[calc(50%+200px)] left-1/2 -translate-x-1/2 pointer-events-auto">
        {textContent}
      </div>

      {/* TEKS — DESKTOP: elemen terpisah, hanya tampil >= md */}
      <div
        className={`hidden md:block absolute top-1/2 -translate-y-1/2 pointer-events-auto ${
          isEven
            ? "left-1/2 ml-36 lg:ml-44 xl:ml-52"
            : "right-1/2 mr-36 lg:mr-44 xl:mr-52"
        }`}
      >
        {textContent}
      </div>
    </div>
  );
}

export default function LoveStorySticky({ stages }: { stages: Stage[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const n = stages.length;

  const titleY = useTransform(scrollYProgress, [0, 0.2], [0, -60]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0.3]);

  return (
    <div ref={ref} className="relative" style={{ height: `${n * 100}vh` }}>
      <div className="sticky top-0 h-screen overflow-hidden bg-white">
        <motion.p
          style={{ y: titleY, opacity: titleOpacity }}
          className="absolute top-20 md:top-28 inset-x-0 text-center font-display italic text-3xl sm:text-4xl z-50 text-ink"
        >
          our love story
        </motion.p>
        {stages.map((s, i) => (
          <StageCard
            key={s.title}
            stage={s}
            index={i}
            n={n}
            scrollYProgress={scrollYProgress}
          />
        ))}
      </div>
    </div>
  );
}
