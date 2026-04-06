import { getLevelInfo } from '../../data/badgesData';

interface LeaderboardUser {
  id: string;
  name: string;
  totalPoints?: number;
  points?: number;
  currentStreak?: number;
  streak?: number;
}

interface LeaderboardRowProps {
  rank: number;
  user: LeaderboardUser;
  isCurrentUser: boolean;
}

export default function LeaderboardRow({
  rank,
  user,
  isCurrentUser,
}: LeaderboardRowProps) {
  const pts = user.totalPoints ?? user.points ?? 0;
  const levelInfo = getLevelInfo(pts);

  const medals: Record<number, string> = {
    1: '🥇',
    2: '🥈',
    3: '🥉',
  };

  return (
    <div
      className={`flex items-center gap-4 p-4 rounded-2xl transition-all
      ${
        isCurrentUser
          ? 'bg-primary-50 border-2 border-primary-400 shadow-md'
          : 'bg-white border border-gray-100 hover:shadow-card'
      }`}
    >
      <div className="w-10 text-center">
        {rank <= 3 ? (
          <span className="text-2xl">{medals[rank]}</span>
        ) : (
          <span className="text-lg font-black text-gray-400">
            #{rank}
          </span>
        )}
      </div>

      <div className="w-10 h-10 bg-gradient-to-br from-primary-100 to-green-100 rounded-full flex items-center justify-center text-xl font-bold border-2 border-primary-200">
        {user.name[0].toUpperCase()}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p
            className={`font-bold truncate ${
              isCurrentUser
                ? 'text-primary-700'
                : 'text-gray-700'
            }`}
          >
            {user.name} {isCurrentUser && '(You)'}
          </p>
          <span className="text-sm">{levelInfo.emoji}</span>
        </div>

        <p className="text-xs text-gray-400">
          {levelInfo.name} • 🔥{' '}
          {user.currentStreak ?? user.streak ?? 0} day streak
        </p>
      </div>

      <div className="text-right">
        <p className="font-black text-primary-600 text-lg">
          {pts}
        </p>
        <p className="text-xs text-gray-400">points</p>
      </div>
    </div>
  );
}