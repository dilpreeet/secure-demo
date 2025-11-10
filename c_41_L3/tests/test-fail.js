require('dotenv').config();
const { Builder, By } = require('selenium-webdriver');

(async function testFail() {
  const driver = await new Builder()
    .usingServer(`https://${process.env.BROWSERSTACK_USERNAME}:${process.env.BROWSERSTACK_ACCESS_KEY}@hub-cloud.browserstack.com/wd/hub`)
    .withCapabilities({
      'browserName': 'Safari',
      'browserVersion': 'latest',
      'bstack:options': {
        os: 'OS X',
        osVersion: 'Sequoia',
        projectName: 'CI Demo',
        buildName: 'Test Gating Run',
        sessionName: 'Failing Test Example'
      }
    })
    .build();

  try {
    await driver.get('https://www.example.com');
    // ❌ intentionally wrong selector
    await driver.findElement(By.id('nonexistent-element')).click();
    console.log('✅ test-fail.js PASSED (unexpectedly)');
  } catch (err) {
    console.error('❌ test-fail.js FAILED:', err.message);
    process.exit(1); // This will fail the pipeline
  } finally {
    await driver.quit();
  }
})();
