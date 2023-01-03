const getUrlParams = (searchParam) => {
  const urlString = window.location.href;
  const url = new URL(urlString);
  return url?.searchParams?.get(searchParam) || '';
};

export default getUrlParams;
