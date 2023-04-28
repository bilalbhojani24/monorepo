export const parseJenkinsBuildParams = (data) => {
  const parameters = [];
  const parametersArray = data.find(
    // eslint-disable-next-line no-underscore-dangle
    (item) => item._class === 'hudson.model.ParametersAction'
  );
  if (parametersArray) {
    parametersArray.parameters.forEach((item) => {
      parameters.push({
        name: item.name,
        value: item.value
      });
    });
  }
  return parameters;
};
