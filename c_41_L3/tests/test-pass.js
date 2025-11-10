require('dotenv').config();
const { Builder, By, until } = require('selenium-webdriver');

(async function testPass() {
  const driver = await new Builder()
    .usingServer(`https://${process.env.BROWSERSTACK_USERNAME}:${process.env.BROWSERSTACK_ACCESS_KEY}@hub-cloud.browserstack.com/wd/hub`)
    .withCapabilities({
      'browserName': 'Chrome',
      'browserVersion': 'latest',
      'bstack:options': {
        os: 'Windows',
        osVersion: '11',
        projectName: 'CI Demo',
        buildName: 'Test Gating Run',
        sessionName: 'Passing Test Example'
      }
    })
    .build();

  try {
    await driver.get('https://www.example.com');
    const title = await driver.getTitle();
    if (title.includes('Example Domain')) {
      console.log('✅ test-pass.js PASSED');
    } else {
      throw new Error('Title mismatch');
    }
  } finally {
    await driver.quit();
  }
})();
