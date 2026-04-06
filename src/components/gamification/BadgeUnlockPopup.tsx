import { useEffect, useState } from 'react';
import Button from '../ui/Button';
import { Badge } from '../../data/badgesData';

interface Particle {
  id: number;
  left: number;
  delay: number;
  color: string;
  size: number;
  isCircle: boolean;
}

interface BadgeUnlockPopupProps {
  badge: Badge;
  onClose: () => void;
}

export default function BadgeUnlockPopup({ badge, onClose }: BadgeUnlockPopupProps) {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const p: Particle[] = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 0.5,
      color: ['#22c55e','#4ade80','#f97316','#eab308','#ef4444','#3b82f6'][Math.floor(Math.random() * 6)],
      size: Math.random() * 10 + 6,
      isCircle: Math.random() > 0.5,
    }));
    setParticles(p);
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
      {particles.map(p => (
        <div key={p.id} className="absolute top-0 animate-[fall_2s_ease-in_forwards] opacity-0"
          style={{
            left: `${p.left}%`,
            animationDelay: `${p.delay}s`,
            width: p.size, height: p.size,
            backgroundColor: p.color,
            borderRadius: p.isCircle ? '50%' : '0',
          }}
        />
      ))}

      <div className="pointer-events-auto bg-white rounded-3xl shadow-2xl p-8 text-center max-w-xs mx-4 border-4 border-primary-400 animate-bounce-in">
        <p className="text-primary-500 font-bold text-sm uppercase tracking-widest mb-2">🎉 Badge Unlocked!</p>
        <div className="text-7xl my-4">{badge.emoji}</div>
        <h3 className="text-2xl font-black text-gray-800 font-display">{badge.name}</h3>
        <p className="text-gray-500 text-sm mt-2 mb-5">{badge.description}</p>
        <Button onClick={onClose} variant="primary" className="w-full">Awesome! 🚀</Button>
      </div>

      <style>{`
        @keyframes fall {
          0% { transform: translateY(-20px) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
