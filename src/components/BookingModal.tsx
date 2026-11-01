import React, { useState } from 'react';
import { X, CalendarCheck, CheckCircle2, MessageCircle, Phone, MapPin, Users } from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [region, setRegion] = useState('Qəbələ');
  const [guests, setGuests] = useState('4-6 nəfər');
  const [date, setDate] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const whatsappMessage = encodeURIComponent(
    `Salam, bagevim.az saytından bağ evi bron etmək istəyirəm.\nAd: ${name || 'Müştəri'}\nƏlaqə: ${phone || 'Qeyd olunmayıb'}\nBölgə: ${region}\nQonaq sayı: ${guests}\nTarix: ${date || 'Müzakirə olunacaq'}`
  );
  const whatsappUrl = `https://wa.me/994502220000?text=${whatsappMessage}`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-modal-title"
    >
      <div className="relative w-full max-w-lg overflow-hidden rounded-[2.5rem] border border-white/20 bg-neutral-900 p-6 sm:p-8 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-neutral-800 text-neutral-400 hover:bg-white hover:text-black transition-colors cursor-pointer"
          aria-label="Bağla"
        >
          <X className="h-5 w-5" />
        </button>

        {!submitted ? (
          <div>
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-400 text-neutral-950 shadow-md">
                <CalendarCheck className="h-6 w-6" />
              </span>
              <div>
                <h3 id="booking-modal-title" className="text-xl font-bold text-white">
                  Bağ Evi Bron Et
                </h3>
                <p className="text-xs text-neutral-400">
                  Azərbaycanın istənilən bölgəsində zövqünüzə uyğun villa seçimi
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label className="text-xs font-semibold text-neutral-300 block mb-1">
                  İstirahət Bölgəsi
                </label>
                <select
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-neutral-950 px-4 py-2.5 text-sm text-white focus:border-amber-400 focus:outline-none cursor-pointer"
                >
                  <option value="Qəbələ">Qəbələ (Tufandağ / Nohurgöl)</option>
                  <option value="Quba">Quba (Qəçrəş / Qudyalçay)</option>
                  <option value="Bakı">Bakı (Mərdəkan / Bilgəh / Şüvəlan)</option>
                  <option value="Naxçıvan">Naxçıvan (Batabat / Ordubad)</option>
                  <option value="Gəncə">Gəncə & Göygöl (Hacıkənd)</option>
                  <option value="İsmayıllı">İsmayıllı (Lahıc / Qaranohur)</option>
                  <option value="Şəki">Şəki (Kiş kəndi)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-neutral-300 block mb-1">
                    Giriş Tarixi
                  </label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-neutral-950 px-3 py-2 text-sm text-white focus:border-amber-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-neutral-300 block mb-1">
                    Qonaq Sayı
                  </label>
                  <select
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-neutral-950 px-3 py-2 text-sm text-white focus:border-amber-400 focus:outline-none cursor-pointer"
                  >
                    <option value="1-3 nəfər">1 - 3 nəfər</option>
                    <option value="4-6 nəfər">4 - 6 nəfər</option>
                    <option value="7-10 nəfər">7 - 10 nəfər</option>
                    <option value="10+ nəfər">10+ nəfər (Geniş qrup)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-neutral-300 block mb-1">
                  Adınız və Soyadınız
                </label>
                <input
                  type="text"
                  required
                  placeholder="Məs: Əli Məmmədov"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-neutral-950 px-4 py-2.5 text-sm text-white placeholder:text-neutral-500 focus:border-amber-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-neutral-300 block mb-1">
                  Əlaqə Nömrəniz
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+994 (50) 000-00-00"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-neutral-950 px-4 py-2.5 text-sm text-white placeholder:text-neutral-500 focus:border-amber-400 focus:outline-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full rounded-full bg-gradient-to-r from-amber-400 to-amber-500 py-3 text-sm font-bold text-neutral-950 shadow-lg shadow-amber-500/25 transition-all hover:brightness-110 active:scale-95 cursor-pointer"
                >
                  Sorğunu Göndər
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="text-center py-6 space-y-4">
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <CheckCircle2 className="h-8 w-8" />
            </span>
            <h3 className="text-xl font-bold text-white">Sorğunuz Qəbul Olundu!</h3>
            <p className="text-xs text-neutral-300 leading-relaxed max-w-sm mx-auto">
              Hörmətli <span className="text-white font-semibold">{name}</span>, {region} bölgəsi üzrə bağ evi
              sorğunuz qeydə alındı. Menecerimiz 10 dəqiqə ərzində sizinlə əlaqə saxlayacaq.
            </p>

            <div className="pt-3 flex flex-col gap-2.5">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-full bg-emerald-600 px-5 py-3 text-xs font-bold text-white hover:bg-emerald-500 transition-colors"
              >
                <MessageCircle className="h-4 w-4" />
                <span>WhatsApp ilə Birbaşa Əlaqə</span>
              </a>

              <button
                type="button"
                onClick={onClose}
                className="rounded-full border border-white/15 bg-neutral-800 py-2.5 text-xs font-semibold text-neutral-300 hover:text-white"
              >
                Pəncərəni Bağla
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
