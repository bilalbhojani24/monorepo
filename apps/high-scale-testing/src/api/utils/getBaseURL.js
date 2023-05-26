// const getBaseURL = (version = 'v1') => `/api/${version}`;

const getBaseURL = (version = 'v1') =>
  `https://localhost:8082/high-scale-testing/${version}`;
// `http://localhost:5000/api/${version}`;

export { getBaseURL };
