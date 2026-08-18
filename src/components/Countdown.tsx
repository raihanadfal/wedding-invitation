"use client";

import { useEffect, useState, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function Countdown({ target }: { target: string }) {
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const t = useMemo(() => {
    const targetDate = new Date(target).getTime();
    const diff = Math.max(0, targetDate - now);
    return {
      d: Math.floor(diff / 86400000),
      h: Math.floor((diff / 3600000) % 24),
      m: Math.floor((diff / 60000) % 60),
      s: Math.floor((diff / 1000) % 60),
    };
  }, [target, now]);

  const items = [
    { label: "hari", val: t.d },
    { label: "jam", val: t.h },
    { label: "menit", val: t.m },
    { label: "detik", val: t.s },
  ];

  return (
    <div className="flex justify-center gap-6 sm:gap-10">
      {items.map((it, index) => (
        <motion.div
          key={it.label}
          className="text-center"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            delay: index * 0.1,
            ease: [0.25, 0.1, 0.25, 1],
          }}
        >
          {/* Container dengan overflow-hidden = "jendela" tempat digit lama
              slide keluar ke atas & digit baru slide masuk dari bawah */}
          <div className="relative h-[1em] overflow-hidden font-display text-6xl sm:text-8xl font-bold text-ink leading-none">
            <AnimatePresence mode="popLayout">
              <motion.div
                key={it.val}
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                exit={{ y: "-100%", opacity: 0 }}
                transition={{
                  duration: 0.45,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
                // Pulse halus khusus untuk detik, biar terasa "hidup" tiap tick
                {...(it.label === "detik"
                  ? {
                      whileInView: { scale: [1, 1.06, 1] },
                    }
                  : {})}
              >
                {String(it.val).padStart(2, "0")}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="text-xs sm:text-sm tracking-[0.2em] uppercase text-ink/50 mt-3">
            {it.label}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
