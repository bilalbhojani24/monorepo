import React from 'react';
import {
  Alerts,
  Badge,
  Button,
  CodeSnippet,
  MdContentCopy,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@browserstack/bifrost';
import CopyButton from 'common/CopyButton/components/CopyButton';
import { EVENT_LOGS_STATUS } from 'constants/setup';
import PropTypes from 'prop-types';

const SetupStatus = ({
  closeSetupStatusModal,
  codeSnippets,
  copySetupFailureCode,
  exploreAutomationClickHandler,
  eventLogsStatus,
  frameworkURLs,
  handleDismissClick,
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
    ALERT_DESC = 'Successfully created ‘high-scale-grid’.';
    ALERT_MODIFIER = 'success';
    HEADER_TEXT = 'Automation Grid Complete';
  }

  return (
    <Modal size="3xl" show={isSetupComplete}>
      <ModalHeader
        handleDismissClick={handleDismissClick}
        heading={HEADER_TEXT}
      />

      <ModalBody className="overflow-auto">
        <>
          <div>
            <Alerts
              description={ALERT_DESC}
              linkText=""
              modifier={ALERT_MODIFIER}
            />

            {eventLogsStatus === EVENT_LOGS_STATUS.FINISHED && (
              <div className="text-base-900 flex gap-2 pt-4 text-sm">
                <p>
                  Copy the above framework URLs to seamlessly integrate your
                  test suite with the grid.
                </p>
              </div>
            )}

            {eventLogsStatus === EVENT_LOGS_STATUS.FINISHED && (
              <Table containerWrapperClass="rounded-lg mt-4">
                <React.Fragment key=".0">
                  <TableHead>
                    <TableRow>
                      <TableCell
                        variant="body"
                        wrapperClassName="text-xs font-medium px-6 py-3"
                      >
                        FRAMEWORK
                      </TableCell>
                      <TableCell
                        variant="body"
                        wrapperClassName="text-xs font-medium px-6 py-3"
                      >
                        URL
                      </TableCell>
                      <TableCell
                        variant="body"
                        wrapperClassName="text-xs font-medium px-6 py-3"
                      />
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell wrapperClassName="text-sm text-base-900 font-normal px-6 py-4">
                        Selenium
                      </TableCell>
                      <TableCell wrapperClassName="text-sm text-base-900 font-normal px-6 py-4 text-ellipsis">
                        <div className="max-w-md overflow-hidden text-ellipsis">
                          {`${frameworkURLs.selenium}/wd/hub`}
                        </div>
                      </TableCell>
                      <TableCell wrapperClassName="w-5">
                        <CopyButton
                          copyValue={`${frameworkURLs.selenium}/wd/hub`}
                          textColor=""
                          wrapperClassName="text-xl"
                        >
                          <MdContentCopy />
                        </CopyButton>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell wrapperClassName="text-sm text-base-900 font-normal px-6 py-4">
                        Playwright
                      </TableCell>
                      <TableCell wrapperClassName="text-sm text-base-900 font-normal px-6 py-4">
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
                    <TableRow>
                      <TableCell wrapperClassName="text-sm text-base-900 ont-normal px-6 py-4">
                        Cypress
                      </TableCell>
                      <TableCell wrapperClassName="text-sm text-base-900 font-normal px-6 py-4">
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
                <p className="mb-2 text-sm">
                  Try creating grid again with the below CLI command.
                </p>
                <CodeSnippet
                  code={codeSnippets['create-grid'].c.code}
                  copyCallback={copySetupFailureCode}
                  language={codeSnippets['create-grid'].c.language}
                  singleLine={false}
                />
              </div>
            )}
          </div>
        </>
      </ModalBody>

      <ModalFooter position="right">
        {/* CTA Buttons */}
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
      </ModalFooter>
    </Modal>
  );
};

SetupStatus.propTypes = {
  closeSetupStatusModal: PropTypes.func.isRequired,
  codeSnippets: PropTypes.oneOfType([PropTypes.object]).isRequired,
  copySetupFailureCode: PropTypes.func.isRequired,
  exploreAutomationClickHandler: PropTypes.func.isRequired,
  eventLogsStatus: PropTypes.string.isRequired,
  frameworkURLs: PropTypes.oneOfType([PropTypes.object]).isRequired,
  handleDismissClick: PropTypes.func.isRequired,
  isSetupComplete: PropTypes.bool.isRequired,
  viewAllBuildsClickHandler: PropTypes.func.isRequired
};

export default SetupStatus;
