import configMappings from 'constants/configMappings';

const getEnv = (stage = import.meta.env.BSTACK_STAGE) => {
  let guessedStage = 'local';
  if (!stage) {
    const { hostname } = window.location;

    if (hostname.endsWith('browserstack.com')) {
      guessedStage = 'production';
    } else if (hostname.includes('local')) {
      guessedStage = 'local';
    } else {
      guessedStage = 'staging';
    }
  }

  return guessedStage;
};

const getEnvConfig = (stage = import.meta.env.BSTACK_STAGE) => {
  const guessedStage = stage || getEnv();

  return configMappings[guessedStage];
};

export { getEnv, getEnvConfig };
