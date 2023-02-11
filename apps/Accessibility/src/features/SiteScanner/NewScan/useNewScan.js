import { useState } from 'react';

import { isValidHttpUrl } from '../../../utils/helper';

export default function useNewScan() {
  const [recurringStatus, setRecurringStatus] = useState(false);
  const [formData, setFormData] = useState({});
  const [validationError, setValidationError] = useState({});

  const onRecurringStatus = () => {
    setRecurringStatus(!recurringStatus);
  };

  //   {
  //   name : "Site Scanner First Test",
  //   schedule_pattern : string (cron_exp)
  //   scanGenre : "scheduled" ( one_time or scheduled ), // recurring
  //   day: Monday,
  //   time: 124324523952349,
  //   scanData : {
  // 	"wcagVersion: "WCAG 2.1 AAA",
  // 	"needsReview" : true,
  // 	"bestPractices" : true,
  // 	"urlSet" : ["url1", "url2"]
  // 	}
  // }

  const checkForValidation = () => {
    if (
      !formData.wcagVersion ||
      !formData.scanName ||
      !formData?.scanData?.urlSet?.length ||
      (recurringStatus && !formData.data && !formData.time)
    ) {
      validationError.errors = true;
      setValidationError(true);
    }
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
        formDataObj.scanData.wcagVersion = e.target.textContent;
        break;
      case 'recurring':
        formDataObj.scanGenre = e.target.checked ? 'scheduled' : 'one_time';
        setRecurringStatus(!recurringStatus);
        break;
      case 'needsReview':
        formDataObj.needsReview = e;
        break;
      case 'bestPractices':
        formDataObj.bestPractices = e;
        break;
      case 'url':
        if (!isValidHttpUrl(formDataObj.url)) {
          validationErrorCpy.url = 'Please enter a valid URL';
        }
        if (!e.target.value || isValidHttpUrl(formDataObj.url)) {
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
      case 'submit':
        checkForValidation();
        break;
      default:
        break;
    }
    setFormData({ ...formDataObj });
    setValidationError({ ...validationErrorCpy });
  };

  return {
    recurringStatus,
    setRecurringStatus,
    onRecurringStatus,
    formData,
    handleFormData,
    validationError
  };
}
