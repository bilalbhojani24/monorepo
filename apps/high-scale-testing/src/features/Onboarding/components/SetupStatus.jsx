import React from 'react';
import {
  Alerts,
  Badge,
  Button,
  CodeSnippet,
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
import { EVENT_LOGS_STATUS } from 'constants/onboarding';
import PropTypes from 'prop-types';

const SetupStatus = ({
  closeSetupStatusModal,
  codeSnippets,
  exploreAutomationClickHandler,
  eventLogsStatus,
  frameworkURLs,
  isSetupComplete,
  viewAllBuildsClickHandler
}) => {
  let ALERT_DESC = '';
  let ALERT_MODIFIER = '';
  let HEADER_TEXT = '';

  if (eventLogsStatus === EVENT_LOGS_STATUS.FAILED) {
    ALERT_DESC = 'An error occurred while creating the grid.';
    ALERT_MODIFIER = 'error';
    HEADER_TEXT = 'Automation Grid Incomplete';
  } else if (eventLogsStatus === EVENT_LOGS_STATUS.FINISHED) {
    ALERT_DESC = 'Congratulations your ‘high-scale-grid’ is created.';
    ALERT_MODIFIER = 'success';
    HEADER_TEXT = 'Automation Grid Complete';
  }

  return (
    <Modal size="3xl" show={isSetupComplete}>
      <div className="mx-6 my-4">
        {/* Header / Title Text */}
        <p className="text-lg font-medium">{HEADER_TEXT}</p>

        {/* Main Body */}
        <div className="border-base-300 mt-4 rounded-lg border">
          <div className="border-base-300 border-y p-4">
            <Alerts
              accentBorder
              description={ALERT_DESC}
              linkText=""
              modifier={ALERT_MODIFIER}
            />

            {eventLogsStatus === EVENT_LOGS_STATUS.FINISHED && (
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
            )}

            {eventLogsStatus === EVENT_LOGS_STATUS.FAILED && (
              <div className="text-base-900 mt-4">
                <p className=" mb-2 text-sm font-semibold">Next Steps</p>
                <p className="mb-2">
                  Copy and run the below command in your CLI, to retry Grid
                  Creation.
                </p>
                <CodeSnippet
                  code={codeSnippets['create-grid'].c.code}
                  language={codeSnippets['create-grid'].c.language}
                  singleLine={false}
                />
              </div>
            )}
          </div>

          {eventLogsStatus === EVENT_LOGS_STATUS.FINISHED && (
            <div className="text-base-600 flex gap-2 p-4 text-sm">
              <MdInfoOutline className="text-xl" />
              <p>
                Copy the above framework URLs to seamlessly integrate your test
                suite with the grid.
              </p>
            </div>
          )}
        </div>

        {/* CTA Buttons */}
        <div className="mt-3 flex justify-end gap-x-3">
          {eventLogsStatus === EVENT_LOGS_STATUS.FINISHED && (
            <>
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
            </>
          )}

          {eventLogsStatus === EVENT_LOGS_STATUS.FAILED && (
            <Button
              aria-label="Close"
              colors="white"
              onClick={closeSetupStatusModal}
              type="button"
              varaint="primary"
            >
              Close
            </Button>
          )}
        </div>
      </div>
    </Modal>
  );
};

SetupStatus.propTypes = {
  closeSetupStatusModal: PropTypes.func.isRequired,
  codeSnippets: PropTypes.oneOfType([PropTypes.object]).isRequired,
  exploreAutomationClickHandler: PropTypes.func.isRequired,
  eventLogsStatus: PropTypes.string.isRequired,
  frameworkURLs: PropTypes.oneOfType([PropTypes.object]).isRequired,
  isSetupComplete: PropTypes.bool.isRequired,
  viewAllBuildsClickHandler: PropTypes.func.isRequired
};

export default SetupStatus;
