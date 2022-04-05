import mock from "mock-fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { render } from "cli-testing-library";
import * as fs from "node:fs";
import { readFileSync } from "fs";

const __dirname = dirname(fileURLToPath(import.meta.url));

describe("Scaffold - Empty Spec Boilerplate", () => {
  afterAll(() => {
    mock.restore();
  });

  test("it creates the correct file & contents", async () => {
    const template = fs.readFileSync(
      resolve(__dirname, "../../src/templates/scaffold/empty.js"),
      "utf8"
    );

    mock({
      "cypress/integration": {
        "empty.js": template,
      },
    });

    const { findByText, userEvent } = await render("node", [
      resolve(__dirname, "../../src/cli.js"),
    ]);

    expect(await findByText("What do you want?")).toBeInTheConsole();
    userEvent.keyboard("[Enter]");
    expect(await findByText("Empty Spec Boilerplate")).toBeInTheConsole();

    userEvent.keyboard("[Enter]");

    expect(
      await findByText("Please enter the file name for the spec.")
    ).toBeInTheConsole();
    userEvent.keyboard("empty");
    userEvent.keyboard("[Enter]");

    expect(
      await findByText("Are you writing this spec in JavaScript or TypeScript?")
    ).toBeInTheConsole();
    userEvent.keyboard("[Enter]");

    const output = `${process.cwd()}/cypress/integration/empty.js`;
    const result = readFileSync(output, "utf8");

    expect(result).toMatch(template);
  });
});
