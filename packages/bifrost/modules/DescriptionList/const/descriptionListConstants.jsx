import React from 'react';
import { PaperClipIcon } from '../../Icon';

export const DESCRIPTION_LIST_ALIGNMENT = ['left', 'two-column'];

export const classList = {
  leftAligned: {
    container: 'sm:divide-y sm:divide-base-200',
    itemContainer: 'py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6'
  },
  twoColumned: {
    container: 'grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2',
    itemContainerHalf: 'sm:col-span-1',
    itemConatainerFull: 'sm:col-span-2'
  }
};

const Layout = () => (
  <>
    <ul className="divide-y divide-base-200 rounded-md border border-base-200 sm:col-span-2">
      {attachmentsList.map((attachment) => (
        <li className="flex items-center justify-between py-3 pl-3 pr-4 text-sm">
          <div className="flex w-full flex-1 items-center">
            <PaperClipIcon className="h-5 w-5 flex-shrink-0 text-base-400" aria-hidden="true" />
            <span className="ml-2 w-0 flex-1 truncate">{attachment.name}</span>
          </div>
          <div className="ml-4 flex-shrink-0">
            <a
              href="/"
              className="font-medium text-brand-600 hover:text-brand-500"
              onClick={(e) => e.preventDefault()}
            >
              Download
            </a>
          </div>
        </li>
      ))}
    </ul>
  </>
);

export const descriptionsList = [
  {
    title: 'Full name',
    description: 'Margot Foster'
  },
  {
    title: 'Application for',
    description: 'Backend Developer'
  },
  {
    title: 'Email address',
    description: 'margotfoster@example.com'
  },
  {
    title: 'Salary expectation',
    description: '$120,000'
  },
  {
    title: 'About',
    description:
      'Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim incididunt cillum culpa consequat. Excepteurqui ipsum aliquip consequat sint. Sit id mollit nulla mollit nostrud in ea officia proident. Irure nostrudpariatur mollit ad adipisicing reprehenderit deserunt qui eu.',
    fullWidth: true
  },
  {
    title: 'Attachments',
    description: '',
    Layout: Layout,
    fullWidth: true
  }
];

export const attachmentsList = [
  {
    name: 'resume_back_end_developer.pdf'
  },
  {
    name: 'coverletter_back_end_developer.pdf'
  }
];
