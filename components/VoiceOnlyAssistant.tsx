import React, { useState, useEffect } from 'react';

// Type declarations for Speech API
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

interface VoiceOnlyAssistantProps {
  className?: string;
}

const VoiceOnlyAssistant: React.FC<VoiceOnlyAssistantProps> = ({ className = '' }) => {
  const [isActive, setIsActive] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [recognition, setRecognition] = useState<any>(null);
  const [currentStatus, setCurrentStatus] = useState('');

  useEffect(() => {
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
        setCurrentStatus('Błąd rozpoznawania mowy. Spróbuj ponownie.');
        setTimeout(() => {
          if (isActive) {
            startListening();
          }
        }, 2000);
      };
      
      recog.onend = () => {
        setIsListening(false);
        if (isActive && !isAnalyzing && !isSpeaking) {
          // Restart listening after a brief pause
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

  const speakText = (text: string) => {
    return new Promise<void>((resolve) => {
      if ('speechSynthesis' in window) {
        // Stop any current speech
        speechSynthesis.cancel();
        
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'pl-PL';
        utterance.rate = 0.85; // Slightly slower for better understanding
        utterance.pitch = 0.7; // Lower pitch for more masculine voice
        utterance.volume = 1.0;
        
        // Wait for voices to load if not already loaded
        const setVoiceAndSpeak = () => {
          const voices = speechSynthesis.getVoices();
          
          // Try to find a male Polish voice with various strategies
          let selectedVoice = null;
          
          // Strategy 1: Look for explicitly male Polish voices
          selectedVoice = voices.find(voice => 
            (voice.lang.includes('pl') || voice.lang.includes('PL')) &&
            (voice.name.toLowerCase().includes('male') || 
             voice.name.toLowerCase().includes('mężczyzna') ||
             voice.name.toLowerCase().includes('marcin') ||
             voice.name.toLowerCase().includes('adam') ||
             voice.name.toLowerCase().includes('tomasz') ||
             voice.name.toLowerCase().includes('marek') ||
             voice.name.toLowerCase().includes('paweł') ||
             voice.name.toLowerCase().includes('krzysztof'))
          );
          
          // Strategy 2: Look for any Polish voice (prefer those without "female" in name)
          if (!selectedVoice) {
            const polishVoices = voices.filter(voice => 
              voice.lang.includes('pl') || voice.lang.includes('PL')
            );
            selectedVoice = polishVoices.find(voice => 
              !voice.name.toLowerCase().includes('female') &&
              !voice.name.toLowerCase().includes('kobieta') &&
              !voice.name.toLowerCase().includes('anna') &&
              !voice.name.toLowerCase().includes('maria') &&
              !voice.name.toLowerCase().includes('ewa')
            ) || polishVoices[0];
          }
          
          // Strategy 3: Fallback to any available voice with lower pitch
          if (!selectedVoice && voices.length > 0) {
            selectedVoice = voices.find(voice => 
              !voice.name.toLowerCase().includes('female')
            ) || voices[0];
            utterance.pitch = 0.6; // Even lower pitch for non-Polish voices
          }
          
          if (selectedVoice) {
            utterance.voice = selectedVoice;
          }
          
          utterance.onstart = () => {
            setIsSpeaking(true);
            setCurrentStatus('Asystent mówi...');
          };
          
          utterance.onend = () => {
            setIsSpeaking(false);
            setCurrentStatus('Słucham...');
            resolve();
          };
          
          utterance.onerror = () => {
            setIsSpeaking(false);
            resolve();
          };
          
          speechSynthesis.speak(utterance);
        };
        
        // If voices are not loaded yet, wait for them
        if (speechSynthesis.getVoices().length === 0) {
          speechSynthesis.onvoiceschanged = () => {
            setVoiceAndSpeak();
          };
        } else {
          setVoiceAndSpeak();
        }
      } else {
        resolve();
      }
    });
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
    
    // Speak the response
    await speakText(response);
    
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
    setIsActive(true);
    setCurrentStatus('Rozpoczynam rozmowę...');
    
    // Initial greeting
    await speakText('Jak Ci mogę pomóc?');
    
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
    
    if (recognition) {
      recognition.stop();
    }
    
    if ('speechSynthesis' in window) {
      speechSynthesis.cancel();
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
      <button
        onClick={handleMainClick}
        className={`flex items-center space-x-3 font-bold py-4 px-10 rounded-full text-lg uppercase transition-all duration-300 shadow-xl ${
          isActive 
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
          {!isActive ? '🎤 Porozmawiaj z asystentem' : '⏹️ Zakończ rozmowę'}
        </span>
      </button>
      
      {isActive && (
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

export default VoiceOnlyAssistant;
