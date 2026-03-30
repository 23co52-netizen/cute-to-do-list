import { motion } from 'motion/react';
import { useAppStore } from '../hooks/useAppStore';
import { cn } from '../lib/utils';
import { useNavigate } from 'react-router-dom';

export function Dashboard() {
  const { tasks, user } = useAppStore();
  const navigate = useNavigate();
  
  const completedTasks = tasks.filter(t => t.completed);
  const pendingTasks = tasks.filter(t => !t.completed).slice(0, 3);
  const progress = tasks.length > 0 ? Math.round((completedTasks.length / tasks.length) * 100) : 0;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <section className="space-y-1">
        <h2 className="text-3xl font-extrabold tracking-tight">Welcome back!</h2>
        <p className="text-on-surface-variant font-medium">Let's get things done today! ✨</p>
      </section>

      <section className="flex justify-center py-4">
        <div className="relative w-64 h-64 flex items-center justify-center rounded-full glass-card neon-glow-tertiary">
          <svg className="absolute inset-0 w-full h-full -rotate-90">
            <circle 
              className="text-surface-container-lowest" 
              cx="128" cy="128" fill="transparent" r="110" 
              stroke="currentColor" strokeWidth="12" 
            />
            <motion.circle 
              initial={{ strokeDashoffset: 691 }}
              animate={{ strokeDashoffset: 691 - (691 * progress) / 100 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="text-tertiary drop-shadow-[0_0_8px_rgba(141,235,255,0.6)]" 
              cx="128" cy="128" fill="transparent" r="110" 
              stroke="currentColor" strokeDasharray="691" 
              strokeLinecap="round" strokeWidth="12" 
            />
          </svg>
          <div className="text-center z-10">
            <span className="block text-5xl font-extrabold tracking-tighter text-on-surface">{progress}%</span>
            <span className="text-xs font-bold uppercase tracking-widest text-tertiary">Tasks Completed</span>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-xl font-bold text-on-surface">Pending Tasks</h3>
          <button 
            onClick={() => navigate('/tasks')}
            className="text-sm font-bold text-primary"
          >
            View All
          </button>
        </div>
        
        <div className="grid gap-4">
          {pendingTasks.length > 0 ? (
            pendingTasks.map((task) => (
              <div 
                key={task.id}
                className="glass-card p-5 rounded-lg flex items-center gap-4 group hover:bg-surface-bright transition-all duration-300"
              >
                <div className="w-6 h-6 rounded-full border-2 border-primary/40 flex items-center justify-center group-hover:border-primary transition-colors">
                  <div className="w-3 h-3 rounded-full bg-primary scale-0 group-hover:scale-100 transition-transform" />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-on-surface">{task.title}</h4>
                  <p className="text-xs font-medium text-on-surface-variant">Due {new Date(task.dueDate).toLocaleDateString()}</p>
                </div>
                <span className={cn(
                  "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
                  task.priority === 'high' ? "bg-error-container/80 text-on-error" : 
                  task.priority === 'med' ? "bg-secondary/20 text-secondary" : 
                  "bg-tertiary/20 text-tertiary"
                )}>
                  {task.priority}
                </span>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-on-surface-variant">
              No pending tasks! Time to relax? 🍵
            </div>
          )}
        </div>
      </section>
    </motion.div>
  );
}
