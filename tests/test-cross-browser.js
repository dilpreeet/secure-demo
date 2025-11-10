require('dotenv').config();
const { remote } = require('webdriverio');

const browsers = [
  { name: 'Chrome', os: 'Windows', osVersion: '11', browserVersion: 'latest' },
  { name: 'Firefox', os: 'Windows', osVersion: '11', browserVersion: 'latest' },
  { name: 'Safari', os: 'OS X', osVersion: 'Monterey', browserVersion: 'latest' },
  { name: 'Safari', os: 'iOS', osVersion: '15', deviceName: 'iPhone 13', realMobile: true },
];

(async () => {
  for (const b of browsers) {
    console.log(`Running test on ${b.name}...`);

    const browser = await remote({
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

    try {
      await browser.url('https://example.com');
      const title = await browser.getTitle();
      console.log(`${b.name} page title: ${title}`);
      if (b.name === 'Safari' && b.realMobile) throw new Error('Safari mobile fail'); 
    } catch (err) {
      console.error(`❌ ${b.name} test failed: ${err.message}`);
      process.exitCode = 1;
    } finally {
      await browser.deleteSession();
    }
  }
})();
