module.exports = function (plop) {
  plop.setGenerator("empty spec", {
    description: "creates a spec file with a describe() and it()",
    prompts: [
      {
        type: "input",
        name: "specName",
        message: "What is the name of your spec?",
      },
      {
        type: "list",
        name: "ext",
        message: "Which language?",
        choices: [
          { name: "JavaScript", value: "js" },
          { name: "TypeScript", value: "ts" },
        ],
        default: "js",
      },
    ],
    actions: function (data) {
      const actions = [];

      actions.push({
        type: "add",
        path: `cypress/integration/{{dashCase specName}}.spec.{{ ext }}`,
        templateFile: `templates/scaffold/empty.js`,
      });

      return actions;
    },
  });

  plop.setGenerator("login form", {
    description:
      "Creates either the scaffolding or a complete example spec for a login form",
    prompts: [
      {
        type: "input",
        name: "specName",
        message: "What is the name of your spec?",
      },
      {
        type: "list",
        name: "ext",
        message: "Which language?",
        choices: [
          { name: "JavaScript", value: "js" },
          { name: "TypeScript", value: "ts" },
        ],
        default: "js",
      },
      {
        type: "list",
        name: "type",
        message: "Do you want the full example spec or just the scaffolding?",
        choices: [
          { name: "Example", value: "example" },
          { name: "Scaffold", value: "scaffold" },
        ],
        default: "js",
      },
    ],
    actions: function (data) {
      const actions = [];

      if (data.type === "example") {
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

      return actions;
    },
  });

  plop.setGenerator("api", {
    description:
      "Creates either the scaffolding or a complete example spec for an API endpoint",
    prompts: [
      {
        type: "input",
        name: "specName",
        message: "What is the name of your spec?",
      },
      {
        type: "list",
        name: "ext",
        message: "Which language?",
        choices: [
          { name: "JavaScript", value: "js" },
          { name: "TypeScript", value: "ts" },
        ],
        default: "js",
      },
      {
        type: "list",
        name: "type",
        message: "Do you want the full example spec or just the scaffolding?",
        choices: [
          { name: "Example", value: "example" },
          { name: "Scaffold", value: "scaffold" },
        ],
        default: "js",
      },
    ],
    actions: function (data) {
      const actions = [];

      if (data.type === "example") {
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
