
import React from 'react';

const ServicesSection: React.FC = () => {
  const services = [
    {
      title: "Coaching Indywidualny",
      description: "Spersonalizowane sesje 1:1 skoncentrowane na Twoich celach zawodowych i osobistych."
    },
    {
      title: "Mentoring Biznesowy",
      description: "Wsparcie dla przedsiębiorców i menedżerów w rozwoju kompetencji przywódczych."
    },
    {
      title: "Coaching Kariery",
      description: "Pomoc w planowaniu ścieżki zawodowej, zmianie branży lub awansie."
    },
    {
      title: "Rozwój Kompetencji",
      description: "Szkolenia w zakresie komunikacji, asertywności i zarządzania emocjami."
    }
  ];

  return (
    <section id="oferta" className="py-24 bg-slate-50 dark:bg-gray-800">
      <div className="container mx-auto px-6 max-w-6xl">
        <h2 className="text-4xl md:text-5xl font-light text-slate-800 dark:text-white mb-16 text-center tracking-wide">
          Oferta
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <div key={index} className="group">
              <div className="border-l-2 border-slate-300 dark:border-slate-600 pl-6 py-8 hover:border-slate-800 dark:hover:border-slate-300 transition-colors duration-200">
                <h3 className="text-xl font-medium text-slate-800 dark:text-white mb-4 group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors duration-200">
                  {service.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-16">
          <a 
            href="#kontakt" 
            className="inline-block bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-8 py-3 font-medium tracking-wider text-sm uppercase hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors duration-200"
          >
            Skontaktuj się ze mną
          </a>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
