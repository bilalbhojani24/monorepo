import envMapping from '../constants/envMapping';

export const getEnvConfig = (env = import.meta.env.BSTACK_STAGE) => {
  if (!env) {
    let guessedEnv = '';
    if (window.location.hostname.endsWith('browserstack.com')) {
      guessedEnv = 'production';
    } else if (window.location.hostname.includes('local')) {
      guessedEnv = 'local';
    } else {
      guessedEnv = 'staging';
    }
    return envMapping[guessedEnv];
  }
  // TODO: Keeping  default  stage to staging for now, until production env is ready
  return envMapping[env] || envMapping.staging;
};
