module.exports = function (plop) {
  plop.setGenerator("spec", {
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
        templateFile: `templates/spec/spec.js`,
      });

      return actions;
    },
  });

  plop.setGenerator("login", {
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
        message: "Do you want the complete spec or just the scaffolding?",
        choices: [
          { name: "Complete", value: "complete" },
          { name: "Scaffold", value: "scaffold" },
        ],
        default: "js",
      },
    ],
    actions: function (data) {
      const actions = [];

      if (data.type === "complete") {
        actions.push({
          type: "add",
          path: `cypress/integration/{{dashCase specName}}.spec.{{ ext }}`,
          templateFile: `templates/login/login-complete.js`,
        });
        actions.push({
          type: "append",
          path: `cypress/support/commands.js`,
          templateFile: `templates/login/login-command.js`,
        });
      } else {
        actions.push({
          type: "add",
          path: `cypress/integration/{{dashCase specName}}.spec.{{ ext }}`,
          templateFile: `templates/login/login-scaffold.js`,
        });
      }

      return actions;
    },
  });
};
