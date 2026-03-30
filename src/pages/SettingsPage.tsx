import { motion } from 'motion/react';
import { useAppStore } from '../hooks/useAppStore';
import { Camera, Moon, Bell, Info, ChevronRight } from 'lucide-react';

export function SettingsPage() {
  const { user, setUser } = useAppStore();

  if (!user) return null;

  const toggleDarkMode = () => {
    setUser({
      ...user,
      preferences: {
        ...user.preferences,
        darkMode: !user.preferences.darkMode
      }
    });
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <section className="flex flex-col items-center gap-6 p-8 rounded-xl glass-card">
        <div className="relative">
          <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-primary to-secondary p-1">
            <div className="w-full h-full rounded-full overflow-hidden bg-surface-container">
              <img 
                src={user.avatar} 
                alt="User avatar" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="absolute bottom-0 right-0 bg-primary text-on-primary p-2 rounded-full shadow-lg">
            <Camera size={16} />
          </div>
        </div>
        <div className="text-center">
          <h2 className="text-2xl font-bold tracking-tight">My Profile</h2>
          <p className="text-on-surface-variant text-sm font-medium">@{user.username}</p>
        </div>
        <button className="px-8 py-3 bg-gradient-to-r from-primary to-primary-container text-on-primary font-bold rounded-full shadow-[0_0_20px_rgba(255,133,201,0.3)] active:scale-95 transition-all">
          Edit Profile
        </button>
      </section>

      <section className="space-y-4">
        <h3 className="text-xs font-bold text-on-surface-variant tracking-widest uppercase px-2">Appearance</h3>
        <div className="glass-card rounded-xl p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-surface-bright flex items-center justify-center text-primary">
                <Moon size={20} />
              </div>
              <div>
                <p className="font-semibold">Dark Mode</p>
                <p className="text-xs text-on-surface-variant">Easy on the eyes</p>
              </div>
            </div>
            <button 
              onClick={toggleDarkMode}
              className={`w-14 h-8 rounded-full relative flex items-center px-1 transition-colors duration-300 ${user.preferences.darkMode ? 'bg-primary' : 'bg-surface-container-highest'}`}
            >
              <motion.div 
                animate={{ x: user.preferences.darkMode ? 24 : 0 }}
                className="w-6 h-6 bg-on-primary rounded-full shadow-sm" 
              />
            </button>
          </div>

          <div className="space-y-3">
            <p className="text-sm font-semibold px-1">Pastel Palette</p>
            <div className="flex justify-between gap-2 px-1">
              {['#ff85c9', '#c197fe', '#8debff', '#b2f2bb', '#fff3bf'].map((color) => (
                <button 
                  key={color}
                  className={`w-12 h-12 rounded-full border-4 transition-all ${user.preferences.pastelPalette === color ? 'border-primary ring-4 ring-primary/20 scale-110' : 'border-transparent opacity-60'}`}
                  style={{ backgroundColor: color }}
                  onClick={() => setUser({ ...user, preferences: { ...user.preferences, pastelPalette: color } })}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-xs font-bold text-on-surface-variant tracking-widest uppercase px-2">Preferences</h3>
        <div className="glass-card rounded-xl overflow-hidden">
          <div className="flex items-center justify-between p-5 hover:bg-surface-bright transition-colors cursor-pointer">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-surface-bright flex items-center justify-center text-secondary">
                <Bell size={20} />
              </div>
              <p className="font-semibold">Notifications</p>
            </div>
            <ChevronRight size={20} className="text-on-surface-variant" />
          </div>

          <div className="flex items-center justify-between p-5 hover:bg-surface-bright transition-colors cursor-pointer border-t border-outline-variant/10">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-surface-bright flex items-center justify-center text-tertiary">
                <Info size={20} />
              </div>
              <p className="font-semibold">About</p>
            </div>
            <ChevronRight size={20} className="text-on-surface-variant" />
          </div>
        </div>
      </section>
    </motion.div>
  );
}
