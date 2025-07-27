// src/App.tsx

import React from 'react';
import { Routes, Route } from 'react-router-dom';

// import Flow from './FlowPage/index.tsx';
// import Home from './HomePage/index.tsx';
import OAuthCallback from './OauthCallback/index.tsx';
import LandingPage from './Components/LandingPage.tsx';
import DashboardSkeleton from './DashboardPage/index.tsx';
import AIPage from './AIPage/index.tsx';

import Flow from './FlowPage/index.tsx';

function App() {
  return (
    <Routes>
      {/* Landing page route - uses its own full-screen layout */}
      <Route path="/" element={<LandingPage />} />
      
      {/* Dashboard route - uses its own full-screen layout */}
      <Route path="/oauthCallback" element={<OAuthCallback />} />
      <Route path="/dashboard" element={<DashboardSkeleton />} />
      {/* Flow Route */}
      <Route path="/flow" element={<Flow />} />
      {/* AI Chatbot Route */}
      <Route path="/ai" element={<AIPage />} />
    </Routes>
  )
}

export default App