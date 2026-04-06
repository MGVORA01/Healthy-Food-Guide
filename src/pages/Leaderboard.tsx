
import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import LeaderboardRow from '../components/gamification/LeaderboardRow';
import { API } from '../api/api';


export default function Leaderboard() {
  // const { totalPoints, currentStreak } = useUser();
  const { currentUser } = useAuth();
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUsers();
  }, [currentUser?.totalPoints]);

  const loadUsers = async () => {
    try {
      const res = await fetch(`${API}/users`);
      const data = await res.json();

      // Sort by highest points
      setUsers(
        data.sort(
          (a: any, b: any) => (b.totalPoints || 0) - (a.totalPoints || 0)
        )
      );
    } catch {
      console.error('Failed to load leaderboard');
    } finally {
      setLoading(false);
    }
  };

  const myRank =
    users.findIndex((u) => u.id === currentUser?.id) + 1;

  const medals = ['🥇', '🥈', '🥉'];
  const top3 = users.slice(0, 3);

  return (
    <>
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">

        <div className="text-center mb-8">
          <h1 className="text-4xl font-black font-display text-gray-800 mb-2">
            🏆 Leaderboard
          </h1>
          <p className="text-gray-500">Top healthy eaters</p>

          {currentUser && myRank > 0 && (
            <div className="inline-block bg-primary-100 text-primary-700 font-bold px-4 py-2 rounded-2xl mt-3 text-sm">
              Your Rank: #{myRank} {myRank <= 3 ? medals[myRank - 1] : ''}
            </div>
          )}
        </div>

        {loading ? (
          <div className="text-center py-20">
            <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mx-auto mb-3" />
            <p className="text-gray-400">Loading rankings...</p>
          </div>
        ) : (
          <>
            {/* Top 3 Podium */}
            {top3.length >= 3 && (
              <div className="flex items-end justify-center gap-4 mb-8 h-40">
                {[top3[1], top3[0], top3[2]].map((user, i) => {
                  const realRank = [2, 1, 3][i];
                  const heights = ['h-24', 'h-36', 'h-20'];
                  const colors = [
                    'bg-gray-100',
                    'bg-yellow-100',
                    'bg-orange-100',
                  ];

                  return (
                    <div
                      key={i}
                      className={`flex-1 ${colors[i]} rounded-t-2xl flex flex-col items-center justify-end pb-3 ${heights[i]} border-2 border-white shadow-card`}
                    >
                      <span className="text-3xl">
                        {medals[realRank - 1]}
                      </span>
                      <p className="text-xs font-bold text-gray-700 truncate w-full text-center px-1">
                        {user.name?.split(' ')[0]}
                      </p>
                      <p className="text-xs font-black text-gray-600">
                        {user.totalPoints || 0}pts
                      </p>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Full Ranking List */}
            <div className="space-y-2">
              {users.map((user, i) => (
                <LeaderboardRow
                  key={user.id}
                  rank={i + 1}
                  user={user}
                  isCurrentUser={user.id === currentUser?.id}
                />
              ))}
            </div>

            {users.length === 0 && (
              <div className="text-center py-20 text-gray-400">
                <div className="text-6xl mb-3">🏆</div>
                <p>No users yet. Register and be first!</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
    </>
  );
}