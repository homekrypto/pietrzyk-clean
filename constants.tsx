import { NavLink, HelpArea, Service, ProcessStep, SuccessStory, Testimonial, ClientLogo, LocationInfo } from './types';

// Icons
const CareerIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>;
const BusinessIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>;
const PublicSpeakingIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>;
const PersonalDevIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>;
const YouthIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M12 14l9-5-9-5-9 5 9 5z" /><path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222 4 2.222V20M1 12v7a2 2 0 002 2h18a2 2 0 002-2v-7" /></svg>;
const AntiMobbingIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /><path strokeLinecap="round" strokeLinejoin="round" d="M9 21h6" /></svg>;

const DiagnosisIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>;
const PlanIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l5.447 2.724A1 1 0 0021 16.382V5.618a1 1 0 00-1.447-.894L15 7m0 10l-6-3m6 3V7" /></svg>;
const ImplementationIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>;
const EvaluationIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" /><path strokeLinecap="round" strokeLinejoin="round" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" /></svg>;

// Content
export const NAV_LINKS: NavLink[] = [
  { name: 'O mnie', href: '#o-mnie' },
  { name: 'Oferta', href: '#oferta' },
  { name: 'Historie Sukcesu', href: '#historie-sukcesu' },
  { name: 'Opinie', href: '#opinie' },
  { name: 'Cennik', href: '/cennik' },
  { name: 'Kontakt', href: '#kontakt' },
];

export const AREAS_OF_HELP: HelpArea[] = [
    { icon: <CareerIcon />, title: 'Coaching kariery', description: 'Zmiana branży, rozwój kompetencji, planowanie ścieżki zawodowej.' },
    { icon: <BusinessIcon />, title: 'Coaching biznesowy', description: 'Strategia rozwoju firmy, zarządzanie zespołem, efektywna komunikacja.' },
    { icon: <PublicSpeakingIcon />, title: 'Wystąpienia publiczne', description: 'Techniki radzenia sobie ze stresem, budowanie autorytetu.' },
    { icon: <PersonalDevIcon />, title: 'Rozwój osobisty', description: 'Pewność siebie, asertywność, skuteczność w działaniu.' },
    { icon: <YouthIcon />, title: 'Coaching młodzieżowy', description: 'Wybór ścieżki edukacyjnej i zawodowej, wzmacnianie poczucia własnej wartości.' },
    { icon: <AntiMobbingIcon />, title: 'Asertywność i Antymobbing', description: 'Praktyczne warsztaty z asertywności i procedur antymobbingowych.' }
];

export const SERVICES: Service[] = [
    { title: 'Mentoring Indywidualny 1:1', description: 'Spersonalizowany program rozwojowy, skoncentrowany na Twoich celach zawodowych i osobistych.' },
    { title: 'Szkolenia dla Zespołów', description: 'Warsztaty i szkolenia grupowe mające na celu zwiększenie efektywności, komunikacji i współpracy w zespole.' },
    { title: 'Warsztaty Rozwoju Kompetencji', description: 'Intensywne sesje skoncentrowane na rozwijaniu konkretnych umiejętności, takich jak przywództwo, negocjacje czy zarządzanie czasem.' },
    { title: 'Audyt i Doradztwo Strategiczne', description: 'Analiza obecnej sytuacji i opracowanie strategii rozwoju dla Twojej firmy lub kariery.' }
];

export const PROCESS_STEPS: ProcessStep[] = [
    { icon: <DiagnosisIcon />, title: 'Diagnoza Potrzeb', description: 'Zaczynamy od dogłębnej analizy Twoich celów, wyzwań i obecnej sytuacji, aby zrozumieć, gdzie jesteś i dokąd zmierzasz.' },
    { icon: <PlanIcon />, title: 'Plan Działania', description: 'Tworzymy spersonalizowany plan rozwoju z jasno określonymi krokami, narzędziami i kamieniami milowymi.' },
    { icon: <ImplementationIcon />, title: 'Wdrożenie i Wsparcie', description: 'Aktywnie wspieram Cię w realizacji planu, dostarczając wiedzę, motywację i narzędzia niezbędne do pokonania przeszkód.' },
    { icon: <EvaluationIcon />, title: 'Ewaluacja i Dalsze Kroki', description: 'Regularnie mierzymy postępy i analizujemy wyniki, aby optymalizować strategię i planować kolejne etapy Twojego wzrostu.' }
];

export const SUCCESS_STORIES: SuccessStory[] = [
    { image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1932&auto=format&fit=crop', title: 'Transformacja Liderska', category: 'Mentoring 1:1' },
    { image: 'https://images.unsplash.com/photo-1542744095-291d1f67b221?q=80&w=1740&auto=format&fit=crop', title: 'Wzrost Efektywności Zespołu', category: 'Szkolenia dla Zespołów' },
    { image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1740&auto=format&fit=crop', title: 'Nowa Ścieżka Kariery', category: 'Coaching Kariery' },
    { image: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=1740&auto=format&fit=crop', title: 'Skuteczne Wystąpienia', category: 'Wystąpienia Publiczne' },
    { image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1740&auto=format&fit=crop', title: 'Rozwój Biznesu', category: 'Coaching Biznesowy' },
    { image: 'https://images.unsplash.com/photo-1573496130407-57329f01f769?q=80&w=1738&auto=format&fit=crop', title: 'Zbudowanie Pewności Siebie', category: 'Rozwój Osobisty' },
];

export const TESTIMONIALS: Testimonial[] = [
    { 
        stars: 5, 
        quote: 'Pan Łukasz jest świetnym coachem, jest profesjonalistą w tym co robi. Dużo się od niego nauczyłam, napewno takie kursy przydadzą się w życiu. Jest bardzo empatyczny i wyrozumiały, podchodzi do każdej sprawy z osobna i motywuje do działania. Polecam :)', 
        author: 'Wiktoria', 
        role: 'Kursantka', 
        date: '17.06.2025' 
    },
    { 
        stars: 5, 
        quote: 'Pan Łukasz jest bardzo wyrozumiały, sympatyczny, pomocny i ma dużą wiedzę na temat coachingu i ogólną. Bardzo mi pomógł z motywacją do dalszych działań. Widziałem jak pan Łukasz się stara pomóc mi oraz reszcie uczestników - jest świetny.', 
        author: 'Fabian', 
        role: 'Handlowiec', 
        date: '17.06.2025' 
    },
    { 
        stars: 5, 
        quote: 'Bardzo dobry coach, świetnie mi pomógł w drodze do celu. Jest pełny energii oraz sympatii, świetnie prowadzi zajęcia, jest wyrozumiały. Ogólnie podziwiam go - do każdego podchodzi indywidualnie oraz z spokojem.', 
        author: 'Sebastian', 
        role: 'Pracownik produkcji', 
        date: '17.06.2025' 
    },
    { 
        stars: 5, 
        quote: 'Pan Łukasz to wyjątkowy coach - kompetentny, uważny i pełen empatii. Łączy solidne przygotowanie merytoryczne z autentycznym zrozumieniem i spokojem, który daje poczucie bezpieczeństwa. Potrafi słuchać bez oceniania, trafnie wskazuje kierunek pracy nad sobą i daje przestrzeń do prawdziwej zmiany. To specjalista, któremu można w pełni zaufać.', 
        author: 'Barbara', 
        role: 'Sprzedawca', 
        date: '16.06.2025' 
    },
    { 
        stars: 5, 
        quote: 'Świetny Coach, dużo mogłam się nauczyć z jego lekcji i nauk. Zrozumiałam jakie mam wady i zalety. Szlifowałam swoje zalety żeby się rozwijać i zwalczałam swoje wady. Wyszłam ze strefy komfortu i dążę do osiągnięcia sukcesu zawodowego.', 
        author: 'Paulina', 
        role: 'Zawodowe', 
        date: '13.06.2025' 
    },
    { 
        stars: 5, 
        quote: 'Współpraca na najwyższym poziomie. Szczerze to nie spodziewałem się że coaching może tak wiele zmienić we własnym podejściu do życia, do myślenia o sobie i o innych. Człowiek bardzo kulturalny i serdeczny, otwarty a nie sztywny. Na prawdę - gorąco polecam.', 
        author: 'Paweł', 
        role: 'Filozof', 
        date: '13.06.2025' 
    },
    { 
        stars: 5, 
        quote: 'Miałam przyjemność pracować z Łukaszem Pietrzykiem jako coachem i z pełnym przekonaniem mogę go polecić każdemu, kto chce się rozwijać – zarówno zawodowo, jak i osobiście. Łukasz to profesjonalista z autentycznym podejściem do drugiego człowieka. Potrafi stworzyć atmosferę zaufania, w której łatwo otworzyć się na refleksję i zmianę. Dzięki naszym spotkaniom poczułam większą klarowność w swoich celach i odzyskałam motywację do działania.', 
        author: 'Kasia', 
        role: 'Poszukiwaczka nowego kierunku', 
        date: '13.06.2025' 
    },
    { 
        stars: 5, 
        quote: 'Pan Łukasz to dobry specjalista, sesje są miłe i bez niepotrzebnego stresu. Daje czas by przyswoić materiał w swoim zakresie nauki i opisuje wszystko szczegółowo co upraszcza wchłonięcie danego materiału. Atmosfera jest przyjazna a rozmowy szczere, jest empatyczny, miły i szczery. Polecam dla każdego kto może mieć problemy z założeniem firmy.', 
        author: 'Bolek', 
        role: 'Cukiernik', 
        date: '31.05.2025' 
    },
    { 
        stars: 5, 
        quote: 'Rozmowa bardzo komunikatywna - w ciągu godziny doprowadził do tego że może zmienię podejście do swojej pracy oraz przyszłości. Bardzo podobała mi się jego wypowiedź, mam nadzieję że jeszcze się spotkamy w przyszłości.', 
        author: 'Przemysław', 
        role: 'Cukiernik', 
        date: '22.05.2025' 
    },
    { 
        stars: 5, 
        quote: 'Byłam na szkoleniu u pana Łukasza i muszę przyznać, że ma świetny warsztat psychologiczny. Dobrze rozumie ludzi i przykłada się do wytłumaczenia niewidocznych na pierwszy rzut oka procesów. Bardzo polecam.', 
        author: 'Magda', 
        role: 'Kierownik działu', 
        date: '16.02.2025' 
    },
    { 
        stars: 5, 
        quote: 'Zajęcia prowadzone przez pana Łukasza są naprawdę wyjątkowe. Potrafi skutecznie przekazywać wiedzę na temat sztucznej inteligencji, niezależnie od poziomu zaawansowania uczestników. To zajęcia, które warto polecić każdemu, kto chce rozwijać się w tej dynamicznej dziedzinie. Polecam z całego serca!', 
        author: 'Jakub', 
        role: 'Manager Hotelu', 
        date: '20.01.2025' 
    },
    { 
        stars: 5, 
        quote: 'Łukasz jest świetnym coachem, profesjonalny i empatyczny, w sposób naturalny i konsekwentny podchodzi do każdego tematu, dzięki niemu podjąłem realne kroki w celu znalezienia lepszej pracy. Polecam każdemu, kto chce zainwestować w swoją przyszłość.', 
        author: 'Kamil', 
        role: 'Kierownik', 
        date: '23.09.2021' 
    },
    { 
        stars: 5, 
        quote: 'Bardzo dobry coach, warty polecenia. Ma ogromną wiedzę i potrafi przekazywać ją w ciekawy sposób. Motywuje do rozwoju i stawiania sobie poprzeczki coraz wyżej. Po każdej rozmowie czułam się pobudzona do działania. Bardzo profesjonalne podejście.', 
        author: 'Justyna', 
        role: 'Kierownik', 
        date: '23.09.2021' 
    },
    { 
        stars: 5, 
        quote: 'Pan Łukasz jest osobą, która posiada wielką wiedzę oraz co najważniejsze umiejętności jej przekazania. Dzięki szkoleniu z Łukaszem moja wiara we własne możliwości poszybowała w górę. Łukasz jest osobą pomocną, wyrozumiałą, przy czym bardzo profesjonalną.', 
        author: 'Denis', 
        role: 'Specjalista ds. obsługi klienta', 
        date: '02.07.2021' 
    },
    { 
        stars: 5, 
        quote: 'Pan Łukasz bardzo dobry człowiek oraz specjalista. Na zajęciach daje z siebie 110%. Dał mi motywację do działania oraz dzięki niemu nabrałam pewności siebie. Polecam. Jestem wdzięczna za to ile wniósł do mojego życia.', 
        author: 'Justyna', 
        role: 'Pracownik biurowy', 
        date: '01.07.2021' 
    },
    { 
        stars: 5, 
        quote: 'Świetny specjalista. Widać, że w swoją pracę wkłada całe serce. Pomógł mi poukładać kilka ważnych rzeczy i uświadomił, że można na wiele spraw popatrzeć od innej strony. Jego empatia, profesjonalizm i cierpliwość pokazała mi, że trafiłam do odpowiedniej osoby. Każda rozmowa z Łukaszem daje pozytywnego kopa.', 
        author: 'Sylwia', 
        role: 'Pracownik biurowy', 
        date: '28.05.2021' 
    },
    { 
        stars: 5, 
        quote: 'Bardzo profesjonalny coach, zawsze uprzejmy, skłonny do pomocy. Świetnie mi się z nim współpracowało. Uświadomił mi wiele rzeczy z których nie zdawałem sobie sprawy, zmienił mój punkt widzenia na wiele spraw. Bardzo się cieszę że miałem okazję z Panem Łukaszem współpracować.', 
        author: 'Kajetan', 
        role: 'Osoba prywatna', 
        date: '14.03.2021' 
    },
    { 
        stars: 5, 
        quote: 'Profesjonalny i empatyczny coach, który potrafi postawą oraz swoją pracą pozwolić poczuć się bezpiecznie w trakcie odkrywania swojego potencjału oraz celów. Bardzo pomogły mi te sesje w lepszym radzeniu sobie ze stresem oraz zarządzaniu zespołem.', 
        author: 'Ada', 
        role: 'Kierownik', 
        date: '11.03.2021' 
    },
    { 
        stars: 5, 
        quote: 'Łukasz to osoba, która potrafi pomóc w obiektywny sposób bez ocen zadając pytania, dzięki którym można natrafić na swoje nie tylko ograniczenia, ale przede wszystkim mocne i ignorowane strony. Polecam z nim współpracę osobom, które chcą awansować lub zmienić pracę. Szkoda, że coachingu nie ma w szkołach.', 
        author: 'Natalia', 
        role: 'Handel', 
        date: '14.12.2020' 
    },
    { 
        stars: 5, 
        quote: 'Pan Łukasz jako coach jest numerem jeden. Rozwinąłem w sobie wiele wcześniej zblokowanych cech, np. umiejętność otwartego wyrażania siebie, samokrytyka, rozwiązywanie problemów na szczeblu zalążka, uwydatnianie swoich mocnych stron. Prowadzi zajęcia w luźny sposób, dostosowany do kryteriów każdego uczestnika. Już od pierwszych lekcji dopadły mnie refleksje na swój temat.', 
        author: 'Daniel', 
        role: 'Pracownik produkcyjny', 
        date: '22.11.2020' 
    }
];

const PlaceholderLogo = ({ name, theme }: { name: string; theme: 'light' | 'dark' }) => (
    <div className={`flex items-center justify-center h-12 text-2xl font-bold ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
      {name}
    </div>
  );
  
  export const CLIENT_LOGOS: ClientLogo[] = [
    { name: 'TechSolutions', logoLight: <PlaceholderLogo name="TechSolutions" theme="light" />, logoDark: <PlaceholderLogo name="TechSolutions" theme="dark" /> },
    { name: 'InnovateCo', logoLight: <PlaceholderLogo name="InnovateCo" theme="light" />, logoDark: <PlaceholderLogo name="InnovateCo" theme="dark" /> },
    { name: 'Quantum Leap', logoLight: <PlaceholderLogo name="Quantum Leap" theme="light" />, logoDark: <PlaceholderLogo name="Quantum Leap" theme="dark" /> },
    { name: 'FutureWorks', logoLight: <PlaceholderLogo name="FutureWorks" theme="light" />, logoDark: <PlaceholderLogo name="FutureWorks" theme="dark" /> },
    { name: 'Progresja', logoLight: <PlaceholderLogo name="Progresja" theme="light" />, logoDark: <PlaceholderLogo name="Progresja" theme="dark" /> },
    { name: 'Synergia', logoLight: <PlaceholderLogo name="Synergia" theme="light" />, logoDark: <PlaceholderLogo name="Synergia" theme="dark" /> }
  ];

export const LOCATION_INFO: LocationInfo = {
  address: 'Jana III Sobieskiego 28/1',
  city: '41-100 Siemianowice Śląskie',
  description: 'Znajduje się w Siemianowicach Śląskich, w spokojnej i dogodnej lokalizacji.',
  image: '',
  coordinates: {
    lat: 50.2997865,
    lng: 19.0192481
  },
  features: [
    'Dogodna lokalizacja w Siemianowicach Śląskich',
    'Łatwy dojazd samochodem i komunikacją publiczną',
    'Parking w pobliżu',
    'Komfortowe warunki spotkań',
    'Możliwość sesji online'
  ]
};