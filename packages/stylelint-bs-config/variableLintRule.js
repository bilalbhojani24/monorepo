const stylelint = require('stylelint');

const variables = { common: {}, trike: { color: {}, font: {}, spacing: {} } }; // Store the variables in object
const ruleName = 'browserstack/consistent-css-variables';
const { report, ruleMessages, validateOptions } = stylelint.utils;

const messages = ruleMessages(ruleName, {
  expected: function expected(property) {
    return `"${property}" expects a variable. None defined.`;
  },
  expectedPresent: function expectedPresent(property, variable) {
    return `"${property}" expects variable ${variable}.`;
  }
});

const isStringRegex = (string) => string[0] === '/' && string[string.length - 1] === '/';

const toRegex = (string) => new RegExp(string.slice(1, -1));

const checkValue = (val, exceptions = []) => {
  // Regex for checking scss variable starting with '$'
  // map-get function in scss
  // custom properties '--' or 'var'
  const regEx = /^(\$)|(map-get)|(--)|(var)/g;

  const filteredValues = exceptions.filter((exception) => {
    if (isStringRegex(exception)) {
      if (toRegex(exception).test(val)) return true;
    } else if (exception === val) return true;
    return false;
  });

  if (filteredValues.length) return true;

  return regEx.test(val);
};

const checkPresentVariable = (productEnv, val) =>
  variables[productEnv] && variables[productEnv][val] ? variables[productEnv][val] : false;

const testAgainstString = (prop, value, source, mappedFiles, comparison) => {
  // if prop is a variable do not run check
  // and add it in the variables object for later check
  // and return, since it would be a variable declaration
  // not a style property declaration
  const selectedEnv = Object.keys(mappedFiles).find((key) =>
    mappedFiles[key] ? source.input.file.match(mappedFiles[key].filePath) : false
  );
  const productEnv = selectedEnv || 'common';
  const isAccepted = mappedFiles[selectedEnv] ? !!source.input.file.match(mappedFiles[selectedEnv].styles) : true;

  if (!variables[productEnv]) {
    variables[productEnv] = {};
  }

  if (checkValue(prop) && isAccepted) {
    variables[productEnv][value] = prop;
    return { productEnv, isProp: false };
  }

  if (isStringRegex(comparison)) {
    return { productEnv, isProp: new RegExp(comparison.slice(1, -1)).test(prop) };
  }

  return { productEnv, isProp: prop === comparison };
};

const checkProp = (prop, value, source, mappedFiles, targets) => {
  let selectedEnv;
  let propFlag = false;
  targets.forEach((target) => {
    const { productEnv, isProp } = testAgainstString(prop, value, source, mappedFiles, target);
    if (isProp) {
      selectedEnv = productEnv;
      propFlag = true;
    }
  });
  return { productEnv: selectedEnv, isProp: propFlag };
};

const parseOptions = (options, propertyConfigs) => {
  const parsed = {
    targets: [],
    ignoreValues: ['/color\\(/', '/rgba?\\(\\$/', '/text-font-size\\(/', '/heading-font-size\\(/'],
    mappedFiles: propertyConfigs.mappedFiles || {}
  };
  if (propertyConfigs.ignoreValues) {
    parsed.ignoreValues = [...parsed.ignoreValues, ...propertyConfigs.ignoreValues];
  }

  parsed.targets = Array.isArray(options) ? options : [options];
  return parsed;
};

const addTrikeVariables = (statement) => {
  const { prop, value, source } = statement;
  const fileName = source.input.file;
  if (fileName.match('base.scss')) {
    variables.trike.color[value] = prop;
    return;
  }
  if (fileName.match('colors.scss')) {
    Object.keys(variables.trike.color).forEach((key) => {
      if (variables.trike.color[key] === value) {
        variables.trike.color[key] = prop;
      }
    });
    return;
  }
  if (fileName.match('fonts.scss')) {
    variables.trike.font[value] = prop;
    return;
  }
  if (fileName.match('spacings.scss')) {
    variables.trike.spacing[value] = prop;
  }
};

module.exports = stylelint.createPlugin(ruleName, (properties, propertyConfigs, context) => {
  const options = parseOptions(properties || [], propertyConfigs);

  return (postcssRoot, result) => {
    const validOptions = validateOptions({
      ruleName,
      result,
      actual: options
    });

    if (!validOptions) {
      return;
    }

    const isAutoFixing = Boolean(context.fix);
    postcssRoot.walkDecls((statement) => {
      const { productEnv, isProp } = checkProp(
        statement.prop,
        statement.value,
        statement.source,
        options.mappedFiles,
        options.targets
      );

      if (statement.source.input.file.match('styles/Trike/')) {
        addTrikeVariables(statement);
        return;
      }
      let associatedVariable = null;

      if (statement.prop === 'font-size' && variables.trike.font[statement.value]) {
        associatedVariable = variables.trike.font[statement.value];
      } else if (statement.prop.match('color') && variables.trike.color[statement.value]) {
        associatedVariable = variables.trike.color[statement.value];
      } else if (
        (statement.prop.match('padding') || statement.prop.match('margin')) &&
        variables.trike.spacing[statement.value]
      ) {
        associatedVariable = variables.trike.spacing[statement.value];
      }

      if (!associatedVariable && !(statement.prop.match('padding') || statement.prop.match('margin'))) {
        associatedVariable = checkPresentVariable(productEnv, statement.value);
      }

      if (isAutoFixing && associatedVariable && !checkValue(statement.value, options.ignoreValues)) {
        statement.value = associatedVariable;
      } else if (isProp && !checkValue(statement.value, options.ignoreValues)) {
        report({
          ruleName,
          result,
          node: statement,
          message: associatedVariable
            ? messages.expectedPresent(statement.prop, associatedVariable)
            : messages.expected(statement.prop)
        });
      }
    });
  };
});

module.exports.ruleName = ruleName;
module.exports.messages = messages;
