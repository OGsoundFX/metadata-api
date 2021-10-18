// In package.json remove: "type": "module",
// to use require (as bellow), otherwise use import
// const express = require('express');
// const fs = require('fs');

import express from 'express';
import {fileMetadata} from 'file-metadata';
import fs from 'fs';

const app = express();

app.get('/', (req, res) => {
  res.send("OMG it's working!");
  // res.sendFile('index.html');
});

app.listen(3000, () => {
  console.log('Server started on port 3000');

  // STEP 1: REMOVE whitespace & '-' from track titles and move the files from
  // the "originalFiles" folder to the "files" folder

  const replace = () => {
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
  };
  
  // STEP 2: get metadata from files in the "files" folder
  const metadata = () => {
    fs.readdir('./files', function (err, files) {
      if (err) {
        console.error("Could not list the directory.", err);
        process.exit(1);
      };
      files.splice(0, 1);

      fs.readFile('tracks.json', 'utf8', function readFileCallback(err, data){
        if (err){
            console.log(err);
        } else {
        const obj = JSON.parse(data); //converts your JSON file into an object
    
        files.forEach(audio_file => {
          fileMetadata(`./files/${audio_file}`)
          .then(res => {
            // console.log(res)
            const file = {
              name: res.fsName,
              bitRate: res.bitsPerSample,
              sampleRate: res.audioSampleRate,
              durationSecs: res.durationSeconds,
              fileSize: res.fsSize,
              album: res.album
            };
            obj.list.push(file); //add some data
            const json = JSON.stringify(obj); //convert it back to json
            fs.writeFile('tracks.json', json, 'utf8', (err) => {if (err) throw err }); // write the file back to folder 
          });
        });
      }});
    });
  };

  // STEP 3: run both functions asynchronously
  replace();
  setTimeout(() => {
    metadata();
  }, 5000)

  // STEP 4 (optional): verify if there is the correct amount of files in the JSON file
  // setTimeout(()=> {
  //   fs.readFile('tracks.json', 'utf8', function readFileCallback(err, data){
  //     if (err){
  //         console.log(err);
  //     } else {
  //       const obj = JSON.parse(data);
  //       console.log(obj.list.length)
  //     }
  //   })
  // }, 3000)
})