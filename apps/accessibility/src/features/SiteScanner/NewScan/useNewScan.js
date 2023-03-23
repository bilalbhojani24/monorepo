/* eslint-disable no-case-declarations */
import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { postNewScanConfig } from 'api/siteScannerScanConfigs';
import parser from 'cron-parser';
import cronTime from 'cron-time-generator';
import cronstrue from 'cronstrue';
import { addZero } from 'utils/helper';
import { logEvent } from 'utils/logEvent';

import { getScanConfigs } from '../slices/dataSlice';

import { dayMap, days, urlPattern, wcagVersions } from './constants';

const DAILY = 'daily';
const WEEKLY = 'weekly';

function getKeyByValue(object, value) {
  return Object.keys(object).find((key) => object[key] === value);
}

function toHoursAndMinutes(totalMinutes) {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return { hours, minutes };
}
export default function useNewScan(closeSlideover, preConfigData, show) {
  const [recurringStatus, setRecurringStatus] = useState(true);
  const [formData, setFormData] = useState({
    recurring: true,
    instantRun: true,
    scanData: {
      wcagVersion: wcagVersions[0],
      needsReview: true,
      bestPractices: false
    },
    day: days[0].body,
    time: '12:00',
    type: WEEKLY
  });
  const [showToast, setShowToast] = useState(false);
  const [validationError, setValidationError] = useState({});
  const dispatch = useDispatch();
  const scanNameRef = useRef();
  const timeRef = useRef();
  const scanUrlRef = useRef();
  const fileUploadRef = useRef();

  const getWcagVersionFromBody = (val) =>
    wcagVersions.filter((version) => version.body === val)[0];

  const getWcagVersionFromVal = (val) =>
    wcagVersions.filter((version) => version.id === val)[0];

  useEffect(() => {
    const formDataCpy = { ...formData };
    if (preConfigData) {
      formDataCpy.name = preConfigData.name;
      setRecurringStatus(preConfigData.recurring);
      formDataCpy.recurring = preConfigData.recurring;
      formDataCpy.scanData.needsReview = preConfigData.scanData.needsReview;
      formDataCpy.scanData.bestPractices = preConfigData.scanData.bestPractices;
      formDataCpy.scanData.wcagVersion = getWcagVersionFromVal(
        preConfigData.scanData.wcagVersion.value
      );
      formDataCpy.scanData.urlSet = preConfigData.scanData.urlSet;
      let schedulePatternVerbose = '';
      if (preConfigData.recurring) {
        schedulePatternVerbose = cronstrue.toString(
          preConfigData.schedulePattern,
          {
            use24HourTimeFormat: true,
            verbose: true
          }
        );

        // Interval from parser
        const interval = parser.parseExpression(preConfigData.schedulePattern);
        if (schedulePatternVerbose.includes('every day')) {
          formDataCpy.type = DAILY;
          const hours = new Date(interval.next().toString()).getHours();
          const minutes = addZero(
            new Date(interval.next().toString()).getMinutes()
          );
          formDataCpy.time = `${hours}:${minutes}`;
        } else {
          formDataCpy.type = WEEKLY;
          const day = new Date(interval.next().toString()).getDay();
          const hours = new Date(interval.next().toString()).getHours();
          const minutes = addZero(
            new Date(interval.next().toString()).getMinutes()
          );
          formDataCpy.day = dayMap[day];
          formDataCpy.time = `${hours}:${minutes}`;
        }
      }
      setFormData(formDataCpy);
      console.log(preConfigData, formDataCpy, schedulePatternVerbose);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [preConfigData]);

  const onRecurringStatus = () => {
    setRecurringStatus(!recurringStatus);
  };

  const checkForValidation = () => {
    if (
      !formData?.scanData?.wcagVersion ||
      !formData.name ||
      !formData?.scanData?.urlSet?.length ||
      (recurringStatus && (!formData.day || !formData.time))
    ) {
      const validationErrorCpy = {};
      if (!formData?.scanData?.urlSet?.length) {
        validationErrorCpy.url = 'Please enter a valid URL';
      }
      if (!formData?.name) {
        validationErrorCpy.scanName = 'Name is not specified.';
      }
      console.log(validationErrorCpy);
      setValidationError({ ...validationErrorCpy });
      return false;
    }

    return true;
  };
  const handlerCloseOver = () => {
    setFormData({
      scanData: {
        wcagVersion: wcagVersions[0],
        needsReview: true,
        bestPractices: false
      },
      recurring: true,
      day: days[0].body,
      time: '12:00',
      type: WEEKLY
    });
    scanNameRef.current.value = '';
    if (timeRef.current) {
      timeRef.current.value = '';
    }
    scanUrlRef.current.value = null;
    setRecurringStatus(true);
    document.querySelector('#recurring').checked = false;
    closeSlideover();
    setValidationError({});
  };

  const handleFormData = (e, name) => {
    const formDataObj = { ...formData };
    const validationErrorCpy = { ...validationError };
    switch (name) {
      case 'scanName':
        if (!e.target.value) {
          validationErrorCpy[name] = 'Please enter a valid scan name';
        } else {
          delete validationErrorCpy[name];
        }
        formDataObj.name = e.target.value;
        break;
      case 'wcagVersion':
        if (!formDataObj.scanData) {
          formDataObj.scanData = {};
        }
        formDataObj.scanData.wcagVersion = getWcagVersionFromBody(e.body);
        break;
      case 'recurring':
        formDataObj.recurring = e.target.checked;
        setRecurringStatus(!recurringStatus);
        break;
      case 'needsReview':
        formDataObj.scanData.needsReview = e;
        break;
      case 'bestPractices':
        formDataObj.scanData.bestPractices = e;
        break;
      case 'url':
        formDataObj.url = e.target.value;
        delete validationErrorCpy.url;
        break;
      case 'day':
        formDataObj.day = e.body;
        break;
      case 'time':
        formDataObj.time = e.target.value;
        break;
      case 'addUrl':
        if (!urlPattern.test(formDataObj.url)) {
          validationErrorCpy.url = 'Please enter a valid URL';
          break;
        }
        if (!formDataObj.scanData) {
          formDataObj.scanData = {};
        }
        if (!formDataObj.scanData.urlSet) {
          formDataObj.scanData.urlSet = [];
        }
        if (!formDataObj.scanData.urlSet.includes(formDataObj.url)) {
          formDataObj.scanData.urlSet.push(formDataObj.url);
        }
        delete formDataObj.url;
        scanUrlRef.current.value = '';
        break;
      case WEEKLY:
      case DAILY:
        formDataObj.type = name;
        break;
      case 'csvUpload':
        if (!formDataObj.scanData) {
          formDataObj.scanData = {};
        }
        if (!formDataObj.scanData.urlSet) {
          formDataObj.scanData.urlSet = [];
        }
        formDataObj.scanData.urlSet.push(...e);
        formDataObj.scanData.urlSet = Array.from(
          new Set(formDataObj.scanData.urlSet)
        );
        fileUploadRef.current.value = null;
        break;
      case 'deleteUrl':
        formDataObj.scanData.urlSet.splice(
          formDataObj.scanData.urlSet.indexOf(e),
          1
        );
        //
        break;
      case 'instantRun':
        // Instant Run handler
        formDataObj.instantRun = e.target.checked;
        break;
      case 'submit':
        if (checkForValidation()) {
          const payload = { ...formData };
          /* Time zone offset cron logic */
          const timezoneOffset = new Date().getTimezoneOffset();
          const timeval = formData.time.split(':');
          // eslint-disable-next-line radix
          const minutes = parseInt(timeval[0]) * 60 + parseInt(timeval[1]);

          const diff = minutes + timezoneOffset;
          let finalUTCValue = toHoursAndMinutes(diff);
          let dayVal = formData.day;
          if (diff < 0) {
            dayVal = dayMap[getKeyByValue(dayMap, formData.day) - 1];
            finalUTCValue = toHoursAndMinutes(1440 + diff);
          }
          if (diff > 1439) {
            dayVal = dayMap[getKeyByValue(dayMap, formData.day) + 1];
            finalUTCValue = toHoursAndMinutes(diff - 1440);
          }

          if (formData.recurring) {
            if (formData.type === WEEKLY) {
              payload.schedulePattern = cronTime.onSpecificDaysAt(
                [dayVal.toLowerCase()],
                finalUTCValue.hours,
                finalUTCValue.minutes
              );
            } else {
              payload.schedulePattern = cronTime.everyDayAt(
                finalUTCValue.hours,
                finalUTCValue.minutes
              );
            }
          }
          delete payload.day;
          delete payload.time;
          delete payload.url;
          delete payload.type;
          const selectedWcagVersion = formData.scanData.wcagVersion.body
            ? getWcagVersionFromBody(formData.scanData.wcagVersion.body)
            : getWcagVersionFromVal(formData.scanData.wcagVersion.value);
          payload.scanData.wcagVersion = {
            label: selectedWcagVersion.body,
            value: selectedWcagVersion.id
          };
          logEvent('InteractedWithWSNewWebsiteScanSlideOver', {
            actionType: 'Scan changes',
            action: 'Create Scan',
            scanFrequency: recurringStatus ? formData.type : null,
            scanType: recurringStatus ? 'Recurring scan' : 'On-demand scan',
            scanTime: recurringStatus
              ? formData.time
              : new Date().toLocaleTimeString(),
            wcagVersion: formData.scanData.wcagVersion.label,
            day: recurringStatus
              ? formData.day
              : new Date().toLocaleDateString(),
            bestPractices: formData.scanData.bestPractices,
            needsReview: formData.scanData.needsReview
          });

          postNewScanConfig(payload)
            .then(() => {
              dispatch(getScanConfigs());
              setShowToast(true);
              handlerCloseOver();
            })
            .catch((err) => console.log(err));
        } else {
          // console.log(validationError, formData);
        }
        break;
      default:
        break;
    }
    setFormData({ ...formDataObj });
    if (name !== 'submit') {
      setValidationError({ ...validationErrorCpy });
    }
  };
  return {
    recurringStatus,
    setRecurringStatus,
    onRecurringStatus,
    formData,
    handleFormData,
    validationError,
    handlerCloseOver,
    scanNameRef,
    timeRef,
    scanUrlRef,
    fileUploadRef,
    setShowToast,
    showToast
  };
}
