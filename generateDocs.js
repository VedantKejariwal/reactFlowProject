const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// ===== CLIENT-SIDE DOCS =====
const clientRoot = path.resolve(__dirname, 'head-to-head-market/client/src');
const clientOutputBase = path.resolve(__dirname, 'documentation/docs/components');
const clientFolders = ['components', 'stages', 'intro-exit'];

clientFolders.forEach((folder) => {
  const inputDir = path.join(clientRoot, folder);
  const outputDir = path.join(clientOutputBase, folder);

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const files = fs.readdirSync(inputDir).filter(file =>
    file.endsWith('.js') || file.endsWith('.jsx')
  );

  files.forEach((file) => {
    const inputFilePath = path.join(inputDir, file);
    const outputFileName = file.replace(/\.(js|jsx)$/, '.md');
    const outputFilePath = path.join(outputDir, outputFileName);

    try {
      console.log(`📄 Generating client docs for ${file}...`);
      const rawOutput = execSync(`npx jsdoc2md "${inputFilePath}"`).toString();

      const cleanedOutput = rawOutput
        .replace(/<dl>/g, "")
        .replace(/<\/dl>/g, "")
        .replace(/<dt>/g, "### ")
        .replace(/<\/dt>/g, "")
        .replace(/<dd><p>/g, "")
        .replace(/<\/p><\/dd>/g, "\n")
        .replace(/<\/dd>/g, "")
        .replace(/<p>/g, "")
        .replace(/<\/p>/g, "")
        .replace(/<code>/g, "`")
        .replace(/<\/code>/g, "`");

      fs.writeFileSync(outputFilePath, cleanedOutput);
      console.log(`✅ Saved client docs to ${outputFilePath}`);
    } catch (err) {
      console.error(`❌ Failed to generate docs for ${file}`);
      console.error(err.message);
    }
  });
});

// ===== SERVER-SIDE DOCS =====
const serverRoot = path.resolve(__dirname, 'head-to-head-market/server/src');
const serverOutput = path.resolve(__dirname, 'documentation/docs/server');

// Create output dir if it doesn’t exist
if (!fs.existsSync(serverOutput)) {
  fs.mkdirSync(serverOutput, { recursive: true });
}

// Get all .js files in server/src
const serverFiles = fs.readdirSync(serverRoot).filter(file => file.endsWith('.js'));

serverFiles.forEach((file) => {
  const inputFilePath = path.join(serverRoot, file);
  const outputFileName = file.replace(/\.js$/, '.md');
  const outputFilePath = path.join(serverOutput, outputFileName);

  try {
    console.log(`📄 Generating server docs for ${file}...`);
    const rawOutput = execSync(`npx jsdoc2md "${inputFilePath}"`).toString();

    const cleanedOutput = rawOutput
      .replace(/<dl>/g, "")
      .replace(/<\/dl>/g, "")
      .replace(/<dt>/g, "### ")
      .replace(/<\/dt>/g, "")
      .replace(/<dd><p>/g, "")
      .replace(/<\/p><\/dd>/g, "\n")
      .replace(/<\/dd>/g, "")
      .replace(/<p>/g, "")
      .replace(/<\/p>/g, "")
      .replace(/<code>/g, "`")
      .replace(/<\/code>/g, "`");

    fs.writeFileSync(outputFilePath, cleanedOutput);
    console.log(`✅ Saved server docs to ${outputFilePath}`);
  } catch (err) {
    console.error(`❌ Failed to generate server docs for ${file}`);
    console.error(err.message);
  }
});