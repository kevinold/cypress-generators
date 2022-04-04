import path from "path";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { render } from "cli-testing-library";

const __dirname = dirname(fileURLToPath(import.meta.url));
const containingPath = path.resolve(__dirname, "../src");

const foo = render(resolve(containingPath, "plopfile.js"));

// console.log(foo);

test("renders the What do you want? prompt", async () => {
  const { getByText, findByText } = await render(
    resolve(containingPath, "cli.js")
  );

  expect(await getByText("What do you want?")).toBeInTheConsole();
});
