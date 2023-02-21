import { useEffect, useRef, useState } from 'react';
import parser from 'cron-parser';
import cronTime from 'cron-time-generator';
import cronstrue from 'cronstrue';

import { addZero, isValidHttpUrl } from '../../../utils/helper';

import { dayMap, days, wcagVersions } from './constants';

const DAILY = 'daily';
const WEEKLY = 'weekly';

export default function useNewScan(closeSlideover, preConfigData) {
  const [recurringStatus, setRecurringStatus] = useState(false);
  const [formData, setFormData] = useState({
    scanData: {
      wcagVersion: wcagVersions[0],
      needsReview: true,
      bestPractices: false
    },
    day: days[0].body,
    time: '12:00',
    type: WEEKLY
  });
  const [validationError, setValidationError] = useState({});

  const scanNameRef = useRef();
  const timeRef = useRef();
  const scanUrlRef = useRef();

  const getWcagVersionFromBody = (val) =>
    wcagVersions.filter((version) => version.body === val)[0];

  const getWcagVersionFromVal = (val) =>
    wcagVersions.filter((version) => version.id === val)[0];

  useEffect(() => {
    const formDataCpy = { ...formData };
    if (preConfigData) {
      formDataCpy.name = preConfigData.name;
      setRecurringStatus(preConfigData.recurring);
      formDataCpy.scanData.needsReview = preConfigData.scanData.needsReview;
      formDataCpy.scanData.bestPractices = preConfigData.scanData.bestPractices;
      formDataCpy.scanData.wcagVersion = getWcagVersionFromVal(
        preConfigData.scanData.wcagVersion
      );
      formDataCpy.scanData.urlSet = preConfigData.scanData.urlSet;
      const schedulePatternVerbose = cronstrue.toString(
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
      setFormData(formDataCpy);
      console.log(preConfigData.name, formDataCpy, schedulePatternVerbose);
    }
    //     {
    //     "success": true,
    //     "data": {
    //         "name": "scan name",
    //         "recurring": true,
    //         "schedulePattern": "00 12 * * 1",
    //         "scanData": {
    //             "needsReview": true,
    //             "bestPractices": true,
    //             "wcagVersion": "wcag21aa",
    //             "urlSet": [
    //                 "browserstack.com"
    //             ]
    //         }
    //     }
    // }
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
      validationError.errors = true;
      setValidationError(true);
      return false;
    }

    return true;
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

        formDataObj.scanData.wcagVersion = getWcagVersionFromBody(
          e.target.textContent
        );
        break;
      case 'recurring':
        formDataObj.recurring = e.target.checked;
        setRecurringStatus(!recurringStatus);
        break;
      case 'needsReview':
        formDataObj.needsReview = e;
        break;
      case 'bestPractices':
        formDataObj.bestPractices = e;
        break;
      case 'url':
        if (!isValidHttpUrl(`https://${formDataObj.url}`)) {
          validationErrorCpy.url = 'Please enter a valid URL';
        }
        if (!e.target.value || isValidHttpUrl(`https://${formDataObj.url}`)) {
          delete validationErrorCpy.url;
        }
        formDataObj.url = e.target.value;
        break;
      case 'day':
        formDataObj.day = e.target.textContent;
        break;
      case 'time':
        formDataObj.time = e.target.value;
        break;
      case 'addUrl':
        if (!formDataObj.scanData) {
          formDataObj.scanData = {};
        }
        if (!formDataObj.scanData.urlSet) {
          formDataObj.scanData.urlSet = [];
        }
        if (!formDataObj.scanData.urlSet.includes(formDataObj.url)) {
          formDataObj.scanData.urlSet.push(formDataObj.url);
        }
        break;
      case WEEKLY:
      case DAILY:
        formDataObj.type = name;
        break;
      case 'submit':
        if (checkForValidation()) {
          const payload = { ...formData };
          const time = formData.time.split(':');
          if (formData.recurring) {
            if (formData.type === WEEKLY) {
              payload.schedulePattern = cronTime.onSpecificDaysAt(
                [formData.day.toLowerCase()],
                time[0],
                time[1]
              );
            } else {
              payload.schedulePattern = cronTime.everyDayAt(time[0], time[1]);
            }
          }
          delete payload.day;
          delete payload.time;
          delete payload.url;
          delete payload.type;
          const selectedWcagVersion = getWcagVersionFromBody(
            formData.scanData.wcagVersion.body
          );
          payload.scanData.wcagVersion = {
            label: selectedWcagVersion.body,
            value: selectedWcagVersion.id
          };
          console.log(payload);
        } else {
          console.log(validationError, formData);
        }
        break;
      default:
        break;
    }
    setFormData({ ...formDataObj });
    setValidationError({ ...validationErrorCpy });
  };

  const handlerCloseOver = () => {
    setFormData({
      scanData: {
        wcagVersion: wcagVersions[0],
        needsReview: true,
        bestPractices: true
      },
      day: days[0].body,
      time: '12:00'
    });
    scanNameRef.current.value = '';
    if (timeRef.current) {
      timeRef.current.value = '';
    }
    scanUrlRef.current.value = '';
    setRecurringStatus(false);
    document.querySelector('#recurring').checked = false;
    closeSlideover();
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
    scanUrlRef
  };
}
