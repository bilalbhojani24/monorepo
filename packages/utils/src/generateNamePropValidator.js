const generateNamePropValidator = (name) => (propValue, key, componentName, location, propFullName) =>
  propValue[key].type.name === name
    ? undefined
    : new Error(
        `Invalid prop '${propFullName}' supplied to '${componentName}', expected '${name}'. Validation failed.`
      );

export default generateNamePropValidator;
