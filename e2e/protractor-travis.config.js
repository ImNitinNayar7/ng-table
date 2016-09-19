var SpecReporter = require('jasmine-spec-reporter');

exports.config = {

    allScriptsTimeout: 11000,

    specs: [
        '*.spec.ts'
    ],

    multiCapabilities: [
        capabilitiesForSauceLabs({
            'name': 'Linux/Chrome',
            'browserName': 'chrome'
        }),
        capabilitiesForSauceLabs({
            'name': 'Linux/Firefox',
            'browserName': 'firefox'
        }),
        capabilitiesForSauceLabs({
            'name': 'Win7/Firefox',
            'browserName': 'firefox',
            'platform': 'Windows 7'
        }),
        capabilitiesForSauceLabs({
            'name': 'Win7/Chrome',
            'browserName': 'chrome',
            'platform': 'Windows 7'
        }),
        capabilitiesForSauceLabs({
            'name': 'Win7/IE9',
            'browserName': 'internet explorer',
            'platform': 'Windows 7',
            'version': '9.0'
        }),
        capabilitiesForSauceLabs({
            'name': 'Win8/IE10',
            'browserName': 'internet explorer',
            'platform': 'Windows 8',
            'version': '10.0'
        }),
        capabilitiesForSauceLabs({
            'name': 'Win8.1/IE11',
            'browserName': 'internet explorer',
            'platform': 'Windows 8.1',
            'version': '11.0'
        }),
        capabilitiesForSauceLabs({
            'name': 'Win10/Edge',
            'browserName': 'edge',
            'platform': 'Windows 10',
            'version': '13.10586'
        })
        
    ],

    baseUrl: 'http://localhost:8080/',

    framework: 'jasmine',

    jasmineNodeOpts: {
        defaultTimeoutInterval: 30000,
        showColors: true,
        includeStackTrace: true
    },

    beforeLaunch: function () {
        require('ts-node').register({
            project: 'e2e'
        });
    },

    onPrepare: function () {
        jasmine.getEnv().addReporter(new SpecReporter());
    },

    sauceUser: process.env.SAUCE_USERNAME,
    sauceKey: process.env.SAUCE_ACCESS_KEY
};

function capabilitiesForSauceLabs(capabilities) {
    return {
        'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER,

        'name': capabilities.name,
        'build': process.env.TRAVIS_BUILD_NUMBER,

        'browserName': capabilities.browserName,
        'platform': capabilities.platform,
        'version': capabilities.version
    };
}