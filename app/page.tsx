"use client";

import Countdown from "./components/Countdown";
import Reveal from "./components/Reveal";
import HeroGrid from "./components/HeroGrid";
import LoveStorySticky from "./components/LoveStorySticky";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

const WEDDING_DATE = "2026-08-23T10:00:00";
const COUPLE = "Raihan & Devi";

const STORY_STAGES = [
  {
    title: "Stage 1 — Kampus",
    text: "Bertemu pertama kali di kampus, jadi teman satu kelompok tugas dan mulai sering jajan bareng.",
    gradient: "from-moss/30 to-clay/30",
    image: "/images/stages/stage-1.webp",
  },
  {
    title: "Stage 2 — Jarak Jauh",
    text: "Sempat LDR-an, tapi makin dekat lewat telepon tiap malam dan rencana liburan.",
    gradient: "from-clay/30 to-moss/40",
    image: "/images/stages/stage-2.webp",
  },
  {
    title: "Stage 3 — Lamaran",
    text: "Devi melamar Raihan di pantai tempat mereka pertama liburan bersama.",
    gradient: "from-ink/20 to-clay/40",
    // TODO: ganti dengan foto asli lamaran
  },
];

function HomeContent() {
  const searchParams = useSearchParams();
  const guest = searchParams.get("to")?.trim() || "Tamu Undangan";

  return (
    <main>
      {/* HERO -> GRID -> INVITE (scroll-linked) */}
      <HeroGrid couple={COUPLE} guest={guest} />

      {/* LOVE STORY (pinned, stacks behind on scroll) */}
      <LoveStorySticky stages={STORY_STAGES} />

      <section className="px-6 py-24 max-w-3xl mx-auto text-center">
        <Reveal>
          <h2 className="font-display italic text-4xl mb-14">Mempelai</h2>
          <div className="grid sm:grid-cols-2 gap-8">
            <div className="flex flex-col items-center">
              <div className="mb-6 rounded-lg overflow-hidden aspect-[2/3] relative bg-gray-200 w-40 sm:w-48">
                <Image
                  src="/images/brides/mempelai-pria.webp"
                  alt="Raihan"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="font-display italic text-3xl text-ink mb-4">
                Raihan Afdal Hadi S.Kom
              </div>
              <p className="text-xs uppercase tracking-[0.15em] text-moss mb-2">
                Putra dari
              </p>
              <p className="text-sm text-ink/70">
                Bapak Dani Haryono S.Pd &amp; Ibu Neni Maria
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="mb-6 rounded-lg overflow-hidden aspect-[2/3] relative bg-gray-200 w-40 sm:w-48">
                <Image
                  src="/images/brides/mempelai-wanita.webp"
                  alt="Devi"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="font-display italic text-3xl text-ink mb-4">
                Devi Resti S.E
              </div>
              <p className="text-xs uppercase tracking-[0.15em] text-moss mb-2">
                Putri dari
              </p>
              <p className="text-sm text-ink/70">
                Bapak Udin Wahyudin S.Pd &amp; Ibu Enur
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* COUNTDOWN */}
      <section className="px-6 py-24 bg-white text-center">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.3em] text-moss">
            Sampai jumpa di
          </p>
          <h2 className="font-display italic text-4xl sm:text-5xl mt-3 mb-12">
            23 Agustus 2026
          </h2>
          <Countdown target={WEDDING_DATE} />
        </Reveal>
      </section>

      {/* EVENT SCHEDULE */}
      <section id="acara" className="px-6 py-24 max-w-3xl mx-auto text-center">
        <Reveal>
          <h2 className="font-display italic text-4xl mb-14">
            Rangkaian Acara
          </h2>
        </Reveal>
        <div className="grid sm:grid-cols-2 gap-12">
          {[
            { j: "08.00", n: "Akad Nikah", l: "Rumah Makan Depa 2" },
            { j: "10.00", n: "Resepsi", l: "Rumah Makan Depa 2" },
          ].map((e, i) => (
            <Reveal key={e.n} delay={i * 120}>
              <div>
                <div className="font-display text-3xl">{e.j}</div>
                <div className="divider my-4" />
                <div className="text-sm uppercase tracking-widest">{e.n}</div>
                <div className="text-xs text-ink/60 mt-1">{e.l}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* VENUE */}
      <section id="venue" className="px-6 py-24 max-w-4xl mx-auto">
        <Reveal>
          <h2 className="font-display italic text-4xl mb-14 text-center">
            Venue
          </h2>

          {/* Akad & Resepsi */}
          <div className="grid sm:grid-cols-2 gap-8">
            <div>
              <div className="p-6 border border-ink/10 rounded-lg hover:border-moss/30 transition-colors h-full">
                <div className="font-display italic text-2xl text-ink mb-2">
                  Akad Nikah & Resepsi
                </div>
                <p className="text-sm text-ink/70 mb-4">
                  Rumah Makan Depa 2
                  <br />
                  Cipatujah - Kalapagenep, Mandalajaya, Kec. Cikalong, Kabupaten
                  Tasikmalaya, Jawa Barat 46195
                  <br />
                  <span className="text-xs text-ink/50 mt-2 block">
                    18.00 WIB
                  </span>
                </p>
                <a
                  href="https://maps.app.goo.gl/uZNcpmKEyBWnUosu5"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-6 py-2 bg-moss text-white text-xs uppercase tracking-widest rounded-full hover:bg-clay transition-colors"
                >
                  📍 Buka di Maps
                </a>
              </div>
            </div>

            <div className="rounded-lg overflow-hidden border border-ink/10">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d439.42966528697906!2d108.18836115380496!3d-7.792116951014507!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1srumah%20makan%20depa%20cikalong%20tasikmalaya!5e1!3m2!1sid!2sid!4v1786858815673!5m2!1sid!2sid"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </div>
          </div>
        </Reveal>
      </section>

      {/* RSVP */}
      <section id="rsvp" className="px-6 py-24 bg-white">
        <Reveal className="max-w-md mx-auto text-center">
          <h2 className="font-display italic text-4xl mb-3">
            Konfirmasi Kehadiran
          </h2>
          {/* <p className="text-sm text-ink/60 mb-12">
            Mohon konfirmasi sebelum 1 Juni 2027
          </p> */}
          <form className="space-y-6 text-left">
            <div>
              <label className="text-xs uppercase tracking-widest text-ink/60 block mb-3">
                Nama
              </label>
              <div className="text-sm font-bold text-moss bg-moss/10 px-4 py-3 rounded-full">
                {guest !== "Tamu Undangan" ? guest : "Nama lengkap"}
              </div>
            </div>

            <div>
              <label className="text-xs uppercase tracking-widest text-ink/60 block mb-3">
                Kehadiran
              </label>
              <select className="w-full px-4 py-3 bg-transparent border border-ink/20 rounded-lg focus:outline-none focus:border-moss focus:ring-1 focus:ring-moss/30">
                <option>Hadir</option>
                <option>Tidak Hadir</option>
              </select>
            </div>

            <div>
              <label className="text-xs uppercase tracking-widest text-ink/60 block mb-3">
                Jumlah Tamu
              </label>
              <input
                type="number"
                min={1}
                defaultValue={1}
                className="w-full px-4 py-3 bg-transparent border border-ink/20 rounded-lg focus:outline-none focus:border-moss focus:ring-1 focus:ring-moss/30"
              />
            </div>

            <button
              type="submit"
              className="w-full mt-8 bg-ink text-cream text-xs uppercase tracking-widest py-3 rounded-full hover:bg-moss transition-colors font-medium"
            >
              Kirim Konfirmasi
            </button>
          </form>
        </Reveal>
      </section>

      {/* FOOTER */}
      <footer className="px-6 py-14 text-center">
        <span className="font-display italic text-2xl">R &amp; D</span>
        <p className="text-xs text-ink/50 mt-3">
          Dengan penuh sukacita, kami menantikan kehadiran Anda.
        </p>
      </footer>
    </main>
  );
}

export default function Home() {
  return (
    <Suspense fallback={null}>
      <HomeContent />
    </Suspense>
  );
}
