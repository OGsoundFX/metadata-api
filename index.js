const express = require('express');
// import {fileMetadata} from 'file-metadata';
const fs = require('fs');

const app = express();

app.get('/', (req, res) => {
  res.send("OMG it's working!");
  // res.sendFile('index.html');
});
  
app.listen(3000, () => {
  console.log('Server started on port 3000');
  // fileMetadata('Bullet Impact 1.wav')
  // .then(res => res.kMDItemDisplayNameWithExtensions = "Bullet_Impact_1.wav")
  // .then(res => console.log(res));

  // add the line bellow in the package.json file
  // "type": "module",
  const replaceWhite = file => {
    const newFile = file.replace(/(\s-\s|\s|-)/g, '_');
    return newFile;
  };

  fs.readdir('./originalFiles', (err, files) => {
    files.forEach(file => {
      fs.rename(`./originalFiles/${file}`, `./files/${replaceWhite(file)}`, function(err) {
          if ( err ) console.log('ERROR: ' + err);
      });
    });
  });

  // fs.rename('./Bullet Impact 1.wav', './files/Bullet_Impact_1.wav', function(err) {
  //   if ( err ) console.log('ERROR: ' + err);
  // });

})

