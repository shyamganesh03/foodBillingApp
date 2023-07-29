const { defineConfig } = require("cypress");

module.exports = defineConfig({
  startCommand: 'yarn dev',
  chromeWebSecurity: false,
  experimentalMemoryManagement: true,
  pageLoadTimeout: 15000,
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  env: {
    baseUrl: 'http://localhost:3000/',
  },
});
