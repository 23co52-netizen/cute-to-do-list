import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useAppStore } from '../hooks/useAppStore';
import { cn } from '../lib/utils';
import { Calendar, Edit2, Trash2, Check, ChevronDown } from 'lucide-react';
import { Category } from '../types';
import { CATEGORIES } from '../constants';

export function TasksPage() {
  const { tasks, toggleTask, deleteTask } = useAppStore();
  const [filter, setFilter] = useState<Category | 'All'>('All');
  const [showCompleted, setShowCompleted] = useState(false);

  const filteredTasks = tasks.filter(t => 
    (filter === 'All' || t.category === filter) && !t.completed
  );

  const completedTasks = tasks.filter(t => 
    (filter === 'All' || t.category === filter) && t.completed
  );

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <section className="space-y-6">
        <div className="flex flex-col gap-1">
          <h2 className="text-3xl font-extrabold tracking-tight text-on-surface">My Tasks</h2>
          <div className="flex items-center gap-3 mt-1">
            <span className="px-3 py-1 rounded-full bg-primary-container/20 text-primary text-xs font-bold uppercase tracking-wider">
              {tasks.filter(t => !t.completed).length} Pending
            </span>
            <span className="px-3 py-1 rounded-full bg-secondary-container/20 text-secondary text-xs font-bold uppercase tracking-wider">
              {tasks.filter(t => t.completed).length} Completed
            </span>
          </div>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          <button 
            onClick={() => setFilter('All')}
            className={cn(
              "px-6 py-2.5 rounded-full font-bold text-sm whitespace-nowrap transition-all duration-300",
              filter === 'All' 
                ? "bg-primary text-on-primary shadow-[0_0_15px_rgba(255,133,201,0.3)]" 
                : "bg-surface-container-high text-on-surface-variant hover:bg-surface-bright"
            )}
          >
            All
          </button>
          {CATEGORIES.map((cat) => (
            <button 
              key={cat}
              onClick={() => setFilter(cat)}
              className={cn(
                "px-6 py-2.5 rounded-full font-bold text-sm whitespace-nowrap transition-all duration-300",
                filter === cat 
                  ? "bg-primary text-on-primary shadow-[0_0_15px_rgba(255,133,201,0.3)]" 
                  : "bg-surface-container-high text-on-surface-variant hover:bg-surface-bright"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-on-secondary-fixed-variant px-2">
          Pending Tasks
        </h3>
        
        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {filteredTasks.map((task) => (
              <motion.div 
                key={task.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="glass-card p-5 rounded-lg flex items-center justify-between group hover:bg-surface-bright transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  <button 
                    onClick={() => toggleTask(task.id)}
                    className="w-6 h-6 rounded-full border-2 border-primary/40 flex items-center justify-center hover:bg-primary/10 transition-colors"
                  >
                    <Check size={14} className="text-primary opacity-0 group-hover:opacity-40" />
                  </button>
                  <div>
                    <h4 className="text-on-surface font-bold text-lg leading-tight">{task.title}</h4>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-xs text-on-secondary-fixed-variant flex items-center gap-1">
                        <Calendar size={12} /> {new Date(task.dueDate).toLocaleDateString()}
                      </span>
                      <span className={cn(
                        "px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider",
                        task.priority === 'high' ? "bg-error-container/20 text-error" : 
                        task.priority === 'med' ? "bg-secondary/20 text-secondary" : 
                        "bg-tertiary/20 text-tertiary"
                      )}>
                        {task.priority}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button className="w-10 h-10 rounded-full flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors">
                    <Edit2 size={18} />
                  </button>
                  <button 
                    onClick={() => deleteTask(task.id)}
                    className="w-10 h-10 rounded-full flex items-center justify-center text-on-surface-variant hover:text-error transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>

      <section className="mt-12">
        <button 
          onClick={() => setShowCompleted(!showCompleted)}
          className="flex items-center justify-between w-full px-2 mb-4 group"
        >
          <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-on-secondary-fixed-variant">
            Completed Tasks
          </h3>
          <ChevronDown 
            size={20} 
            className={cn("text-on-secondary-fixed-variant transition-transform", showCompleted && "rotate-180")} 
          />
        </button>
        
        <AnimatePresence>
          {showCompleted && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="space-y-4 overflow-hidden"
            >
              {completedTasks.map((task) => (
                <div 
                  key={task.id}
                  className="p-5 rounded-lg border border-outline-variant/10 bg-surface-container-low flex items-center justify-between opacity-60"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                      <Check size={14} className="text-on-primary" />
                    </div>
                    <div>
                      <h4 className="text-on-surface font-medium text-lg leading-tight line-through decoration-primary/40">
                        {task.title}
                      </h4>
                      <span className="text-xs text-on-secondary-fixed-variant">
                        Completed {new Date(task.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <button 
                    onClick={() => toggleTask(task.id)}
                    className="px-4 py-1.5 rounded-full border border-outline-variant text-xs font-bold text-on-surface hover:bg-surface-bright transition-colors"
                  >
                    UNDO
                  </button>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </motion.div>
  );
}
