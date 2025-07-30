import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';

const CennikPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow flex flex-col items-center justify-center pt-56 pb-24 px-4">
        <section className="w-full max-w-3xl mb-16 bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-700 p-10 flex flex-col items-center">
          <h2 className="text-4xl md:text-5xl font-light text-gray-900 dark:text-white mb-8 text-center tracking-wide">
            Ceny ustalane indywidualnie
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 text-center max-w-xl">
            Każdy projekt i współpraca są wyceniane indywidualnie, w zależności od zakresu, celów i potrzeb klienta. Zapraszam do kontaktu w celu uzyskania szczegółowej wyceny.
          </p>
        </section>
        <section className="w-full max-w-3xl mb-16 bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-700 p-10 flex flex-col items-center">
          <h2 className="text-3xl md:text-4xl font-light text-gray-900 dark:text-white mb-8 text-center tracking-wide">
            Stawka orientacyjna
          </h2>
          <p className="text-2xl font-bold text-blue-700 dark:text-blue-400 mb-4 text-center">
            200 zł netto za godzinę pracy 1:1
          </p>
          <p className="text-lg text-gray-600 dark:text-gray-300 text-center max-w-xl">
            Stawka dotyczy indywidualnych sesji rozwojowych. Ostateczna cena może się różnić w zależności od zakresu współpracy.
          </p>
        </section>
        <button
          className="mt-8 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white text-xl font-semibold rounded-full shadow-lg transition-all duration-300"
          onClick={() => navigate('/spotkanie')}
        >
          Rezerwuj Spotkanie
        </button>
      </main>
      <Footer />
    </div>
  );
};

export default CennikPage;
