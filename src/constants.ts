import { Reward, Category } from './types';

export const CATEGORIES: Category[] = ['Work', 'Personal', 'Self-Care', 'Health', 'Fun'];

export const REWARDS: Reward[] = [
  {
    id: 'early-bird',
    title: 'Early Bird',
    icon: 'star',
    unlocked: true,
    description: 'Completed a task before 9 AM',
    color: '#8debff'
  },
  {
    id: 'dreamer',
    title: 'Dreamer',
    icon: 'cloud',
    unlocked: true,
    description: 'Completed 5 tasks in total',
    color: '#c197fe'
  },
  {
    id: 'champion',
    title: 'Champion',
    icon: 'military_tech',
    unlocked: true,
    description: 'Completed 10 tasks in total',
    color: '#ff85c9'
  },
  {
    id: 'consistent',
    title: 'Consistent',
    icon: 'favorite',
    unlocked: true,
    description: 'Completed tasks for 3 days in a row',
    color: '#ff6e84'
  },
  {
    id: 'explorer',
    title: 'Explorer',
    icon: 'rocket_launch',
    unlocked: false,
    description: 'Completed a task in every category',
    color: '#fd77c4'
  },
  {
    id: 'multitask',
    title: 'Multitask',
    icon: 'auto_awesome_motion',
    unlocked: false,
    description: 'Completed 3 tasks in one day',
    color: '#acaaae'
  },
  {
    id: 'happy-days',
    title: 'Happy Days',
    icon: 'mood',
    unlocked: false,
    description: 'Completed a self-care task',
    color: '#acaaae'
  },
  {
    id: 'zen-mode',
    title: 'Zen Mode',
    icon: 'eco',
    unlocked: false,
    description: 'Completed a task with low priority',
    color: '#acaaae'
  },
  {
    id: 'night-owl',
    title: 'Night Owl',
    icon: 'nightlight',
    unlocked: false,
    description: 'Completed a task after 10 PM',
    color: '#acaaae'
  },
  {
    id: 'precious',
    title: 'Precious',
    icon: 'diamond',
    unlocked: false,
    description: 'Completed a high priority task',
    color: '#acaaae'
  },
  {
    id: 'helper',
    title: 'Helper',
    icon: 'pets',
    unlocked: false,
    description: 'Completed a personal task',
    color: '#acaaae'
  },
  {
    id: 'sonic',
    title: 'Sonic',
    icon: 'bolt',
    unlocked: false,
    description: 'Completed a task within 1 hour of creating it',
    color: '#acaaae'
  }
];

export const THEME_COLORS = {
  primary: '#ff85c9',
  secondary: '#c197fe',
  tertiary: '#8debff',
  background: '#0e0e11',
  surface: '#19191d',
  surfaceHigh: '#1f1f23',
  surfaceBright: '#2c2c30',
  onSurface: '#f0edf1',
  onSurfaceVariant: '#acaaae',
};
