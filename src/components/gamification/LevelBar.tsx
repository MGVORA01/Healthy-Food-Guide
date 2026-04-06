import { levels, Level } from '../../data/badgesData';

interface LevelBarProps {
  points: number;
  levelInfo: Level;
}

export default function LevelBar({ points, levelInfo }: LevelBarProps) {
  const currentLevel = levelInfo;
  const nextLevel = levels.find(l => l.level === currentLevel.level + 1);
  const progress = nextLevel
    ? Math.round(((points - currentLevel.minPoints) / (nextLevel.minPoints - currentLevel.minPoints)) * 100)
    : 100;

  return (
    <div className="bg-gradient-to-br from-primary-50 to-green-50 border border-primary-100 rounded-2xl p-5">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <span className="text-4xl">{currentLevel.emoji}</span>
          <div>
            <p className="text-xs text-primary-400 font-semibold uppercase tracking-wide">Level {currentLevel.level}</p>
            <p className="text-xl font-black text-primary-700 font-display">{currentLevel.name}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-3xl font-black text-primary-600">{points}</p>
          <p className="text-xs text-primary-400">total points</p>
        </div>
      </div>

      <div className="relative h-4 bg-primary-100 rounded-full overflow-hidden">
        <div className="level-bar-fill h-full bg-gradient-to-r from-primary-400 to-primary-600 rounded-full" style={{ width: `${progress}%` }} />
        <span className="absolute right-2 top-0 h-full flex items-center text-xs font-bold text-primary-700">{progress}%</span>
      </div>

      {nextLevel ? (
        <div className="flex justify-between mt-2 text-xs text-gray-400">
          <span>{currentLevel.emoji} {currentLevel.name}</span>
          <span>{nextLevel.minPoints - points} pts to {nextLevel.emoji} {nextLevel.name}</span>
        </div>
      ) : (
        <p className="text-center text-primary-600 font-bold text-sm mt-2">👑 MAX LEVEL REACHED!</p>
      )}

      <div className="flex justify-between mt-4 gap-1">
        {levels.map(l => (
          <div key={l.level} className={`flex-1 text-center py-1 rounded-lg border transition-all ${l.level <= currentLevel.level ? 'bg-primary-100 border-primary-300' : 'bg-gray-50 border-gray-200'}`}>
            <div className="text-lg">{l.emoji}</div>
            <div className="text-xs text-gray-400 hidden md:block">{l.name.split(' ')[0]}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
