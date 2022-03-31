const generatorTypes = {
  type: "list",
  name: "generatorType",
  message: "What do you want?",
  choices: [
    { name: "Spec Scaffold", value: "scaffold" },
    { name: "Example Spec", value: "examples" },
    { name: "Custom Command", value: "command" },
  ],
};

module.exports = function (plop) {
  plop.setGenerator("spec", {
    prompts: [
      generatorTypes,
      {
        type: "list",
        name: "theScaffold",
        message: "What would you like scaffolded?",
        choices: [
          { name: "Blank Test File", value: "blank-test-file" },
          { name: "Login Form", value: "login-form" },
        ],
        when: (answers) => answers.generatorType === "scaffold",
        default: "blank-test-file",
      },
      {
        type: "list",
        name: "theExample",
        message: "Which example?",
        choices: [
          { name: "Login Form", value: "login-form" },
          { name: "Auth Tests", value: "auth" },
        ],
        when: (answers) => answers.generatorType === "examples",
      },
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
        path: `cypress/tests/ui/{{dashCase specName}}.spec.{{ ext }}`,
        templateFile: `templates/${data.generatorType}/${data.ext}-spec.txt`,
      });

      return actions;
    },
  });
};
