const { execSync } = require("child_process");
execSync("powershell -ExecutionPolicy Bypass -File deploy.ps1", {
  stdio: "inherit",
  cwd: __dirname,
});
