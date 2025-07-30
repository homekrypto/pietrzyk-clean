import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ProcessSection: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const steps = [
    {
      id: 1,
      title: "Sesja Zapoznawcza",
      description: "Bezpłatna rozmowa poznawcza, w której omówimy Twoje cele i wyzwania. To pierwszy krok do zrozumienia Twoich potrzeb i oczekiwań."
    },
    {
      id: 2,
      title: "Plan działania",
      description: "Wspólnie tworzymy spersonalizowany plan rozwoju dostosowany do Twoich potrzeb. Określamy konkretne cele i metody ich osiągnięcia."
    },
    {
      id: 3,
      title: "Regularne sesje",
      description: "Systematyczne spotkania, podczas których pracujemy nad realizacją celów. Monitorujemy postępy i dostosowujemy strategie działania."
    },
    {
      id: 4,
      title: "Rezultaty",
      description: "Monitorujemy postępy i celebrujemy osiągnięte sukcesy. Ewaluujemy efekty i planujemy dalszy rozwój."
    }
  ];

  return (
    <section id="proces" className="py-24 bg-white dark:bg-gray-900 flex items-center justify-center min-h-screen">
      <div className="container mx-auto px-6 max-w-5xl flex flex-col items-center">
        <h2 className="text-4xl md:text-5xl font-light text-gray-900 dark:text-white mb-16 text-center tracking-wide">
          Jak pracujemy
        </h2>
        <div className="w-full max-w-4xl bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-700 overflow-hidden mx-auto">
          {/* Step indicators */}
          <div className="flex items-center justify-center p-8 bg-gray-50 dark:bg-gray-800">
            <div className="flex flex-col sm:flex-row items-center justify-center sm:space-x-6 space-y-6 sm:space-y-0 w-full max-w-3xl mx-auto">
              {steps.map((step, index) => (
                <React.Fragment key={step.id}>
                  <div className="hidden sm:flex flex-col items-center">
                    <motion.div
                      className={`relative cursor-pointer flex items-center justify-center`}
                      onClick={() => setCurrentStep(step.id)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <motion.div
                        className={`w-20 h-20 rounded-full flex items-center justify-center font-extrabold text-3xl transition-all duration-300 shadow-2xl border-4 ${
                          currentStep === step.id
                            ? 'bg-blue-600 text-white border-blue-400 shadow-blue-400/40'
                            : currentStep > step.id
                            ? 'bg-green-600 text-white border-green-400 shadow-green-400/40'
                            : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 border-gray-300 dark:border-gray-600 shadow-gray-400/20'
                        }`}
                        initial={false}
                        animate={{
                          scale: currentStep === step.id ? 1.12 : 1,
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        {currentStep > step.id ? (
                          <span className="flex items-center justify-center w-full h-full">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </span>
                        ) : (
                          <span className="absolute inset-0 flex items-center justify-center">{step.id}</span>
                        )}
                      </motion.div>
                    </motion.div>
                    {index < steps.length - 1 && (
                      <div
                        className="w-1 h-16 sm:w-16 sm:h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden flex-shrink-0 mx-auto"
                      >
                        <motion.div
                          className="bg-gradient-to-b sm:bg-gradient-to-r from-blue-500 to-green-500 rounded-full"
                          initial={{ width: '0%', height: '0%' }}
                          animate={
                            typeof window !== 'undefined' && window.innerWidth < 640
                              ? { height: currentStep > step.id ? '100%' : '0%' }
                              : { width: currentStep > step.id ? '100%' : '0%' }
                          }
                          style={{ width: '100%', height: '100%' }}
                          transition={{ duration: 0.5, ease: 'easeInOut' }}
                        />
                      </div>
                    )}
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>
          {/* Step content */}
          <div className="relative h-96 overflow-hidden flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="absolute inset-0 flex items-center justify-center p-12"
              >
                <div className="text-center max-w-2xl mx-auto">
                  <motion.h3
                    className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                  >
                    {steps[currentStep - 1].title}
                  </motion.h3>
                  <motion.p
                    className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                  >
                    {steps[currentStep - 1].description}
                  </motion.p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          {/* Navigation buttons */}
          <div className="flex justify-center items-center p-8 bg-gray-50 dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700">
            <div className="flex justify-between items-center w-full max-w-2xl mx-auto">
              <motion.button
                onClick={() => setCurrentStep(currentStep > 1 ? currentStep - 1 : 1)}
                disabled={currentStep === 1}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  currentStep === 1
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
                whileHover={currentStep !== 1 ? { scale: 1.05 } : {}}
                whileTap={currentStep !== 1 ? { scale: 0.95 } : {}}
              >
                ← Wstecz
              </motion.button>
              <div className="flex justify-center space-x-2">
                {steps.map((step) => (
                  <motion.div
                    key={step.id}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      currentStep === step.id
                        ? 'bg-blue-600 w-8'
                        : 'bg-gray-300 dark:bg-gray-600'
                    }`}
                    onClick={() => setCurrentStep(step.id)}
                    whileHover={{ scale: 1.2 }}
                    style={{ cursor: 'pointer' }}
                  />
                ))}
              </div>
              {currentStep !== steps.length && (
                <motion.button
                  onClick={() => setCurrentStep(currentStep < steps.length ? currentStep + 1 : steps.length)}
                  className={`px-6 py-3 rounded-full font-medium transition-all duration-300 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Dalej →
                </motion.button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
