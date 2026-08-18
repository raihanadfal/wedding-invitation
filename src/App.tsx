import Reveal from "./components/Reveal";
import HeroGrid from "./components/HeroGrid";
import LoveStorySticky from "./components/LoveStorySticky";
import CountdownVenueSection from "./components/CountdownVenueSection";
import GalleryParallax from "./components/GalleryParallax";
import RSVPForm from "./components/RSVPForm";
import RSVPList from "./components/RSVPList";

const WEDDING_DATE = "2026-08-23T10:00:00";
const COUPLE = "Raihan & Devi";

export const STORY_STAGES = [
  {
    title: "Awal Cerita",
    text: "Awalnya hanya perkenalan biasa yang berlanjut tanpa banyak rencana.",
    gradient: "from-amber-100 to-orange-100",
    image: "/images/stages/stage-1.webp",
  },
  {
    title: "Saling Memahami",
    text: "Proses panjang untuk saling mengenal, menerima perbedaan, dan belajar berjalan beriringan.",
    gradient: "from-emerald-100 to-teal-100",
    image: "/images/stages/stage-2.webp",
  },
  {
    title: "Langkah Lanjutan",
    text: "Setelah melewati berbagai tahapan, kami siap memulai babak baru sebagai pasangan suami istri.",
    gradient: "from-rose-100 to-pink-100",
    image: "/images/stages/stage-3.webp",
  },
];

function getGuestName(): string {
  if (typeof window === "undefined") return "Tamu Undangan";
  const params = new URLSearchParams(window.location.search);
  return params.get("to")?.trim() || "Tamu Undangan";
}

function App() {
  const guest = getGuestName();

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
                <img
                  src="/images/brides/mempelai-pria.webp"
                  alt="Raihan"
                  className="w-full h-full object-cover"
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
                <img
                  src="/images/brides/mempelai-wanita.webp"
                  alt="Devi"
                  className="w-full h-full object-cover"
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

      {/* GALLERY PARALLAX */}
      <GalleryParallax />

      {/* COUNTDOWN -> VENUE (curtain-reveal scroll-linked) */}
      <CountdownVenueSection target={WEDDING_DATE} />

      {/* JADWAL ACARA */}
      <section id="acara" className="px-6 py-24 max-w-3xl mx-auto">
        <Reveal>
          <h2 className="font-display italic text-4xl mb-16 text-center">
            Jadwal Acara
          </h2>
          <div className="grid sm:grid-cols-2 gap-12">
            <Reveal delay={0}>
              <div>
                <div className="font-display text-4xl text-ink">08.00</div>
                <div className="border-b border-ink/10 my-4" />
                <div className="text-sm uppercase tracking-widest font-medium text-ink">
                  Akad Nikah
                </div>
                <div className="text-xs text-ink/60 mt-2">
                  Rumah Makan Depa 2
                </div>
              </div>
            </Reveal>
            <Reveal delay={0}>
              <div>
                <div className="font-display text-4xl text-ink">10.00</div>
                <div className="border-b border-ink/10 my-4" />
                <div className="text-sm uppercase tracking-widest font-medium text-ink">
                  Resepsi
                </div>
                <div className="text-xs text-ink/60 mt-2">
                  Rumah Makan Depa 2
                </div>
              </div>
            </Reveal>
          </div>
        </Reveal>
      </section>

      {/* RSVP */}
      <RSVPForm guest={guest} />

      {/* RSVP LIST */}
      <RSVPList />

      {/* FOOTER */}
      {/* <footer className="px-6 py-14 text-center">
        <span className="font-display italic text-2xl">R &amp; D</span>
        <p className="text-xs text-ink/50 mt-3">
          Dengan penuh sukacita, kami menantikan kehadiran Anda.
        </p>
      </footer> */}
    </main>
  );
}

export default App;
