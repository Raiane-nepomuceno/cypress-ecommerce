const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    projectId: 'veu83i',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
