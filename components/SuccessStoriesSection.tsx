
import React from 'react';
import { SUCCESS_STORIES } from '../constants';

const SuccessStoriesSection: React.FC = () => {
  return (
    <section id="historie-sukcesu" className="py-20 md:py-32 bg-slate-100 dark:bg-gray-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white">HISTORIE SUKCESU</h2>
          <p className="mt-4 text-lg max-w-3xl mx-auto text-slate-600 dark:text-slate-300">
            Zobacz, jak moi klienci osiągnęli swoje cele i przeszli transformację dzięki naszej współpracy.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {SUCCESS_STORIES.map((story, index) => (
            <div key={index} className="group relative overflow-hidden rounded-lg shadow-lg h-72">
              <img src={story.image} alt={story.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <h3 className="text-white text-xl font-bold transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">{story.title}</h3>
                <p className="text-accent-dark text-sm transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-100">{story.category}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SuccessStoriesSection;
