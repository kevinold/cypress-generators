module.exports = function (plop) {
  // plop.setWelcomeMessage("TESTING!!!");
  plop.setGenerator("spec", {
    prompts: [
      // Generators
      {
        type: "list",
        name: "generator",
        message: "What do you want?",
        choices: [
          { name: "Spec Scaffold", value: "scaffold" },
          { name: "Example Spec", value: "example" },
          { name: "Custom Command", value: "command" },
        ],
      },
      // Scaffold
      {
        type: "list",
        name: "scaffold",
        message: "Please select a scaffold.",
        choices: [
          { name: "Empty Spec Boilerplate", value: "empty" },
          { name: "Login Form Spec", value: "login" },
          { name: "API Spec", value: "api" },
          { name: "Network Spec - uses cy.intercept()", value: "network" },
        ],
        when: (answers) => answers.generator === "scaffold",
        default: "empty",
      },
      // Examples
      {
        type: "list",
        name: "example",
        message: "Please select an example spec.",
        choices: [
          { name: "Login Form Spec", value: "login" },
          { name: "API Spec", value: "api" },
          { name: "Network Spec - uses cy.intercept()", value: "network" },
          { name: "localStorage", value: "localStorage" },
        ],
        when: (answers) => answers.generator === "example",
      },
      // Commands
      {
        type: "list",
        name: "command",
        message: "Please select a custom Cypress command.",
        choices: [
          { name: "Login", value: "login" },
          { name: "localStorage", value: "localStorage" },
        ],
        when: (answers) => answers.generator === "command",
      },
      // File Name
      {
        type: "input",
        name: "specName",
        message: "Please enter the file name for the spec.",
        when: (answers) => answers.generator !== "command",
      },
      // JavaScript or TypeScript
      {
        type: "list",
        name: "ext",
        message: "Are you writing this spec in JavaScript or TypeScript?",
        choices: [
          { name: "JavaScript", value: "js" },
          { name: "TypeScript", value: "ts" },
        ],
        when: (answers) => answers.generator !== "command",
        default: "js",
      },
    ],
    actions: function (data) {
      const actions = [];

      // Scaffolds
      switch (data.scaffold) {
        case "empty":
          actions.push({
            type: "add",
            path: `cypress/integration/{{dashCase specName}}.spec.{{ ext }}`,
            templateFile: `templates/scaffold/empty.js`,
          });
          break;

        case "login":
          actions.push({
            type: "add",
            path: `cypress/integration/{{dashCase specName}}.spec.{{ ext }}`,
            templateFile: `templates/scaffold/login.js`,
          });
          break;

        case "api":
          actions.push({
            type: "add",
            path: `cypress/integration/{{dashCase specName}}.spec.{{ ext }}`,
            templateFile: `templates/scaffold/api.js`,
          });
          break;

        case "network":
          actions.push({
            type: "add",
            path: `cypress/integration/{{dashCase specName}}.spec.{{ ext }}`,
            templateFile: `templates/scaffold/network.js`,
          });
          break;

        default:
          break;
      }

      // Examples
      switch (data.example) {
        case "login":
          actions.push(
            {
              type: "add",
              path: `cypress/integration/{{dashCase specName}}.spec.{{ ext }}`,
              templateFile: `templates/example/login.js`,
            },
            {
              type: "append",
              path: `cypress/support/commands.js`,
              templateFile: `templates/commands/login.js`,
            }
          );
          break;

        case "api":
          actions.push({
            type: "add",
            path: `cypress/integration/{{dashCase specName}}.spec.{{ ext }}`,
            templateFile: `templates/example/api.js`,
          });
          break;

        case "network":
          actions.push({
            type: "add",
            path: `cypress/integration/{{dashCase specName}}.spec.{{ ext }}`,
            templateFile: `templates/example/network.js`,
          });
          break;

        case "localStorage":
          actions.push(
            {
              type: "add",
              path: `cypress/integration/{{dashCase specName}}.spec.{{ ext }}`,
              templateFile: `templates/example/localStorage.js`,
            },
            {
              type: "append",
              path: `cypress/support/commands.js`,
              templateFile: `templates/commands/localStorage.js`,
            }
          );
          break;

        default:
          break;
      }

      // Commands
      switch (data.command) {
        case "login":
          actions.push({
            type: "append",
            path: `cypress/support/commands.js`,
            templateFile: `templates/commands/login.js`,
          });
          break;

        case "localStorage":
          actions.push({
            type: "append",
            path: `cypress/support/commands.js`,
            templateFile: `templates/commands/localStorage.js`,
          });
          break;

        default:
          break;
      }

      return actions;
    },
  });
};
