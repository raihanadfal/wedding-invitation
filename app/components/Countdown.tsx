"use client";
import { useEffect, useState } from "react";

export default function Countdown({ target }: { target: string }) {
  const [t, setT] = useState({ d: 0, h: 0, m: 0, s: 0 });

  useEffect(() => {
    const targetDate = new Date(target).getTime();
    const tick = () => {
      const diff = Math.max(0, targetDate - Date.now());
      setT({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff / 3600000) % 24),
        m: Math.floor((diff / 60000) % 60),
        s: Math.floor((diff / 1000) % 60),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [target]);

  const items = [
    { label: "hari", val: t.d },
    { label: "jam", val: t.h },
    { label: "menit", val: t.m },
    { label: "detik", val: t.s },
  ];

  return (
    <div className="flex justify-center gap-8 sm:gap-14">
      {items.map((it) => (
        <div key={it.label} className="text-center">
          <div className="font-display text-4xl sm:text-5xl text-ink">
            {String(it.val).padStart(2, "0")}
          </div>
          <div className="text-[11px] tracking-[0.2em] uppercase text-ink/60 mt-1">
            {it.label}
          </div>
        </div>
      ))}
    </div>
  );
}
