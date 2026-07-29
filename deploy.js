const fs = require("fs");
const path = require("path");
const ghpages = require("gh-pages");

const outDir = path.join(__dirname, "out");

fs.writeFileSync(path.join(outDir, ".nojekyll"), "");

ghpages.publish("out", {
  branch: "gh-pages",
  dotfiles: true,
  message: "Deploy [skip ci]",
}, (err) => {
  if (err) {
    console.error("Deploy failed:", err);
    process.exit(1);
  }
  console.log("Deployed successfully!");
});
