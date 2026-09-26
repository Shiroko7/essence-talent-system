import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import TalentPage from './talents/TalentPage';
import ChangelogPage from './pages/ChangelogPage';
import MerchantsPage from './pages/MerchantsPage';
import MerchantCatalogPage from './pages/MerchantCatalogPage';
import PotionsPage from './pages/PotionsPage';
import './App.css';

// Create a client for React Query
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<TalentPage key="v1" version="v1" />} />
          <Route path="/essence" element={<TalentPage key="v1-essence" version="v1" page="essence" />} />
          <Route path="/summary" element={<TalentPage key="v1-sheet" version="v1" page="sheet" />} />
          <Route path="/sheet" element={<Navigate to="/summary" replace />} />
          <Route path="/v2" element={<TalentPage key="v2" version="v2" />} />
          <Route path="/v2/essence" element={<TalentPage key="v2-essence" version="v2" page="essence" />} />
          <Route path="/v2/summary" element={<TalentPage key="v2-sheet" version="v2" page="sheet" />} />
          <Route path="/v2/sheet" element={<Navigate to="/v2/summary" replace />} />
          <Route path="/cultivation" element={<TalentPage key="v2-cultivation" version="v2" />} />
          <Route path="/changelog" element={<ChangelogPage />} />
          <Route path="/merchants" element={<MerchantsPage />} />
          <Route path="/merchants/:merchantId" element={<MerchantCatalogPage />} />
          <Route path="/potions" element={<PotionsPage />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
