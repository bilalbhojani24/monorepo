const { injectAxe, checkA11y, getViolations } = require('axe-playwright');
const fs = require('fs');
const { getStoryContext } = require('@storybook/test-runner');

module.exports = {
  setup() {
    fs.mkdir(
      process.cwd() + '/accessibility_results/',
      { recursive: true },
      (err) => {
        if (err) throw err;
      }
    );
  },
  async preRender(page) {
    await injectAxe(page);
  },
  async postRender(page, context) {
    const violations = await getViolations(page, '#root', {
      detailedReport: true
    });

    const storyContext = await getStoryContext(page, context);
    if (violations[0] && violations.length > 0)
      violations[0].component_name = storyContext.name;

    // Write violations to file
    await new Promise((resolve, reject) => {
      fs.appendFile(
        process.cwd() + `/accessibility_results/a11y_test_results.json`,
        JSON.stringify(violations, null, 2),
        (err) => {
          if (err) reject(err);
          resolve();
        }
      );
    });

    await checkA11y(page, '#root', {
      detailedReport: true,
      detailedReportOptions: {
        html: true
      }
    });
  }
};
