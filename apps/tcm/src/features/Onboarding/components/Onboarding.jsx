import React from 'react';
import { TMButton, TMSelectMenu } from 'common/bifrostProxy';

import { SETUP_FORMATS } from '../const/immutableConst';

import FormatCard from './FormatCard';
import useOnboarding from './useOnboarding';

const Onboarding = () => {
  const {
    isProcessing,
    userData,
    formData,
    orgStrengthArray,
    jobRolesArray,
    onFormChange,
    continueClickHandler
  } = useOnboarding();
  return (
    <div className="flex h-full w-full items-start justify-center py-10">
      <div className="border-base-300 max-h-full w-screen max-w-4xl overflow-y-auto rounded-md border bg-white p-5">
        <div className="text-2xl font-medium">
          Hey&nbsp;
          {userData?.full_name?.split(' ').length
            ? userData?.full_name?.split(' ')[0]
            : ''}
          , Welcome to Test Management
        </div>
        <div className="text-base-500 mt-4 text-sm">
          We just need some details to help you serve better
        </div>

        <div className="mt-6 max-w-sm">
          <TMSelectMenu
            label="Which job role best describes you?*"
            placeholder="Select from options"
            options={jobRolesArray}
            onChange={(val) => onFormChange('role', val.value)}
          />
        </div>
        <div className="mt-6 max-w-sm">
          <TMSelectMenu
            label="What's your organisation strength?*"
            placeholder="Select from options"
            options={orgStrengthArray}
            onChange={(val) => onFormChange('organisation_strength', val.value)}
          />
        </div>
        <div className="mt-6">
          <div className="text-base">Choose your setup format</div>
          <div className="mt-4 flex  gap-4">
            {SETUP_FORMATS.map((item) => (
              <FormatCard
                key={item.id}
                title={item.title}
                id={item.id}
                description={item.description}
                badgeText={item.badgeText}
                isSelected={item.title === formData.start_method}
                onClick={(val) => onFormChange('start_method', val)}
              />
            ))}
          </div>
        </div>
        <div className="mt-12 flex w-full justify-end">
          <TMButton
            size="default"
            onClick={continueClickHandler}
            loading={isProcessing}
          >
            Contine
          </TMButton>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
