import React, { useEffect } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { LATEST_PATCH, PATCHES, patchDate } from '../data/patchNotes';
import PatchV2_0 from './patchNotes/PatchV2_0';
import PatchV2_1 from './patchNotes/PatchV2_1';

/** Each patch's notes, by slug. Register new patches here and in data/patchNotes. */
const PATCH_PAGES: Record<string, React.FC> = {
  'v2-0': PatchV2_0,
  'v2-1': PatchV2_1
};

/** /patch-notes shows the latest patch; /patch-notes/<slug> shows an older one. */
const PatchNotesPage: React.FC = () => {
  const { slug } = useParams();
  const patch = slug ? PATCHES.find(p => p.slug === slug) : LATEST_PATCH;

  useEffect(() => {
    if (!patch) return;
    const previous = document.title;
    document.title = `Patch ${patch.version} · ${patch.name} · Essence Talent System`;
    return () => { document.title = previous; };
  }, [patch]);

  useEffect(() => { window.scrollTo(0, 0); }, [slug]);

  if (!patch) return <Navigate to="/patch-notes" replace />;
  const Page = PATCH_PAGES[patch.slug];

  return (
    <Layout>
      <div className="max-w-[1200px] mx-auto">
        {PATCHES.length > 1 && (
          <nav aria-label="Patches" className="mb-6 flex flex-wrap gap-2">
            {PATCHES.map(p => {
              const current = p.slug === patch.slug;
              return (
                <Link
                  key={p.slug}
                  to={p === LATEST_PATCH ? '/patch-notes' : `/patch-notes/${p.slug}`}
                  aria-current={current ? 'page' : undefined}
                  className={`rounded border px-3 py-1.5 text-sm transition-colors ${current ? 'border-gold text-ivory bg-gold/10' : 'border-gold-subtle text-fog hover:text-ivory hover:border-gold/50'}`}
                >
                  <span className="font-display tracking-wide">{p.version}</span>
                  <span className="text-mist"> · {p.name} · {patchDate(p)}</span>
                </Link>
              );
            })}
          </nav>
        )}
        <Page />
      </div>
    </Layout>
  );
};

export default PatchNotesPage;
