const fs = require('fs');
const Transform = require("stream").Transform;

const csvFile = "events.csv";
const lineBreak = '\n';


async function getEventsByLocation(location) {
  const fileContent = await readFileStream();

  return location ? fileContent.filter(event => event.location.toLowerCase() === location.toLowerCase()) : fileContent;
}

async function getEventById(id) {
  const fileContent = await readFileStream();

  return fileContent.filter(event => event.id === id)[0];
}

function addNewEvent(reqBody) {
  let logStream = fs.createWriteStream(csvFile, {flags: 'a'});

  const id = new Date().getTime();

  const {title, location, date, guests} = reqBody;
  const newEvent = [id, title, location, date, guests];

  logStream.write(`${newEvent}${lineBreak}`);
  logStream.end();
}


async function updateEvent(id, events, reqBody) {
  const eventToUpdate = {id, ...reqBody};

  const updatedEvents = events.map(event =>
    id === event.id ? {...event, ...eventToUpdate} : event,
  );

  const csvEvents = parseJsonToCsv(updatedEvents);

  const updatedEvent = updatedEvents.find(event => event.id === id);

  return new Promise((resolve, reject) => {
    fs.writeFile(csvFile, csvEvents, err => {
      if (err) {
        reject(err);
      } else {
        resolve(updatedEvent);
      }
    });
  });
}

function getEventsBatch(res) {

  const fileStream = fs.createReadStream(csvFile).pipe(
    new Transform({
      transform(chunk, encoding, callback) {
        const newChunk = parseCsvToJson(chunk);

        callback(null, JSON.stringify(newChunk));
      }
    })
  );

  fileStream.pipe(res);
}

async function readFileStream() {
  return new Promise((resolve, reject) => {

    const readStream = fs.createReadStream(csvFile);

    readStream.on('data', row => {
      resolve(parseCsvToJson(row));
    });

    readStream.on('error', err => {
      reject(err);
    });
  });
}

function parseCsvToJson(csvData) {
  const fileArr = csvData.toString()
    .split(lineBreak)
    .filter(str => str.length > 0);

  const columnNamesArr = fileArr[0].split(',');

  const fileData = fileArr.slice(1);

  return fileData.map(row => {
    return row.split(',').reduce((acc, item, index) => {
      acc[columnNamesArr[index]] = item;
      return acc;
    }, {})
  });
}

function parseJsonToCsv(events) {
  const headers = Object.keys(events[0]);

  const csvEvents = events.map(item => `${item.id},${item.title},${item.location},${item.date},${item.guests}`);

  return `${headers}${lineBreak}${csvEvents.join(lineBreak)}`;
}


module.exports.getEventsByLocation = getEventsByLocation;
module.exports.getEventById = getEventById;
module.exports.addNewEvent = addNewEvent;
module.exports.updateEvent = updateEvent;
module.exports.readFileStream = readFileStream;
module.exports.getEventsBatch = getEventsBatch;
