import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import TalentPage from './talents/TalentPage';
import ChangelogPage from './pages/ChangelogPage';
import PatchNotesPage from './pages/PatchNotesPage';
import RulesPage from './pages/RulesPage';
import MerchantsPage from './pages/MerchantsPage';
import MerchantCatalogPage from './pages/MerchantCatalogPage';
import PotionsPage from './pages/PotionsPage';
import './App.css';

// Create a client for React Query
const queryClient = new QueryClient();

/** Redirect that keeps `?path=` and `#hash`, so links from before V2 became the home page still land. */
const Moved = ({ to }: { to: string }) => {
  const { search, hash } = useLocation();
  return <Navigate to={`${to}${search}${hash}`} replace />;
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<TalentPage key="v2" version="v2" />} />
          <Route path="/essence" element={<TalentPage key="v2-essence" version="v2" page="essence" />} />
          <Route path="/summary" element={<TalentPage key="v2-sheet" version="v2" page="sheet" />} />
          <Route path="/sheet" element={<Moved to="/summary" />} />
          <Route path="/migration" element={<TalentPage key="v2-migration" version="v2" page="migration" />} />
          <Route path="/v1" element={<TalentPage key="v1" version="v1" />} />
          <Route path="/v1/essence" element={<TalentPage key="v1-essence" version="v1" page="essence" />} />
          <Route path="/v1/summary" element={<TalentPage key="v1-sheet" version="v1" page="sheet" />} />
          <Route path="/v1/sheet" element={<Moved to="/v1/summary" />} />
          <Route path="/v2" element={<Moved to="/" />} />
          <Route path="/v2/essence" element={<Moved to="/essence" />} />
          <Route path="/v2/summary" element={<Moved to="/summary" />} />
          <Route path="/v2/sheet" element={<Moved to="/summary" />} />
          <Route path="/v2/migration" element={<Moved to="/migration" />} />
          <Route path="/cultivation" element={<Moved to="/" />} />
          <Route path="/patch-notes" element={<PatchNotesPage />} />
          <Route path="/rules" element={<RulesPage />} />
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
