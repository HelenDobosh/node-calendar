const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;
const csvFile = "events.csv";

app.use(bodyParser.json());

app.get('/events', async(req, res) => {
  const {location} = req.query;

  const eventsByLocation = await getEventsByLocation(location);

  res.send(eventsByLocation);
});

app.get('/events/:eventId', async (req, res) => {
  const {eventId} = req.params;

  const eventById = await getEventById(eventId);

  res.json(eventById);
});

app.post('/events', async (req, res) => {
  await writeEventToEventsFile(req.body);
  res.sendStatus(200);
});

function readFile(filePath = csvFile, parseToJson = true, encoding = 'utf8') {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, encoding, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(parseToJson? parseCsvToJson(data) : data);
      }
    });
  });
}

async function getEventsByLocation(location) {
  const fileContent = await readFile();
  return location ? fileContent.filter(event => event.location.toLowerCase() === location.toLowerCase()) : fileContent;
}

async function getEventById(id) {
  const fileContent = await readFile();
  return id ? fileContent.filter(event => event.id === id) : fileContent;
}

function writeEventToEventsFile(reqBody) {
  const id = new Date().getTime();

  let logStream = fs.createWriteStream(csvFile, {flags: 'a'});

  const newEvent = parseJsonToCsv(reqBody);
  newEvent.unshift(id);
  logStream.write(`${newEvent}\n`);

  logStream.end();
}


function parseCsvToJson(csvData) {
  const fileArr = csvData.toString()
    .split('\n')
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

function parseJsonToCsv(jsonData) {
  return Object.values(jsonData);
}


app.listen(PORT, () => {
  console.log(`server start at port ${PORT}`);
});


// Create GET /events?location=lviv endpoint which returns events from csv file in json format.
// It should support possible filtering events by location (passed as query parameter).​
//
// Create GET /events/:eventId endpoint for getting some specific event by id.​
//
// Create POST /events endpoint for saving new event to the csv file.​



//
// Create PUT /events/:eventId endpoint for replacing specific event data in csv file.​
//
// Create GET /events-batch endpoint which returns all events in json format via streaming directly from csv file.​
//
// ​
//
// Feel free to use any libraries you want.​
//
// Feel free to structure your code in any way (possibly with many files/modules). The easier it is to read the better.​
// Please, add instructions how to properly test your code (how to start a server, CURL examples).​
