import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-primary-900 text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-3xl">🥗</span>
            <span className="text-xl font-black font-display">Healthy Food Guide</span>
          </div>
          <p className="text-primary-200 text-sm leading-relaxed">Your trusted guide for healthy eating at every age. Earn points, build streaks, and level up your health journey!</p>
        </div>
        <div>
          <h4 className="font-bold text-primary-100 mb-4 text-lg font-display">Quick Links</h4>
          <div className="flex flex-col gap-2">
            {[['/', 'Home'], ['/menu', 'Menu'], ['/dashboard', 'My Dashboard'], ['/leaderboard', 'Leaderboard'], ['/about', 'About Us'], ['/contact', 'Contact']].map(([to, label]) => (
              <Link key={to} to={to} className="text-primary-300 hover:text-white transition-colors text-sm">{label}</Link>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-bold text-primary-100 mb-4 text-lg font-display">Contact Us</h4>
          <div className="flex flex-col gap-2 text-primary-300 text-sm">
            <span>📧 info@healthyfoodguide.com</span>
            <span>📞 +91 98765 43210</span>
          </div>
          <div className="flex gap-3 mt-4">
            {['🌐', '📘', '📸'].map((icon, i) => (
              <button type="button" key={i} className="w-9 h-9 bg-primary-700 hover:bg-primary-600 rounded-lg flex items-center justify-center transition-colors text-lg">{icon}</button>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-primary-700 text-center text-primary-400 text-sm py-4">
        © 2025 Healthy Food Guide. Built with ❤️ for healthy living.
      </div>
    </footer>
  );
}
