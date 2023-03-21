import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { MdLock, MdMail, MdOutlineTextSnippet } from '@browserstack/bifrost';
import { requestAccessAPI } from 'api/common.api';
import { TMButton, TMEmptyState } from 'common/bifrostProxy';
import AppRoute from 'const/routes';
import { addNotificaton } from 'globalSlice';

const AlphaAccess = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const requestAccess = () => {
    requestAccessAPI()
      .then((data) => {
        if (data.message === 'Already Accessible') {
          dispatch(
            addNotificaton({
              id: 'access_requested_done',
              title: data.message,
              description: 'Redirecting you to the main page'
            })
          );
          navigate(AppRoute.ROOT);
        } else
          dispatch(
            addNotificaton({
              id: 'access_requested',
              title: 'Access has been requested',
              description:
                "You've requested access for Test Management. Check email for updates.",
              variant: 'success'
            })
          );
      })
      .catch((err) => {
        if (err?.response?.data?.error)
          dispatch(
            addNotificaton({
              id: 'access_requested',
              title: 'Access alredy requested',
              description: err?.response?.data?.error,
              variant: 'success'
            })
          );
      });
  };

  return (
    <div className="bg-base-50 flex h-full w-full items-center justify-center">
      <div className="border-base-300 flex h-72 w-screen max-w-xl flex-col items-center justify-center rounded-md border">
        <TMEmptyState
          title="Test Management is in private-alpha"
          description="You don't have access to Test Management yet"
          mainIcon={
            <MdLock className="text-base-500 inline-block !h-12 !w-12" />
          }
          buttonProps={null}
        />
        <div className="mt-6 flex gap-4">
          <a href="https://www.browserstack.com/docs/test-management">
            <TMButton
              size="default"
              colors="white"
              icon={<MdOutlineTextSnippet className="h-5 w-5" />}
            >
              View Documentation
            </TMButton>
          </a>
          <TMButton
            size="default"
            icon={<MdMail className="h-5 w-5" />}
            onClick={requestAccess}
          >
            Request Access
          </TMButton>
        </div>
      </div>
    </div>
  );
};

export default AlphaAccess;
