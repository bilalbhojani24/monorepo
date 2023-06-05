const getEnvConfig = (config = import.meta.env.BSTACK_STAGE) => {
  console.log('Log: config:', config);
};

export { getEnvConfig };
