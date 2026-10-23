const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    defaultBrowser: 'chrome',
    baseUrl: 'https://test-me.vzl.one/',

    specPattern: 'cypress/e2e/**/*.cy.js',

    viewportWidth: 1920,
    viewportHeight: 1080,
    video: false,
    screenshotOnRunFailure: true,
    retries: { runMode: 1, openMode: 0 },
  },
})