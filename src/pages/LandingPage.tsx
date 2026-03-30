import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, CheckCircle, Trophy, Heart } from 'lucide-react';

export function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background text-on-surface flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/20 blur-[120px] rounded-full" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-[440px] flex flex-col items-center z-10"
      >
        <div className="relative w-full aspect-square max-w-[280px] mb-8">
          <div className="absolute inset-0 bg-primary/20 blur-[60px] rounded-full scale-75 translate-y-4" />
          <div className="relative z-10 w-full h-full flex items-center justify-center">
            <img 
              src="https://picsum.photos/seed/cute/400" 
              alt="Cute Character" 
              className="w-full h-full object-contain drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)] rounded-3xl"
            />
          </div>
        </div>

        <header className="text-center mb-10">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tighter text-on-surface drop-shadow-[0_0_20px_rgba(255,133,201,0.4)] mb-2">
            Welcome!
          </h1>
          <p className="text-on-surface-variant font-medium tracking-wide">Your neon to-do list awaits.</p>
        </header>

        <section className="w-full space-y-6">
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: CheckCircle, label: 'Tasks', color: 'text-primary' },
              { icon: Trophy, label: 'Rewards', color: 'text-secondary' },
              { icon: Heart, label: 'Self-Care', color: 'text-tertiary' },
              { icon: Sparkles, label: 'Magic', color: 'text-primary' },
            ].map((item, i) => (
              <motion.div 
                key={item.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                className="glass-card p-4 rounded-2xl flex flex-col items-center gap-2"
              >
                <item.icon className={item.color} size={24} />
                <span className="text-[10px] font-bold uppercase tracking-widest">{item.label}</span>
              </motion.div>
            ))}
          </div>

          <div className="pt-4">
            <button 
              onClick={() => navigate('/dashboard')}
              className="w-full h-16 bg-gradient-to-r from-primary to-primary-container text-on-primary font-bold text-lg rounded-full shadow-[0_10px_30px_rgba(255,133,201,0.3)] active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              Start Planning
              <Sparkles size={20} />
            </button>
          </div>

          <p className="text-center text-on-surface-variant/80 text-sm">
            Organize your life with a touch of magic.
          </p>
        </section>
      </motion.div>
    </div>
  );
}
