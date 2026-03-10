const fs = require('fs');
const path = require('path');

const distPath = path.join(__dirname, '..', 'dist');
const indexPath = path.join(distPath, 'index.html');

if (fs.existsSync(indexPath)) {
  let html = fs.readFileSync(indexPath, 'utf-8');

  html = html.replace(
    /<script src="(\/_expo\/static\/js\/web\/[^"]+\.js)" defer><\/script>/g,
    '<script type="module" src="$1"></script>'
  );

  html = html.replace(
    /<style id="expo-reset">[\s\S]*?<\/style>/,
    `<style id="expo-reset">
      html,
      body {
        height: 100%;
        overflow: hidden;
        background-color: #07070E;
        margin: 0;
        padding: 0;
      }
      #root {
        display: flex;
        height: 100%;
        flex: 1;
      }
    </style>`
  );

  fs.writeFileSync(indexPath, html);
  console.log('Post-build: Added type="module" to script tag and dark background');
}
