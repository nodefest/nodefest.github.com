const path = require('path');
const fs = require('fs');

const Case = require('case');
const csvParse = require('csv-parse');
const fetch = require('node-fetch');
const sharp = require('sharp');

const DOCS_LINK = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSqG4M_25FXRd5oiGOvueDE4HUnJzI8k-eeTlSHAyzUYvlb_8PN_nLIz3tklnfnDNydsxP7KMPsEOhj/pub?gid=2105877456&single=true&output=csv';
const JSON_PATH = path.normalize(`${__dirname}/../src/json/speakers.json`);
const isEmpty = /^(\s*)$/;

(async function main() {

  let previousData = {}
  try {
    previousData = JSON.parse(fs.readFileSync(JSON_PATH, 'utf8'))
  } catch (e) {}
  
  const speakers = await fetchSpeakers(DOCS_LINK);

  await downloadAndReplaceImages(speakers, previousData);
  Object.values(speakers);

  fs.writeFileSync(
    JSON_PATH,
    JSON.stringify(speakers, null, 2)
  );
  console.log('Finished Updating');
}()).catch(err => {
  console.log(err.stack);
  process.exit(1);
});

async function fetchSpeakers (url) {
  console.log(`Downloading csv from: ${url}`);
  const res = await fetch(url);

  return new Promise((resolve, reject) => {
    const allSpeakers = {};

    const parser = res.body.pipe(csvParse({
      auto_parse: true,
      columns: true
    }));

    parser.on('error', reject);

    parser.on('data', data => {
      data = removeEmptyFields(data);
      data = removeKeySecondLine(data);

      data.name = combineNames(data.firstName, data.surname, ' ');
      data['氏名'] = combineNames(data['姓'], data['名'], '　');
      data.name = data.name || data.nickName || data['氏名'];
      data['氏名'] = data['氏名'] || data.nickName || data.name;

      if (!data.id) {
        console.log(`Received entry without id (O_O): ${data.name}`);
        return;
      }

      allSpeakers[data.id] = data;
      console.log(`Received: ${data.id}`);
    });

    parser.on('end', () => {
      console.log('Finished csv.');
      resolve(allSpeakers);
    });
  });
}

async function downloadAndReplaceImage (speaker, formerSpeaker) {
  const filePath = path.normalize(`${__dirname}/../img/speakers/pic-${speaker.id}.jpg`)
  let hasImage = false
  try {
    fs.accessSync(filePath)
    hasImage = true
    if (formerSpeaker.photo === speaker.photo || !isEmpty.test(speaker.photo) || !isEmpty.test(formerSpeaker.photo)) {
      console.log(`Already downloaded: ${speaker.id}'s image!`)
      return
    }
  } catch (e) {}
  console.log(`Started downloading: ${speaker.id} image`);
  try {
    let res = await fetch(speaker.photo);
    const imgBuffer = await res.buffer();
      await sharp(imgBuffer)
          .resize(512, 512, { fit: 'outside', withoutEnlargement: true })
          .toFile(filePath);

    console.log(`Downloaded: ${speaker.id} - file`);
  } catch (e) {
    if (hasImage) {
      console.warn(`Downloading of new image for ${speaker.id} didnt work: ${err}`)
    } else {
      throw new Error(`Can not download ${speaker.id}'s image: ${err}`)
    }
  }
}

async function downloadAndReplaceImages (speakers, originalData) {
  await Promise.all(Object.values(speakers).map(speaker => downloadAndReplaceImage(speaker, originalData[speaker.id] || {})));
  console.log('All Images done');
}

function removeEmptyFields (data) {
  for (const key in data) {
    const value = data[key];
    if (/^\s*-\s*$/.test(value)) {
      delete data[key];
    }
  }
  return data;
}

function removeKeySecondLine (data) {
  for (const key in data) {
    const keyStraight = Case.camel(/^.*$/m.exec(key)[0]);
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

