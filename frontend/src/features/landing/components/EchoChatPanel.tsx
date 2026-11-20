import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Bot } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
}

const SUGGESTIONS = [
  'Can you introduce Ashish?',
  'What projects has Ashish built?',
  'What are Ashish\'s technical skills?',
];

interface EchoChatPanelProps {
  theme: 'dark' | 'light';
  isOpen: boolean;
  onClose: () => void;
}

const EchoChatPanel: React.FC<EchoChatPanelProps> = ({ theme, isOpen, onClose }) => {
  const isDark = theme === 'dark';
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const borderColor = isDark ? 'border-white/20' : 'border-black/20';
  const textColor = isDark ? 'text-white' : 'text-black';
  const subTextColor = isDark ? 'text-neutral-400' : 'text-neutral-600';
  const panelBg = isDark ? 'bg-black/90 backdrop-blur-xl' : 'bg-white/90 backdrop-blur-xl';
  const userBubbleBg = isDark ? 'bg-white/10' : 'bg-black/10';
  const aiBubbleBg = isDark ? 'bg-white/5' : 'bg-black/5';
  const aiBubbleBorder = isDark ? 'border-white/10' : 'border-black/10';

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const addMessage = (text: string, sender: 'user' | 'ai') => {
    setMessages((prev) => [
      ...prev,
      { id: `${Date.now()}-${sender}`, text, sender },
    ]);
  };

  const handleSend = (text?: string) => {
    const msg = (text || input).trim();
    if (!msg) return;

    addMessage(msg, 'user');
    setInput('');

    // Demo AI response — replace with actual API call
    setTimeout(() => {
      addMessage(
        "I'm Echo, Ashish's AI assistant. This is a demo response — connect me to the backend to get real answers!",
        'ai'
      );
    }, 800);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Backdrop overlay */}
      <div
        className={`fixed inset-0 z-40 transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          } bg-black/40`}
        onClick={onClose}
      />

      {/* Chat Panel */}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-full sm:w-[400px] md:w-[420px] flex flex-col ${panelBg} border-l ${borderColor} transition-transform duration-300 ease-out ${isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
      >
        {/* Header */}
        <div className={`flex items-center justify-between px-5 py-4 border-b ${borderColor}`}>
          <div className="flex items-center gap-2.5">
            <div
              className={`w-8 h-8 rounded-lg border ${borderColor} flex items-center justify-center`}
            >
              <Bot className="w-4 h-4 opacity-70" />
            </div>
            <div>
              <h2 className={`text-sm font-semibold tracking-wide ${textColor}`}>Echo</h2>
              <p className={`text-[10px] font-mono uppercase tracking-widest ${subTextColor}`}>
                AI Assistant
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className={`w-8 h-8 rounded-lg border ${borderColor} hover:border-current flex items-center justify-center ${textColor} transition-colors duration-200 cursor-pointer`}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto px-4 py-5 space-y-3">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-5">
              {/* Empty state */}
              <div
                className={`w-14 h-14 rounded-2xl border ${borderColor} flex items-center justify-center`}
              >
                <Bot className={`w-7 h-7 ${subTextColor}`} />
              </div>
              <div className="text-center space-y-1">
                <p className={`text-sm font-medium ${textColor}`}>Hey, I'm Echo!</p>
                <p className={`text-xs ${subTextColor}`}>
                  Ask me anything about Ashish.
                </p>
              </div>

              {/* Suggestion chips */}
              <div className="w-full space-y-2 mt-2">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => handleSend(s)}
                    className={`w-full text-left px-4 py-2.5 rounded-xl border ${borderColor} hover:border-current bg-transparent ${textColor} text-xs tracking-wide transition-all duration-200 cursor-pointer active:scale-[0.99]`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <>
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] px-3.5 py-2.5 rounded-2xl text-xs leading-relaxed ${msg.sender === 'user'
                      ? `${userBubbleBg} ${textColor} rounded-br-md`
                      : `${aiBubbleBg} border ${aiBubbleBorder} ${textColor} rounded-bl-md`
                      }`}
                  >
                    {msg.sender === 'ai' && (
                      <span className={`text-[10px] font-mono uppercase tracking-widest ${subTextColor} block mb-1`}>
                        Echo
                      </span>
                    )}
                    {msg.text}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </>
          )}
        </div>

        {/* Input Area */}
        <div className={`px-4 pb-4 pt-2 border-t ${borderColor}`}>
          <div
            className={`flex items-center gap-2 rounded-xl border ${borderColor} px-3 py-2 transition-colors duration-200 focus-within:border-current`}
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about Ashish..."
              className={`flex-1 bg-transparent outline-none text-xs ${textColor} placeholder:${subTextColor}`}
            />
            <button
              type="button"
              onClick={() => handleSend()}
              disabled={!input.trim()}
              className={`w-7 h-7 rounded-lg flex items-center justify-center ${textColor} transition-opacity duration-200 cursor-pointer ${input.trim() ? 'opacity-100' : 'opacity-30'
                }`}
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EchoChatPanel;

