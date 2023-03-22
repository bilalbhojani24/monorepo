import React from 'react';

import DocPageTemplate from '../../.storybook/DocPageTemplate';
import Button from '../Button';
import DescriptionListBody from '../DescriptionListBody';
import DescriptionListHeader from '../DescriptionListHeader';
import DescriptionListItem from '../DescriptionListItem';
import HyperLink from '../Hyperlink';
import { PaperClipIcon } from '../Icon';

import DescriptionList from './index';

const descriptionListData = [
  {
    id: 1,
    label: 'Full name',
    value: 'Margot Foster'
  },
  {
    id: 2,
    label: 'Application for',
    value: 'Backend Developer'
  },
  {
    id: 4,
    label: 'Email address',
    value: 'margotfoster@example.com'
  },
  {
    label: 'Salary expectation',
    value: '$120,000'
  },
  {
    label: 'About',
    value: `Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim
            incididunt cillum culpa consequat. Excepteur qui ipsum aliquip
            consequat sint. Sit id mollit nulla mollit nostrud in ea officia
            proident. Irure nostrud pariatur mollit ad adipisicing reprehenderit
            deserunt qui eu.`
  },
  {
    label: 'Attachments',
    value: (
      <ul className="divide-base-200 border-base-200 divide-y rounded-md border">
        <li className="flex items-center justify-between py-3 pl-3 pr-4 text-sm">
          <div className="flex w-0 flex-1 items-center">
            <PaperClipIcon
              className="text-base-400 h-5 w-5 shrink-0"
              aria-hidden="true"
            />
            <span className="ml-2 w-0 flex-1 truncate">
              resume_back_end_developer.pdf
            </span>
          </div>
          <div className="ml-4 shrink-0">
            <HyperLink wrapperClassName="font-normal">Download</HyperLink>
          </div>
        </li>
        <li className="flex items-center justify-between py-3 pl-3 pr-4 text-sm">
          <div className="flex w-0 flex-1 items-center">
            <PaperClipIcon
              className="text-base-400 h-5 w-5 shrink-0"
              aria-hidden="true"
            />
            <span className="ml-2 w-0 flex-1 truncate">
              coverletter_back_end_developer.pdf
            </span>
          </div>
          <div className="ml-4 shrink-0">
            <HyperLink wrapperClassName="font-normal">Download</HyperLink>
          </div>
        </li>
      </ul>
    )
  }
];

const defaultConfig = {
  title: 'Application/Components/DescriptionList',
  component: DescriptionList,
  subcomponents: {
    DescriptionListBody,
    DescriptionListHeader,
    DescriptionListItem
  },
  parameters: {
    docs: {
      page: () => (
        <DocPageTemplate
          importStatement={
            "import DescriptionList from 'bifrost/DescriptionList'"
          }
        />
      )
    }
  },
  argTypes: {
    children: {
      controls: { type: null },
      defaultValue: null
    },
    wrapperClassName: {
      option: { type: 'string' },
      defaultValue: ''
    }
  },
  controls: {}
};
const Template = (args) => <DescriptionList {...args} />;

const Primary = Template.bind({});

Primary.parameters = {
  controls: {}
};

export default defaultConfig;

export const LeftAlignedInCard = () => (
  <DescriptionList>
    <DescriptionListHeader>
      <h3 className="text-base-900 text-base font-semibold leading-6">
        Applicant Information
      </h3>
      <p className="text-base-500 mt-1 max-w-2xl text-sm">
        Personal details and application.
      </p>
    </DescriptionListHeader>
    <DescriptionListBody>
      {descriptionListData.map((item) => (
        <DescriptionListItem
          key={item.value}
          wrapperClassName="sm:grid sm:grid-cols-3 sm:gap-4"
        >
          <dt className="text-base-500 text-sm font-medium">{item.label}</dt>
          <dd className="text-base-900 mt-1 text-sm sm:col-span-2 sm:mt-0">
            {item.value}
          </dd>
        </DescriptionListItem>
      ))}
    </DescriptionListBody>
  </DescriptionList>
);

export const LeftAlignedStripedInCard = () => (
  <DescriptionList>
    <DescriptionListHeader>
      <h3 className="text-base-900 text-base font-semibold leading-6">
        Applicant Information
      </h3>
      <p className="text-base-500 mt-1 max-w-2xl text-sm">
        Personal details and application.
      </p>
    </DescriptionListHeader>
    <DescriptionListBody>
      {descriptionListData.map((item, index) => (
        <DescriptionListItem
          key={item.value}
          wrapperClassName={`sm:grid sm:grid-cols-3 sm:gap-4 ${
            index % 2 === 0 ? 'bg-base-50' : ''
          }`}
        >
          <dt className="text-base-500 text-sm font-medium">{item.label}</dt>
          <dd className="text-base-900 mt-1 text-sm sm:col-span-2 sm:mt-0">
            {item.value}
          </dd>
        </DescriptionListItem>
      ))}
    </DescriptionListBody>
  </DescriptionList>
);

export const LeftAligned = () => (
  <DescriptionList wrapperClassName="shadow-none sm:rounded-none">
    <DescriptionListHeader>
      <h3 className="text-base-900 text-base font-semibold leading-6">
        Applicant Information
      </h3>
      <p className="text-base-500 mt-1 max-w-2xl text-sm">
        Personal details and application.
      </p>
    </DescriptionListHeader>
    <DescriptionListBody>
      {descriptionListData.map((item) => (
        <DescriptionListItem
          key={item.value}
          wrapperClassName="sm:grid sm:grid-cols-3 sm:gap-4"
        >
          <dt className="text-base-500 text-sm font-medium">{item.label}</dt>
          <dd className="text-base-900 mt-1 text-sm sm:col-span-2 sm:mt-0">
            {item.value}
          </dd>
        </DescriptionListItem>
      ))}
    </DescriptionListBody>
  </DescriptionList>
);

export const LeftAlignedWithInlineActions = () => {
  const ddData = [
    {
      id: 1,
      label: 'Full name',
      value: (
        <dd className="text-base-900 mt-1 flex text-sm sm:col-span-2 sm:mt-0">
          <span className="grow">Margot Foster</span>
          <span className="ml-4 shrink-0">
            <Button variant="minimal">Update</Button>
          </span>
        </dd>
      )
    },
    {
      id: 2,
      label: 'Application for',
      value: (
        <dd className="text-base-900 mt-1 flex text-sm sm:col-span-2 sm:mt-0">
          <span className="grow">Backend Developer</span>
          <span className="ml-4 shrink-0">
            <Button variant="minimal">Update</Button>
          </span>
        </dd>
      )
    },
    {
      id: 4,
      label: 'Email address',
      value: (
        <dd className="text-base-900 mt-1 flex text-sm sm:col-span-2 sm:mt-0">
          <span className="grow">margotfoster@example.com</span>
          <span className="ml-4 shrink-0">
            <Button variant="minimal">Update</Button>
          </span>
        </dd>
      )
    },
    {
      id: 3,
      label: 'Salary expectation',
      value: (
        <dd className="text-base-900 mt-1 flex text-sm sm:col-span-2 sm:mt-0">
          <span className="grow">$120,000</span>
          <span className="ml-4 shrink-0">
            <Button variant="minimal">Update</Button>
          </span>
        </dd>
      )
    },
    {
      id: 5,
      label: 'About',
      value: (
        <dd className="text-base-900 mt-1 flex text-sm sm:col-span-2 sm:mt-0">
          <span className="grow">
            Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim
            incididunt cillum culpa consequat. Excepteur qui ipsum aliquip
            consequat sint. Sit id mollit nulla mollit nostrud in ea officia
            proident. Irure nostrud pariatur mollit ad adipisicing reprehenderit
            deserunt qui eu.
          </span>
          <span className="ml-4 shrink-0">
            <Button variant="minimal">Update</Button>
          </span>
        </dd>
      )
    },
    {
      id: 6,
      label: 'Attachments',
      value: (
        <dd className="text-base-900 mt-1 text-sm sm:col-span-2 sm:mt-0">
          <ul className="divide-base-200 border-base-200 divide-y rounded-md border">
            <li className="flex items-center justify-between py-3 pl-3 pr-4 text-sm">
              <div className="flex w-0 flex-1 items-center">
                <PaperClipIcon
                  className="text-base-400 h-5 w-5 shrink-0"
                  aria-hidden="true"
                />
                <span className="ml-2 w-0 flex-1 truncate">
                  resume_back_end_developer.pdf
                </span>
              </div>
              <div className="ml-4 shrink-0">
                <HyperLink wrapperClassName="font-normal">Download</HyperLink>
              </div>
            </li>
            <li className="flex items-center justify-between py-3 pl-3 pr-4 text-sm">
              <div className="flex w-0 flex-1 items-center">
                <PaperClipIcon
                  className="text-base-400 h-5 w-5 shrink-0"
                  aria-hidden="true"
                />
                <span className="ml-2 w-0 flex-1 truncate">
                  coverletter_back_end_developer.pdf
                </span>
              </div>
              <div className="ml-4 shrink-0">
                <HyperLink wrapperClassName="font-normal">Download</HyperLink>
              </div>
            </li>
          </ul>
        </dd>
      )
    }
  ];
  return (
    <DescriptionList wrapperClassName="shadow-none sm:rounded-none">
      <DescriptionListHeader>
        <h3 className="text-base-900 text-base font-semibold leading-6">
          Applicant Information
        </h3>
        <p className="text-base-500 mt-1 max-w-2xl text-sm">
          Personal details and application.
        </p>
      </DescriptionListHeader>
      <DescriptionListBody>
        {ddData.map((item) => (
          <DescriptionListItem
            key={item.value}
            wrapperClassName="sm:grid sm:grid-cols-3 sm:gap-4"
          >
            <dt className="text-base-500 text-sm font-medium">{item.label}</dt>
            {item.value}
          </DescriptionListItem>
        ))}
      </DescriptionListBody>
    </DescriptionList>
  );
};

export const TwoColumnInCard = () => (
  <DescriptionList>
    <DescriptionListHeader>
      <h3 className="text-base-900 text-base font-semibold leading-6">
        Applicant Information
      </h3>
      <p className="text-base-500 mt-1 max-w-2xl text-sm">
        Personal details and application.
      </p>
    </DescriptionListHeader>
    <DescriptionListBody dataListClassName="grid grid-cols-1 gap-x-4  sm:grid-cols-2 sm:divide-y-0">
      {descriptionListData.map((item, index) => (
        <DescriptionListItem
          key={item.value}
          wrapperClassName={`${index < 4 ? 'sm:col-span-1' : 'sm:col-span-2'}`}
        >
          <dt className="text-base-500 text-sm font-medium">{item.label}</dt>
          <dd className="text-base-900 mt-1 text-sm">{item.value}</dd>
        </DescriptionListItem>
      ))}
    </DescriptionListBody>
  </DescriptionList>
);
