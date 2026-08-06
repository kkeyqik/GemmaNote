const fs = require('fs');
const path = require('path');
const archiver = require('archiver');

// The extension directory is one level up from the webapp
const extensionDir = path.resolve(__dirname, '../../extension');
const outputDir = path.resolve(__dirname, '../public');
const outputPath = path.join(outputDir, 'extension.zip');

// Ensure public directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const output = fs.createWriteStream(outputPath);
const archive = archiver('zip', {
  zlib: { level: 9 } // Sets the compression level.
});

output.on('close', function() {
  console.log(`Extension successfully bundled: ${archive.pointer()} total bytes`);
  console.log(`Saved to: ${outputPath}`);
});

archive.on('warning', function(err) {
  if (err.code === 'ENOENT') {
    console.warn('Archive warning:', err);
  } else {
    throw err;
  }
});

archive.on('error', function(err) {
  throw err;
});

// Pipe archive data to the file
archive.pipe(output);

// Append files from a sub-directory, putting its contents at the root of archive
archive.directory(extensionDir, false);

// Finalize the archive
archive.finalize();
