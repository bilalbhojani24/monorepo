import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { descriptionsList, DESCRIPTION_LIST_ALIGNMENT, classList } from './const/descriptionListConstants';

import './styles.scss';

const DescriptionList = (props) => {
  const { alignment, descriptions, heading, isStriped, isCard, subHeading, wrapperClass } = props;

  return (
    <div
      className={classNames(
        'overflow-hidden bg-white sm:rounded-lg',
        {
          shadow: isCard
        },
        wrapperClass
      )}
    >
      <div
        className={classNames('px-4 py-5 sm:px-6', {
          'sm:px-0': !isCard && DESCRIPTION_LIST_ALIGNMENT[0] === alignment
        })}
      >
        <h3 className="text-lg font-medium leading-6 text-base-900">{heading}</h3>
        <p className="mt-1 max-w-2xl text-sm text-base-500">{subHeading}</p>
      </div>
      <div
        className={classNames('border-t border-base-200', {
          'sm:px-6 py-5': DESCRIPTION_LIST_ALIGNMENT[1] === alignment
        })}
      >
        <dl
          className={classNames({
            [classList.leftAligned.container]: DESCRIPTION_LIST_ALIGNMENT[0] === alignment,
            [classList.twoColumned.container]: DESCRIPTION_LIST_ALIGNMENT[1] === alignment
          })}
        >
          {descriptions.map((desc, index) => {
            const { title, fullWidth, description, actionButtonLabel, actionButtonClick } = desc;
            return (
              <div
                key={index}
                className={classNames({
                  [classList.leftAligned.itemContainer]: DESCRIPTION_LIST_ALIGNMENT[0] === alignment,
                  [classList.twoColumned.itemContainerHalf]: DESCRIPTION_LIST_ALIGNMENT[1] === alignment,
                  [classList.twoColumned.itemConatainerFull]: DESCRIPTION_LIST_ALIGNMENT[1] === alignment && fullWidth,
                  'bg-base-50': index % 2 === 0 && isStriped && DESCRIPTION_LIST_ALIGNMENT[0] === alignment,
                  'sm:px-0': !isCard && DESCRIPTION_LIST_ALIGNMENT[0] === alignment
                })}
              >
                <dt className="text-sm font-medium text-base-500 text-sm font-medium text-base-500">{title}</dt>
                {!!description.length && (
                  <dd className="mt-1 flex text-sm text-base-900 sm:col-span-2 sm:mt-0">
                    <span className="flex-grow">{description}</span>
                    {actionButtonLabel && DESCRIPTION_LIST_ALIGNMENT[0] === alignment && (
                      <span className="ml-4 flex-shrink-0">
                        <button
                          type="button"
                          className="rounded-md bg-white font-medium text-brand-600 hover:text-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2"
                          onClick={() => {
                            if (actionButtonClick) actionButtonClick();
                          }}
                        >
                          {actionButtonLabel}
                        </button>
                      </span>
                    )}
                  </dd>
                )}
                {desc.Layout && <desc.Layout />}
              </div>
            );
          })}
        </dl>
      </div>
    </div>
  );
};

DescriptionList.propTypes = {
  alignment: PropTypes.oneOf(DESCRIPTION_LIST_ALIGNMENT),
  descriptions: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      description: PropTypes.string,
      fullWidth: PropTypes.bool,
      actionButtonLabel: PropTypes.string,
      actionButtonClick: PropTypes.func,
      Layout: PropTypes.node
    })
  ),
  heading: PropTypes.string,
  isStriped: PropTypes.bool,
  isCard: PropTypes.bool,
  subHeading: PropTypes.string,
  wrapperClass: PropTypes.string
};
DescriptionList.defaultProps = {
  alignment: DESCRIPTION_LIST_ALIGNMENT[0],
  descriptions: descriptionsList,
  gridContainerClass: '',
  heading: 'Application Infomration',
  isStriped: false,
  isCard: true,
  subHeading: 'Personal details and application',
  wrapperClass: ''
};

export default DescriptionList;
