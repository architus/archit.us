/* eslint-disable no-console */
/**
 * Script used to run `gatsby develop` once during CI to properly generate
 * GraphQL types using `gatsby-graphql-typegen`.
 * See https://github.com/cometkim/gatsby-plugin-typegen/issues/85.
 */

import { spawn } from "child_process";

// Max number of minutes to wait for the desired output before
// forcefully killing the build process and exiting with a non-zero code
const MAX_DURATION_MIN = 10;
// String to search for that occurs after a successful build
const SEARCH_STRING = `success Building development bundle`;

const success = (): never => process.exit(0);
const failure = (): never => process.exit(1);

console.log("Spawning sub-process");
const child = spawn("yarn", ["run", "start"], {
  env: { ...process.env, CI: "true" },
});
console.log(`Spawned sub-process with PID ${child.pid}`);

// Whether the child process should be exiting
let expectedEnd = false;

// Fully built stdout
let fullOutput = "";
// Checks the output to determine if the build was successful
function checkOutput(): void | never {
  if (fullOutput.search(SEARCH_STRING) !== -1) {
    // Wait 5 seconds before exiting
    console.log("Build succeeded");
    setTimeout((): void => {
      expectedEnd = true;
      process.kill(child.pid);
      success();
    }, 5000);
  }
}

child.stdout.setEncoding("utf8");
child.stdout.on("data", (data: unknown) => {
  const dataStr = String(data);
  process.stdout.write(dataStr);
  fullOutput += dataStr;
  checkOutput();
});

child.stderr.setEncoding("utf8");
child.stderr.on("data", (data: unknown) => {
  const dataStr = String(data);
  process.stderr.write(dataStr);
  checkOutput();
});

child.on("close", (code: number) => {
  if (!expectedEnd) {
    console.warn(`Process exited early with exit code ${code}`);
    failure();
  }
});

setTimeout(() => {
  console.log("Timeout elapsed");
  process.kill(child.pid);
  failure();
}, MAX_DURATION_MIN * 60 * 1000);
