const getDateDiff = (date1, date2 = new Date().toJSON()) => {
  const dt1 = new Date(date1);
  const dt2 = new Date(date2);
  const DifferenceInTime = dt2.getTime() - dt1.getTime();
  return DifferenceInTime / (1000 * 3600 * 24);
};

export default getDateDiff;
