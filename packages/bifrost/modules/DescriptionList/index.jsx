import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { descriptionsList } from './const/descriptionListConstants';

import './styles.scss';

const DescriptionList = (props) => {
  const { descriptions, gridContainerClass, gridItemClass, heading, subHeading, wrapperClass } = props;

  return (
    <div className={classNames('overflow-hidden bg-white shadow sm:rounded-lg', wrapperClass)}>
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg font-medium leading-6 text-gray-900">{heading}</h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">{subHeading}</p>
      </div>
      <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
        <dl className={classNames('grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2', gridContainerClass)}>
          {descriptions.map((desc, index) => (
            <div
              key={index}
              className={classNames(
                'sm:col-span-1',
                {
                  'sm:col-span-2': desc?.fullWidth
                },
                gridItemClass
              )}
            >
              <dt className="text-sm font-medium text-gray-500">{desc.title}</dt>
              {!!desc.description.length && <dd className="mt-1 text-sm text-gray-900">{desc.description}</dd>}
              {desc.Layout && <desc.Layout />}
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
};

DescriptionList.propTypes = {
  descriptions: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      description: PropTypes.string,
      fullWidth: PropTypes.bool
    })
  ),
  gridContainerClass: PropTypes.string,
  gridItemClass: PropTypes.string,
  heading: PropTypes.string,
  subHeading: PropTypes.string,
  wrapperClass: PropTypes.string
};
DescriptionList.defaultProps = {
  descriptions: descriptionsList,
  gridContainerClass: '',
  gridItemClass: '',
  heading: 'Application Infomration',
  subHeading: 'Personal details and application',
  wrapperClass: ''
};

export default DescriptionList;
