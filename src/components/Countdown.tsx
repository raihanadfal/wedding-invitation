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
    <div className="flex justify-center gap-6 sm:gap-10">
      {items.map((it) => (
        <div key={it.label} className="text-center">
          <div className="font-display text-6xl sm:text-8xl font-bold text-ink leading-none">
            {String(it.val).padStart(2, "0")}
          </div>
          <div className="text-xs sm:text-sm tracking-[0.2em] uppercase text-ink/50 mt-3">
            {it.label}
          </div>
        </div>
      ))}
    </div>
  );
}
