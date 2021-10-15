// const express = require('express');
import express from 'express';
import {fileMetadata} from 'file-metadata';
// const fs = require('fs');
import fs from 'fs';

const app = express();

app.get('/', (req, res) => {
  res.send("OMG it's working!");
  // res.sendFile('index.html');
});
  
app.listen(3000, () => {
  console.log('Server started on port 3000');

  fs.readdir('./files', function (err, files) {
    if (err) {
      console.error("Could not list the directory.", err);
      process.exit(1);
    };
    files.splice(0, 1);
    console.log(files)
    files.forEach(audio_file => {
      fileMetadata(`./files/${audio_file}`)
      .then(res => {
        const file = {
          name: res.fsName,
          bitRate: res.bitsPerSample,
          sampleRate: res.audioSampleRate
        };
        fs.readFile('tracks.json', 'utf8', function readFileCallback(err, data){
          if (err){
              console.log(err);
          } else {
          const obj = JSON.parse(data); //converts your JSON file into an object
          obj.list.push(file); //add some data
          const json = JSON.stringify(obj); //convert it back to json
          fs.writeFile('tracks.json', json, 'utf8', (err) => {
            if (err) throw err;
          }); // write it back 
        }});
      })
    });
  });

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

