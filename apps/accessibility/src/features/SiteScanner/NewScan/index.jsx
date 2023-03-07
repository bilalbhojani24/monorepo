import React from 'react';
import {
  Accordion,
  Button,
  Checkbox,
  Dropdown,
  DropdownOptionGroup,
  DropdownOptionItem,
  DropdownTrigger,
  InputField,
  MdDelete,
  MdExpandMore,
  Slideover,
  SlideoverBody,
  SlideoverFooter,
  SlideoverHeader,
  Switch
} from '@browserstack/bifrost';
import PropTypes from 'prop-types';

import Loader from '../../../common/Loader';

import { days, wcagVersions } from './constants';
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
    fileUploadRef
  } = useNewScan(closeSlideover, preConfigData);
  console.log(formData, validationError);
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
  console.log(formData);
  return (
    <div>
      <Slideover
        show={show}
        slideoverWidth="max-w-screen-md w-screen overflow-y"
        onOverlayClick={handlerCloseOver}
        backgroundOverlay
        onClose={handlerCloseOver}
        size="2xl"
      >
        <SlideoverHeader
          dismissButton
          handleDismissClick={handlerCloseOver}
          heading="New website scan"
          subHeading="Setup your new website scan"
          backgroundColorClass="bg-base-50"
        />
        <SlideoverBody>
          <div className="border-base-200 flex-col border-b pb-4">
            <div className="flex items-center">
              <div
                className={`m-5 w-64 flex-auto ${
                  validationError.scanName ? 'mt-12' : ''
                }`}
              >
                <InputField
                  label="Scan Name"
                  onChange={(e) => handleFormData(e, 'scanName')}
                  id="scan-name"
                  placeholder="Scan Name"
                  value={formData.name}
                  errorText={validationError.scanName}
                  ref={scanNameRef}
                />
              </div>
              <div className="mr-5 flex-col">
                <label
                  className="text-base-700 mb-1 block text-sm font-medium"
                  htmlFor="wcagVersion"
                >
                  WCAG Version
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
                data={{
                  label: 'Make Recurring',
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
                      className="text-base-500"
                      value={formData.time}
                      ref={timeRef}
                    />
                  </div>
                  <div className="mt-4">
                    <Checkbox
                      name="instantRun"
                      onChange={(e) => handleFormData(e, 'instantRun')}
                      border={false}
                      data={{
                        label: 'Run intial scan'
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
                <Accordion
                  onTriggerClick={() => {}}
                  onChevronClick={() => {}}
                  openByDefault
                  panelContentNode={getAccordionBody()}
                  triggerContentNode={<div>Additional settings</div>}
                />
              </div>
            </div>
          </div>
          <div className="flex-col">
            <div
              className={`m-5 flex ${
                validationError.url ? 'items-center' : 'items-end'
              }`}
            >
              <div className="w-9/12">
                <InputField
                  label="Add pages"
                  onChange={(e) => handleFormData(e, 'url')}
                  id="scan-url"
                  placeholder="Sampleurl.com/home"
                  value={formData.url}
                  errorText={validationError.url}
                  ref={scanUrlRef}
                />
              </div>
              <Button
                onClick={(e) => handleFormData(e, 'addUrl')}
                size="small"
                type="subtle"
                wrapperClassName="ml-4"
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
                    handleFormData(Array.from(new Set(arr)), 'csvUpload');
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
                wrapperClassName="ml-4 w-36"
              >
                Upload CSV
              </Button>
            </div>
            <div>
              <div className="bg-base-50 text-base-500 py-3 px-6 text-xs">
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
              onClick={handlerCloseOver}
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
