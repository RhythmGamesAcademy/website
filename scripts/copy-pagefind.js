const fs = require('fs');
const path = require('path');

const sourceDir = path.join(process.cwd(), 'out', 'pagefind');
const targetDir = path.join(process.cwd(), 'public', 'pagefind');

async function copyDirectory(src, dest) {
  await fs.promises.mkdir(dest, { recursive: true });
  const entries = await fs.promises.readdir(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      await copyDirectory(srcPath, destPath);
    } else if (entry.isFile()) {
      await fs.promises.copyFile(srcPath, destPath);
    }
  }
}

(async () => {
  try {
    const exists = await fs.promises.stat(sourceDir).then(() => true, () => false);
    if (!exists) {
      console.error('Source directory not found:', sourceDir);
      process.exit(1);
    }

    await copyDirectory(sourceDir, targetDir);
    console.log('Copied Pagefind assets from', sourceDir, 'to', targetDir);
  } catch (error) {
    console.error('Failed to copy Pagefind assets:', error);
    process.exit(1);
  }
})();
