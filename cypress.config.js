const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId:'veu83i',
  viewportHeight: 880,
  viewportWidth: 1280,

  e2e: {
    baseUrl: 'https://ecommerce-playground.lambdatest.io/',
    setupNodeEvents(on, config) {
    },
  },
});
