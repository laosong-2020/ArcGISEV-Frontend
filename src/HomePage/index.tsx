// src/HomePage/index.tsx

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { PiGraph as GraphIcon } from "react-icons/pi";

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

export default function Home() {
  const navigate = useNavigate()

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
    <div className="h-full w-full rounded-3xl bg-opacity-80 p-6 shadow-lg backdrop-blur-md flex justify-center items-center ">
      {/* Left Section */}
      <div className="w-2/5 h-full bg-base-100 rounded-xl mx-4 my-4 p-4 flex flex-col">
        {/* Title */}
        <div className="flex justify-between items-center mb-2">
          <span className="text-lg font-bold">Components</span>
          {/* <a href="#" className="link link-info text-sm">Details</a> */}
          <button className="btn btn-ghost btn-info">
            <a href="/flow" target="_blank" rel="noopener noreferrer">
              <GraphIcon className="text-xl" />
            </a>
          </button>
          
        </div>
        {/* List */}
        <div className="flex-1 overflow-y-auto scrollbar-none flex flex-col items-center gap-y-4">
          cards  
        </div>
      </div>
      {/* Right Section */}
      <div className="w-3/5 h-full bg-transparent flex flex-col justify-center items-center gap-y-4">
        <div className="w-full h-1/2 bg-base-100 rounded-xl mx-4 p-4 flex flex-col gap-y-4 justify-start items-center">
          <div className="w-full flex justify-between items-center mb-2">
            <span className="text-lg font-bold">System Usage</span>
          </div>
          {/* name of each tab group should be unique */}
          <div className="h-full w-full tabs tabs-box">
            <input type="radio" name="systemUsage-tab" className="tab" aria-label="Portal" />
            <div className="tab-content bg-base-100 border-base-300 p-6">
              piechart
            </div>

            <input type="radio" name="systemUsage-tab" className="tab" aria-label="Server" defaultChecked />
            <div className="tab-content bg-base-100 border-base-300 p-6">
              piechart
            </div>
          </div>
        </div>
        <div className="w-full h-1/2 bg-base-100 rounded-xl mx-4 p-4 flex flex-col gap-y-4 justify-start items-center">
          <div className="w-full flex justify-between items-center mb-2">
            <span className="text-lg font-bold">Log Messages</span>
          </div>
          <div className="h-full w-full tabs tabs-box">
            <input type="radio" name="logTable-tab" className="tab" aria-label="PortalLogTable" /> 
            <div className="tab-content bg-base-100 border-base-300 p-6 max-h-60">
              portal log table
            </div>
            <input type="radio" name="logTable-tab" className="tab" aria-label="ServerLogTable" />
            <div className="tab-content bg-base-100 border-base-300 p-6 max-h-60">
              server log table
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}