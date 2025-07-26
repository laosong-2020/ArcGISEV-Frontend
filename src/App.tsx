// src/App.tsx

import React from 'react';
import { Routes, Route } from 'react-router-dom';

// import Flow from './FlowPage/index.tsx';
// import Home from './HomePage/index.tsx';
import OAuthCallback from './OauthCallback/index.tsx';
import LandingPage from './Components/LandingPage.tsx';
import Dashboard from './Components/Dashboard.tsx';

import Navbar from './Components/navbar.tsx';

function App() {
  return (
    <Routes>
      {/* Landing page route - uses its own full-screen layout */}
      <Route path="/" element={<LandingPage />} />
      
      {/* Dashboard route - uses its own full-screen layout */}
      <Route path="/dashboard" element={<Dashboard />} />
      
      {/* Other routes - use the original layout with navbar and footer */}
      <Route path="/*" element={
        <div className="h-screen flex flex-col items-center justify-center bg-base-300 gap-y-4">
          <Navbar />
          <main className="w-full min-h-0 flex-1 mx-auto px-8 flex flex-col items-center justify-center">
            <Routes>
              {/* <Route path="/" element={<Home />} /> */}
              {/* <Route path="/flow" element={<Flow />} /> */}
              <Route path="/oauthCallback" element={<OAuthCallback />} />
              {/* Add more routes here */}
            </Routes>
          </main>
          <footer className="text-center py-4 text-sm text-gray-500">
            © 2024 ArcGIS EV Config Visualizer. All rights reserved.
          </footer>
        </div>
      } />
    </Routes>
  )
}

export default App