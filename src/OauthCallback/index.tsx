// src/oauthCallback/index.tsx

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function OAuthCallback() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function exchangeCode() {
      // 1. Get code from URL
      const params = new URLSearchParams(window.location.search);
      const code = params.get('code');
      const returnedState = params.get('state');
      const savedState = sessionStorage.getItem('oauth_state');

      if (!code || !returnedState || returnedState !== savedState) {
        setError('Invalid OAuth callback or CSRF check failed')
        return
      }
      try {
        // 2. exchange code for token
        const resp = await fetch(`${import.meta.env.VITE_BACKEND_HOST}:${import.meta.env.VITE_BACKEND_PORT}/api/oauth/exchange`, {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Accept': '*/*',
            'Content-Type': 'application/json' 
          },
          body: JSON.stringify({ code })
        })
        const data = await resp.json()

        if (!resp.ok) {
          throw new Error(data.error?.message || JSON.stringify(data))
        }
        if (data.success != true) {
          throw new Error(data.error?.message || JSON.stringify(data))
        }

        // 3. store token
        localStorage.setItem('username', data.username)
        localStorage.setItem('expiresAt', data.expiresAt)
        // 4. clear state and redirect to home
        sessionStorage.removeItem('oauth_state')
        navigate('/dashboard')
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        console.error('OAuth callback error:', err)
        setError(err.message || 'Failed to exchange code for token')
      }
    }

    exchangeCode()
  }, [navigate])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      {error
        ? <p className="text-red-600">{error}</p>
        : <p className="text-gray-700">Logging in, Please wait...</p>
      }
    </div>
  )
}