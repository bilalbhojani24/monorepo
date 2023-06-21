import React, { useEffect } from 'react';
import {
  Accordion,
  AccordionPanel,
  AccordionSimpleHeader,
  Button,
  Checkbox,
  Dropdown,
  DropdownOptionGroup,
  DropdownOptionItem,
  DropdownTrigger,
  InputField,
  MdCheckCircleOutline,
  MdDelete,
  MdExpandMore,
  MdOutlineClose,
  Notifications,
  notify,
  Slideover,
  SlideoverBody,
  SlideoverFooter,
  SlideoverHeader,
  Switch
} from '@browserstack/bifrost';
import { json2csv } from 'json-2-csv';
import PropTypes from 'prop-types';
import { logEvent } from 'utils/logEvent';

import { days, urlPattern, wcagVersions } from './constants';
import useNewScan from './useNewScan';

const NewScan = ({ show, closeSlideover, preConfigData }) => {
  const {
    recurringStatus,
    formData,
    handleFormData,
    validationError,
    handlerCloseOver,
    timeRef,
    scanNameRef,
    scanUrlRef,
    fileUploadRef,
    showToast,
    setShowToast,
    disableUrlButton
  } = useNewScan(closeSlideover, preConfigData);
  /*
    Download Csv
  */
  function downloadCsv(name) {
    json2csv(
      [
        {
          URL: 'https://browserstack.com'
        }
      ],
      (error, csv) => {
        const downloadLink = document.createElement('a');
        const blob = new Blob(['\ufeff', csv]);
        const url = URL.createObjectURL(blob);
        downloadLink.href = url;
        downloadLink.download = `${name}.csv`;

        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
      }
    );
  }

  useEffect(() => {
    if (showToast) {
      notify(
        <Notifications
          title="New website scan created"
          description={showToast}
          actionButtons={null}
          headerIcon={
            <MdCheckCircleOutline className="text-success-400 h-6 w-6" />
          }
          handleClose={(toastData) => {
            notify.remove(toastData.id);
            setShowToast(false);
          }}
        />,
        {
          position: 'top-right',
          duration: 4000,
          autoClose: true,
          id: 'one'
        }
      );
    }
  }, [setShowToast, showToast]);

  const handleCloseWithLogEvent = () => {
    logEvent('InteractedWithWSNewWebsiteScanSlideOver', {
      action: 'Cancel Scan',
      scanType: recurringStatus ? 'Recurring scan' : 'On-demand scan',
      scanTime: recurringStatus
        ? {
            time: formData.time,
            timeZone: new Date().toString().match(/([A-Z]+[\+-][0-9]+.*)/)[1]
          }
        : {
            time: new Date().toLocaleTimeString(),
            timeZone: new Date().toString().match(/([A-Z]+[\+-][0-9]+.*)/)[1]
          },
      wcagVersion: formData.scanData.wcagVersion.label,
      day: recurringStatus ? formData.day : new Date().toLocaleDateString(),
      bestPractices: formData.scanData.bestPractices,
      needsReview: formData.scanData.needsReview,
      urlCount: formData.scanData.urlSet
        ? formData.scanData.urlSet.length
        : undefined
    });
    handlerCloseOver();
  };

  const getAccordionBody = () => (
    <div className="px-2 pt-2">
      <div className="flex items-center justify-between">
        <div className="flex grow flex-col">
          <span className="text-base-900 text-sm font-medium">
            Include Needs Review issues
          </span>
          <span className="text-base-500 text-sm">
            Issues marked as Needs Review needs manual inspection to confirm
            it’s validity.
          </span>
        </div>
        <Switch
          onChange={(e) => handleFormData(e, 'needsReview')}
          defaultValue={formData.scanData.needsReview}
        />
      </div>

      <div className="mt-2 flex items-center justify-between">
        <div className="flex grow flex-col">
          <span className="text-base-900 text-sm font-medium">
            Include Best Practices issues
          </span>
          <span className="text-base-500 text-sm">
            {`Issues marked as Best practices aren't Accessibility guideline
            violations, but resolving them will improve the overall user
            experience.`}
          </span>
        </div>
        <Switch
          onChange={(e) => handleFormData(e, 'bestPractices')}
          defaultValue={formData.scanData.bestPractices}
        />
      </div>
    </div>
  );
  return (
    <div className="relative z-10">
      <Slideover
        show={show}
        slideoverWidth="max-w-screen-md w-screen overflow-y"
        onOverlayClick={handleCloseWithLogEvent}
        backgroundOverlay
        onClose={handleCloseWithLogEvent}
        size="2xl"
      >
        <SlideoverHeader
          dismissButton
          handleDismissClick={handleCloseWithLogEvent}
          heading="New website scan"
          subHeading="Setup your new website scan"
          wrapperClassName="bg-base-50"
        />
        <SlideoverBody>
          <div className="border-base-200 flex-col border-b pb-4">
            <div className="flex items-start">
              <div
                className={`m-5 mt-0 w-64 flex-auto ${
                  validationError.scanName ? 'mt-5' : ''
                }`}
              >
                <InputField
                  label="Scan name"
                  onChange={(e) => handleFormData(e, 'scanName')}
                  id="scan-name"
                  placeholder="Scan Name"
                  value={formData.name}
                  errorText={validationError.scanName}
                  ref={scanNameRef}
                />
              </div>
              <div className="mr-5 mt-0 flex-col">
                <label
                  className="text-base-700 mb-1 block text-sm font-medium"
                  htmlFor="wcagVersion"
                >
                  WCAG version
                </label>
                <Dropdown
                  trigger={
                    <DropdownTrigger>
                      {formData?.scanData?.wcagVersion?.body}
                    </DropdownTrigger>
                  }
                  options={wcagVersions}
                  heading="WCAG Version"
                  onClick={(e) => handleFormData(e, 'wcagVersion')}
                  id="wcagVersion"
                />
                <Dropdown
                  onClick={(e) => handleFormData(e, 'wcagVersion')}
                  id="scanFilter"
                >
                  <div className="flex">
                    <DropdownTrigger>
                      {formData?.scanData?.wcagVersion?.body}
                      <MdExpandMore className="h-5 w-5" aria-hidden="true" />
                    </DropdownTrigger>
                  </div>

                  <DropdownOptionGroup>
                    {wcagVersions.map((opt) => (
                      <DropdownOptionItem key={opt.id} option={opt} />
                    ))}
                  </DropdownOptionGroup>
                </Dropdown>
              </div>
            </div>
            <div className="mx-5">
              <Checkbox
                name="recurring"
                onChange={(e) => handleFormData(e, 'recurring')}
                border={false}
                description="You can schedule periodic scans for the added pages"
                data={{
                  label: 'Make recurring',
                  description:
                    'You can schedule periodic scans for the added pages'
                }}
                id="recurringRef"
                checked={recurringStatus}
              />
              {recurringStatus ? (
                <div className="flex-col items-center pt-5">
                  <div className="mb-4 flex w-32">
                    <Button
                      variant="primary"
                      size="default"
                      colors="white"
                      // onClick={showAddProjectModal}
                      onClick={(e) => handleFormData(e, 'weekly')}
                      wrapperClassName={`ml-3 whitespace-nowrap w-full rounded-tr-none rounded-br-none focus:ring-offset-0 focus:z-10 ${
                        formData.type === 'weekly' &&
                        'border-brand-500 ring-offset-0 '
                      }`}
                    >
                      Weekly
                    </Button>

                    <Button
                      variant="primary"
                      size="default"
                      colors="white"
                      // onClick={showAddProjectModal}
                      onClick={(e) => handleFormData(e, 'daily')}
                      wrapperClassName={`rounded-tl-none rounded-bl-none focus:ring-offset-0 focus:z-10 border-l-0 bg-white ${
                        formData.type === 'daily' &&
                        'border-brand-500 ring-offset-0 '
                      }`}
                    >
                      Daily
                    </Button>
                  </div>
                  <div className="ml-4 flex items-center">
                    {formData.type === 'weekly' && (
                      <>
                        <span className="mr-2">On the </span>
                        {/* <Dropdown
                        options={days}
                        onClick={(e) => handleFormData(e, 'day')}
                        id="recurring-days"
                        trigger={
                          <DropdownTrigger>
                            {formData.day || 'Day'}
                          </DropdownTrigger>
                        }
                      /> */}
                        <Dropdown
                          onClick={(e) => handleFormData(e, 'day')}
                          id="scanFilter"
                        >
                          <div className="flex">
                            <DropdownTrigger wrapperClassName="border-base-300 text-base-700 hover:bg-base-50 focus:ring-offset-base-100 focus:ring-brand-500 inline-flex w-full justify-center rounded-md border bg-white px-4 py-2 text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2">
                              {formData.day || 'Day'}
                              <MdExpandMore
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </DropdownTrigger>
                          </div>

                          <DropdownOptionGroup>
                            {days.map((opt) => (
                              <DropdownOptionItem key={opt.id} option={opt} />
                            ))}
                          </DropdownOptionGroup>
                        </Dropdown>
                        <span className="mx-2">of every week, at</span>{' '}
                      </>
                    )}
                    {formData.type === 'daily' ? (
                      <span className="mx-2">Everyday at</span>
                    ) : (
                      ''
                    )}
                    <InputField
                      onChange={(e) => handleFormData(e, 'time')}
                      id="time"
                      placeholder="Time"
                      type="time"
                      value={formData.time}
                      ref={timeRef}
                      wrapperClassName="w-30"
                    />
                  </div>
                  <div className="mt-4">
                    <Checkbox
                      name="instantRun"
                      onChange={(e) => handleFormData(e, 'instantRun')}
                      border={false}
                      data={{
                        label: 'Run initial scan'
                      }}
                      id="recurringRef"
                      checked={formData.instantRun}
                    />
                  </div>
                </div>
              ) : (
                ''
              )}
              <div className="pt-2">
                <Accordion>
                  <AccordionSimpleHeader
                    title={<div>Additional settings</div>}
                    wrapperClassName="py-1.5 px-0"
                  />
                  <AccordionPanel>{getAccordionBody()}</AccordionPanel>
                </Accordion>
              </div>
            </div>
          </div>
          <div className="flex-col">
            <div
              className={`m-5 mb-2 flex ${
                validationError.url ? 'items-center' : 'items-end'
              }`}
            >
              <div className="w-9/12">
                <InputField
                  label="Add pages"
                  onChange={(e) => handleFormData(e, 'url')}
                  id="scan-url"
                  placeholder="https://www.website.com/home"
                  value={formData.url}
                  errorText={validationError.url}
                  ref={scanUrlRef}
                />
              </div>
              <Button
                onClick={(e) => handleFormData(e, 'addUrl')}
                size="small"
                type="subtle"
                wrapperClassName="ml-4 px-3 py-2"
                disabled={disableUrlButton}
              >
                Add
              </Button>
              <input
                ref={fileUploadRef}
                type="file"
                id="csvUpload"
                style={{ display: 'none' }}
                onChange={(e) => {
                  const reader = new FileReader();

                  reader.onload = function (e) {
                    const arr = e.target.result
                      .replaceAll('\r', '')
                      .split('\n');
                    arr.shift();
                    const invalidUrls = [];
                    const validUrls = [];
                    const uniqArr = Array.from(new Set(arr));
                    uniqArr.forEach((url) => {
                      if (urlPattern.test(url)) {
                        validUrls.push(url);
                      } else {
                        invalidUrls.push(url);
                      }
                    });
                    const totalValidUrls = validUrls.length;
                    const maxValidUrls = validUrls.slice(0, 500);
                    if (validUrls.length) {
                      notify(
                        <div id="file-uploaded">
                          <Notifications
                            title={`${maxValidUrls.length} pages added from CSV file`}
                            description={`${
                              invalidUrls.length +
                              totalValidUrls -
                              maxValidUrls.length
                            } ${
                              maxValidUrls.length < 500
                                ? 'invalid URLs were ignored.'
                                : 'pages were ignored.'
                            }`}
                            actionButtons={null}
                            headerIcon={
                              <MdCheckCircleOutline className="text-success-400 h-6 w-6" />
                            }
                            handleClose={(toastData) => {
                              scanNameRef.current.focus();
                              notify.remove(toastData.id);
                              setShowToast(false);
                            }}
                          />
                        </div>,
                        {
                          position: 'top-right',
                          duration: 4000,
                          autoClose: true,
                          id: 'one'
                        }
                      );
                    } else {
                      notify(
                        <div id="file-uploaded">
                          <Notifications
                            title={`${validUrls.length} pages added from CSV file`}
                            description={`${invalidUrls.length} invalid URLs were ignored.`}
                            actionButtons={null}
                            headerIcon={
                              <MdOutlineClose className="text-danger-400 h-6 w-6" />
                            }
                            handleClose={(toastData) => {
                              scanNameRef.current.focus();
                              notify.remove(toastData.id);
                              setShowToast(false);
                            }}
                          />
                        </div>,
                        {
                          position: 'top-right',
                          duration: 4000,
                          autoClose: true,
                          id: 'one'
                        }
                      );
                    }
                    handleFormData(maxValidUrls, 'csvUpload');
                    // Continue processing...
                  };
                  reader.readAsText(e.target.files[0]);
                }}
              />
              <Button
                colors="white"
                onClick={() => fileUploadRef.current.click()}
                size="small"
                type="subtle"
                wrapperClassName="ml-4 w-36 px-3 py-2"
                disabled={disableUrlButton}
              >
                Upload CSV
              </Button>
            </div>
            <div
              onClick={(e) => {
                e.preventDefault();
                downloadCsv('Website Scanner URL List Sample');
              }}
              role="button"
              onKeyDown={(e) =>
                e.key === 'Enter' || e.key === 'Space'
                  ? downloadCsv('Website Scanner URL List Sample')
                  : ''
              }
              tabIndex="0"
              className="text-info-600 mb-5 ml-6 text-sm"
            >
              Download sample CSV
            </div>
            {/* <a href="data:text/csv;charset=utf-8" download="assets/sample.csv">
              download
            </a> */}
            <div>
              <div className="bg-base-50 text-base-500 px-6 py-3 text-xs">
                ADDED PAGES ({formData?.scanData?.urlSet?.length || 0})
              </div>
              {formData?.scanData?.urlSet?.length
                ? formData.scanData.urlSet.map((url) => (
                    <div className="border-base-200 flex justify-between border-y px-6 py-4">
                      <span className="text-base-900 w-6/12 truncate text-sm">
                        {url}
                      </span>
                      <div
                        onClick={() => {
                          handleFormData(url, 'deleteUrl');
                        }}
                        onKeyDown={() => {}}
                        role="button"
                        tabIndex="0"
                      >
                        <MdDelete />
                      </div>
                    </div>
                  ))
                : null}
            </div>
          </div>
        </SlideoverBody>
        <SlideoverFooter position="right" isBorder>
          <div className="flex w-full justify-end bg-white">
            <Button
              onClick={handleCloseWithLogEvent}
              size="small"
              type="subtle"
              wrapperClassName="ml-4"
              colors="white"
            >
              Cancel
            </Button>
            <Button
              onClick={(e) => handleFormData(e, 'submit')}
              size="small"
              type="subtle"
              wrapperClassName="ml-4"
              disabled={
                Object.keys(validationError).length ||
                !formData?.scanData?.urlSet?.length
              }
            >
              Create
            </Button>
          </div>
        </SlideoverFooter>
      </Slideover>
    </div>
  );
};

NewScan.defaultProps = {
  show: false,
  closeSlideover: () => {},
  preConfigData: null
};

NewScan.propTypes = {
  show: PropTypes.bool,
  closeSlideover: PropTypes.func,
  preConfigData: PropTypes.instanceOf(Object)
};

export default NewScan;
