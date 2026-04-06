interface StreakCounterProps {
  streak: number;
  longest: number;
}

export default function StreakCounter({ streak, longest }: StreakCounterProps) {
  const days = ['S','M','T','W','T','F','S'];
  const today = new Date().getDay();

  return (
    <div className="bg-gradient-to-br from-orange-50 to-red-50 border border-orange-100 rounded-2xl p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-sm font-semibold text-orange-400 uppercase tracking-wide">Current Streak</p>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-5xl font-black text-orange-500 streak-glow">🔥</span>
            <span className="text-5xl font-black text-orange-600">{streak}</span>
            <span className="text-lg font-semibold text-orange-400">days</span>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-400">Longest</p>
          <p className="text-2xl font-black text-orange-300">🏅 {longest}</p>
        </div>
      </div>

      <div className="flex gap-2 justify-center mt-2">
        {days.map((day, i) => {
          const isPast = i < today;
          const isToday = i === today;
          const isFilled = streak > 0 && (isToday || (isPast && i >= today - streak + 1));
          return (
            <div key={i} className="flex flex-col items-center gap-1">
              <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all
                ${isToday ? 'border-orange-500 bg-orange-500 text-white scale-110 shadow-md' :
                  isFilled ? 'border-orange-300 bg-orange-200 text-orange-600' :
                  'border-gray-200 bg-gray-50 text-gray-400'}`}>
                {isFilled ? '🔥' : day}
              </div>
              <span className="text-xs text-gray-400">{day}</span>
            </div>
          );
        })}
      </div>

      {streak === 0 && (
        <p className="text-center text-sm text-orange-400 mt-3 font-medium">Place an order today to start your streak! 🚀</p>
      )}
      {streak > 0 && streak < 7 && (
        <p className="text-center text-sm text-orange-500 mt-3 font-medium">
          {7 - streak} more days to earn the 🔥 7-Day Streak badge!
        </p>
      )}
      {streak >= 7 && (
        <p className="text-center text-sm text-orange-600 mt-3 font-bold">
          🏆 You're on FIRE! Incredible streak!
        </p>
      )}
    </div>
  );
}
