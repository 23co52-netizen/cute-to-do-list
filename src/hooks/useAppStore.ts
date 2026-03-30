import { useState, useEffect } from 'react';
import { Task, User, Reward } from '../types';
import { REWARDS } from '../constants';

export function useAppStore() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem('todolist_tasks');
    return saved ? JSON.parse(saved) : [];
  });

  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('todolist_user');
    return saved ? JSON.parse(saved) : {
      id: '1',
      name: '',
      username: 'glow_getter',
      avatar: 'https://picsum.photos/seed/alex/200',
      joinedAt: new Date().toISOString(),
      preferences: {
        darkMode: true,
        pastelPalette: '#ff85c9',
        notifications: true,
      }
    };
  });

  const [rewards, setRewards] = useState<Reward[]>(() => {
    const saved = localStorage.getItem('todolist_rewards');
    return saved ? JSON.parse(saved) : REWARDS;
  });

  useEffect(() => {
    localStorage.setItem('todolist_tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('todolist_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('todolist_rewards', JSON.stringify(rewards));
  }, [rewards]);

  const addTask = (task: Omit<Task, 'id' | 'completed' | 'createdAt'>) => {
    const newTask: Task = {
      ...task,
      id: crypto.randomUUID(),
      completed: false,
      createdAt: new Date().toISOString(),
    };
    setTasks(prev => [newTask, ...prev]);
  };

  const toggleTask = (id: string) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
    // Check for rewards after completion
    checkRewards();
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  const updateTask = (id: string, updates: Partial<Task>) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, ...updates } : t));
  };

  const checkRewards = () => {
    // Logic to unlock rewards based on tasks
    const completedCount = tasks.filter(t => t.completed).length;
    
    setRewards(prev => prev.map(reward => {
      if (reward.id === 'dreamer' && completedCount >= 5) return { ...reward, unlocked: true };
      if (reward.id === 'champion' && completedCount >= 10) return { ...reward, unlocked: true };
      return reward;
    }));
  };

  return {
    tasks,
    user,
    rewards,
    addTask,
    toggleTask,
    deleteTask,
    updateTask,
    setUser,
  };
}
