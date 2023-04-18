import React from 'react';
import {
  Button,
  Hyperlink,
  MdDescription,
  MdRefresh
} from '@browserstack/bifrost';
import PropTypes from 'prop-types';

import {
  APP_AUTOMATE_FRAMEWORKS,
  HELP_LINKS,
  VIEWER_FIELDS
} from '../../constants';
import { useNetwork } from '../../state/Context';

const NoResults = ({ appAutomateFramework }) => {
  const { state, actions } = useNetwork();
  const filterByError = state.get('errorFilter');
  const filter = state.get('filter');
  const isFilterApplied = filterByError || !!filter.name || !!filter.value;
  const docsURL = '';
  // let docsURL = HELP_LINKS.viewDocumentation[product];
  // if (product === 'app_automate') {
  //   if (APP_AUTOMATE_FRAMEWORKS.includes(appAutomateFramework)) {
  //     docsURL = docsURL[appAutomateFramework];
  //   } else {
  //     docsURL = docsURL.appium;
  //   }
  // }
  const onResetFilters = () => {
    actions.resetFilters();
  };

  return (
    <tr>
      <td colSpan={Object.keys(VIEWER_FIELDS).length}>
        <div className="har-no-results">
          {!!docsURL && (
            <div className="har-no-results__no-logs">
              {/* <img
                src={noResultsSrc}
                srcSet={`${noResultsSrc} 1x, ${IMAGES_CDN_PATH}/images/static/no-sessions@2x.png 2x`}
                alt="No results found"
              /> */}
              <div className="har-no-results__title">No results found</div>

              {isFilterApplied ? (
                <>
                  <div className="har-no-results__sub-title">
                    The applied filters fetched no result
                  </div>
                  <Button
                    onClick={onResetFilters}
                    className="har-no-results__reset-btn"
                  >
                    <MdRefresh fontSize="inherit" /> Reset filters
                  </Button>
                </>
              ) : (
                <>
                  <div className="har-no-results__sub-title">
                    Learn how network logs can help you debug easily
                  </div>
                  <Hyperlink
                    href={docsURL}
                    target="_blank"
                    modifier="primary"
                    icon={<MdDescription />}
                  >
                    View documentation
                  </Hyperlink>
                </>
              )}
            </div>
          )}
        </div>
      </td>
    </tr>
  );
};

NoResults.propTypes = {
  appAutomateFramework: PropTypes.string
};

NoResults.defaultProps = {
  appAutomateFramework: ''
};

export default NoResults;
