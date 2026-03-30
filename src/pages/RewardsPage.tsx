import { motion } from 'motion/react';
import { useAppStore } from '../hooks/useAppStore';
import { cn } from '../lib/utils';
import { Star, Cloud, Trophy, Heart, Rocket, Layers, Smile, Leaf, Moon, Diamond, PawPrint, Zap, Sparkles } from 'lucide-react';

const iconMap: Record<string, any> = {
  star: Star,
  cloud: Cloud,
  military_tech: Trophy,
  favorite: Heart,
  rocket_launch: Rocket,
  auto_awesome_motion: Layers,
  mood: Smile,
  eco: Leaf,
  nightlight: Moon,
  diamond: Diamond,
  pets: PawPrint,
  bolt: Zap,
};

export function RewardsPage() {
  const { rewards, tasks } = useAppStore();
  
  const completedCount = tasks.filter(t => t.completed).length;
  const progress = Math.min(100, Math.round((completedCount / 24) * 100));
  const unlockedCount = rewards.filter(r => r.unlocked).length;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <section className="space-y-2">
        <h2 className="text-3xl font-extrabold tracking-tight text-on-surface">Your Achievements 🏆</h2>
        <p className="text-on-secondary-fixed-variant font-medium">Keep going! You're doing amazing.</p>
      </section>

      <div className="glass-card p-6 rounded-xl border border-outline-variant/10 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <Sparkles size={64} className="text-primary" />
        </div>
        <div className="relative z-10 flex flex-col gap-4">
          <div className="flex justify-between items-end">
            <div>
              <p className="text-sm font-bold uppercase tracking-widest text-primary/80 mb-1">Sticker Streak</p>
              <h3 className="text-2xl font-bold text-on-surface">Next sticker unlocks in 3 tasks!</h3>
            </div>
            <div className="text-right">
              <span className="text-4xl font-black text-primary">{progress}%</span>
            </div>
          </div>
          <div className="w-full h-4 bg-surface-container-lowest rounded-full p-1">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-primary to-primary-container rounded-full shadow-[0_0_12px_rgba(255,133,201,0.4)]" 
            />
          </div>
        </div>
      </div>

      <section>
        <div className="flex items-center justify-between mb-6">
          <h4 className="font-bold text-lg text-on-surface">Sticker Collection</h4>
          <span className="text-xs font-bold px-3 py-1 bg-surface-container-high rounded-full text-on-surface-variant">
            {unlockedCount} / {rewards.length} UNLOCKED
          </span>
        </div>
        
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
          {rewards.map((reward) => {
            const Icon = iconMap[reward.icon] || Star;
            return (
              <motion.div 
                key={reward.id}
                whileHover={reward.unlocked ? { scale: 1.05 } : {}}
                className={cn(
                  "aspect-square glass-card rounded-lg flex flex-col items-center justify-center gap-2 transition-all duration-300",
                  reward.unlocked ? "cursor-pointer hover:bg-surface-bright" : "opacity-40 grayscale"
                )}
              >
                <div className={cn(
                  "w-16 h-16 rounded-full flex items-center justify-center",
                  reward.unlocked ? "bg-primary/10 shadow-[0_0_15px_rgba(255,133,201,0.2)]" : "bg-surface-container-lowest"
                )}>
                  <Icon 
                    size={32} 
                    className={reward.unlocked ? "text-primary" : "text-outline"} 
                    fill={reward.unlocked ? "currentColor" : "none"}
                  />
                </div>
                <span className={cn(
                  "text-[10px] font-bold uppercase tracking-tighter text-center px-1",
                  reward.unlocked ? "text-on-surface" : "text-outline"
                )}>
                  {reward.title}
                </span>
              </motion.div>
            );
          })}
        </div>
      </section>

      <section className="space-y-4">
        <h4 className="font-bold text-lg text-on-surface">Recent Milestones</h4>
        <div className="grid grid-cols-2 gap-4">
          <div className="glass-card p-5 rounded-lg flex flex-col justify-between min-h-[140px] border border-outline-variant/10">
            <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center mb-2">
              <Zap size={20} className="text-secondary" />
            </div>
            <div>
              <h5 className="font-bold text-on-surface">100 Tasks Done</h5>
              <p className="text-xs text-on-surface-variant mt-1">Achieved recently</p>
            </div>
          </div>
          <div className="glass-card p-5 rounded-lg flex flex-col justify-between min-h-[140px] border border-outline-variant/10">
            <div className="w-10 h-10 rounded-full bg-tertiary/20 flex items-center justify-center mb-2">
              <Sparkles size={20} className="text-tertiary" />
            </div>
            <div>
              <h5 className="font-bold text-on-surface">7 Day Streak</h5>
              <p className="text-xs text-on-surface-variant mt-1">Keep it glowing!</p>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
