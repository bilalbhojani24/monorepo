import { useEffect, useState } from 'react';

export default function useMediaPlayerSeekbar(exceptions, currentTime) {
  const [warningProgress, setWarningProgress] = useState(false);
  const [errorProgress, setErrorProgress] = useState(false);

  useEffect(() => {
    if (warningProgress) setWarningProgress(false);
    if (errorProgress) setErrorProgress(false);

    exceptions.forEach((exception) => {
      if (Math.round(currentTime) === Math.round(exception.startTime)) {
        if (exception.type === 'warning') setWarningProgress(true);
        else if (exception.type === 'error') setErrorProgress(true);
      }
    });
  }, [currentTime, errorProgress, exceptions, warningProgress]);

  return {
    warningProgress,
    errorProgress
  };
}
