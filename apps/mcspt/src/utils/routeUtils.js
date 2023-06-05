export const decideCurrentRoute = () => {
  const locationHashFrags = window.location.href.split('#');

  if (locationHashFrags?.[1] !== undefined && locationHashFrags?.[1] !== '') {
    return locationHashFrags?.[1];
  }

  return '/';
};

export const purgeAmplitudeMemory = () => {
  window.cookieStore.getAll().then((cookies) =>
    cookies.forEach((cookie) => {
      window.cookieStore.delete(cookie.name);
    })
  );

  window.localStorage.clear();
};

export const reloadRootRoute = () => {
  window.location.href = window.location.href.split('#')?.[0];
};
