import React from 'react';
import {
  BriefcaseIcon,
  CalendarIcon,
  CheckIcon,
  CurrencyDollarIcon,
  LinkIcon,
  MapPinIcon,
  PencilIcon
} from '@heroicons/react/20/solid';
import { Menu } from '@headlessui/react';
import Breadcrumbs from '../Breadcrumb';
import Button from '../Button';
import Dropdown from '../Dropdown';
import PropTypes from 'prop-types';
import './styles.scss';

const PageHeadings = (props) => {
  const { breadcrumbData, dropdownData, firstButtonText, metaData, heading, secondButtonText, thirdButtonText } = props;
  return (
    <div className="lg:flex lg:items-center lg:justify-between">
      <div className="min-w-0 flex-1">
        <Breadcrumbs data={breadcrumbData} size="default" />
        <h2 className="mt-2 text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
          {heading}
        </h2>
        <div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
          {metaData.map((data) => (
            <div key={data.id} className="mt-2 flex items-center text-sm text-gray-500">
              {data.metaNode}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-5 flex lg:mt-0 lg:ml-4">
        <span className="hidden sm:block">
          <Button size="default" variant="white">
            <PencilIcon className="-ml-1 mr-2 h-5 w-5 text-gray-500" aria-hidden="true" />
            {firstButtonText}
          </Button>
        </span>
        <span className="ml-3 hidden sm:block">
          <Button size="default" variant="white">
            <LinkIcon className="-ml-1 mr-2 h-5 w-5 text-gray-500" aria-hidden="true" />
            {secondButtonText}
          </Button>
        </span>
        <span className="sm:ml-3">
          <Button size="default" variant="primary">
            <CheckIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
            {thirdButtonText}
          </Button>
        </span>

        {/* Dropdown */}
        <Menu as="div" className="relative ml-3 sm:hidden">
          <Dropdown triggerTitle="More" options={dropdownData} />
        </Menu>
      </div>
    </div>
  );
};

PageHeadings.propTypes = {
  breadcrumbData: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      url: PropTypes.string,
      current: PropTypes.bool
    })
  ),
  dropdownData: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      url: PropTypes.string
    })
  ),
  metaData: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      metaNode: PropTypes.node
    })
  ),
  heading: PropTypes.string,
  firstButtonText: PropTypes.string,
  secondButtonText: PropTypes.string,
  thirdButtonText: PropTypes.string
};
PageHeadings.defaultProps = {
  breadcrumbData: [
    { name: 'Jobs', url: 'www.google.com', current: true },
    { name: 'Engineering', url: 'www.google.com', current: false },
    { name: 'Frontend Engineers', url: 'www.google.com', current: false }
  ],
  dropdownData: [{ name: 'Edit', url: 'www.google.com' }, { name: 'View', url: 'ww.google.com' }],
  metaData: [
    {
      id: 'node-1',
      metaNode: (
        <>
          <BriefcaseIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
          Full-time
        </>
      )
    },
    {
      id: 'node-2',
      metaNode: (
        <>
          <MapPinIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
          Remote
        </>
      )
    },
    {
      id: 'node-3',
      metaNode: (
        <>
          <CurrencyDollarIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
          $120k &ndash; $140k
        </>
      )
    },
    {
      id: 'node-4',
      metaNode: (
        <>
          <CalendarIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
          Closing on January 9, 2020
        </>
      )
    }
  ],
  heading: 'Frontend Engineers',
  firstButtonText: 'Edit',
  secondButtonText: 'View',
  thirdButtonText: 'Publish'
};

export default PageHeadings;
