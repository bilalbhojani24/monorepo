// import to the stories component of and call the function, pass the cmponent, open browsrr console
// import argTypeCreator from 'app/_modules/_shared/argTypeCreator';
// console.log(argTypeCreator(RadioButtons));

const devDocHelper = (Component) => {
  const argTypes = {};
  for (const propItem in Component.propTypes) {
    debugger;
    const extractData = Component.propTypes[propItem].info;
    argTypes[propItem] = {
      type: { summary: getType(extractData.propTypeName) },
      description: getDescription(propItem),
      control: { type: getControl(extractData.propTypeName) },
      defaultValue: { summary: Component.defaultProps[propItem] || 'null' }
    };

    if (extractData.isRequired) {
      argTypes[propItem].type.required = extractData.isRequired;
    }
  }

  console.log(JSON.stringify(argTypes));
  //   return argTypes;
};

const getType = (type) => {
  if (type === 'bool') return 'BOOLEAN';
  return type.toUpperCase();
};

const getControl = (type) => {
  switch (type) {
    case 'string':
      return 'text';
      break;
    case 'bool':
      return 'boolean';
      break;
    default:
      return 'null';
  }
};

const getDescription = (name) => {
  switch (name) {
    case 'wrapperClassName':
      return 'Additional wrapper class name for the component for custom styling, set to the main wrapper';
      break;
    case 'className':
      return 'Additional class name for the component for custom styling, set to the main wrapper';
      break;
    default:
      return 'THISISUNAVAILABLE';
  }
};
export default devDocHelper;
