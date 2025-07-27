import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { HiMiniUserCircle as UserIcon } from "react-icons/hi2";

const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;
const PORTAL_URL = import.meta.env.VITE_PORTAL_URL;
const REDIRECT_URL = import.meta.env.VITE_FRONTEND_REDIRECT_URL;

function getAuthUrl(state: string) {
  const params = new URLSearchParams({
    client_id: CLIENT_ID,
    response_type: 'code',
    redirect_uri: REDIRECT_URL,
    state
  })
  return `${PORTAL_URL}/sharing/rest/oauth2/authorize?${params.toString()}`
}

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  useEffect(() => {
    const loginStatus = !!localStorage.getItem('username');
    setIsLoggedIn(loginStatus);
  }, [])

  return (
    <div className="font-sans text-gray-900">
      {/* Header */}
      <header className="fixed top-0 w-full bg-[#0F091A] z-50">
        <div className="container mx-auto flex items-center justify-between h-20 px-8">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <img src="/logos/Logo Text SVG.svg" alt="Logo" className="h-16 w-auto object-contain" />
            </div>
          </div>
          <nav className="hidden md:flex space-x-12">
            {['welcome', 'features', 'how-it-works'].map((sec) => (
              <button
                key={sec}
                onClick={() => scrollToSection(sec)}
                className="text-white hover:text-purple-400 transition-colors duration-200"
              >
                {sec === 'welcome' ? 'Welcome' : sec === 'features' ? 'Features' : 'How It Works'}
              </button>
            ))}
            <button
              onClick={() => navigate('/ai')}
              className="text-white hover:text-purple-400 transition-colors duration-200 flex items-center space-x-2"
            >
              <i className="fas fa-robot"></i>
              <span>AI Assistant</span>
            </button>
          </nav>
          {/* right: login or user icon */}
          {isLoggedIn ? (
            <button
              className="bg-[#834efe] hover:bg-[#6b3edc] text-white p-2 rounded-full transition transform hover:scale-105"
              aria-label="Profile"
            >
              <UserIcon className="h-8 w-8" />
            </button>
          ) : (
            <button
              onClick={() => {
                const state = Math.random().toString(36).slice(2);
                sessionStorage.setItem('oauth_state', state);
                window.location.href = getAuthUrl(state);
              }}
              className="bg-[#834efe] hover:bg-[#6b3edc] text-white px-6 py-2 rounded-lg text-lg font-medium transition transform hover:scale-105"
            >
              Login
            </button>
          )}
        </div>
      </header>

      {/* Welcome */}
      <section id="welcome" className="flex flex-col items-center justify-center h-screen pt-20 bg-[#0F091A] text-center px-8">
        <p className="text-white/50 text-lg mb-4">Now welcoming</p>
        <h1 className="text-white text-5xl font-bold mb-6 max-w-3xl">
          A reimagined way of setting up ArcGIS Enterprise.
        </h1>
        <p className="text-white/50 text-base mb-10 max-w-2xl">
          Join the 20,000+ Users that use our software to make their Enterprise deployment, setup, and management easier. With our software, you can cut the ArcGIS enterprise deployment time in half. ArcGIS Enterprise Visualizer not only streamlines your process, but shows you your mistakes and how to fix them using our groundbreaking AI system.
        </p>
        <button
          onClick={() => navigate('/dashboard')}
          className="bg-[#834efe] hover:bg-[#6b3edc] text-white px-12 py-4 rounded-xl text-xl font-semibold transition transform hover:scale-105"
        >
          Get Started
        </button>
        <p className="text-white/30 text-sm mt-4">*ArcGIS Enterprise Account Required*</p>
      </section>

      {/* Features */}
      <section id="features" className="py-32 bg-gray-100 text-center px-6">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Features</h2>
        <div className="h-1 w-16 bg-[#834efe] mx-auto mb-8"></div>
        <p className="text-gray-600 max-w-2xl mx-auto mb-16">
          Discover powerful tools designed to streamline your ArcGIS Enterprise experience and boost productivity.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Card */}
          {[
            {
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 12h2m2 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ),
              title: 'Server Maintenance',
              desc: 'Automated server monitoring and maintenance tools to keep your systems running smoothly.'
            },
            {
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7h18M3 12h18M3 17h18" />
                </svg>
              ),
              title: 'Enterprise Deployment',
              desc: 'Streamlined deployment process that cuts setup time in half with guided configurations.'
            },
            {
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A2 2 0 0122 9.618v4.764a2 2 0 01-2.447 1.894L15 14m0-4v4m0-4L9 7m0 10l6-3m-6 3v-4m0 4l-4.553 2.276A2 2 0 013 14.382v-4.764a2 2 0 011.447-1.894L9 10" />
                </svg>
              ),
              title: 'Layout Visualizer',
              desc: 'Visual representation of your Enterprise architecture with real-time status updates.'
            },
            {
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2-1.343-2-3-2z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.4 15c.083.328.1.672.1 1 0 2.485-2.015 4.5-4.5 4.5H9c-2.485 0-4.5-2.015-4.5-4.5 0-.328.017-.672.1-1M12 8V2" />
                </svg>
              ),
              title: 'Storage Monitoring',
              desc: 'Advanced analytics and monitoring for storage usage and performance optimization.'
            }
          ].map((f, i) => (
            <div key={i} className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="flex">
                <div className="p-6 bg-[#834efe] flex items-center justify-center w-20">
                  {f.icon}
                </div>
                <div className="p-6 flex-1">
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">{f.title}</h3>
                  <p className="text-gray-600 text-sm">{f.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-32 bg-[#1A1A2E] text-center text-white px-6">
        <h2 className="text-4xl font-bold mb-4">How It Works</h2>
        <div className="h-1 w-16 bg-[#834efe] mx-auto mb-8"></div>
        <p className="max-w-2xl mx-auto text-white/70 mb-16">
          Simple steps to get your ArcGIS Enterprise up and running with our intelligent deployment system.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
          {[
            {
              step: '1',
              title: 'Connect Your Environment',
              desc: 'Link your existing infrastructure and let our system analyze your current setup and requirements.'
            },
            {
              step: '2',
              title: 'AI-Powered Configuration',
              desc: 'Our AI analyzes your setup and provides optimized configuration recommendations tailored to your needs.'
            },
            {
              step: '3',
              title: 'Deploy & Monitor',
              desc: 'Deploy with confidence and monitor your Enterprise with real-time insights and automated maintenance.'
            }
          ].map((s, i) => (
            <div key={i} className="flex flex-col items-center space-y-4">
              <div className="w-20 h-20 rounded-full bg-[#834efe] flex items-center justify-center text-2xl font-bold text-white">
                {s.step}
              </div>
              <h4 className="text-xl font-semibold">{s.title}</h4>
              <p className="text-white/70 text-sm max-w-xs">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
