export const routeFormatter = (link, replaceConf) => {
  let tempLink = link;
  if (replaceConf)
    Object.keys(replaceConf).forEach((keyValue) => {
      tempLink = tempLink.replace(`:${keyValue}`, replaceConf[keyValue]);
    });

  tempLink = tempLink.split(':')[0].replace(/[?]/g, '');
  return tempLink.slice(-1) === '/' ? tempLink.slice(0, -1) : tempLink;
};
