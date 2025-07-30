import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

const availableSlots = [
  '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'
];

const SpotkaniePage: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string>('');
  const [form, setForm] = useState({ name: '', email: '', callback: false });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const reservationData = {
        name: form.name,
        email: form.email,
        message: form.callback ? 'Proszę o kontakt telefoniczny lub mailowy z potwierdzeniem spotkania' : '',
        start: selectedDate ? `${selectedDate.toISOString().split('T')[0]}T${selectedSlot}:00` : '',
        end: selectedDate ? `${selectedDate.toISOString().split('T')[0]}T${selectedSlot}:59` : '',
      };
      console.log('Submitting reservation to backend:', reservationData);
      const response = await fetch('/backend/spotkanie', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reservationData),
      });
      if (response.ok) {
        setSubmitted(true);
      } else {
        const errorData = await response.json();
        alert('Błąd podczas rezerwacji: ' + (errorData.error || 'Spróbuj ponownie.'));
      }
    } catch (error) {
      console.error('Error submitting reservation:', error);
      alert('Błąd podczas rezerwacji. Spróbuj ponownie.');
    }
  };

  return (
    <>
      <Header />
      <section className="pt-10 pb-24 bg-white dark:bg-gray-900 min-h-screen flex items-center justify-center">
        <div className="container mx-auto max-w-xl px-6 mt-20">
          <h1 className="text-4xl font-bold mb-10 mt-8 text-center">Zaplanuj spotkanie</h1>
          <p className="mb-8 text-center text-lg text-gray-700 dark:text-gray-300">
            Wybierz dogodny termin w poniższym kalendarzu Google, a następnie ręcznie wpisz datę w formularzu rezerwacji. Po rezerwacji otrzymasz potwierdzenie na email, a my skontaktujemy się z Tobą.
          </p>
          <div className="mb-8">
            <div className="mt-8">
              <label htmlFor="datepicker" className="block text-xl font-semibold mb-2">Wybierz datę spotkania:</label>
              <DatePicker
                id="datepicker"
                selected={selectedDate}
                onChange={(date: Date | null) => setSelectedDate(date)}
                dateFormat="yyyy-MM-dd"
                className="mb-4 w-full px-4 py-2 border rounded-lg"
                placeholderText="Kliknij, aby wybrać datę"
                required
              />
            </div>
            <h2 className="text-xl font-semibold mb-2 mt-8">Dostępne godziny:</h2>
            <div className="grid grid-cols-3 gap-4">
              {availableSlots.map(slot => (
                <button
                  key={slot}
                  className={`py-2 px-4 rounded-lg border font-medium ${selectedSlot === slot ? 'bg-blue-600 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200'}`}
                  onClick={() => setSelectedSlot(slot)}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Imię i nazwisko"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg"
            />
            <input
              type="email"
              name="email"
              placeholder="Adres e-mail"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg"
            />
            <div className="flex items-center gap-0.5">
              <input
                type="checkbox"
                name="callback"
                checked={form.callback}
                onChange={handleChange}
                className="align-middle"
                style={{ marginRight: '2px', verticalAlign: 'middle' }}
              />
              <label htmlFor="callback" className="text-base align-middle" style={{ verticalAlign: 'middle' }}>Proszę o kontakt telefoniczny lub mailowy z potwierdzeniem spotkania</label>
            </div>
            <button
              type="submit"
              disabled={!selectedDate || !selectedSlot || submitted}
              className="w-full py-3 rounded-lg bg-blue-600 text-white font-bold mt-4"
            >
              Zarezerwuj spotkanie
            </button>
          </form>
          {submitted && (
            <div className="mt-6 text-green-600 text-center font-semibold">
              Dziękujemy! Twoja rezerwacja została przyjęta. Sprawdź skrzynkę e-mail.
            </div>
          )}
          <div className="mt-8 flex justify-center">
            <a
              href="https://wa.me/48723262802"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-lg bg-green-500 text-white font-bold flex items-center gap-2"
            >
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M16.72 14.87c-.23-.12-1.36-.67-1.57-.75-.21-.08-.36-.12-.51.12-.15.23-.58.75-.71.9-.13.15-.26.17-.49.06-.23-.12-.97-.36-1.85-1.13-.68-.6-1.13-1.34-1.26-1.57-.13-.23-.01-.35.1-.47.1-.1.23-.26.34-.39.11-.13.15-.23.23-.38.08-.15.04-.29-.02-.41-.06-.12-.51-1.23-.7-1.68-.18-.44-.37-.38-.51-.39-.13-.01-.29-.01-.45-.01-.16 0-.41.06-.63.29-.22.23-.85.83-.85 2.02 0 1.19.87 2.34 1 2.5.13.15 1.71 2.73 4.15 3.72.58.25 1.03.4 1.38.51.58.18 1.11.15 1.53.09.47-.07 1.36-.56 1.55-1.1.19-.54.19-1 .13-1.1-.06-.1-.21-.16-.44-.28z"/></svg>
              WhatsApp
            </a>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default SpotkaniePage;
