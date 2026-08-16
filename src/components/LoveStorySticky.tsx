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

  return (
    <div className="absolute inset-0 pointer-events-none">
      {/*
        PENTING: wrapper centering di bawah ini SENGAJA dipisah dari motion.div.
        Framer Motion menulis seluruh properti CSS `transform` lewat inline style
        (untuk y/rotate/scale), dan inline style selalu menang dari class Tailwind
        seperti `-translate-x-1/2`. Kalau translate-centering & animasi ditaruh di
        elemen YANG SAMA, class Tailwind-nya akan ketiban dan hilang.
        Solusinya: wrapper luar (plain div, tanpa style dari Framer) yang urus
        centering pakai Tailwind transform, motion.div di dalamnya cuma urus animasi.
      */}

      {/* FOTO — wrapper luar nge-center persis di tengah layar, sama untuk semua stage */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <motion.div
          style={{
            opacity: imageOpacity,
            y: imageY,
            rotate: imageRotate,
            scale: imageScale,
            zIndex: index + 1, // Foto baru selalu menumpuk DI ATAS foto lama
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

      {/* TEKS — wrapper luar nge-posisi vertikal center + offset kiri/kanan, tidak memengaruhi posisi foto */}
      <div
        className={`absolute top-1/2 -translate-y-1/2 ${
          isEven
            ? "left-1/2 ml-36 sm:ml-44 md:ml-52"
            : "right-1/2 mr-36 sm:mr-44 md:mr-52"
        }`}
      >
        <motion.div
          style={{
            opacity: textOpacity,
            y: textY,
            zIndex: 50, // Teks selalu di layer paling atas
          }}
          className={`flex flex-col max-w-[85vw] w-72 sm:w-80 pointer-events-auto ${
            isEven ? "items-start text-left" : "items-end text-right"
          }`}
        >
          <p className="text-xs uppercase tracking-[0.25em] text-moss mb-2 font-semibold">
            {stage.title}
          </p>
          <p className="text-sm sm:text-base text-ink/80 leading-relaxed font-serif">
            {stage.text}
          </p>
        </motion.div>
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
