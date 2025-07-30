import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { NAV_LINKS } from '../constants';
import Logo from './Logo';
import GooeyNav from './GooeyNav';
// import ThemeToggle from './ThemeToggle';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Convert NAV_LINKS to the format expected by GooeyNav
  const gooeyNavItems = NAV_LINKS.map(link => ({
    label: link.name,
    href: link.href
  }));

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    // Always navigate to '/' with section info if not on homepage
    if (href.startsWith('#') && location.pathname !== '/') {
      navigate('/', { state: { scrollTo: href } });
      setIsMenuOpen(false);
      return;
    }
    // On homepage, smooth scroll to anchor
    const targetId = href.startsWith('#') ? href.substring(1) : '';
    const targetElement = targetId ? document.getElementById(targetId) : null;
    if (targetElement) {
      const headerElement = document.querySelector('header');
      const headerOffset = headerElement ? headerElement.offsetHeight : 70;
      const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setIsMenuOpen(false);
  };

  const handleGooeyNavClick = (item: { label: string; href: string }) => {
    if (item.href.startsWith('#')) {
      // Anchor link: scroll or navigate to homepage with scroll
      if (location.pathname !== '/') {
        navigate('/', { state: { scrollTo: item.href } });
        setIsMenuOpen(false);
        return;
      }
      const targetId = item.href.substring(1);
      const targetElement = targetId ? document.getElementById(targetId) : null;
      if (targetElement) {
        const headerElement = document.querySelector('header');
        const headerOffset = headerElement ? headerElement.offsetHeight : 70;
        const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
        const offsetPosition = elementPosition - headerOffset;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    } else {
      // Route link: use SPA navigation
      navigate(item.href);
    }
    setIsMenuOpen(false);
  };

  const headerClasses = `fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
    isScrolled ? 'bg-slate-50/90 dark:bg-gray-900/90' : 'bg-transparent'
  }`;
  
  return (
    <header className={headerClasses}>
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Single Logo: Compact on mobile, full on desktop */}
        <div className="flex items-center h-full justify-center">
          <span className="block sm:hidden">
            <Logo onClick={(e) => handleLinkClick(e, '#hero')} compact />
          </span>
          <span className="hidden sm:block">
            <Logo onClick={(e) => handleLinkClick(e, '#hero')} />
          </span>
        </div>
        
        {/* Desktop GooeyNav */}
        <div className="hidden md:block">
          <GooeyNav
            items={gooeyNavItems}
            particleCount={12}
            particleDistances={[60, 8]}
            particleR={80}
            initialActiveIndex={0}
            animationTime={500}
            timeVariance={200}
            colors={[1, 2, 3, 1, 2, 3, 1, 4]}
            onItemClick={handleGooeyNavClick}
          />
        </div>

        {/* Right side - Theme Toggle and Mobile Menu */}
        <div className="flex items-center space-x-4">
          {/* <ThemeToggle /> */}
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-slate-800 dark:text-white focus:outline-none">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </nav>
      
      {/* Mobile Menu - Improved Responsive Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm transition-opacity duration-300 md:hidden">
          <div className="relative w-full max-w-xs mx-auto bg-slate-50 dark:bg-gray-900 rounded-lg shadow-lg p-8 flex flex-col items-center animate-slideIn">
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 text-2xl text-slate-700 dark:text-slate-200 focus:outline-none"
              onClick={() => setIsMenuOpen(false)}
              aria-label="Close menu"
            >
              &times;
            </button>
            {/* Mobile Nav Items */}
            <nav className="flex flex-col gap-6 mt-8 w-full">
              {gooeyNavItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-lg font-semibold text-slate-800 dark:text-slate-100 text-center py-2 rounded hover:bg-slate-200 dark:hover:bg-gray-800 transition-colors"
                  onClick={e => {
                    e.preventDefault();
                    handleGooeyNavClick(item);
                    setIsMenuOpen(false);
                  }}
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;