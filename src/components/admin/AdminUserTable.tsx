// src/components/admin/AdminUserTable.tsx
import { getLevelInfo } from '../../data/badgesData';
import { User } from '../../hooks/useAuth';

interface AdminUserTableProps {
  users: User[];
}

export default function AdminUserTable({ users }: AdminUserTableProps) {
  if (!users || users.length === 0) {
    return (
      <div className="text-center py-10 text-gray-400">
        <div className="text-5xl mb-2">👥</div>
        <p>No users found</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-gray-800 text-white">
            {['#','Name','Email','Role','Points','Level','Streak','Orders','Badges'].map((h, i) => (
              <th key={h} className={`px-4 py-3 text-left ${i === 0 ? 'rounded-tl-xl' : ''} ${i === 8 ? 'rounded-tr-xl text-center' : ''}`}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => {
            const level = getLevelInfo(user.totalPoints || 0);
            return (
              <tr key={user.id} className={`border-b border-gray-100 hover:bg-primary-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                <td className="px-4 py-3 text-gray-400 font-bold">{index + 1}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center font-bold text-primary-700 text-sm">
                      {user.name?.[0]?.toUpperCase()}
                    </div>
                    <span className="font-semibold text-gray-800">{user.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-gray-500">{user.email}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-bold
                    ${user.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>
                    {user.role === 'admin' ? '👑 Admin' : '👤 User'}
                  </span>
                </td>
                <td className="px-4 py-3 font-black text-primary-600">{user.totalPoints || 0}</td>
                <td className="px-4 py-3">{level.emoji} {level.name}</td>
                <td className="px-4 py-3">🔥 {user.currentStreak || 0}</td>
                <td className="px-4 py-3 text-gray-600">{user.totalOrders || 0}</td>
                <td className="px-4 py-3 text-center">
                  <span className="bg-yellow-100 text-yellow-700 font-bold px-2 py-0.5 rounded-full text-xs">
                    🏅 {user.earnedBadges?.length || 0}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
