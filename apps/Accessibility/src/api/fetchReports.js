import { data } from './data';

export default function fetchReports() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data.data.reports);
    }, 1000);
  });
}
