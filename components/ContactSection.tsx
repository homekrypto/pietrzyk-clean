
import React from 'react';
import SpotlightCard from './SpotlightCard';

const ContactSection: React.FC = () => {
  return (
    <section id="kontakt" className="py-24 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-6 text-center max-w-2xl">
        <h2 className="text-4xl md:text-5xl font-bold text-blue-800 dark:text-blue-300 mb-6">
          Kontakt
        </h2>
        <p className="text-lg md:text-xl text-gray-700 dark:text-gray-200 mb-10 max-w-xl mx-auto leading-relaxed">
          Skontaktuj się ze mną i umów na <a href="/spotkanie" className="font-semibold text-blue-700 dark:text-blue-400 underline hover:text-blue-900 dark:hover:text-blue-200 transition-colors">spotkanie</a>.<br />
          Razem zdefiniujemy Twoje cele i zaplanujemy pierwsze kroki.
        </p>
        <div className="flex flex-col md:flex-row gap-8 justify-center items-center mb-12">
          <div className="w-full md:w-1/2">
            <SpotlightCard spotlightColor="rgba(0, 229, 255, 0.2)">
              <div className="flex flex-col items-center">
                <h3 className="text-xl font-semibold text-blue-900 dark:text-blue-200 mb-1">Telefon</h3>
                <a 
                  href="tel:+48723262802" 
                  className="text-lg text-blue-700 dark:text-blue-400 font-medium hover:underline px-4 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 min-w-[260px] text-center"
                  style={{ minWidth: '260px', display: 'inline-block' }}
                >
                  723 262 802
                </a>
              </div>
            </SpotlightCard>
          </div>
          <div className="w-full md:w-1/2">
            <SpotlightCard spotlightColor="rgba(0, 229, 255, 0.2)">
              <div className="flex flex-col items-center">
                <h3 className="text-xl font-semibold text-blue-900 dark:text-blue-200 mb-1">E-mail</h3>
                <a 
                  href="mailto:info@lukaszpietrzyk.pl" 
                  className="text-lg text-blue-700 dark:text-blue-400 font-medium hover:underline break-all px-4 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 min-w-[260px] text-center"
                  style={{ minWidth: '260px', display: 'inline-block' }}
                >
                  info@lukaszpietrzyk.pl
                </a>
              </div>
            </SpotlightCard>
          </div>
        </div>
        {/* Removed Zadzwoń teraz and Napisz e-mail buttons as requested */}
      </div>
    </section>
  );
};

export default ContactSection;
