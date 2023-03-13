import React, { useEffect } from 'react';
import { MdCheckCircle } from '@browserstack/bifrost';
import { getStorage, setStorage } from '@browserstack/utils';

export default function Welcome() {
  const isReloaded = getStorage('reloaded');
  useEffect(() => {
    if (!isReloaded) {
      window.location.reload();
      setStorage('reloaded', true);
    }
  }, []);

  return (
    isReloaded && (
      <div className="bg-base-50 flex h-screen w-screen items-center justify-center">
        <div className="w-1/2 bg-white shadow">
          <div className="border-base-200 flex items-center justify-center border-b py-6">
            <img
              src="https://d2ogrdw2mh0rsl.cloudfront.net/production/images/static/logo.svg"
              alt="browserstack-logo"
              className="h-9"
            />
          </div>
          <div className="flex flex-col items-center justify-center pt-12 pb-8">
            <MdCheckCircle className="text-success-700 mb-4 text-5xl" />
            <p className="text-base-900 w-96 text-center text-base">
              You have successfully signed in. You can go ahead and close
              this tab now.
            </p>
          </div>
        </div>
      </div>
    )
  );
}
