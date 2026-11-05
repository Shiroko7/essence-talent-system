/** Shown only on the beta site (Netlify branch deploy, see netlify.toml) so beta content is never mistaken for official. */
const BetaBadge = () =>
  import.meta.env.VITE_BETA === 'true' ? (
    <a
      href="https://essence-dao.netlify.app"
      title="This is the beta site: content may change before release. Saved builds here are separate from the public site. Click to open the public site."
      className="fixed bottom-3 left-3 z-40 px-3 py-1 rounded-full border border-gold bg-obsidian/90 text-gold font-display text-xs tracking-widest uppercase shadow-lg hover:text-gold-bright"
    >
      Beta
    </a>
  ) : null;

export default BetaBadge;
