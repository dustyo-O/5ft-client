var ENV = process.env,
    CI = ENV.CI;

module.exports = {
    rootUrl: 'http://localhost:3000',
    gridUrl: 'http://' +
        (CI ? ENV.SAUCE_USERNAME + ':' + ENV.SAUCE_ACCESS_KEY : '' ) +
        '@ondemand.saucelabs.com:80/wd/hub',
    browsers: {
        chrome: {
            httpTimeout: 120000,
            windowSize: '1280x1024',
            sessionsPerBrowser: 1,
            desiredCapabilities: {
                browserName: 'chrome'
            }
        }
    },
    system: {
        plugins: {
            sauce: {
            }
        }
    }
};
