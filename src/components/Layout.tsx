import { Outlet } from 'react-router-dom';
import { BottomNav } from './BottomNav';
import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../hooks/useAppStore';

export function Layout() {
  const navigate = useNavigate();
  const { user } = useAppStore();

  return (
    <div className="min-h-screen bg-background text-on-surface pb-32">
      <header className="fixed top-0 w-full z-50 flex items-center justify-between px-6 h-16 bg-surface/60 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-surface-container-high overflow-hidden">
            <img 
              src={user?.avatar || "https://picsum.photos/seed/alex/100"} 
              alt="Profile" 
              className="w-full h-full object-cover"
            />
          </div>
          <h1 className="font-headline text-xl font-bold tracking-tight text-on-surface">To Do List</h1>
        </div>
        <button 
          onClick={() => navigate('/tasks/new')}
          className="text-on-surface hover:bg-surface-bright transition-colors duration-300 p-2 rounded-full"
        >
          <Plus size={24} />
        </button>
      </header>

      <main className="pt-24 px-6 max-w-2xl mx-auto">
        <Outlet />
      </main>

      <BottomNav />
    </div>
  );
}
