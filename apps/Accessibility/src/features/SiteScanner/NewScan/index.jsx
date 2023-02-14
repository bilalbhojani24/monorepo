import React from 'react';
import {
  Accordion,
  Button,
  Checkbox,
  Dropdown,
  InputField,
  MdDelete,
  Switch
} from '@browserstack/bifrost';
import PropTypes from 'prop-types';

import {
  ASSlideover,
  ASSlideoverFooter,
  ASSlideoverHeader
} from '../../../middleware/bifrost';

import { days, wcagVersions } from './constants';
import useNewScan from './useNewScan';

const NewScan = ({ show, closeSlideover }) => {
  const {
    recurringStatus,
    formData,
    handleFormData,
    validationError,
    handlerCloseOver,
    timeRef,
    scanNameRef,
    scanUrlRef
  } = useNewScan(closeSlideover);

  const getAccordionBody = () => (
    <div className="px-2 pt-2">
      <Switch
        leftLabel="Include Needs Review issues"
        leftDescription="Issues marked as Needs Review needs manual inspection to confirm it’s validity."
        onChange={(e) => handleFormData(e, 'needsReview')}
      />
      <Switch
        leftLabel="Include Best Practices issues"
        leftDescription="Issues marked as Best practices aren't Accessibility guideline violations, but resolving them will improve the overall user experience."
        onChange={(e) => handleFormData(e, 'bestPractices')}
      />
    </div>
  );
  return (
    <div>
      <ASSlideover
        show={show}
        slideoverWidth="max-w-screen-md w-screen overflow-y"
        onOverlayClick={handlerCloseOver}
        backgroundOverlay
        onClose={handlerCloseOver}
      >
        <ASSlideoverHeader
          dismissButton
          handleDismissClick={handlerCloseOver}
          heading="New website scan"
          subHeading="Setup your new website scan"
          backgroundColorClass="bg-base-50"
        />
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
                defaultValue={formData.name}
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
                triggerTitle={formData?.scanData?.wcagVersion.body}
                options={wcagVersions}
                heading="WCAG Version"
                onClick={(e) => handleFormData(e, 'wcagVersion')}
                id="wcagVersion"
              />
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
            />
            {recurringStatus ? (
              <div className="flex items-center pt-5">
                <span className="mr-2">On the </span>
                <Dropdown
                  triggerTitle={formData.day || 'Day'}
                  options={days}
                  onClick={(e) => handleFormData(e, 'day')}
                  id="recurring-days"
                />
                <span className="mx-2">of every week, at</span>
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
            ) : (
              ''
            )}
            <div className="pt-2">
              <Accordion
                onTriggerClick={() => {}}
                onChevronClick={() => {}}
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
            <Button
              colors="white"
              onClick={() => {}}
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
                    <MdDelete />
                  </div>
                ))
              : null}
          </div>
        </div>
        <ASSlideoverFooter position="right" isBorder>
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
              disabled={Object.keys(validationError).length}
            >
              Create
            </Button>
          </div>
        </ASSlideoverFooter>
      </ASSlideover>
    </div>
  );
};

NewScan.defaultProps = {
  show: false,
  closeSlideover: () => {}
};

NewScan.propTypes = {
  show: PropTypes.bool,
  closeSlideover: PropTypes.func
};

export default NewScan;
