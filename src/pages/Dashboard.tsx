import { useState } from 'react';
import { useUser } from '../hooks/useUser';
import { badgesData } from '../data/badgesData';
import StreakCounter from '../components/gamification/StreakCounter';
import LevelBar from '../components/gamification/LevelBar';
import BadgeCard from '../components/gamification/BadgeCard';

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default function Dashboard() {
  const { userName, setUserName, totalPoints, levelInfo, currentStreak, longestStreak, earnedBadges, pointsHistory, weeklyOrders, totalOrders } = useUser();
  const [editingName, setEditingName] = useState(false);
  const [tempName, setTempName] = useState(userName);

  const maxOrders = Math.max(...weeklyOrders, 1);

  return (
    <>
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Profile Header */}
        <div className="bg-gradient-to-br from-primary-700 to-green-600 text-white rounded-3xl p-8 flex flex-col md:flex-row items-center gap-6">
          <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center text-4xl font-black border-4 border-white/40">
            {userName[0]?.toUpperCase()}
          </div>
          <div className="flex-1 text-center md:text-left">
            {editingName ? (
              <div className="flex items-center gap-2 justify-center md:justify-start">
                <input value={tempName} onChange={e => setTempName(e.target.value)}
                  className="bg-white/20 text-white placeholder-white/60 border border-white/40 rounded-lg px-3 py-1.5 font-bold text-xl focus:outline-none"
                  autoFocus />
                <button type="button" onClick={() => { setUserName(tempName); setEditingName(false); }} className="bg-white text-primary-700 font-bold px-3 py-1.5 rounded-lg text-sm hover:bg-primary-50">Save</button>
                <button type="button" onClick={() => setEditingName(false)} className="text-white/70 hover:text-white text-sm">Cancel</button>
              </div>
            ) : (
              <div className="flex items-center gap-2 justify-center md:justify-start">
                <h1 className="text-3xl font-black font-display">{userName}</h1>
                <button type="button" onClick={() => setEditingName(true)} className="text-white/70 hover:text-white text-xl">✏️</button>
              </div>
            )}
            <p className="text-primary-100 mt-1">{levelInfo.emoji} {levelInfo.name} • {totalOrders} orders placed</p>
          </div>
          <div className="grid grid-cols-2 gap-3 text-center">
            {[['🏆', totalPoints, 'Total Points'], ['🔥', currentStreak, 'Day Streak']].map(([emoji, val, label]) => (
              <div key={label} className="bg-white/15 rounded-2xl p-3">
                <div className="text-2xl">{emoji}</div>
                <div className="text-2xl font-black">{val}</div>
                <div className="text-xs text-primary-200">{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Streak + Level side by side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <StreakCounter streak={currentStreak} longest={longestStreak} />
          <LevelBar points={totalPoints} levelInfo={levelInfo} />
        </div>

        {/* Weekly Chart */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-6">
          <h2 className="text-2xl font-black font-display text-gray-800 mb-5">📊 This Week's Orders</h2>
          <div className="flex items-end gap-3 h-32">
            {weeklyOrders.map((count, i) => {
              const today = new Date().getDay();
              const isToday = i === today;
              const height = count > 0 ? Math.max((count / maxOrders) * 100, 15) : 8;
              return (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <span className="text-xs font-bold text-gray-500">{count > 0 ? count : ''}</span>
                  <div className="w-full rounded-t-lg transition-all duration-700"
                    style={{ height: `${height}%`, backgroundColor: isToday ? '#16a34a' : count > 0 ? '#86efac' : '#e5e7eb' }} />
                  <span className={`text-xs font-bold ${isToday ? 'text-primary-600' : 'text-gray-400'}`}>{DAYS[i]}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Badges */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-2xl font-black font-display text-gray-800">🏅 My Badges</h2>
            <span className="bg-primary-100 text-primary-600 font-bold px-3 py-1 rounded-full text-sm">{earnedBadges.length}/{badgesData.length}</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {badgesData.map(badge => (
              <BadgeCard key={badge.id} badge={badge} earned={earnedBadges.includes(badge.id)} />
            ))}
          </div>
        </div>

        {/* Points History */}
        {(pointsHistory || []).length > 0 && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-6">
            <h2 className="text-2xl font-black font-display text-gray-800 mb-4">📜 Points History</h2>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {(pointsHistory || []).map((entry, i) => (
                <div key={i} className="flex items-center justify-between py-2.5 px-3 bg-primary-50 rounded-xl">
                  <span className="text-sm text-gray-600">{entry.reason}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-400">{entry.date}</span>
                    <span className="font-black text-primary-600">+{entry.pts}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
    </>
  );
}
