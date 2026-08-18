import { useState } from "react";
import Reveal from "./Reveal";

interface RSVPFormData {
  nama: string;
  kehadiran: "Hadir" | "Tidak Hadir";
  jumlahTamu: number;
  ucapan: string;
}

export default function RSVPForm({ guest }: { guest: string }) {
  const [formData, setFormData] = useState<RSVPFormData>({
    nama: guest !== "Tamu Undangan" ? guest : "",
    kehadiran: "Hadir",
    jumlahTamu: 1,
    ucapan: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate nama
    if (!formData.nama.trim()) {
      setMessage({ type: "error", text: "Mohon isi nama Anda" });
      return;
    }

    setIsLoading(true);
    setMessage(null);

    try {
      // Submit ke Google Apps Script
      const scriptUrl =
        (import.meta as any).env.VITE_GOOGLE_SCRIPT_URL ||
        "https://script.google.com/macros/s/AKfycbx9MfRG_uUvsKHOGzJ2rxVBQg7-1tf9QSS39FpHr0cU2MlRhG9UBg70K4UCGpksTiy3/exec";

      if (!scriptUrl || scriptUrl.includes("undefined")) {
        throw new Error("Google Script URL not configured");
      }

      const payload = {
        action: "addRSVP",
        data: {
          nama: formData.nama.trim(),
          kehadiran: formData.kehadiran,
          jumlahTamu: formData.jumlahTamu,
          ucapan: formData.ucapan.trim(),
          tanggal: new Date().toLocaleDateString("id-ID"),
          jam: new Date().toLocaleTimeString("id-ID"),
        },
      };

      await fetch(scriptUrl, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      // Delay untuk memastikan data tersimpan
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setMessage({
        type: "success",
        text: "Terima kasih! Konfirmasi Anda telah dikirim.",
      });

      // Reset form
      setFormData({
        nama: "",
        kehadiran: "Hadir",
        jumlahTamu: 1,
        ucapan: "",
      });
    } catch (error) {
      console.error("RSVP Error:", error);
      setMessage({
        type: "error",
        text: "Gagal mengirim konfirmasi. Silakan coba lagi.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="rsvp" className="px-6 py-24 bg-white">
      <Reveal className="max-w-md mx-auto text-center">
        <h2 className="font-display italic text-4xl mb-8">
          Konfirmasi Kehadiran
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6 text-left">
          <div>
            <label className="text-xs uppercase tracking-widest text-ink/60 block mb-3">
              Nama
            </label>
            <input
              type="text"
              value={formData.nama}
              onChange={(e) =>
                setFormData({ ...formData, nama: e.target.value })
              }
              placeholder="Masukkan nama Anda"
              className="w-full px-4 py-3 bg-transparent border border-ink/20 rounded-lg focus:outline-none focus:border-moss focus:ring-1 focus:ring-moss/30"
            />
          </div>

          <div>
            <label className="text-xs uppercase tracking-widest text-ink/60 block mb-3">
              Kehadiran
            </label>
            <select
              value={formData.kehadiran}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  kehadiran: e.target.value as "Hadir" | "Tidak Hadir",
                })
              }
              className="w-full px-4 py-3 bg-transparent border border-ink/20 rounded-lg focus:outline-none focus:border-moss focus:ring-1 focus:ring-moss/30"
            >
              <option value="Hadir">Hadir</option>
              <option value="Tidak Hadir">Tidak Hadir</option>
            </select>
          </div>

          <div>
            <label className="text-xs uppercase tracking-widest text-ink/60 block mb-3">
              Jumlah Tamu
            </label>
            <input
              type="number"
              min={1}
              value={formData.jumlahTamu}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  jumlahTamu: Math.max(1, parseInt(e.target.value) || 1),
                })
              }
              className="w-full px-4 py-3 bg-transparent border border-ink/20 rounded-lg focus:outline-none focus:border-moss focus:ring-1 focus:ring-moss/30"
            />
          </div>

          <div>
            <label className="text-xs uppercase tracking-widest text-ink/60 block mb-3">
              Ucapan (Opsional)
            </label>
            <textarea
              value={formData.ucapan}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  ucapan: e.target.value,
                })
              }
              placeholder="Sampaikan ucapan atau doa Anda untuk kami"
              rows={3}
              className="w-full px-4 py-3 bg-transparent border border-ink/20 rounded-lg focus:outline-none focus:border-moss focus:ring-1 focus:ring-moss/30 resize-none"
            />
          </div>

          {message && (
            <div
              className={`text-sm px-4 py-3 rounded-lg ${
                message.type === "success"
                  ? "bg-moss/10 text-moss"
                  : "bg-red-100 text-red-600"
              }`}
            >
              {message.text}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-8 bg-ink text-cream text-xs uppercase tracking-widest py-3 rounded-full hover:bg-moss transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Mengirim..." : "Kirim Konfirmasi"}
          </button>
        </form>
      </Reveal>
    </section>
  );
}
