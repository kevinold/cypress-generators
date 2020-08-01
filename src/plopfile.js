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
        path: `cypress/tests/ui/{{dashCase specName}}.spec.{{ ext }}`,
        templateFile: `templates/${data.ext}-spec.txt`,
      });

      return actions;
    },
  });
};
