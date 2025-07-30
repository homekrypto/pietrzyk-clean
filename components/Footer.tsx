import React, { useState } from 'react';
import ThemeToggle from './ThemeToggle';
import Logo from './Logo';

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      // Here you would typically send the email to a server
      console.log('Newsletter signup:', email);
      setEmail('');
      setTimeout(() => setIsSubmitted(false), 3000);
    }
  };

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const targetElement = document.getElementById('hero');
    if (targetElement) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };
  
  const socialLinks = [
    { name: 'Twitter', href: '#', icon: <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.71v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg> },
    { name: 'Facebook', href: 'https://www.facebook.com/profile.php?id=100085046965466', icon: <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg> },
    { name: 'Instagram', href: '#', icon: <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.024.06 1.378.06 3.808s-.012 2.784-.06 3.808c-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.024.048-1.378.06-3.808.06s-2.784-.013-3.808-.06c-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427C2.013 14.784 2 14.43 2 12s.013-2.784.06-3.808c.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.48 3.69c.636-.247 1.363-.416 2.427-.465C8.93 3.013 9.284 3 12 3h.315zM12 6.375c-3.105 0-5.625 2.52-5.625 5.625s2.52 5.625 5.625 5.625 5.625-2.52 5.625-5.625S15.105 6.375 12 6.375zm0 9.375c-2.071 0-3.75-1.679-3.75-3.75s1.679-3.75 3.75-3.75 3.75 1.679 3.75 3.75-1.679 3.75-3.75 3.75zm4.875-9.75a1.125 1.125 0 100-2.25 1.125 1.125 0 000 2.25z" clipRule="evenodd" /></svg> },
    { name: 'LinkedIn', href: 'https://www.linkedin.com/in/%C5%82ukasz-pietrzyk-0ba654211/?originalSubdomain=pl', icon: <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg> },
  ];

  return (
    <footer className="bg-slate-100 dark:bg-gray-900 border-t border-slate-200 dark:border-gray-700">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Column 1: Logo and Copyright */}
          <div className="flex flex-col items-center md:items-start">
            <Logo onClick={handleLogoClick} />
            <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
              © {new Date().getFullYear()} Łukasz Pietrzyk. Wszelkie prawa zastrzeżone.
            </p>
          </div>

          {/* Column 2: Newsletter */}
          <div className="flex flex-col items-center md:items-start">
            <div className="w-full max-w-sm">
              <h3 className="font-semibold text-slate-800 dark:text-white mb-2">Newsletter</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                Otrzymuj porady z zakresu coachingu.
              </p>
              
              {isSubmitted ? (
                <div className="text-center py-2">
                  <p className="text-green-600 dark:text-green-400 text-sm">
                    ✓ Dziękujemy za zapisanie się!
                  </p>
                </div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="flex">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Twój e-mail"
                    required
                    className="flex-1 px-3 py-2 text-sm bg-white dark:bg-gray-800 border border-slate-300 dark:border-gray-600 rounded-l-md focus:outline-none focus:border-accent"
                  />
                  <button 
                    type="submit" 
                    className="bg-accent hover:bg-accent-dark text-white px-4 py-2 text-sm rounded-r-md transition-colors"
                  >
                    Zapisz się
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Column 3: Social & Theme Toggle */}
          <div className="flex flex-col items-center md:items-end">
            <div className="flex space-x-4">
              {socialLinks.map(link => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  target={link.href !== '#' ? '_blank' : '_self'}
                  rel={link.href !== '#' ? 'noopener noreferrer' : undefined}
                  className="text-slate-500 hover:text-accent dark:text-slate-400 dark:hover:text-accent-dark transition"
                >
                  <span className="sr-only">{link.name}</span>
                  {link.icon}
                </a>
              ))}
            </div>
            <div className="mt-6">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;