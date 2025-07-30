import React, { useState, useRef, useEffect } from 'react';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface ChatAssistantProps {
  className?: string;
}

const ChatAssistant: React.FC<ChatAssistantProps> = ({ className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Cześć! Jestem asystentem Łukasza Pietrzyka. Jak mogę Ci pomóc w rozwoju kariery i biznesu?',
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateResponse = async (userMessage: string): Promise<string> => {
    // Simple rule-based responses - you can replace this with actual AI API
    const responses = {
      coaching: [
        'Coaching to proces, który pomaga odkryć Twój potencjał i osiągnąć cele zawodowe.',
        'Oferuję coaching kariery, biznesowy i rozwoju osobistego. Który obszar Cię interesuje?',
        'Moje doświadczenie obejmuje ponad 10 lat pracy z klientami w różnych branżach.'
      ],
      kontakt: [
        'Możesz skontaktować się ze mną przez formularz na stronie lub bezpośrednio mailowo.',
        'Zapraszam do bezpłatnej konsultacji, gdzie omówimy Twoje potrzeby.',
        'Jestem dostępny od poniedziałku do piątku, 9:00-17:00.'
      ],
      oferta: [
        'Oferuję mentoring indywidualny, szkolenia grupowe i warsztaty rozwoju kompetencji.',
        'Moja oferta obejmuje coaching kariery, biznesowy i rozwój osobisty.',
        'Każdy program jest dostosowany do indywidualnych potrzeb klienta.'
      ],
      cena: [
        'Ceny zależą od wybranego pakietu i czasu trwania współpracy.',
        'Oferuję różne opcje - od pojedynczych sesji po długofalowe programy.',
        'Skontaktuj się ze mną, aby omówić szczegóły i otrzymać wycenę.'
      ],
      default: [
        'Dziękuję za pytanie! Czy możesz sprecyzować, o co dokładnie chodzi?',
        'Interesuje Cię coaching kariery, biznesowy czy rozwój osobisty?',
        'Jestem tutaj, aby pomóc. Opowiedz mi więcej o swojej sytuacji.',
        'Moja specjalizacja to coaching kariery i rozwój biznesu. Jak mogę Ci pomóc?'
      ]
    };

    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('coaching') || lowerMessage.includes('mentoring')) {
      return responses.coaching[Math.floor(Math.random() * responses.coaching.length)];
    }
    
    if (lowerMessage.includes('kontakt') || lowerMessage.includes('telefon') || lowerMessage.includes('mail')) {
      return responses.kontakt[Math.floor(Math.random() * responses.kontakt.length)];
    }
    
    if (lowerMessage.includes('oferta') || lowerMessage.includes('usługa') || lowerMessage.includes('program')) {
      return responses.oferta[Math.floor(Math.random() * responses.oferta.length)];
    }
    
    if (lowerMessage.includes('cena') || lowerMessage.includes('koszt') || lowerMessage.includes('ile')) {
      return responses.cena[Math.floor(Math.random() * responses.cena.length)];
    }
    
    return responses.default[Math.floor(Math.random() * responses.default.length)];
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate thinking time
    setTimeout(async () => {
      const responseText = await generateResponse(inputText);
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: responseText,
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) {
    return (
      <div className={className}>
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center space-x-3 bg-accent hover:bg-opacity-90 text-white font-bold py-3 px-8 rounded-full text-lg uppercase transition-transform transform hover:scale-105 shadow-lg"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h4l4 4 4-4h4c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/>
          </svg>
          <span>💬 Porozmawiaj z asystentem</span>
        </button>
      </div>
    );
  }

  return (
    <div className={`fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 ${className}`}>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md h-[600px] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">
                Asystent Łukasza
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Coaching i mentoring
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  message.isUser
                    ? 'bg-accent text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                }`}
              >
                <p className="text-sm">{message.text}</p>
                <p className="text-xs opacity-70 mt-1">
                  {message.timestamp.toLocaleTimeString('pl-PL', { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </p>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-lg">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex space-x-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Napisz swoją wiadomość..."
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-accent dark:bg-gray-700 dark:text-white"
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputText.trim()}
              className="bg-accent hover:bg-opacity-90 text-white p-2 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatAssistant;
