import React from 'react';
import {
  Badge,
  Button,
  MdInsights,
  MdLogin,
  MdOutlineAnalytics,
  MdSpeed
} from '@browserstack/bifrost';
import authWallLoginBg from 'assets/authWallLoginBg.svg';
import cspAuthWallLogo from 'assets/cspAuthWallLogo.png';
import { AuthLoadingModal } from 'features/Dashboard';

import useAuthWallLogin from './useAuthWallLogin';

const AuthWallLogin = () => {
  const { authLoginButtonClicked } = useAuthWallLogin();

  return (
    <div
      className="flex min-h-screen flex-col items-center justify-center bg-contain bg-no-repeat"
      style={{ backgroundImage: `url(${authWallLoginBg})` }}
    >
      <div className="">
        <img src={cspAuthWallLogo} alt="loading..." className="mb-1 w-44" />
      </div>

      <div className="mb-4 flex items-center">
        <div className="text-3xl font-bold leading-10">
          BrowserStack App Performance
        </div>

        <Badge
          hasDot={false}
          hasRemoveButton={false}
          modifier="primary"
          isRounded
          size="large"
          text="Alpha"
          wrapperClassName="ml-2 mt-2"
        />
      </div>

      <div className="text-base-600 w-[720px] text-center text-xl font-normal leading-7">
        Detect & troubleshoot mobile app client-side performance issues before
        they impact your users.
      </div>

      <div className="my-14 flex w-[808px]">
        <div className="flex flex-1 flex-col items-center px-2">
          <div className="text-base-500 mb-3 text-5xl">
            <MdSpeed className="" />
          </div>

          <div className="text-base-900 text-center text-base font-normal leading-6">
            Easy set up without any code changes for any platform
          </div>
        </div>

        <div className="flex flex-1 flex-col items-center px-2">
          <div className="text-base-500 mb-3 text-5xl">
            <MdInsights className="" />
          </div>

          <div className="text-base-900 text-center text-base font-normal leading-6">
            Tracks key performance metrics like FPS, loading, CPU, memory, and
            battery usage, etc.
          </div>
        </div>

        <div className="flex flex-1 flex-col items-center px-2">
          <div className="text-base-500 mb-3 text-5xl">
            <MdOutlineAnalytics className="" />
          </div>

          <div className="text-base-900 text-center text-base font-normal leading-6">
            Helps identify performance hotspots through video recording and
            console logs.
          </div>
        </div>
      </div>

      <Button
        icon={<MdLogin />}
        variant="primary"
        colors="brand"
        size="large"
        onClick={authLoginButtonClicked}
        loading={false}
        loaderText="Logging In"
      >
        Login to run performance tests
      </Button>

      <AuthLoadingModal />
    </div>
  );
};

export default AuthWallLogin;
