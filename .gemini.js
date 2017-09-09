var ENV = process.env,
    CI = ENV.CI;

module.exports = {
    rootUrl: 'http://localhost:3000',
    gridUrl: 'http://' + 
        (CI ? ENV.SAUCE_USERNAME + ':' + ENV.SAUCE_ACCESS_KEY + 
        '@ondemand.saucelabs.com:80/wd/hub' : '127.0.0.1:4444/wd/hub'),
    browsers: {
        chrome: {
            desiredCapabilities: {
                browserName: 'chrome'
            }
        }
    },
    system: {
        plugins: CI ? undefined : {
            sauce: {
            }
        }
    }
};