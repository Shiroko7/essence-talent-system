import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import EssenceTalentTree from './components/essences/EssenceTalentTree';
import './App.css';

// Create a client for React Query
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<EssenceTalentTree />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
