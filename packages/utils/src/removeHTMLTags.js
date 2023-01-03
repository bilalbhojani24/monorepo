/** Remove Html tags */
export function removeHTMLTags(str) {
  if (str) {
    str = str.toString();
    /* Replacing the identified HTML tag with a null string. */
    return str.replace(/(<([^>]+)>)/gi, '');
  }

  return '';
}
