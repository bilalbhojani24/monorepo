export default function removeExtraSpaceFromStart(string) {
  let cookieString = string;
  while (cookieString.charAt(0) === ' ') {
    cookieString = cookieString.substring(1, cookieString.length);
  }
  return cookieString;
}
