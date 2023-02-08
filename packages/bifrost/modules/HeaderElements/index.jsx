import React from 'react';
import { twClassNames } from '@browserstack/utils';
import PropTypes from 'prop-types';

import Button from '../Button';
import HeaderProducts from '../HeaderProducts';

import {
  ELEMENTS_WITH_ICON,
  ELEMENTS_WITH_LABEL
} from './const/headerElementsConstants';

import './styles.scss';

const HeaderElements = ({ elementArray }) => (
  <div className={twClassNames('flex flex-row items-center p-0 gap-4 mr-8')}>
    <HeaderProducts wrapperClassName="min-[1361px]:hidden" />
    {ELEMENTS_WITH_LABEL?.map((element) => (
      <div className={twClassNames('flex flex-row items-start p-0')}>
        <Button variant="minimal">
          <span
            className={twClassNames(
              'flex flex-row gap-1.5 justify-center items-center p-0 text-base-300'
            )}
          >
            {element.icon}
            {element.discription}
          </span>
        </Button>
      </div>
    ))}

    {ELEMENTS_WITH_ICON?.map((element) =>
      elementArray.includes(element.name) ? (
        <Button variant="minimal">
          {element.name !== 'notifications' ? (
            element.icon
          ) : (
            <span className={twClassNames('relative')}>
              {element.icon}
              <span
                className={twClassNames(
                  'absolute w-1.5 h-1.5 bg-danger-600 rounded-sm shadow-[0_0_0_2px_#1f2937] top-0.5 left-1'
                )}
              />
            </span>
          )}
        </Button>
      ) : null
    )}

    <div className={twClassNames('flex flex-row items-start p-0')}>
      <Button variant="primary" colors="success">
        <span
          className={twClassNames('flex flex-row justify-center items-center')}
        >
          Upgrade
        </span>
      </Button>
    </div>
  </div>
);

HeaderElements.propTypes = {
  elementArray: PropTypes.arrayOf(PropTypes.string)
};
HeaderElements.defaultProps = {
  elementArray: ['help', 'search', 'notifications', 'account']
};

export default HeaderElements;
