import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import { ageInfo, ageGroups , CATEGORIES , HOW_IT_WORKS ,POLLS, foodData } from '../data/foodData';
import { useCart } from '../hooks/useCart';
import { useUser } from '../hooks/useUser';
import toast from 'react-hot-toast';
import Modal from '../components/ui/Modal';

export default function Home() {


  const navigate = useNavigate();
  const { selectedAge, setSelectedAge, addPoints } = useUser();
  const { addToCart } = useCart();

  // Poll state
  const pollIndex = new Date().getDay() % POLLS.length;
  const poll = POLLS[pollIndex];
  const pollKey = `hfg_poll_${new Date().toDateString()}`;
  const [pollVote, setPollVote] = useState<string | null>(() => localStorage.getItem(pollKey));
  const [pollVotes] = useState({ a: Math.floor(Math.random() * 200 + 100), b: Math.floor(Math.random() * 200 + 100) });

  const handleVote = (choice: string) => {
    if (pollVote) return;
    setPollVote(choice);
    localStorage.setItem(pollKey, choice);
    addPoints(3, 'Voted in daily poll');
    toast.success('Thanks for voting! +3pts 🗳️');
  };

  // Surprise Me
  const [surpriseFood, setSurpriseFood] = useState<typeof foodData[0] | null>(null);
  const [surpriseOpen, setSurpriseOpen] = useState(false);
  const handleSurprise = () => {
    const random = foodData[Math.floor(Math.random() * foodData.length)];
    setSurpriseFood(random);
    setSurpriseOpen(true);
  };

  const totalA = pollVote ? pollVotes.a + (pollVote === 'a' ? 1 : 0) : pollVotes.a;
  const totalB = pollVote ? pollVotes.b + (pollVote === 'b' ? 1 : 0) : pollVotes.b;
  const total  = totalA + totalB;
  const pctA   = Math.round((totalA / total) * 100);
  const pctB   = 100 - pctA;


  return (
    <div className="min-h-screen">
        {/* ===== HERO ===== */}
        <section className="relative overflow-hidden bg-gradient-to-br from-primary-800 via-primary-700 to-green-600 text-white py-20 px-4">
            {/* Decorative circles */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-48 translate-x-48" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-32 -translate-x-32" />

                  <div className="relative max-w-4xl mx-auto text-center">
                  <div className="text-6xl mb-4 animate-float">🥗</div>
                  <h1 className="text-5xl md:text-7xl font-black font-display leading-none mb-4">
                      Eat Healthy,<br /><span className="text-primary-200">Live Well.</span>
                  </h1>
                  <p className="text-primary-100 text-lg md:text-xl max-w-xl mx-auto mb-8 leading-relaxed">
                      Discover the best foods for your body at every stage of life. Earn streaks, collect badges, and level up your nutrition!
                  </p>
              </div>

        {/* Age selector chips */}
        <div className="flex flex-wrap gap-3 justify-center mb-8">
            {ageGroups.map(ag => (
              <button key={ag} onClick={() => setSelectedAge(ag)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl font-bold text-sm transition-all duration-200
                  ${selectedAge === ag ? 'bg-white text-primary-700 shadow-lg scale-105' : 'bg-white/20 text-white hover:bg-white/30'}`}>
                <span>{ageInfo[ag].icon}</span>
                <span>{ag} yrs</span>
              </button>
            ))}
        </div>

        <div className="bg-white/10 rounded-2xl p-4 max-w-md mx-auto mb-8 text-sm text-primary-100">
            <span className="font-bold text-white">{ageInfo[selectedAge].icon} {selectedAge} years tip:</span>
            <span className="ml-2">{ageInfo[selectedAge].tip}</span>
        </div>

        <div className="flex flex-wrap gap-4 justify-center">
            <Button onClick={() => navigate('/menu')} variant="secondary" size="lg">
              🍽️ Explore Menu
            </Button>
            <button onClick={handleSurprise}
              className="px-7 py-3.5 bg-accent-orange hover:bg-orange-600 text-white font-bold text-lg rounded-xl transition-all active:scale-95 shadow-md animate-pulse-slow">
              🎲 Surprise Me!
            </button>
          </div>
      </section>


    {/* ===== WHAT YOU'LL FIND ===== */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-4xl font-black text-center font-display text-gray-800 mb-2">What You'll Find Here</h2>
        <p className="text-center text-gray-500 mb-10">Everything you need for a healthier life</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { emoji: '🧑‍⚕️', title: 'Expert Advice',    color: '#E8F5E9', desc: 'Tips from top nutritionists. Dietary guidelines and myth-busting, all in one place.' },
            { emoji: '📅', title: 'Meal Plans',        color: '#E3F2FD', desc: 'Tailored plans for weight loss, muscle gain, or just staying healthy every day.' },
            { emoji: '🛒', title: 'Shopping Guides',   color: '#FFF8E1', desc: 'Navigate grocery stores with expert-approved guides for fresh, healthy picks.' },
            { emoji: '👨‍🍳', title: 'Healthy Recipes',  color: '#FCE4EC', desc: 'A treasure trove of delicious recipes that are easy to make and full of flavor.' },
            { emoji: '🏆', title: 'Earn Rewards',      color: '#F3E5F5', desc: 'Earn points, unlock badges and level up your health game every single day.' },
            { emoji: '👥', title: 'Join Community',    color: '#FBE9E7', desc: 'Connect with others on the same journey. Share recipes, tips and motivation.' },
          ].map(card => (
            <div key={card.title} className="rounded-2xl p-6 hover:shadow-card transition-all duration-200 hover:-translate-y-1 cursor-default border border-white"
              style={{ backgroundColor: card.color }}>
              <div className="text-4xl mb-3">{card.emoji}</div>
              <h3 className="text-xl font-bold font-display text-gray-800 mb-2">{card.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{card.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== RECIPE CATEGORIES ===== */}
      <section className="bg-primary-50 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-black text-center font-display text-gray-800 mb-2">Explore Food Categories</h2>
          <p className="text-center text-gray-500 mb-10">Tap any category to start exploring</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {CATEGORIES.map(cat => (
              <button key={cat.label} onClick={() => navigate('/menu')}
                className="bg-white rounded-2xl p-6 text-center hover:shadow-card-hover transition-all duration-200 hover:-translate-y-2 border border-primary-100 group">
                <div className="text-5xl mb-3 group-hover:animate-bounce">{cat.emoji}</div>
                <h3 className="font-bold text-gray-700 font-display">{cat.label}</h3>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ===== DAILY POLL ===== */}
      <section className="max-w-2xl mx-auto px-4 py-16">
        <div className="bg-gradient-to-br from-primary-600 to-green-500 rounded-3xl p-8 text-white shadow-xl">
          <div className="text-center mb-6">
            <span className="text-xs font-bold uppercase tracking-widest text-primary-200">Daily Poll • Vote & Earn 3pts</span>
            <h2 className="text-2xl font-black font-display mt-2">{poll.question}</h2>
          </div>

          {!pollVote ? (
            <div className="grid grid-cols-2 gap-4">
              {(['a' as const, 'b' as const]).map(key => {
                      const opt = key === 'a' ? poll.a : poll.b;
              return (
                <button key={key} onClick={() => handleVote(key)}
                  className="bg-white/15 hover:bg-white/25 border-2 border-white/30 rounded-2xl p-5 text-center transition-all hover:scale-105 active:scale-95">
                  <p className="text-xl font-bold">{opt.label}</p>
                  <p className="text-xs text-primary-100 mt-1">{opt.tip}</p>
                </button>
              );
})}              
            </div>
          ) : (
            <div className="space-y-4">
              {[['a', poll.a.label, pctA], ['b', poll.b.label, pctB]].map(([key, label, pct]) => (
                <div key={key} className={`rounded-xl overflow-hidden border-2 ${pollVote === key ? 'border-white' : 'border-white/30'}`}>
                  <div className="bg-white/15 px-4 py-2 flex justify-between text-sm font-semibold">
                    <span>{label} {pollVote === key && '✓'}</span>
                    <span>{pct}%</span>
                  </div>
                  <div className="bg-white/10 h-3">
                    <div className="bg-white/60 h-full transition-all duration-1000" style={{ width: `${pct}%` }} />
                  </div>
                </div>
              ))}
              <p className="text-center text-primary-100 text-sm">+3pts added to your account! 🎉</p>
            </div>
          )}
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className="max-w-5xl mx-auto px-4 pb-16">
        <h2 className="text-4xl font-black text-center font-display text-gray-800 mb-10">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {HOW_IT_WORKS.map(step => (
            <div key={step.title} className="text-center p-6 bg-white rounded-2xl shadow-card hover:shadow-card-hover transition-all">
              <div className="text-5xl mb-4">{step.emoji}</div>
              <h3 className="font-bold text-xl font-display text-gray-800 mb-2">{step.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== SURPRISE ME MODAL ===== */}
      <Modal isOpen={surpriseOpen} onClose={() => setSurpriseOpen(false)} title="🎲 Your Surprise Pick!">
        {surpriseFood && (
          <div className="text-center">
            <div className="w-24 h-24 mx-auto rounded-2xl flex items-center justify-center text-6xl mb-4 animate-float"
              style={{ backgroundColor: surpriseFood.color }}>
              {surpriseFood.emoji}
            </div>
            <h3 className="text-2xl font-black font-display text-gray-800">{surpriseFood.name}</h3>
            <span className="inline-block bg-primary-100 text-primary-600 text-sm font-bold px-3 py-1 rounded-full mt-1">{surpriseFood.ageGroup} yrs</span>
            <p className="text-gray-500 text-sm mt-3 leading-relaxed">{surpriseFood.description}</p>
            <div className="grid grid-cols-3 gap-3 my-4">
              {[['🔥', surpriseFood.calories + ' kcal'], ['💪', surpriseFood.protein], ['⭐', surpriseFood.rating]].map(([icon, val]) => (
                <div key={icon} className="bg-primary-50 rounded-xl p-2 text-center">
                  <div className="text-lg">{icon}</div>
                  <div className="text-xs font-bold text-gray-700">{val}</div>
                </div>
              ))}
            </div>
            <div className="flex gap-3">
              <button onClick={() => { addToCart(surpriseFood); setSurpriseOpen(false); toast.success('Added to cart! 🛒'); }}
                className="flex-1 bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 rounded-xl transition-colors">
                🛒 Order This
              </button>
              <button onClick={handleSurprise}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-3 rounded-xl transition-colors">
                🎲 Another One
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}