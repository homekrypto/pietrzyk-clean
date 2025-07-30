import React, { useState, useEffect, useRef } from 'react';

// Type declarations for Speech Recognition API
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

interface CoquiVoiceAssistantProps {
  className?: string;
  backendUrl?: string;
}

const CoquiVoiceAssistant: React.FC<CoquiVoiceAssistantProps> = ({ 
  className = '', 
  backendUrl = 'http://localhost:5000' 
}) => {
  const [isActive, setIsActive] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isBackendReady, setIsBackendReady] = useState(false);
  const [recognition, setRecognition] = useState<any>(null);
  const [currentStatus, setCurrentStatus] = useState('');
  const [error, setError] = useState('');
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    // Check if backend is ready
    checkBackendHealth();
    
    // Initialize speech recognition
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recog = new SpeechRecognition();
      recog.continuous = false;
      recog.interimResults = false;
      recog.lang = 'pl-PL';
      
      recog.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setIsListening(false);
        handleUserSpeech(transcript);
      };
      
      recog.onerror = () => {
        setIsListening(false);
        setIsAnalyzing(false);
        setError('Błąd rozpoznawania mowy. Spróbuj ponownie.');
        setTimeout(() => {
          setError('');
          if (isActive) {
            startListening();
          }
        }, 2000);
      };
      
      recog.onend = () => {
        setIsListening(false);
        if (isActive && !isAnalyzing && !isSpeaking) {
          setTimeout(() => {
            if (isActive) {
              startListening();
            }
          }, 1000);
        }
      };
      
      setRecognition(recog);
    }
  }, [isActive, isAnalyzing, isSpeaking]);

  const checkBackendHealth = async () => {
    try {
      const response = await fetch(`${backendUrl}/health`);
      const data = await response.json();
      setIsBackendReady(data.model_loaded);
      if (!data.model_loaded) {
        setError('Serwer TTS się uruchamia, proszę czekać...');
        // Retry after a few seconds
        setTimeout(checkBackendHealth, 5000);
      }
    } catch (err) {
      setIsBackendReady(false);
      setError('Serwer TTS nie jest dostępny. Sprawdź czy backend jest uruchomiony.');
    }
  };

  const speakTextWithCoqui = async (text: string): Promise<void> => {
    return new Promise(async (resolve) => {
      try {
        setIsSpeaking(true);
        setCurrentStatus('Generuję mowę...');
        
        const response = await fetch(`${backendUrl}/tts`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ text }),
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.success && data.audio) {
          // Convert base64 to blob
          const audioBlob = base64ToBlob(data.audio, 'audio/wav');
          const audioUrl = URL.createObjectURL(audioBlob);
          
          // Play the audio
          if (audioRef.current) {
            audioRef.current.src = audioUrl;
            audioRef.current.onended = () => {
              setIsSpeaking(false);
              setCurrentStatus('Słucham...');
              URL.revokeObjectURL(audioUrl);
              resolve();
            };
            audioRef.current.onerror = () => {
              setIsSpeaking(false);
              setError('Błąd odtwarzania dźwięku');
              URL.revokeObjectURL(audioUrl);
              resolve();
            };
            audioRef.current.play();
          }
        } else {
          throw new Error(data.error || 'Nieznany błąd TTS');
        }
      } catch (err) {
        console.error('TTS Error:', err);
        setIsSpeaking(false);
        setError('Błąd generowania mowy');
        resolve();
      }
    });
  };

  const base64ToBlob = (base64: string, mimeType: string): Blob => {
    const byteCharacters = atob(base64);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: mimeType });
  };

  const generateResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Greeting responses
    if (lowerMessage.includes('cześć') || lowerMessage.includes('dzień dobry') || lowerMessage.includes('witam') || lowerMessage.includes('halo')) {
      return 'Cześć! Miło Cię słyszeć. Jestem asystentem Łukasza Pietrzyka. Jak mogę Ci dziś pomóc w rozwoju Twojej kariery lub biznesu?';
    }
    
    // Coaching services
    if (lowerMessage.includes('coaching') || lowerMessage.includes('mentoring') || lowerMessage.includes('pomoc')) {
      return 'Oferuję coaching kariery, biznesowy i rozwoju osobistego. Każdy program dostosowuję do indywidualnych potrzeb. Powiedz mi, nad czym chciałbyś popracować?';
    }
    
    // Career development
    if (lowerMessage.includes('kariera') || lowerMessage.includes('praca') || lowerMessage.includes('zawód') || lowerMessage.includes('rozwój zawodowy')) {
      return 'Świetnie! Coaching kariery to moja specjalizacja. Pomagam w zmianie branży, rozwoju kompetencji i planowaniu ścieżki zawodowej. Opowiedz mi o swojej obecnej sytuacji zawodowej.';
    }
    
    // Business coaching
    if (lowerMessage.includes('biznes') || lowerMessage.includes('firma') || lowerMessage.includes('przedsiębiorstwo') || lowerMessage.includes('zespół')) {
      return 'Coaching biznesowy obejmuje strategię rozwoju firmy, zarządzanie zespołem i efektywną komunikację. Jakie są Twoje główne wyzwania biznesowe?';
    }
    
    // Personal development
    if (lowerMessage.includes('pewność siebie') || lowerMessage.includes('asertywność') || lowerMessage.includes('rozwój osobisty') || lowerMessage.includes('motywacja')) {
      return 'Rozwój osobisty to fundament sukcesu. Pomagam w budowaniu pewności siebie, asertywności i skuteczności. Co chciałbyś w sobie zmienić lub wzmocnić?';
    }
    
    // Public speaking
    if (lowerMessage.includes('wystąpienia') || lowerMessage.includes('prezentacja') || lowerMessage.includes('stres') || lowerMessage.includes('publiczne')) {
      return 'Wystąpienia publiczne to częste wyzwanie. Uczę technik radzenia sobie ze stresem scenicznym i budowania autorytetu. Jakie masz doświadczenia z publicznym występowaniem?';
    }
    
    // Contact and consultation
    if (lowerMessage.includes('spotkanie') || lowerMessage.includes('jak pracujemy') || lowerMessage.includes('kontakt') || lowerMessage.includes('umówić')) {
      return 'Chętnie się z Tobą spotkam! Oferuję bezpłatną konsultację, gdzie omówimy Twoje potrzeby i cele. Możesz skontaktować się ze mną przez formularz na stronie lub bezpośrednio mailowo.';
    }
    
    // Pricing
    if (lowerMessage.includes('cena') || lowerMessage.includes('koszt') || lowerMessage.includes('ile') || lowerMessage.includes('płatność')) {
      return 'Ceny dostosowuję do wybranego pakietu i czasu współpracy. Oferuję pojedyncze sesje i długofalowe programy. Skontaktuj się ze mną, a omówimy szczegóły i przygotujemy ofertę dopasowaną do Twoich potrzeb.';
    }
    
    // Default responses
    const defaultResponses = [
      'Bardzo interesujące. Powiedz mi więcej o swojej sytuacji, abym mógł lepiej Ci pomóc.',
      'Rozumiem. Jak widzisz tę kwestię w kontekście swojego rozwoju zawodowego?',
      'To ważna sprawa. Coaching może tu bardzo pomóc. Jakie są Twoje główne cele?',
      'Doceniam, że myślisz o rozwoju. Opowiedz mi więcej o swoich wyzwaniach.',
      'Świetnie, że się nad tym zastanawiasz. Jakie kroki już podjąłeś w tym kierunku?'
    ];
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  const handleUserSpeech = async (transcript: string) => {
    setIsAnalyzing(true);
    setCurrentStatus('Analizuję...');
    
    // Simulate thinking time
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1500));
    
    const response = generateResponse(transcript);
    setIsAnalyzing(false);
    
    // Speak the response using Coqui TTS
    await speakTextWithCoqui(response);
    
    // Continue listening after speaking
    if (isActive) {
      setTimeout(() => {
        if (isActive && !isSpeaking) {
          startListening();
        }
      }, 500);
    }
  };

  const startListening = () => {
    if (recognition && !isListening && !isSpeaking) {
      setIsListening(true);
      setCurrentStatus('Słucham...');
      recognition.start();
    }
  };

  const startConversation = async () => {
    if (!isBackendReady) {
      checkBackendHealth();
      return;
    }
    
    setIsActive(true);
    setCurrentStatus('Rozpoczynam rozmowę...');
    setError('');
    
    // Initial greeting
    await speakTextWithCoqui('Jak Ci mogę pomóc?');
    
    // Start listening after greeting
    if (recognition) {
      setTimeout(() => {
        startListening();
      }, 500);
    }
  };

  const stopConversation = () => {
    setIsActive(false);
    setIsListening(false);
    setIsAnalyzing(false);
    setIsSpeaking(false);
    setCurrentStatus('');
    setError('');
    
    if (recognition) {
      recognition.stop();
    }
    
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  const handleMainClick = () => {
    if (!isActive) {
      startConversation();
    } else {
      stopConversation();
    }
  };

  return (
    <div className={`flex flex-col items-center space-y-4 ${className}`}>
      <audio ref={audioRef} preload="none" />
      
      <button
        onClick={handleMainClick}
        disabled={!isBackendReady && !isActive}
        className={`flex items-center space-x-3 font-bold py-4 px-10 rounded-full text-lg uppercase transition-all duration-300 shadow-xl ${
          !isBackendReady && !isActive 
            ? 'bg-gray-400 text-gray-600 cursor-not-allowed' 
            : isActive 
              ? 'bg-red-500 hover:bg-red-600 text-white animate-pulse ring-4 ring-red-300' 
              : 'bg-accent hover:bg-opacity-90 text-white transform hover:scale-105 hover:shadow-2xl'
        }`}
      >
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          {!isActive ? (
            <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.49 6-3.31 6-6.72h-1.7z"/>
          ) : (
            <path d="M6 6h12v12H6z"/>
          )}
        </svg>
        <span>
          {!isBackendReady && !isActive ? '⚠️ Serwer TTS się uruchamia...' :
           !isActive ? '🎤 Porozmawiaj z asystentem' : '⏹️ Zakończ rozmowę'}
        </span>
      </button>
      
      {error && (
        <div className="px-4 py-2 bg-red-500/90 text-white rounded-full text-sm">
          {error}
        </div>
      )}
      
      {isActive && !error && (
        <div className="text-center">
          <div className={`px-6 py-3 rounded-full text-sm font-medium backdrop-blur-sm ${
            isListening ? 'bg-green-500/90 text-white' :
            isAnalyzing ? 'bg-yellow-500/90 text-white' :
            isSpeaking ? 'bg-blue-500/90 text-white' :
            'bg-gray-500/90 text-white'
          }`}>
            {isListening && (
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-white rounded-full animate-bounce"></div>
                <span>Słucham Twojego pytania...</span>
                <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              </div>
            )}
            {isAnalyzing && (
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                <span>Myślę nad odpowiedzią...</span>
                <div className="w-3 h-3 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
              </div>
            )}
            {isSpeaking && (
              <div className="flex items-center space-x-2">
                <span>🔊</span>
                <span>Odpowiadam...</span>
                <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
              </div>
            )}
            {!isListening && !isAnalyzing && !isSpeaking && currentStatus && (
              <span>{currentStatus}</span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CoquiVoiceAssistant;
