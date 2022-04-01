module.exports = function (plop) {
  // plop.setWelcomeMessage("TESTING!!!");
  plop.setGenerator("spec", {
    prompts: [
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
      {
        type: "list",
        name: "scaffold",
        message: "Please select a scaffold.",
        choices: [
          { name: "Empty Spec Boilerplate", value: "empty" },
          { name: "Login Form Spec", value: "login" },
          { name: "API Spec", value: "api" },
        ],
        when: (answers) => answers.generator === "scaffold",
        default: "empty",
      },
      {
        type: "list",
        name: "example",
        message: "Please select an example spec.",
        choices: [
          { name: "API Spec", value: "api" },
          { name: "Login Form Spec", value: "login" },
          { name: "Network Spec - uses cy.intercept()", value: "network" },
        ],
        when: (answers) => answers.generator === "example",
      },
      {
        type: "input",
        name: "specName",
        message: "Please enter the file name for the spec.",
      },
      {
        type: "list",
        name: "ext",
        message: "Are you writing this spec in JavaScript or TypeScript?",
        choices: [
          { name: "JavaScript", value: "js" },
          { name: "TypeScript", value: "ts" },
        ],
        default: "js",
      },
    ],
    actions: function (data) {
      const actions = [];

      // Scaffold
      if (data.scaffold === "empty") {
        actions.push({
          type: "add",
          path: `cypress/integration/{{dashCase specName}}.spec.{{ ext }}`,
          templateFile: `templates/scaffold/empty.js`,
        });
      }

      // Examples
      if (data.example === "login") {
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
      } else {
        actions.push({
          type: "add",
          path: `cypress/integration/{{dashCase specName}}.spec.{{ ext }}`,
          templateFile: `templates/scaffold/login.js`,
        });
      }

      if (data.example === "api") {
        actions.push({
          type: "add",
          path: `cypress/integration/{{dashCase specName}}.spec.{{ ext }}`,
          templateFile: `templates/example/api.js`,
        });
      } else {
        actions.push({
          type: "add",
          path: `cypress/integration/{{dashCase specName}}.spec.{{ ext }}`,
          templateFile: `templates/scaffold/api.js`,
        });
      }

      return actions;
    },
  });
};
