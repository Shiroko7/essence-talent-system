import React, { useEffect } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { ScrollText } from 'lucide-react';
import Layout from '../components/layout/Layout';
import { LATEST_PATCH, PATCHES, patchDate } from '../data/patchNotes';
import PatchV2_0 from './patchNotes/PatchV2_0';
import PatchV2_1 from './patchNotes/PatchV2_1';

/** Each patch's notes, by slug. Register new patches here and in data/patchNotes. */
const PATCH_PAGES: Record<string, React.FC> = {
  'v2-0': PatchV2_0,
  'v2-1': PatchV2_1
};

/**
 * Every patch lives at /patch-notes/<slug>. /patch-notes and unknown slugs go to the latest,
 * so the address people copy and share is always a versioned one with its own link preview.
 */
const PatchNotesPage: React.FC = () => {
  const { slug } = useParams();
  const patch = PATCHES.find(p => p.slug === slug);

  useEffect(() => {
    if (!patch) return;
    const previous = document.title;
    document.title = `Patch ${patch.version} · ${patch.name} · Essence Talent System`;
    return () => { document.title = previous; };
  }, [patch]);

  useEffect(() => { window.scrollTo(0, 0); }, [slug]);

  if (!patch) return <Navigate to={`/patch-notes/${LATEST_PATCH.slug}`} replace />;
  const Page = PATCH_PAGES[patch.slug];

  return (
    <Layout>
      <div className="max-w-[1200px] mx-auto">
        <div className="mb-6 flex flex-wrap items-center gap-2">
          {PATCHES.length > 1 && (
            <nav aria-label="Patches" className="flex flex-wrap gap-2">
              {PATCHES.map(p => {
                const current = p.slug === patch.slug;
                return (
                  <Link
                    key={p.slug}
                    to={`/patch-notes/${p.slug}`}
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
          <Link
            to="/changelog"
            className="ml-auto inline-flex items-center gap-2 rounded border border-gold-subtle px-3 py-1.5 font-display text-sm tracking-wide text-fog transition-colors hover:text-ivory hover:border-gold/50"
          >
            <ScrollText size={15} className="text-gold" /> Changelog
          </Link>
        </div>
        <Page />
      </div>
    </Layout>
  );
};

export default PatchNotesPage;
