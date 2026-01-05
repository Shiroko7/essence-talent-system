import React from 'react';
import Layout from '../components/layout/Layout';
import MerchantCard from '../components/merchants/MerchantCard';
import merchantsData from '../data/merchants.json';

const MerchantsPage: React.FC = () => {
  const { merchants } = merchantsData;

  // Group merchants by region
  const merchantsByRegion = merchants.reduce((acc, merchant) => {
    const region = merchant.region || 'Other';
    if (!acc[region]) {
      acc[region] = [];
    }
    acc[region].push(merchant);
    return acc;
  }, {} as Record<string, typeof merchants>);

  // Sort regions (Sirius first, then alphabetically)
  const sortedRegions = Object.keys(merchantsByRegion).sort((a, b) => {
    if (a === 'Sirius') return -1;
    if (b === 'Sirius') return 1;
    return a.localeCompare(b);
  });

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Merchants</h1>
          <p className="text-gray-400 text-lg">
            Browse magical item merchants and their inventories
          </p>
        </div>

        {/* Merchants grouped by region */}
        {sortedRegions.map(region => {
          const regionMerchants = merchantsByRegion[region];
          const availableMerchants = regionMerchants.filter(m => m.isAvailable);
          const lockedMerchants = regionMerchants.filter(m => !m.isAvailable);

          return (
            <section key={region} className="mb-12">
              <h2 className="text-3xl font-bold text-white mb-6 border-b border-gray-700 pb-2">
                {region}
              </h2>

              {/* Available Merchants in this region */}
              {availableMerchants.length > 0 && (
                <div className="mb-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {availableMerchants.map(merchant => (
                      <MerchantCard key={merchant.id} merchant={merchant} />
                    ))}
                  </div>
                </div>
              )}

              {/* Locked Merchants in this region */}
              {lockedMerchants.length > 0 && (
                <div>
                  <h3 className="text-xl font-semibold text-gray-300 mb-2">Locked</h3>
                  <p className="text-gray-400 text-sm mb-4">
                    Complete quests or meet requirements to unlock these merchants
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
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No merchants available</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default MerchantsPage;
