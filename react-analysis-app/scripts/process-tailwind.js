const fs = require('fs');
const postcss = require('postcss');
const tailwind = require('@tailwindcss/postcss');
const autoprefixer = require('autoprefixer');

(async () => {
  try {
    const css = fs.readFileSync('src/index.css', 'utf8');
    const result = await postcss([tailwind(), autoprefixer]).process(css, {
      from: 'src/index.css',
    });
    fs.writeFileSync('temp-tailwind.css', result.css, 'utf8');
    console.log('Wrote temp-tailwind.css');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
