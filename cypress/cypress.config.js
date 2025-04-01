const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'veu83i',
  viewportHeight: 880,
  viewportWidth: 1280,
  e2e: {
    setupNodeEvents(on, config) {
      // Qualquer configuração adicional que você precise pode ser adicionada aqui
    },
  },
});
