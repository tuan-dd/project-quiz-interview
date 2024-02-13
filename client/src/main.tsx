import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HelmetProvider } from 'react-helmet-async';
import { ScrollbarProvider } from './contexts/useScrollBar.js';
import { DisplayDataProvider } from './contexts/displayData';
import { AuthProvider } from './contexts/auth';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <ScrollbarProvider>
        <DisplayDataProvider>
          <AuthProvider>
            <App />
          </AuthProvider>
        </DisplayDataProvider>
      </ScrollbarProvider>
    </HelmetProvider>
  </QueryClientProvider>,
  // </React.StrictMode>,
);
