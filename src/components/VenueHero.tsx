// VenueHero.tsx
"use client";

export default function VenueHero() {
  return (
    <div className="relative h-full w-full overflow-hidden bg-black">
      <img
        src="/images/venue.webp"
        alt="Venue"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/50" />

      <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-6">
        <h2 className="font-display italic text-5xl sm:text-7xl mb-8 drop-shadow-lg">
          Venue
        </h2>

        <div className="mb-8 max-w-md">
          <p className="text-lg sm:text-xl font-semibold mb-4">
            Rumah Makan Depa 2
          </p>
          <p className="text-sm sm:text-base leading-relaxed mb-3">
            JL. Cikalong, Mandalajaya, Kec. Cikalong,
            <br />
            Kabupaten Tasikmalaya, Jawa Barat 46195
          </p>
          <p className="text-xs sm:text-sm text-white/80">
            -7.792046, 108.188630
          </p>
        </div>

        <a
          href="https://maps.app.goo.gl/uZNcpmKEyBWnUosu5"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-6 py-3 bg-white/90 backdrop-blur-sm text-ink text-sm uppercase tracking-widest rounded-full hover:bg-white transition-colors font-medium shadow-lg hover:shadow-xl"
        >
          Buka di Maps
        </a>
      </div>
    </div>
  );
}
