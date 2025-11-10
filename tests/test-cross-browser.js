require('dotenv').config();
const { remote } = require('webdriverio');

const browsers = [
  { name: 'Chrome', os: 'Windows', osVersion: '11', browserVersion: 'latest' },
  { name: 'Firefox', os: 'Windows', osVersion: '11', browserVersion: 'latest' },
  { name: 'Safari', os: 'OS X', osVersion: 'Monterey', browserVersion: 'latest' },
  { name: 'Safari', os: 'iOS', osVersion: '15', deviceName: 'iPhone 13', realMobile: true },
];

(async () => {
  let hasFailures = false;

  for (const b of browsers) {
    console.log(`\n🌐 Running test on ${b.name}...`);
    let browser;

    try {
      browser = await remote({
        protocol: 'https',
        hostname: 'hub-cloud.browserstack.com',
        port: 443,
        path: '/wd/hub',
        user: process.env.BROWSERSTACK_USERNAME,
        key: process.env.BROWSERSTACK_ACCESS_KEY,
        capabilities: {
          'bstack:options': {
            os: b.os,
            osVersion: b.osVersion,
            deviceName: b.deviceName,
            realMobile: b.realMobile,
            buildName: 'CI Demo',
            sessionName: `Cross Browser Test on ${b.name}`,
          },
          browserName: b.name,
          browserVersion: b.browserVersion,
        },
      });

      await browser.url('https://example.com');
      await browser.pause(2000); // small wait for page load

      const title = await browser.getTitle();
      console.log(`🔹 ${b.name} page title: ${title}`);

      // simulate one failure intentionally (for demo)
      if (b.name === 'Safari' && b.realMobile) {
        throw new Error('Safari mobile simulated failure');
      }

      console.log(`✅ ${b.name} test passed`);
    } catch (err) {
      console.error(`❌ ${b.name} test failed: ${err.message}`);
      hasFailures = true;
    } finally {
      if (browser) await browser.deleteSession();
    }
  }

  process.exit(hasFailures ? 1 : 0);
})();
