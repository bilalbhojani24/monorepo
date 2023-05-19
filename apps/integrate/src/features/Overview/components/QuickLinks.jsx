import React from 'react';
import { Link } from 'react-router-dom';
import {
  MdArrowForward,
  MdOutlineInsertDriveFile,
  MdOutlineSearch
} from '@browserstack/bifrost';
import PropTypes from 'prop-types';

import { URLS } from '../../../api';
import { ROUTES } from '../../../constants/routes';

const LinkCard = ({
  link,
  subtext,
  linkText,
  icon: Icon,
  shouldOpenInNewTab
}) => (
  // eslint-disable-next-line tailwindcss/no-arbitrary-value
  <div className="w-[360px] rounded-md bg-white p-6 drop-shadow">
    <p>
      <Icon className="mb-1 h-5 w-5" />
    </p>
    <p className="text-base-700 text-xs">
      {shouldOpenInNewTab ? (
        <a
          className="flex items-center"
          href={link}
          target="_blank"
          rel="noopener noreferrer"
        >
          {linkText} <MdArrowForward className="ml-1 h-3 w-3" />
        </a>
      ) : (
        <Link className="flex items-center" to={link}>
          {linkText} <MdArrowForward className="ml-1 h-3 w-3" />
        </Link>
      )}
    </p>
    <p className="text-base-500 text-xs">{subtext}</p>
  </div>
);

LinkCard.propTypes = {
  icon: PropTypes.node.isRequired,
  link: PropTypes.string.isRequired,
  subtext: PropTypes.string.isRequired,
  linkText: PropTypes.string.isRequired,
  shouldOpenInNewTab: PropTypes.bool.isRequired
};

const QuickLinks = () => {
  const QUICK_LINK_DETAILS = [
    {
      icon: MdOutlineInsertDriveFile,
      linkText: 'Get Started Guide',
      link: ROUTES.getting_started,
      subtext: 'Learng how to use Integrations',
      shouldOpenInNewTab: false
    },
    {
      icon: MdOutlineSearch,
      linkText: 'API Explorer',
      link: URLS.DOCUMENTATION,
      subtext: 'Learn how to use API Explorer',
      shouldOpenInNewTab: true
    }
  ];

  return (
    <div className="w-full px-8 py-4">
      <p className="mb-5 text-lg font-medium">Quick Links</p>
      <div className="flex w-full gap-5">
        {QUICK_LINK_DETAILS.map(
          ({ icon, link, subtext, linkText, shouldOpenInNewTab }) => (
            <LinkCard
              icon={icon}
              link={link}
              subtext={subtext}
              linkText={linkText}
              shouldOpenInNewTab={shouldOpenInNewTab}
            />
          )
        )}
      </div>
    </div>
  );
};

export default QuickLinks;
