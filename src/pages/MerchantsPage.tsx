import React from 'react';
import { Store, Lock } from 'lucide-react';
import Layout from '../components/layout/Layout';
import MerchantCard from '../components/merchants/MerchantCard';
import merchantsData from '../data/merchants.json';

const MerchantsPage: React.FC = () => {
  const { merchants } = merchantsData;

  const merchantsByRegion = merchants.reduce((acc, merchant) => {
    const region = merchant.region || 'Other';
    if (!acc[region]) {
      acc[region] = [];
    }
    acc[region].push(merchant);
    return acc;
  }, {} as Record<string, typeof merchants>);

  const sortedRegions = Object.keys(merchantsByRegion).sort((a, b) => {
    if (a === 'Sirius') return -1;
    if (b === 'Sirius') return 1;
    return a.localeCompare(b);
  });

  return (
    <Layout>
      <div className="container mx-auto max-w-7xl">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <Store size={32} className="text-gold" />
            <h1 className="font-display text-3xl md:text-4xl tracking-wide text-ivory">
              Merchants
            </h1>
          </div>
          <p className="text-fog text-lg font-body">
            Browse magical item merchants and their inventories across the realm.
          </p>
        </div>

        {/* Merchants grouped by region */}
        {sortedRegions.map(region => {
          const regionMerchants = merchantsByRegion[region];
          const availableMerchants = regionMerchants.filter(m => m.isAvailable);
          const lockedMerchants = regionMerchants.filter(m => !m.isAvailable);

          return (
            <section key={region} className="mb-12">
              {/* Region Header */}
              <div className="mb-6 pb-3 border-b border-gold-subtle">
                <h2 className="font-display text-2xl tracking-wide text-ivory">
                  {region}
                </h2>
              </div>

              {/* Available Merchants */}
              {availableMerchants.length > 0 && (
                <div className="mb-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {availableMerchants.map((merchant, index) => (
                      <div
                        key={merchant.id}
                        className="animate-fade-in"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <MerchantCard merchant={merchant} />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Locked Merchants */}
              {lockedMerchants.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Lock size={16} className="text-mist" />
                    <h3 className="font-display text-lg tracking-wide text-mist">
                      Locked
                    </h3>
                  </div>
                  <p className="text-fog text-sm font-body mb-4">
                    Complete quests or meet requirements to unlock these merchants.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {lockedMerchants.map(merchant => (
                      <MerchantCard key={merchant.id} merchant={merchant} />
                    ))}
                  </div>
                </div>
              )}
            </section>
          );
        })}

        {/* Empty State */}
        {merchants.length === 0 && (
          <div className="arcane-panel p-12 text-center">
            <Store size={48} className="mx-auto mb-4 text-mist" />
            <p className="font-display text-lg text-fog">No merchants available</p>
            <p className="text-sm text-mist mt-2">
              Check back later for new merchants.
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default MerchantsPage;
