import React from 'react';
import InfiniteMenu from '../components/InfiniteMenu';
import Header from '../components/Header';
import { useTheme } from '../components/ThemeContext';

const TestPage: React.FC = () => {
  const { theme } = useTheme();

  const menuItems = [
    {
      image: 'https://picsum.photos/800/800?random=1&grayscale',
      link: 'https://linkedin.com/in/lukaszpietrzyk',
      title: 'LinkedIn',
      description: 'Professional networking'
    },
    {
      image: 'https://picsum.photos/800/800?random=2&grayscale',
      link: '#kontakt',
      title: 'Contact',
      description: 'Get in touch'
    },
    {
      image: 'https://picsum.photos/800/800?random=3&grayscale',
      link: '#o-mnie',
      title: 'About',
      description: 'Learn more about me'
    },
    {
      image: 'https://picsum.photos/800/800?random=4&grayscale',
      link: '#uslugi',
      title: 'Services',
      description: 'What I offer'
    },
    {
      image: 'https://picsum.photos/800/800?random=5&grayscale',
      link: '#jak-pracujemy',
      title: 'Process',
      description: 'How we work'
    },
    {
      image: 'https://picsum.photos/800/800?random=6&grayscale',
      link: '#historie-sukcesu',
      title: 'Success Stories',
      description: 'Client achievements'
    }
  ];

  return (
    <div className={`min-h-screen bg-slate-50 dark:bg-gray-900 transition-colors duration-300 ${theme === 'dark' ? 'dark' : ''}`}>
      <Header />
      
      <main className="pt-20">
        <div className="container mx-auto px-6 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-light text-slate-800 dark:text-white mb-6">
              Infinite Menu Test
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Eksperymentalne menu 3D z interaktywnymi elementami. Przeciągnij, aby obracać i eksplorować.
            </p>
          </div>
          
          <div 
            className="relative mx-auto bg-black rounded-lg overflow-hidden shadow-2xl"
            style={{ height: '600px', maxWidth: '800px' }}
          >
            <InfiniteMenu items={menuItems} />
          </div>
          
          <div className="text-center mt-8">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Przeciągnij myszą lub palcem, aby obracać menu. Kliknij przycisk, aby przejść do wybranej sekcji.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TestPage;
