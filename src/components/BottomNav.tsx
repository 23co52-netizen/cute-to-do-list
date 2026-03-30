import { NavLink } from 'react-router-dom';
import { Home, CheckCircle, Trophy, Settings } from 'lucide-react';
import { cn } from '../lib/utils';

export function BottomNav() {
  const navItems = [
    { icon: Home, label: 'Home', path: '/dashboard' },
    { icon: CheckCircle, label: 'Tasks', path: '/tasks' },
    { icon: Trophy, label: 'Rewards', path: '/rewards' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  return (
    <nav className="fixed bottom-6 left-0 right-0 z-50 flex justify-around items-center h-20 px-4 mx-6 rounded-[3rem] bg-[#25252a]/60 backdrop-blur-2xl shadow-[0_20px_40px_rgba(0,0,0,0.4)]">
      {navItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) =>
            cn(
              "flex flex-col items-center justify-center transition-all duration-300",
              isActive 
                ? "text-primary drop-shadow-[0_0_10px_rgba(255,133,201,0.5)] scale-110" 
                : "text-on-surface/50 hover:text-primary/80"
            )
          }
        >
          {({ isActive }) => (
            <>
              <item.icon size={24} strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-[10px] font-bold uppercase tracking-widest mt-1">
                {item.label}
              </span>
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );
}
