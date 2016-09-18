var SpecReporter = require('jasmine-spec-reporter');

exports.config = {

    allScriptsTimeout: 11000,

    specs: [
        '*.spec.ts'
    ],

    capabilities: {
        'browserName': 'chrome',
        'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER,
        'build': process.env.TRAVIS_BUILD_NUMBER
    },

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