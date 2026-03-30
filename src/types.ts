export type Priority = 'low' | 'med' | 'high';
export type Category = 'Work' | 'Personal' | 'Self-Care' | 'Health' | 'Fun';

export interface Task {
  id: string;
  title: string;
  dueDate: string;
  category: Category;
  priority: Priority;
  completed: boolean;
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  username: string;
  avatar: string;
  joinedAt: string;
  preferences: {
    darkMode: boolean;
    pastelPalette: string;
    notifications: boolean;
  };
}

export interface Reward {
  id: string;
  title: string;
  icon: string;
  unlocked: boolean;
  description: string;
  color: string;
}

export interface AppState {
  tasks: Task[];
  user: User | null;
  rewards: Reward[];
}
