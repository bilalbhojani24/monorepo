import React from 'react';
import PropTypes from 'prop-types';

import { twClassNames } from '../../utils/tailwindUtils';
import Button from '../Button';
import HeaderProducts from '../HeaderProducts';
import {
  MdAccountCircle,
  MdHelp,
  MdLocalOffer,
  MdNotifications,
  MdPersonAddAlt1,
  MdSearch
} from '../Icon';

import './styles.scss';

const ELEMENTS_WITH_LABEL = [
  {
    discription: 'Invite my Team',
    icon: <MdPersonAddAlt1 className="text-base-400 h-5 w-5" />
  },
  {
    discription: 'Pricing',
    icon: <MdLocalOffer className="text-base-400 h-5 w-5" />
  }
];
const ELEMENTS_WITH_ICON = [
  {
    name: 'help',
    icon: <MdHelp className="text-base-400 h-6 w-6" />
  },
  {
    name: 'search',
    icon: <MdSearch className="text-base-400 h-6 w-6" />
  },
  {
    name: 'notifications',
    icon: <MdNotifications className="text-base-400 h-6 w-6" />
  },
  {
    name: 'account',
    icon: <MdAccountCircle className="text-base-400 h-6 w-6" />
  }
];

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
