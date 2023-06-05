import {
  MdOutlineDoneAll,
  MdOutlineFindInPage,
  MdOutlineLock,
  MdOutlineNoteAdd,
  MdOutlineWatchLater,
  MdRemoveCircleOutline
} from '@browserstack/bifrost';

export const STATE_OPTIONS_ALL = [
  {
    label: 'New',
    value: 'new_run',
    Icon: MdOutlineNoteAdd,
    textClass: 'text-base-500',
    iconClass: 'bg-base-400'
  },
  {
    label: 'In progress',
    value: 'in_progress',
    Icon: MdOutlineWatchLater,
    textClass: 'text-base-500',
    iconClass: 'bg-base-400'
  },
  {
    label: 'Under Review',
    value: 'under_review',
    Icon: MdOutlineFindInPage,
    textClass: 'text-base-500',
    iconClass: 'bg-base-400'
  },
  {
    label: 'Rejected',
    value: 'rejected',
    Icon: MdRemoveCircleOutline,
    textClass: 'text-danger-800',
    iconClass: 'bg-danger-700'
  },
  {
    label: 'Done',
    value: 'done',
    Icon: MdOutlineDoneAll,
    textClass: 'text-success-700',
    iconClass: 'bg-success-600'
  },
  {
    label: 'Closed',
    value: 'closed',
    Icon: MdOutlineLock,
    textClass: 'text-attention-600',
    iconClass: 'bg-attention-500'
  }
];

export const STATE_OPTIONS_NEW = [
  { label: 'New', value: 'new_run' },
  { label: 'In progress', value: 'in_progress' },
  { label: 'Under Review', value: 'under_review' },
  { label: 'Rejected', value: 'rejected' },
  { label: 'Done', value: 'done' }
];
