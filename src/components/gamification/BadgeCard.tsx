import { Badge } from '../../data/badgesData';

interface BadgeCardProps {
  badge: Badge;
  earned: boolean;
}

export default function BadgeCard({ badge, earned }: BadgeCardProps) {
  return (
    <div className={`relative flex flex-col items-center p-4 rounded-2xl border-2 transition-all duration-200
      ${earned
        ? 'bg-gradient-to-br from-primary-50 to-green-50 border-primary-200 shadow-card hover:shadow-card-hover hover:-translate-y-1'
        : 'bg-gray-50 border-gray-200 opacity-50 grayscale'}`}>
      <div className={`text-4xl mb-2 ${earned ? 'animate-float' : ''}`}>{badge.emoji}</div>
      <p className={`font-bold text-sm text-center font-display ${earned ? 'text-primary-700' : 'text-gray-400'}`}>{badge.name}</p>
      <p className="text-xs text-gray-400 text-center mt-1 leading-tight">{badge.condition}</p>
      {earned && (
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center">
          <span className="text-white text-xs font-bold">✓</span>
        </div>
      )}
    </div>
  );
}
