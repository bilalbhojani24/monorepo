import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MdArrowForward,
  MdOutlineInsertDriveFile,
  MdOutlineSearch
} from '@browserstack/bifrost';
import { URLS } from 'api/constants';
import { ROUTES } from 'constants/routes';
import PropTypes from 'prop-types';

const LinkCard = ({
  link,
  testId,
  subtext,
  linkText,
  icon: Icon,
  shouldOpenInNewTab
}) => {
  const navigate = useNavigate();
  const handleCardClick = (e) => {
    if (e.type === 'keydown' && e.key !== 'Enter') return;
    if (shouldOpenInNewTab) {
      window.open(link);
    } else {
      navigate(link);
    }
  };

  return (
    <div
      role="link"
      tabIndex={0}
      data-test-id={testId}
      // eslint-disable-next-line tailwindcss/no-arbitrary-value
      className="w-[360px] flex-1 cursor-pointer rounded-md bg-white p-6 drop-shadow"
      onClick={handleCardClick}
      onKeyDown={handleCardClick}
    >
      <p>
        <Icon className="mb-3 h-5 w-5" />
      </p>
      <p className="text-base-700 flex items-center text-sm">
        {linkText} <MdArrowForward className="ml-1 h-3 w-3" />
      </p>
      <p className="text-base-500 text-sm">{subtext}</p>
    </div>
  );
};

LinkCard.propTypes = {
  icon: PropTypes.node.isRequired,
  link: PropTypes.string.isRequired,
  testId: PropTypes.string.isRequired,
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
      subtext: 'Learn how to use Integrations',
      shouldOpenInNewTab: false,
      testId: 'getting-started-quick-link'
    },
    {
      icon: MdOutlineSearch,
      linkText: 'API Explorer',
      link: URLS.DOCUMENTATION,
      subtext: 'Make your first API call',
      shouldOpenInNewTab: true,
      testId: 'api-explorer-quick-link'
    }
  ];

  return (
    <div className="w-full px-6 py-4">
      <p className="mb-5 mt-2 text-lg font-medium">Quick Links</p>
      <div className="flex w-full gap-5">
        {QUICK_LINK_DETAILS.map(
          ({ icon, link, subtext, linkText, shouldOpenInNewTab, testId }) => (
            <LinkCard
              icon={icon}
              link={link}
              testId={testId}
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
