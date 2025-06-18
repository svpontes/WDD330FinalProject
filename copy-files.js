const fs = require('fs');
const path = require('path');

const source = path.join(__dirname, 'src/search_result/searchResult.html');
const destination = path.join(__dirname, 'dist/searchResult.html');

fs.copyFile(source, destination, (err) => {
  if (err) {
    console.error('Error to copy searchResult.html:', err);
  } else {
    console.log('searchResult.html copy to dist/');
  }
});
