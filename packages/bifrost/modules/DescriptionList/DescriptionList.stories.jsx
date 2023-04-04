import React from 'react';
import { twClassNames } from '@browserstack/utils';

import DocPageTemplate from '../../.storybook/DocPageTemplate';
import Button from '../Button';
import DescriptionListBody from '../DescriptionListBody';
import DescriptionListHeader from '../DescriptionListHeader';
import { PaperClipIcon } from '../Icon';
import KeyValue from '../KeyValuePair';

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
    id: 3,
    label: 'Email address',
    value: 'margotfoster@example.com'
  },
  {
    id: 4,
    label: 'Salary expectation',
    value: '$120,000'
  },
  {
    id: 5,
    label: 'About',
    value: `Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim
            incididunt cillum culpa consequat. Excepteur qui ipsum aliquip
            consequat sint. Sit id mollit nulla mollit nostrud in ea officia
            proident. Irure nostrud pariatur mollit ad adipisicing reprehenderit
            deserunt qui eu.`
  },
  {
    id: 6,
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
            <Button variant="minimal">Download</Button>
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
            <Button variant="minimal">Download</Button>
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
    DescriptionListHeader
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
    <DescriptionListHeader
      heading="Applicant Information"
      subHeading="Personal details and application."
    />
    <DescriptionListBody wrapperClassName="p-0">
      <div>
        {descriptionListData.map((item) => (
          <div
            className={twClassNames(
              'px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 border-base-200 border-b'
            )}
          >
            <KeyValue
              label={item.label}
              value={item.value}
              valueClassNames="sm:col-span-2"
            />
          </div>
        ))}
      </div>
    </DescriptionListBody>
  </DescriptionList>
);

export const LeftAlignedStripedInCard = () => (
  <DescriptionList>
    <DescriptionListHeader
      heading="Applicant Information"
      subHeading="Personal details and application."
    />
    <DescriptionListBody wrapperClassName="p-0">
      <div>
        {descriptionListData.map((item, index) => (
          <div
            className={twClassNames(
              'px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6',
              {
                'bg-base-50': index % 2 === 0
              }
            )}
          >
            <KeyValue
              label={item.label}
              value={item.value}
              valueClassNames="sm:col-span-2"
            />
          </div>
        ))}
      </div>
    </DescriptionListBody>
  </DescriptionList>
);

export const LeftAligned = () => (
  <DescriptionList isCard={false}>
    <DescriptionListHeader
      heading="Applicant Information"
      subHeading="Personal details and application."
    />
    <DescriptionListBody>
      <div className="sm:divide-base-200 sm:divide-y">
        {descriptionListData.map((item) => (
          <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
            <KeyValue
              label={item.label}
              value={item.value}
              valueClassNames="sm:col-span-2"
            />
          </div>
        ))}
      </div>
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
              <div className="ml-4 flex shrink-0 space-x-4">
                <Button variant="minimal">Update</Button>
                <span className="text-base-300"> | </span>
                <Button variant="minimal">Remove</Button>
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
              <div className="ml-4 flex shrink-0 space-x-4">
                <Button variant="minimal">Update</Button>
                <span className="text-base-300"> | </span>
                <Button variant="minimal">Remove</Button>
              </div>
            </li>
          </ul>
        </dd>
      )
    }
  ];
  return (
    <DescriptionList
      wrapperClassName="shadow-none sm:rounded-none"
      isCard={false}
    >
      <DescriptionListHeader
        heading="Applicant Information"
        subHeading="Personal details and application."
      />
      <DescriptionListBody>
        <div className="sm:divide-base-200 sm:divide-y">
          {ddData.map((item) => (
            <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
              <KeyValue
                label={item.label}
                value={item.value}
                valueClassNames="sm:col-span-2"
              />
            </div>
          ))}
        </div>
      </DescriptionListBody>
    </DescriptionList>
  );
};

export const TwoColumnInCard = () => (
  <DescriptionList isCard>
    <DescriptionListHeader
      heading="Applicant Information"
      subHeading="Personal details and application."
    />
    <DescriptionListBody>
      <div className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
        {descriptionListData.map((item) => (
          <div
            className={twClassNames({
              'sm:col-span-2': item.id > 4,
              'sm:col-span-1': item.id <= 4
            })}
            key={item.id}
          >
            <KeyValue
              label={item.label}
              value={item.value}
              valueClassNames="mt-1"
            />
          </div>
        ))}
      </div>
    </DescriptionListBody>
  </DescriptionList>
);
