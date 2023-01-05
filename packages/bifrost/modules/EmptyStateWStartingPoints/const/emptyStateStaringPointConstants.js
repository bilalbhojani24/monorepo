import {
  Bars4Icon,
  CalendarIcon,
  ClockIcon,
  PhotoIcon,
  TableCellsIcon,
  ViewColumnsIcon
} from '@heroicons/react/24/outline';

export const LAYOUT_TYPES = ['two-column', 'single-column'];

export const ESSP_DATA = [
  {
    title: 'Create a List',
    description: 'Another to-do system you’ll try but eventually give up on.',
    icon: Bars4Icon,
    background: 'bg-pink-500',
    onClick: (currentItem) => {
      console.log(currentItem);
    }
  },
  {
    title: 'Create a Calendar',
    description: 'Stay on top of your deadlines, or don’t — it’s up to you.',
    icon: CalendarIcon,
    background: 'bg-attention-500',
    onClick: (currentItem) => {
      console.log(currentItem);
    }
  },
  {
    title: 'Create a Gallery',
    description: 'Great for mood boards and inspiration.',
    icon: PhotoIcon,
    background: 'bg-success-500',
    onClick: (currentItem) => {
      console.log(currentItem);
    }
  },
  {
    title: 'Create a Board',
    description: 'Track tasks in different stages of your project.',
    icon: ViewColumnsIcon,
    background: 'bg-brand-500',
    onClick: (currentItem) => {
      console.log(currentItem);
    }
  },
  {
    title: 'Create a Spreadsheet',
    description: 'Lots of numbers and things — good for nerds.',
    icon: TableCellsIcon,
    background: 'bg-indigo-500',
    onClick: (currentItem) => {
      console.log(currentItem);
    }
  },
  {
    title: 'Create a Timeline',
    description: 'Get a birds-eye-view of your procrastination.',
    icon: ClockIcon,
    background: 'bg-purple-500',
    onClick: (currentItem) => {
      console.log(currentItem);
    }
  }
];
