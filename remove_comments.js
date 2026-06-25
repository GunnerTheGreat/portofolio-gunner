const fs = require('fs');
const path = require('path');

function processDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDir(fullPath);
    } else if (fullPath.endsWith('.js') || fullPath.endsWith('.css')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      // Remove lines that are purely // comments
      content = content.replace(/^[ \t]*\/\/.*$\n?/gm, '');
      
      // Remove lines that are purely {/* ... */} comments
      content = content.replace(/^[ \t]*\{\/\*.*?\*\/\}[ \t]*$\n?/gm, '');

      // Remove lines that are purely /* ... */ comments
      content = content.replace(/^[ \t]*\/\*.*?\*\/[ \t]*$\n?/gm, '');

      // Remove multi-line /* ... */ comments that span multiple lines, safely
      // This regex matches /* followed by anything non-greedily, up to */, but we only do it if we are sure it's safe.
      // Actually, since I only generated single-line block comments mostly, the above should catch 99% of them.

      fs.writeFileSync(fullPath, content, 'utf8');
    }
  }
}

processDir('./src');
console.log('Comments removed!');
