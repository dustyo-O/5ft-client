module.exports = {
    rootUrl: 'http://localhost:3000',
    gridUrl: 'http://ondemand.saucelabs.com:80/wd/hub',
    browsers: {
        chrome: {
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