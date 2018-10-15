#!/usr/bin/env node
const csvParse = require('csv-parse');
const https = require('https');
const Case = require('case');
const path = require('path');
const fs = require('fs');
const fetch = require('node-fetch');
const sharp = require('sharp');
const LINK = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSqG4M_25FXRd5oiGOvueDE4HUnJzI8k-eeTlSHAyzUYvlb_8PN_nLIz3tklnfnDNydsxP7KMPsEOhj/pub?gid=2105877456&single=true&output=csv';

function removeEmptyFields (data) {
  for (let key in data) {
    let value = data[key];
    if (/^\s*-\s*$/.test(value)) {
      delete data[key];
    }
  }
  return data;
}

function removeKeySecondLine (data) {
  for (let key in data) {
    let keyStraight = Case.camel(/^.*$/m.exec(key)[0]);
    if (key !== keyStraight) {
      data[keyStraight] = data[key];
      delete data[key];
    }
  }
  return data;
}

function combineNames (a, b, space) {
  if (a) {
    return b ? `${a}${space}${b}` : a;
  }
  return b || undefined;
}

function getSpeakers () {
  console.log(`Downloading csv from: ${LINK}`);
  return fetch(LINK)
    .then(res => new Promise((resolve, reject) => {
      const parser = res.body.pipe(csvParse({
        auto_parse: true,
        columns: true
      }));
      const allSpeakers = {};
      parser.on('error', reject);
      parser.on('data', data => {
        data = removeEmptyFields(data);
        data = removeKeySecondLine(data);
        data.name = combineNames(data.firstName, data.surname, ' ');
        data['氏名'] = combineNames(data['姓'], data['名'], '　');
        data.name = data.name || data.nickName || data['氏名'];
        data['氏名'] = data['氏名'] || data.nickName || data.name;
        if (!data.twitter) {
          console.log(`Received entry without twitter account (O_O): ${data.name}`)
          return
        }
        allSpeakers[data.twitter] = data;
        console.log(`Received: ${data.twitter}`);
      });
      parser.on('end', () => {
        console.log('Finished csv.');
        resolve(allSpeakers);
      });
    }));
}

function downloadAndReplaceImage (speaker) {
  console.log(`Started downloading: ${speaker.twitter} image`)
  return fetch(speaker.photo)
    .then(res => res.buffer())
    .then(imgBuffer => sharp(imgBuffer)
      .resize(512, 512, { fit: 'outside', withoutEnlargement: true })
      .toFile(`${__dirname}/../img/speakers/pic-${speaker.twitter}.jpg`))
    .then(() => {
      console.log(`Downloaded: ${speaker.twitter} - file`);
      delete speaker.photo;
      return speaker;
    })
    .catch(error => {
      console.warn(`Error downloading ${speaker.twitter}: ${error.stack}`);
      return speaker;
    })
}

function downloadAndReplaceImages (speakers) {
  return Promise.all(Object.values(speakers).map(speaker => downloadAndReplaceImage(speaker)))
    .then(() => {
      console.log('All Images done')
      return speakers
    });
}

getSpeakers()
  .then(speakers => downloadAndReplaceImages(speakers))
  .then(speakers => {
    fs.writeFileSync(
      path.normalize(`${__dirname}/../src/json/speakers.json`),
      JSON.stringify(speakers, null, 2)
    );
    console.log('Finished Updating');
  })
  .catch(errors => {
    console.log(errors.stack);
    process.exit(1);
  })
