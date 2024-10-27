const fs = require('fs');
const path = require('path');

const source = path.join(__dirname, '../db/node_modules/.prisma/client');
const destination = path.join(__dirname, 'node_modules/.prisma/client');

console.log(`Source directory: ${source}`);
console.log(`Destination directory: ${destination}`);

function copyRecursive(src, dest) {
  const exists = fs.existsSync(src);
  const stats = exists && fs.statSync(src);
  const isDirectory = exists && stats.isDirectory();

  if (isDirectory) {
    fs.mkdirSync(dest, { recursive: true });
    fs.readdirSync(src).forEach(childItemName => {
      copyRecursive(path.join(src, childItemName), path.join(dest, childItemName));
    });
  } else {
    fs.copyFileSync(src, dest);
    console.log(`Copied: ${path.relative(source, src)} (${stats.size} bytes)`);
  }
}

try {
  // Ensure the destination directory exists
  fs.mkdirSync(destination, { recursive: true });
  console.log('Destination directory created or already exists');

  // Recursively copy all files and directories
  copyRecursive(source, destination);

  console.log('Prisma engines copied successfully!');
} catch (error) {
  console.error('Error copying Prisma engines:', error);
  process.exit(1);
}