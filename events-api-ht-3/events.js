const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;
const csvFile = "events.csv";

app.get('/events', async (req, res) => {
  const {location} = req.query;

  const events = await getEventsByLocation(location);

  res.send(events)
});

app.listen(PORT, () => {
  console.log(`server start at port ${PORT}`);
});

async function getEventsByLocation(location) {
  return new Promise((resolve, reject) => {
    fs.readFile(csvFile, (err, data) => {
      if (err) {
        throw err;
      }
      const fileContent = parseCsvToJson(data);

      const eventsByLocation = location ? fileContent.filter(event => event.location.toLowerCase() === location.toLowerCase()) : fileContent;

      console.log(eventsByLocation);
      resolve(eventsByLocation);
    });
  });

}

function parseCsvToJson(csvData) {
  const fileArr = csvData.toString()
    .split('\n')
    .filter(str => str.length > 0);

  const columnNamesArr = fileArr[0].split(',');

  const fileData = fileArr.slice(1);

  const res = fileData.map(row => {
    const rowArr = row.split(',');
    return rowArr.reduce((acc, item, index) => {
      acc[columnNamesArr[index]] = item;
      return acc;
    }, {})
  });
  return res;

}

// {
//    "id": "1",
//    "title": "Craft Beer Festival",
// },
// {
//    "id": "2",
//    "title": "Craft Beer Festival",
// },


// Generate csv file with events data (id, title, location, date, hour, etc)​
//
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
