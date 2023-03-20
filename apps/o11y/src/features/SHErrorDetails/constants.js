export const TABS = {
  platforms: 'Platforms',
  runs: 'Runs'
};

export const SH_UE_DETAILS_CUSTOM_SCROLL_PARENT_ID =
  'sh-ue-details-scroll-parent';

export const PLATFORM_HEADER_LABEL_MAPPING = {
  platforms_combinations: 'Platform Combinations',
  errorCount: 'Error Count',
  totalFailures: 'Total Failures'
};

export const PLATFORM_HEADER_CELLS_MAPPING = {
  platforms_combinations: {
    name: PLATFORM_HEADER_LABEL_MAPPING.platforms_combinations,
    defaultClass: 'w-7/12 whitespace-normal py-3 uppercase'
  },
  errorCount: {
    name: PLATFORM_HEADER_LABEL_MAPPING.errorCount,
    defaultClass: 'py-3 uppercase'
  },
  totalFailures: {
    name: PLATFORM_HEADER_LABEL_MAPPING.totalFailures,
    defaultClass: 'py-3 uppercase'
  }
};
