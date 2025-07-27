import React, { useState, useEffect, useRef, useCallback } from 'react';
import { marked } from 'marked';
import './styles.css';

interface Message {
  content: string;
  isUser: boolean;
  data?: {
    cache_hit?: boolean;
    cache_type?: string;
    similarity_score?: number;
    reasoning?: string;
  };
}

interface LoadingStep {
  icon: string;
  text: string;
  color: string;
}

const AIPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      content: "I'm your advanced ArcGIS Enterprise assistant. I can help you with configuration, deployment, troubleshooting, and best practices for raster analytics. Ask me anything!",
      isUser: false
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [shouldAutoScroll, setShouldAutoScroll] = useState(true);
  const [isUserScrolling, setIsUserScrolling] = useState(false);
  const [showScrollIndicator, setShowScrollIndicator] = useState(false);

  const chatMessagesRef = useRef<HTMLDivElement>(null);
  const scrollTimeoutRef = useRef<NodeJS.Timeout>();
  const currentLoaderIndexRef = useRef(0);
  const currentStepIndexRef = useRef(0);
  const loaderIntervalRef = useRef<NodeJS.Timeout>();

  const loadingMessages = [
    "🔍 Analyzing ArcGIS Enterprise question with local AI...",
    "🏢 Processing query through ESRI-trained language model...", 
    "📚 Searching embedded ArcGIS knowledge vectors...",
    "🎯 Finding relevant ESRI documentation and guides...",
    "⚡ Retrieving enterprise deployment best practices...",
    "🔬 Cross-referencing ArcGIS configuration patterns...",
    "💡 Synthesizing ESRI-specific solution...",
    "✨ Adding expert ArcGIS Enterprise insights..."
  ];

  const progressStepsData: LoadingStep[] = [
    { icon: "fas fa-search", text: "Analyzing ArcGIS Enterprise query", color: "text-blue-400" },
    { icon: "fas fa-database", text: "Searching embedded ESRI knowledge base", color: "text-purple-400" },
    { icon: "fas fa-file-alt", text: "Retrieving ArcGIS deployment guides", color: "text-green-400" },
    { icon: "fas fa-brain", text: "Processing with ESRI-trained local model", color: "text-pink-400" },
    { icon: "fas fa-tools", text: "Generating ArcGIS Enterprise solution", color: "text-yellow-400" }
  ];

  // Initialize floating particles
  useEffect(() => {
    createParticles();
  }, []);

  const createParticles = () => {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;
    
    for (let i = 0; i < 20; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.width = Math.random() * 4 + 2 + 'px';
      particle.style.height = particle.style.width;
      particle.style.animationDelay = Math.random() * 20 + 's';
      particle.style.animationDuration = (Math.random() * 10 + 15) + 's';
      particlesContainer.appendChild(particle);
    }
  };

  const isAtBottom = useCallback(() => {
    if (!chatMessagesRef.current) return true;
    const tolerance = 100;
    const { scrollTop, clientHeight, scrollHeight } = chatMessagesRef.current;
    return (scrollTop + clientHeight) >= (scrollHeight - tolerance);
  }, []);

  const scrollToBottom = useCallback((force = false) => {
    if (force || (shouldAutoScroll && !isUserScrolling)) {
      setTimeout(() => {
        if (chatMessagesRef.current) {
          chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
        }
      }, 50);
    }
  }, [shouldAutoScroll, isUserScrolling]);

  const handleUserScroll = useCallback(() => {
    setIsUserScrolling(true);
    const atBottom = isAtBottom();
    setShouldAutoScroll(atBottom);
    setShowScrollIndicator(!atBottom);

    clearTimeout(scrollTimeoutRef.current);
    scrollTimeoutRef.current = setTimeout(() => {
      setIsUserScrolling(false);
    }, 1000);
  }, [isAtBottom]);

  const sendMessage = async () => {
    const message = inputValue.trim();
    if (!message) return;

    const newUserMessage: Message = { content: message, isUser: true };
    setMessages(prev => [...prev, newUserMessage]);
    setInputValue('');
    setIsLoading(true);

    let data = null;
    try {
      const response = await fetch('/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: message })
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
      }

      data = await response.json();
      
      if (data.cache_hit) {
        setIsLoading(false);
        console.log(`🚀 Cache hit! Response from ${data.cache_type} cache`);
      }
      
      const newBotMessage: Message = { 
        content: data.answer, 
        isUser: false, 
        data 
      };
      setMessages(prev => [...prev, newBotMessage]);
      
      if (data.cache_hit) {
        console.log(`⚡ Cached response delivered instantly!`);
        if (data.similarity_score) {
          console.log(`🎯 Similarity score: ${data.similarity_score.toFixed(3)}`);
        }
      } else {
        console.log(`🔄 Full AI processing completed`);
      }
      
    } catch (error) {
      const errorMessage: Message = {
        content: `Failed to get response: ${(error as Error).message}. Make sure the API server is running and LM Studio is connected.`,
        isUser: false,
        data: { cache_hit: false }
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      if (!data?.cache_hit) {
        setIsLoading(false);
      }
    }

    scrollToBottom(true);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="min-h-screen ai-page-bg overflow-hidden">
      {/* Floating Particles Background */}
      <div className="floating-particles" id="particles"></div>

      <div className="chat-container container mx-auto p-6 h-screen flex flex-col max-w-5xl">
        {/* Elegant Header */}
        <div className="glass-card glass-header rounded-2xl mb-6 overflow-hidden">
          <div className="p-6">
            <div className="flex items-center justify-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center avatar-glow">
                <i className="fas fa-robot text-white text-xl"></i>
              </div>
              <div className="text-center">
                <h1 className="text-3xl font-bold brand-gradient mb-1">
                  ArcGIS Enterprise RAG Assistant
                </h1>
                <p className="text-white/70 text-sm font-medium">
                  Powered by Advanced Vector Search & Large Language Models
                </p>
              </div>
              <div className="px-3 py-1 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full text-white text-xs font-semibold">
                ✨ AI Powered
              </div>
            </div>
          </div>
        </div>

        {/* Chat Messages Container */}
        <div className="glass-card rounded-2xl flex-1 mb-6 overflow-hidden relative">
          <div className="h-full flex flex-col">
            <div 
              className="flex-1 overflow-y-auto p-6 space-y-6 scroll-fade" 
              ref={chatMessagesRef}
              onScroll={handleUserScroll}
            >
              {messages.map((message, index) => (
                <MessageComponent key={index} message={message} />
              ))}
              
              {isLoading && <LoadingComponent />}
            </div>
            
            {/* Scroll to bottom indicator */}
            {showScrollIndicator && (
              <div 
                className="scroll-indicator show"
                onClick={() => {
                  setShouldAutoScroll(true);
                  scrollToBottom(true);
                  setShowScrollIndicator(false);
                }}
              >
                <i className="fas fa-arrow-down"></i>
                <span>New messages</span>
              </div>
            )}
          </div>
        </div>

        {/* Elegant Input Area */}
        <div className="input-container">
          <div className="flex items-center">
            <input 
              type="text" 
              className="custom-input" 
              placeholder="Ask me about ArcGIS Enterprise configuration, deployment, or troubleshooting..."
              maxLength={500}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isLoading}
            />
            <button 
              className={`send-btn ${isLoading ? 'opacity-60 cursor-not-allowed' : ''}`}
              onClick={sendMessage}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <i className="fas fa-circle-notch fa-spin"></i>
                  <span>Processing</span>
                </>
              ) : (
                <>
                  <i className="fas fa-paper-plane"></i>
                  <span>Send</span>
                </>
              )}
            </button>
          </div>
        </div>
        
        <div className="text-center text-white/50 text-xs mt-3 font-medium">
          <i className="fas fa-database mr-1"></i>
          Local RAG Model • 10,000+ ESRI Docs Embedded • ArcGIS Enterprise Specialist
        </div>
      </div>
    </div>
  );
};

// Message Component
const MessageComponent: React.FC<{ message: Message }> = ({ message }) => {
  const [showReasoning, setShowReasoning] = useState(false);

  if (message.isUser) {
    return (
      <div className="chat-message flex items-start space-x-4 justify-end">
        <div className="user-bubble max-w-2xl p-4 rounded-2xl rounded-tr-md ml-auto text-white">
          {message.content}
        </div>
        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 flex items-center justify-center flex-shrink-0">
          <i className="fas fa-user text-white text-sm"></i>
        </div>
      </div>
    );
  }

  return (
    <div className="chat-message flex items-start space-x-4">
      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0">
        <i className="fas fa-robot text-white text-sm"></i>
      </div>
      <div className="bot-bubble max-w-2xl p-4 rounded-2xl rounded-tl-md">
        <div className="font-semibold text-lg mb-2 flex items-center">
          <span>AI Assistant 🤖</span>
          <div className="ml-auto text-xs opacity-60">AI Assistant</div>
        </div>
        
        {/* Cache hit indicator */}
        {message.data?.cache_hit && (
          <div className="mb-3 flex items-center space-x-2 text-xs">
            <div className="px-2 py-1 bg-green-100 text-green-800 rounded-full flex items-center space-x-1">
              <i className="fas fa-bolt text-xs"></i>
              <span>Cached Response</span>
            </div>
            <div className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
              <span>{message.data.cache_type} cache</span>
            </div>
            {message.data.similarity_score && (
              <div className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full">
                <span>{(message.data.similarity_score * 100).toFixed(1)}% similar</span>
              </div>
            )}
          </div>
        )}
        
        {/* Reasoning toggle */}
        {message.data?.reasoning && (
          <div 
            className="reasoning-toggle p-3 mb-3 rounded-lg cursor-pointer"
            onClick={() => setShowReasoning(!showReasoning)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <i className="fas fa-brain text-purple-500"></i>
                <span className="font-medium text-sm">AI Thinking Process</span>
              </div>
              <i className={`fas fa-chevron-down transform transition-transform ${showReasoning ? 'rotate-180' : ''}`}></i>
            </div>
            {showReasoning && (
              <div className="mt-3 text-sm opacity-80 leading-relaxed">
                {message.data.reasoning}
              </div>
            )}
          </div>
        )}
        
        <div 
          className="leading-relaxed message-content"
          dangerouslySetInnerHTML={{ __html: marked.parse(message.content) }}
        />
      </div>
    </div>
  );
};

// Loading Component
const LoadingComponent: React.FC = () => {
  const [currentLoaderText, setCurrentLoaderText] = useState("🔍 Analyzing ArcGIS Enterprise question with local AI...");
  const [currentStep, setCurrentStep] = useState(0);

  const loadingMessages = [
    "🔍 Analyzing ArcGIS Enterprise question with local AI...",
    "🏢 Processing query through ESRI-trained language model...", 
    "📚 Searching embedded ArcGIS knowledge vectors...",
    "🎯 Finding relevant ESRI documentation and guides...",
    "⚡ Retrieving enterprise deployment best practices...",
    "🔬 Cross-referencing ArcGIS configuration patterns...",
    "💡 Synthesizing ESRI-specific solution...",
    "✨ Adding expert ArcGIS Enterprise insights..."
  ];

  const progressStepsData: LoadingStep[] = [
    { icon: "fas fa-search", text: "Analyzing ArcGIS Enterprise query", color: "text-blue-400" },
    { icon: "fas fa-database", text: "Searching embedded ESRI knowledge base", color: "text-purple-400" },
    { icon: "fas fa-file-alt", text: "Retrieving ArcGIS deployment guides", color: "text-green-400" },
    { icon: "fas fa-brain", text: "Processing with ESRI-trained local model", color: "text-pink-400" },
    { icon: "fas fa-tools", text: "Generating ArcGIS Enterprise solution", color: "text-yellow-400" }
  ];

  useEffect(() => {
    let loaderIndex = 0;
    const interval = setInterval(() => {
      setCurrentLoaderText(loadingMessages[loaderIndex]);
      loaderIndex = (loaderIndex + 1) % loadingMessages.length;
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const stepInterval = setInterval(() => {
      setCurrentStep(prev => (prev + 1) % progressStepsData.length);
    }, 2200);

    return () => clearInterval(stepInterval);
  }, []);

  return (
    <div className="ai-loader chat-message flex items-start space-x-4">
      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0 avatar-glow">
        <i className="fas fa-brain text-white text-sm animate-pulse"></i>
      </div>
      <div className="bot-bubble max-w-2xl p-5 rounded-2xl rounded-tl-md">
        <div className="flex items-center space-x-4 mb-4">
          <div className="thinking-dots">
            <div className="thinking-dot"></div>
            <div className="thinking-dot"></div>
            <div className="thinking-dot"></div>
          </div>
          <div>
            <div className="font-semibold text-sm mb-1">AI Processing</div>
            <div className="loading-text text-xs font-medium">
              {currentLoaderText}
            </div>
          </div>
        </div>
        
        {/* Beautiful Progress Steps */}
        <div className="space-y-3">
          <div className="progress-step flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10">
            <div className="flex items-center space-x-3">
              <i className={`${progressStepsData[currentStep].icon} ${progressStepsData[currentStep].color} animate-spin`}></i>
              <span className="text-sm font-medium">{progressStepsData[currentStep].text}</span>
            </div>
            <i className="fas fa-check text-green-400 opacity-0"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIPage; 