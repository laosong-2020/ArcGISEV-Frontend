import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { PiGraph as GraphIcon } from "react-icons/pi";
import { HiMiniUserCircle as UserIcon } from "react-icons/hi2";

import PortalCard,{ ServerCard, DataStoreCard } from "../Components/Cards.tsx"
import PieChartSection from '../Components/PieCharts.tsx';
import { PortalLogTable, ServerLogTable } from '../Components/LogTable.tsx';

const PortalSystemMemData = [
  { name: 'Available (MB)', value: 1118},
  { name: 'Used (MB)', value: 5206 },
];

const PortalSystemDiskData = [
  { name: 'Available (GB)', value: 80},
  { name: 'Used (GB)', value: 851 },
];

const ServerSystemMemData = [
  { name: 'Available (MB)', value: 1723},
  { name: 'Used (MB)', value: 14583 },
];

const ServerSystemDiskData = [
  { name: 'Available (GB)', value: 80},
  { name: 'Used (GB)', value: 851 },
];

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

const DashboardSkeleton: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'portal' | 'server'>('portal');
  const [activeUsageTab, setActiveUsageTab] = useState<'portal' | 'server'>('portal');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const loginStatus = !!localStorage.getItem('username');
    setIsLoggedIn(loginStatus);
  }, []);
  useEffect(() => {
      // TODO: sign out function
      const isLoggedIn = !!localStorage.getItem('username');
      if (!isLoggedIn) {
        // Jump to portal OAuth login page when not logged in.
        const state = Math.random().toString(36).slice(2);
        sessionStorage.setItem('oauth_state', state);
        window.location.href = getAuthUrl(state);
      } else {
        // If logged in, check if token is expired.
        const expiresAt = localStorage.getItem('expiresAt');
        if (expiresAt && Date.now() > parseInt(expiresAt)) {
          // If token is expired, jump to portal OAuth login page.
          const state = Math.random().toString(36).slice(2);
          sessionStorage.setItem('oauth_state', state);
          window.location.href = getAuthUrl(state);
        }
        console.log('User is logged in, username: ', localStorage.getItem('username'));
      }
    }, [navigate])
  return (
    <div className="font-sans">
      {/* Header */}
      <header className="fixed top-0 w-full bg-[#0F091A] z-50">
        <div className="container mx-auto flex items-center justify-between h-20 px-8">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <img src="/logos/Logo Text SVG.svg" alt="Logo" className="h-16 w-auto object-contain" />
            </div>
          </div>
          <nav className="hidden md:flex space-x-4">

            <button
              onClick={() => navigate('/ai')}
              className="btn bg-[#834efe] hover:bg-[#6b3edc] flex items-center space-x-2"
            >
              <i className="fas fa-robot" />
              <span>AI Assistant</span>
            </button>
          </nav>
          {isLoggedIn ? (
            <button
              className="bg-[#834efe] hover:bg-[#6b3edc] text-white p-2 rounded-full transition transform hover:scale-105"
              aria-label="Profile"
            >
              <UserIcon className="h-8 w-8" />
            </button>
          ) : (
            <button
              onClick={() => navigate('/dashboard')}
              className="bg-[#834efe] hover:bg-[#6b3edc] text-white px-6 py-2 rounded-lg text-lg font-medium transition transform hover:scale-105"
            >
              Login
            </button>
          )}
        </div>
      </header>
      {/* Main Content */}
      <section className="h-screen pt-20 bg-[#0F091A]">
        <div className="container mx-auto px-8 h-full">
          <div className="h-full w-full rounded-3xl bg-opacity-80 py-4 shadow-lg backdrop-blur-md flex justify-between items-start">
            {/* Left Section */}
            <div className="w-2/5 h-full bg-transparent pr-2 flex flex-col justify-center items-center gap-y-4">
              <div className="w-full h-full bg-base-100 rounded-xl mx-4 p-4 flex flex-col gap-y-4 items-center justify-center">
                <div className="w-full flex justify-between items-center p-4">
                <h2 className="text-2xl font-bold mb-4">Components</h2>
                <button className="btn bg-[#834efe] hover:bg-[#6b3edc]">
                  <a href="/flow" target="_blank" rel="noopener noreferrer">
                    <GraphIcon className="text-xl" />
                  </a>
                </button>
              </div>
              {/* List */}
              <div className="w-full flex-1 overflow-y-auto scrollbar-none flex flex-col items-center gap-y-4">
                <PortalCard />
                <ServerCard />
                <DataStoreCard />   
              </div>
            </div>
            </div>
            {/* Right Section */}
            <div className="w-3/5 h-full bg-transparent pl-2 flex flex-col justify-center items-center gap-y-4">
              <div className="h-1/2 w-full bg-base-100 rounded-xl p-6 flex flex-col space-y-4">
                {/* Header */}
                <div className="flex justify-between items-center">
                  <h2 className="text-white text-xl font-semibold">System Usage</h2>
                  <div className="flex space-x-2">
                    <button
                      className={
                        `px-4 py-1 rounded-t-lg font-medium ` +
                        (activeUsageTab === 'portal'
                          ? 'bg-[#834efe] text-white'
                          : 'bg-gray-700 text-white hover:bg-[#dacaff] hover:text-white')
                      }
                      onClick={() => setActiveUsageTab('portal')}
                    >
                      Portal
                    </button>
                    <button
                      className={
                        `px-4 py-1 rounded-t-lg font-medium ` +
                        (activeUsageTab === 'server'
                          ? 'bg-[#834efe] text-white'
                          : 'bg-gray-700 text-white hover:bg-[#dacaff] hover:text-white')
                      }
                      onClick={() => setActiveUsageTab('server')}
                    >
                      Server
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 bg-base-200 rounded-b-lg p-4 overflow-auto">
                  {activeUsageTab === 'portal' ? (
                    <PieChartSection 
                      systemMemData={PortalSystemMemData}
                      systemDiskData={PortalSystemDiskData}
                    />
                  ) : (
                    <PieChartSection 
                      systemMemData={ServerSystemMemData}
                      systemDiskData={ServerSystemDiskData}
                    />
                  )}
                </div>
              </div>
              <div className="w-full h-1/2 bg-base-100 rounded-xl p-6 flex flex-col space-y-4">
                {/* Header */}
                <div className="flex justify-between items-center">
                  <h2 className="text-white text-xl font-semibold">Log Messages</h2>
                  <div className="flex space-x-2">
                    <button
                      className={
                        `px-4 py-1 rounded-t-lg font-medium ` +
                        (activeTab === 'portal'
                          ? 'bg-[#834efe] text-white'
                          : 'bg-gray-700 text-white hover:bg-[#dacaff] hover:text-white')
                      }
                      onClick={() => setActiveTab('portal')}
                    >
                      Portal
                    </button>
                    <button
                      className={
                        `px-4 py-1 rounded-t-lg font-medium ` +
                        (activeTab === 'server'
                          ? 'bg-[#834efe] text-white'
                          : 'bg-gray-700 text-white hover:bg-[#dacaff] hover:text-white')
                      }
                      onClick={() => setActiveTab('server')}
                    >
                      Server
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 h-full bg-base-200 rounded-b-lg p-4 overflow-auto">
                  {activeTab === 'portal' ? <PortalLogTable /> : <ServerLogTable />}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DashboardSkeleton;
