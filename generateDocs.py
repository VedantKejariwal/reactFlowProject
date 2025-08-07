import os

# Define the recommended directory and file paths
project_root = "/mnt/data"
script_path = os.path.join(project_root, "generateDocs.js")
package_json_path = os.path.join(project_root, "package.json")

script_content = """\
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Root of your project
const rootDir = path.resolve(__dirname, 'head-to-head-market/client/src');
const outputBase = path.resolve(__dirname, 'documentation/docs/components');

// Directories to scan for files
const folders = ['components', 'stages', 'intro-exit'];

folders.forEach((folder) => {
  const inputDir = path.join(rootDir, folder);
  const outputDir = path.join(outputBase, folder);

  // Create output subfolder if it doesn't exist
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Get all .js and .jsx files in the directory
  const files = fs.readdirSync(inputDir).filter(file => file.endsWith('.js') || file.endsWith('.jsx'));

  files.forEach((file) => {
    const inputFilePath = path.join(inputDir, file);
    const outputFileName = file.replace(/\\.jsx?$/, '.md');
    const outputFilePath = path.join(outputDir, outputFileName);

    try {
      console.log(`📄 Generating docs for ${file}...`);
      const output = execSync(`npx jsdoc2md "${inputFilePath}"`).toString();
      fs.writeFileSync(outputFilePath, output);
      console.log(`✅ Saved to ${outputFilePath}`);
    } catch (err) {
      console.error(`❌ Failed to generate docs for ${file}`);
      console.error(err.message);
    }
  });
});
"""

# Save the script file
with open(script_path, "w") as f:
    f.write(script_content)

# Create a scripts entry for package.json
npm_script_command = '"gendocs": "node generateDocs.js"'

script_path, npm_script_command