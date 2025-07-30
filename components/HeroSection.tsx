
import React from 'react';



const HeroSection: React.FC = () => {
  return (
    <section id="hero" className="relative min-h-[80vh] flex items-center justify-center bg-black overflow-hidden">
      {/* Background Image */}
      <img
        src="/business-man-6583629_1280.jpg"
        alt="Business man hero background"
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-80"
        draggable="false"
        style={{ pointerEvents: 'none', userSelect: 'none', zIndex: 0 }}
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 z-10" />

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center justify-center w-full px-4 py-16">
        <h1 className="text-3xl md:text-5xl font-bold text-white text-center mb-4 drop-shadow-2xl tracking-tight">
          Witaj w świecie rozwoju i sukcesu
        </h1>
        <p className="text-lg md:text-2xl text-slate-200 text-center max-w-2xl mb-8 font-light">
          Profesjonalny coaching, mentoring i transformacja dla Ciebie lub Twojego zespołu.
        </p>
        <div className="flex flex-col sm:flex-row gap-2 w-full max-w-xs mx-auto justify-center items-center">
          <a
            href="#kontakt"
            className="bg-blue-700 hover:bg-blue-800 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 uppercase tracking-wider text-base shadow-md hover:shadow-xl text-center"
          >
            Skontaktuj się
          </a>
          <a
            href="#opinie"
            className="border-2 border-white text-white hover:bg-white hover:text-blue-800 font-semibold py-3 px-8 rounded-full transition-all duration-300 uppercase tracking-wider text-base shadow-md hover:shadow-xl text-center"
          >
            Opinie klientów
          </a>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 animate-bounce">
        <a href="#o-mnie" aria-label="Przewiń w dół">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
