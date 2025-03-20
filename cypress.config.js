const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://ecommerce-playground.lambdatest.io/',
    setupNodeEvents(on, config) {
    },
  },
});
