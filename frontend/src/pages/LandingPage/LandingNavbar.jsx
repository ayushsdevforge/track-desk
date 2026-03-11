import { NAV_LINKS } from './data';

const LandingNavbar = ({ onLogin, onRegister, scrollTo }) => (
  <nav className="fixed top-0 inset-x-0 z-50 border-b border-brand-100/40 bg-white/60 backdrop-blur-2xl">
    <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
      <div className="cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        <img src="/trackdesk.png.png" alt="TrackDesk" className="h-14 object-contain" />
      </div>

      <div className="hidden md:flex items-center gap-8">
        {NAV_LINKS.map((l) => (
          <button key={l} onClick={() => scrollTo(l.toLowerCase().replace(/ /g, '-'))}
            className="cursor-pointer text-base text-gray-600 hover:text-brand-800 transition-colors font-medium">
            {l}
          </button>
        ))}
        <button onClick={onLogin}
          className="cursor-pointer text-base text-brand-800 hover:text-brand-900 transition-colors font-semibold">
          Login
        </button>
      </div>

      <button onClick={onRegister}
        className="cursor-pointer px-5 py-2 text-sm font-semibold text-white bg-brand-800 rounded-xl hover:bg-brand-700 shadow-md shadow-brand-900/20 transition-all duration-300">
        Get Started
      </button>
    </div>
  </nav>
);

export default LandingNavbar;
