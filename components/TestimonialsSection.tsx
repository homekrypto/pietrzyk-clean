
import React, { useState, useCallback } from 'react';
import { TESTIMONIALS } from '../constants';

const StarRating: React.FC<{ rating: number }> = ({ rating }) => (
    <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
            <svg
                key={i}
                className={`w-5 h-5 ${i < rating ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`}
                fill="currentColor"
                viewBox="0 0 20 20"
            >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
        ))}
    </div>
);

const TestimonialsSection: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const prevSlide = useCallback(() => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? TESTIMONIALS.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    }, [currentIndex]);

    const nextSlide = useCallback(() => {
        const isLastSlide = currentIndex === TESTIMONIALS.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    }, [currentIndex]);

    const goToSlide = (slideIndex: number) => {
        setCurrentIndex(slideIndex);
    };

    return (
        <section id="opinie" className="py-20 md:py-32 bg-white dark:bg-gray-800/50">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white">OPINIE KLIENTÓW</h2>
                </div>
                <div className="relative max-w-3xl mx-auto h-80 md:h-72">
                    <div className="overflow-hidden h-full relative">
                        {TESTIMONIALS.map((testimonial, index) => (
                            <div
                                key={index}
                                className="absolute inset-0 transition-opacity duration-700 ease-in-out"
                                style={{ opacity: index === currentIndex ? 1 : 0 }}
                            >
                                <div className="flex flex-col items-center justify-center text-center h-full p-4">
                                    <StarRating rating={testimonial.stars} />
                                    <blockquote className="mt-4 text-lg md:text-xl italic text-slate-700 dark:text-slate-300">
                                        "{testimonial.quote}"
                                    </blockquote>
                                    <div className="mt-6">
                                        <p className="font-bold text-slate-800 dark:text-white">{testimonial.author}</p>
                                        <p className="text-sm text-slate-500 dark:text-slate-400">{testimonial.role} | {testimonial.date}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    <button onClick={prevSlide} className="absolute top-1/2 -translate-y-1/2 left-0 md:-left-16 p-2 rounded-full bg-slate-100/50 dark:bg-gray-700/50 hover:bg-slate-200 dark:hover:bg-gray-600 transition">
                        <svg className="w-6 h-6 text-slate-700 dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
                    </button>
                    <button onClick={nextSlide} className="absolute top-1/2 -translate-y-1/2 right-0 md:-right-16 p-2 rounded-full bg-slate-100/50 dark:bg-gray-700/50 hover:bg-slate-200 dark:hover:bg-gray-600 transition">
                        <svg className="w-6 h-6 text-slate-700 dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                    </button>

                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex space-x-2">
                        {TESTIMONIALS.map((_, slideIndex) => (
                            <button
                                key={slideIndex}
                                onClick={() => goToSlide(slideIndex)}
                                className={`w-3 h-3 rounded-full transition ${currentIndex === slideIndex ? 'bg-accent' : 'bg-slate-300 dark:bg-gray-600 hover:bg-slate-400'}`}
                            ></button>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TestimonialsSection;
