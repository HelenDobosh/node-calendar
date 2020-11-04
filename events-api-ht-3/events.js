const express = require('express');
const bodyParser = require('body-parser');


const app = express();
const PORT = 3000;


const {
  readFileStream,
  getEventsByLocation,
  getEventById,
  addNewEvent,
  updateEvent,
  getEventsBatch
} = require('./utils');

app.use(bodyParser.json());

app.get('/events', async (req, res) => {
  const {location} = req.query;

  const eventsByLocation = await getEventsByLocation(location);

  res.send(eventsByLocation);
});

app.get('/events/:eventId', async (req, res) => {
  const {eventId} = req.params;

  const eventById = await getEventById(eventId);

  if (eventById) {
    res.json(eventById);
  } else {
    res.status(404).send(`Event with id:${eventId} doesn't exist.`);
  }
});

app.post('/events', async (req, res) => {
  await addNewEvent(req.body);
  res.sendStatus(201);
});

app.put('/events/:eventId', async (req, res) => {
  const {eventId} = req.params;

  const events = await readFileStream();

  const event = events.find(event => event.id === eventId);

  if (!event) {
    return res.status(404).send(`Event with id:${eventId} doesn't exist.`);
  } else {
    const event = await updateEvent(eventId, events, req.body);

    res.status(200).send(event);
  }
});

app.get('/events-batch', async (req, res) => {
  await getEventsBatch(res);
});


app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
