
import React from 'react';
import { CLIENT_LOGOS } from '../constants';
import { useTheme } from './ThemeContext';

const ClientsSection: React.FC = () => {
    const { theme } = useTheme();
    const extendedLogos = [...CLIENT_LOGOS, ...CLIENT_LOGOS];

    return (
        <section id="zaufali-mi" className="py-16 bg-slate-100 dark:bg-gray-900">
            <div className="container mx-auto px-6">
                <h2 className="text-center text-2xl font-bold text-slate-600 dark:text-slate-400 mb-8">ZAUFALI MI</h2>
                <div className="relative w-full overflow-hidden">
                    <div className="flex animate-marquee">
                        {extendedLogos.map((client, index) => (
                            <div key={index} className="flex-shrink-0 w-48 mx-8 flex items-center justify-center">
                                {theme === 'light' ? client.logoLight : client.logoDark}
                            </div>
                        ))}
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-100 dark:from-gray-900 via-transparent to-slate-100 dark:to-gray-900"></div>
                </div>
            </div>
        </section>
    );
};

export default ClientsSection;
