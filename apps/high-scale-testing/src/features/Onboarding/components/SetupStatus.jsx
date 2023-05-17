import React from 'react';
import {
  Alerts,
  Badge,
  Button,
  MdContentCopy,
  MdInfoOutline,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@browserstack/bifrost';
import CopyButton from 'common/CopyButton/components/CopyButton';
import PropTypes from 'prop-types';

const SetupStatus = ({
  exploreAutomationClickHandler,
  frameworkURLs,
  isSetupComplete,
  viewAllBuildsClickHandler
}) => (
  <Modal size="3xl" show={isSetupComplete}>
    <div className="mx-6 my-4">
      <p className="text-lg font-medium">Automation Grid Complete</p>
      <div className="border-base-300 mt-4 rounded-lg border">
        <div className="border-base-300 border-y p-4">
          <Alerts
            accentBorder
            description="Congratulations your ‘high-scale-grid’ is created."
            linkText=""
            modifier="success"
          />

          <Table containerWrapperClass="rounded-lg shadow-none mt-4">
            <React.Fragment key=".0">
              <TableHead>
                <TableRow>
                  <TableCell
                    variant="header"
                    wrapperClassName="first:pr-3 last:pl-3 px-2"
                  >
                    Framework
                  </TableCell>
                  <TableCell
                    variant="header"
                    wrapperClassName="first:pr-3 last:pl-3 px-2"
                  >
                    URL
                  </TableCell>
                  <TableCell
                    variant="header"
                    wrapperClassName="first:pr-3 last:pl-3 px-2"
                  />
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow onRowClick={() => {}}>
                  <TableCell
                    wrapperClassName="
                    font-medium text-base-900
                   first:pr-3 last:pl-3 px-2 py-2"
                  >
                    Selenium
                  </TableCell>
                  <TableCell
                    wrapperClassName="
                    
                   first:pr-3 last:pl-3 px-2 py-2"
                  >
                    {frameworkURLs.selenium}
                  </TableCell>
                  <TableCell>
                    <CopyButton
                      copyValue={frameworkURLs.selenium}
                      textColor=""
                      wrapperClassName="text-xl"
                    >
                      <MdContentCopy />
                    </CopyButton>
                  </TableCell>
                </TableRow>
                <TableRow onRowClick={() => {}}>
                  <TableCell
                    wrapperClassName="
                    font-medium text-base-900
                   first:pr-3 last:pl-3 px-2 py-2"
                  >
                    Playwright
                  </TableCell>
                  <TableCell
                    wrapperClassName="
                    
                   first:pr-3 last:pl-3 px-2 py-2"
                  >
                    <Badge
                      disabled
                      isRounded={{
                        summary: 'false'
                      }}
                      modifier="primary"
                      text="Coming Soon"
                    />
                  </TableCell>
                  <TableCell>
                    <CopyButton
                      copyValue={frameworkURLs.playwright}
                      textColor=""
                      wrapperClassName="text-xl"
                    >
                      <MdContentCopy />
                    </CopyButton>
                  </TableCell>
                </TableRow>
                <TableRow onRowClick={() => {}}>
                  <TableCell
                    wrapperClassName="
                    font-medium text-base-900
                   first:pr-3 last:pl-3 px-2 py-2"
                  >
                    Cypress
                  </TableCell>
                  <TableCell
                    wrapperClassName="
                    
                   first:pr-3 last:pl-3 px-2 py-2"
                  >
                    <Badge
                      disabled
                      isRounded={{
                        summary: 'false'
                      }}
                      modifier="primary"
                      text="Coming Soon"
                    />
                  </TableCell>
                </TableRow>
              </TableBody>
            </React.Fragment>
          </Table>
        </div>
        <div className="text-base-600 flex gap-2 p-4 text-sm">
          <MdInfoOutline className="text-xl" />
          <p>
            Copy the above framework URLs to seamlessly integrate your test
            suite with the grid.
          </p>
        </div>
      </div>
      <div className="mt-3 flex justify-end gap-x-3">
        <Button
          aria-label="Explore Automation Console"
          colors="white"
          onClick={exploreAutomationClickHandler}
          type="button"
          varaint="primary"
        >
          Explore Automation Console
        </Button>
        <Button
          aria-label="View Builds"
          colors="brand"
          onClick={viewAllBuildsClickHandler}
          type="button"
          varaint="primary"
        >
          View Builds
        </Button>
      </div>
    </div>
  </Modal>
);

SetupStatus.propTypes = {
  exploreAutomationClickHandler: PropTypes.func.isRequired,
  frameworkURLs: PropTypes.oneOfType([PropTypes.object]).isRequired,
  isSetupComplete: PropTypes.bool.isRequired,
  viewAllBuildsClickHandler: PropTypes.func.isRequired
};

export default SetupStatus;
