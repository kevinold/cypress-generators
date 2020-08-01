module.exports = function (plop) {
  plop.setGenerator("spec", {
    prompts: [
      {
        type: "input",
        name: "specName",
        message: "What is the name of your spec?",
      },
      {
        type: "confirm",
        name: "isTypeScript",
        message: "Are you using TypeScript?",
      },
    ],
    actions: function (data) {
      const actions = [];

      const ext = data.isTypeScript ? "ts" : "js";

      actions.push({
        type: "add",
        path: `cypress/tests/ui/{{dashCase specName}}.spec.${ext}`,
        templateFile: `templates/${ext}-spec.txt`,
      });

      return actions;
    },
  });
};
