import { useState } from 'react';
import { motion } from 'motion/react';
import { useAppStore } from '../hooks/useAppStore';
import { useNavigate } from 'react-router-dom';
import { Calendar, ChevronDown, Sparkles, X } from 'lucide-react';
import { Category, Priority } from '../types';
import { CATEGORIES } from '../constants';
import { cn } from '../lib/utils';

export function AddTaskPage() {
  const { addTask } = useAppStore();
  const navigate = useNavigate();
  
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState(new Date().toISOString().split('T')[0]);
  const [category, setCategory] = useState<Category>('Work');
  const [priority, setPriority] = useState<Priority>('med');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    
    addTask({
      title,
      dueDate,
      category,
      priority,
    });
    
    navigate('/tasks');
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div className="flex items-center justify-between mb-10">
        <div className="text-center flex-1">
          <h2 className="text-3xl font-extrabold tracking-tight mb-2 text-on-surface">Add New Task ✨</h2>
          <p className="text-on-surface-variant text-sm font-medium">Design your next moment of productivity.</p>
        </div>
        <button 
          onClick={() => navigate(-1)}
          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-bright transition-colors text-primary active:scale-95"
        >
          <X size={24} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="space-y-3">
          <label className="block text-sm font-bold text-on-surface-variant ml-2">Task Name</label>
          <input 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-surface-container-highest text-on-surface px-6 py-5 rounded-lg border-none focus:ring-2 focus:ring-primary/40 transition-all duration-300 placeholder:text-outline/50 text-lg font-medium" 
            placeholder="What needs to be done?" 
            type="text"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <label className="block text-sm font-bold text-on-surface-variant ml-2">Due Date</label>
            <div className="relative">
              <input 
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full bg-surface-container-highest text-on-surface px-6 py-4 rounded-lg border-none focus:ring-2 focus:ring-primary/40 transition-all duration-300 appearance-none" 
                type="date"
                required
              />
              <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 text-primary pointer-events-none" size={20} />
            </div>
          </div>

          <div className="space-y-3">
            <label className="block text-sm font-bold text-on-surface-variant ml-2">Category</label>
            <div className="relative">
              <select 
                value={category}
                onChange={(e) => setCategory(e.target.value as Category)}
                className="w-full bg-surface-container-highest text-on-surface px-6 py-4 rounded-lg border-none focus:ring-2 focus:ring-primary/40 transition-all duration-300 appearance-none"
              >
                {CATEGORIES.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-primary pointer-events-none" size={20} />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <label className="block text-sm font-bold text-on-surface-variant ml-2">Priority Level</label>
          <div className="flex flex-wrap gap-4">
            {(['high', 'med', 'low'] as Priority[]).map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setPriority(p)}
                className={cn(
                  "flex-1 min-w-[100px] px-4 py-4 rounded-lg flex flex-col items-center justify-center gap-2 border transition-all duration-300 glass-card",
                  priority === p 
                    ? p === 'high' ? "border-error bg-error/10 shadow-[0_0_15px_rgba(255,110,132,0.4)]" :
                      p === 'med' ? "border-secondary bg-secondary/10 shadow-[0_0_15px_rgba(193,151,254,0.4)]" :
                      "border-tertiary bg-tertiary/10 shadow-[0_0_15px_rgba(141,235,255,0.4)]"
                    : "border-transparent"
                )}
              >
                <div className={cn(
                  "w-2 h-2 rounded-full",
                  p === 'high' ? "bg-error" : p === 'med' ? "bg-secondary" : "bg-tertiary"
                )} />
                <span className="text-sm font-bold tracking-wide capitalize">{p}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-xl overflow-hidden h-32 relative group">
          <img 
            src="https://picsum.photos/seed/manifest/800/200" 
            alt="Abstract Glow" 
            className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
            <p className="text-sm font-bold tracking-[0.2em] text-on-surface/80 uppercase">Manifest your goals</p>
          </div>
        </div>

        <div className="flex flex-col gap-4 pt-4">
          <button 
            type="submit"
            className="w-full bg-gradient-to-r from-primary to-primary-container py-5 rounded-full text-on-primary font-extrabold text-lg shadow-[0_10px_30px_rgba(255,133,201,0.4)] hover:shadow-[0_15px_40px_rgba(255,133,201,0.6)] active:scale-95 transition-all duration-300 flex items-center justify-center gap-3"
          >
            Add to List
            <Sparkles size={20} />
          </button>
          <button 
            type="button"
            onClick={() => navigate(-1)}
            className="w-full py-4 rounded-full text-on-surface-variant font-bold hover:text-on-surface hover:bg-surface-bright transition-all duration-300"
          >
            Cancel
          </button>
        </div>
      </form>
    </motion.div>
  );
}
