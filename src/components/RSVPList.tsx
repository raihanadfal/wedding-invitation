import { useEffect, useState } from "react";
import Reveal from "./Reveal";

interface RSVPEntry {
  nama: string;
  kehadiran: string;
  jumlahTamu: number;
  ucapan: string;
  tanggal: string;
  jam: string;
}

export default function RSVPList() {
  const [rsvpList, setRsvpList] = useState<RSVPEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchRSVPData();
    // Refresh data setiap 30 detik
    const interval = setInterval(fetchRSVPData, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchRSVPData = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Gunakan Google Sheets CSV export
      // Format: https://docs.google.com/spreadsheets/d/SHEET_ID/export?format=csv&gid=0
      // Ganti SHEET_ID dengan ID dari URL Google Sheet
      const sheetId = "1ug0SJWxBSbaDcHTUIhIBzImJYuZRv5mG9zPgu4EhtFY"; // Ganti dengan ID Anda
      const url = `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv&gid=0`;

      const response = await fetch(url);
      const csv = await response.text();

      // Parse CSV
      const lines = csv.split("\n");
      const entries: RSVPEntry[] = [];

      // Skip header row (row 0)
      for (let i = 1; i < lines.length; i++) {
        if (!lines[i].trim()) continue;

        // Simple CSV parsing
        const columns = lines[i]
          .split(",")
          .map((col) => col.trim().replace(/^"|"$/g, ""));

        if (columns[0]) {
          // Jika ada nama
          entries.push({
            nama: columns[0] || "",
            kehadiran: columns[1] || "",
            jumlahTamu: parseInt(columns[2]) || 0,
            tanggal: columns[3] || "",
            jam: columns[4] || "",
            ucapan: columns[5] || "",
          });
        }
      }

      setRsvpList(entries);
      console.log("RSVP data loaded:", entries.length, "entries");
      setIsLoading(false);
    } catch (err) {
      console.error("Error fetching RSVP data:", err);
      setError("Gagal memuat ucapan tamu");
      setIsLoading(false);
    }
  };

  return (
    <section className="px-6 py-24 bg-white">
      <Reveal className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-display italic text-4xl mb-4 text-ink">
            Ucapan Tamu
          </h2>
          <p className="text-sm text-ink/60">
            Terima kasih atas doa dan ucapan terbaik Anda
          </p>
        </div>

        {/* Stats */}
        {/* <div className="grid sm:grid-cols-3 gap-6 mb-12">
          <div className="text-center p-6 bg-white rounded-lg shadow-sm border border-ink/10">
            <div className="text-3xl font-display text-moss mb-2">
              {rsvpList.length}
            </div>
            <p className="text-xs uppercase tracking-widest text-ink/60">
              Total Konfirmasi
            </p>
          </div>
          <div className="text-center p-6 bg-white rounded-lg shadow-sm border border-ink/10">
            <div className="text-3xl font-display text-ink mb-2">{hadir}</div>
            <p className="text-xs uppercase tracking-widest text-ink/60">
              Hadir
            </p>
          </div>
          <div className="text-center p-6 bg-white rounded-lg shadow-sm border border-ink/10">
            <div className="text-3xl font-display text-clay mb-2">
              {totalTamu}
            </div>
            <p className="text-xs uppercase tracking-widest text-ink/60">
              Total Tamu
            </p>
          </div>
        </div> */}

        {/* RSVP List */}
        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-sm text-ink/60">Memuat data...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-sm text-red-600">{error}</p>
            <p className="text-xs text-ink/60 mt-2">
              Fitur daftar tamu sedang dalam pengembangan
            </p>
          </div>
        ) : rsvpList.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-sm text-ink/60">Belum ada ucapan dari tamu</p>
          </div>
        ) : (
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {rsvpList
              .filter((item) => item.ucapan && item.ucapan.trim())
              .map((item, idx) => (
                <div
                  key={idx}
                  className="p-6 bg-white rounded-lg border border-ink/10 hover:border-moss/30 transition-colors"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="font-medium text-ink">{item.nama}</p>
                      <p className="text-xs text-ink/60">
                        {item.kehadiran === "Hadir"
                          ? `Hadir - ${item.jumlahTamu} tamu`
                          : "Tidak Hadir"}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-ink/80 italic leading-relaxed">
                    "{item.ucapan}"
                  </p>
                </div>
              ))}
          </div>
        )}
      </Reveal>
    </section>
  );
}
