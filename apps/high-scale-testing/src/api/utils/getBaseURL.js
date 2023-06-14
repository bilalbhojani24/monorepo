// const getBaseURL = (version = 'v1') => `/api/${version}`;
const getBaseURL = (version = 'v1') =>
  `https://localhost:8082/high-scale-testing/${version}`;

export { getBaseURL };
