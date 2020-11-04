

## File System, Streams, HTTP

Run:
```
node events.js
``` 

The expected result should be:

```
Server started on port 3000
```

In another terminal tab, run endpoint which return events from csv file in json format:
```
curl --request GET 'http://localhost:3000/events'
```

The expected result should be:

```
[{"id":"1","title":"Craft Beer Festival","location":"Lviv","date":"2020-10-02","guests":"1500"},
{"id":"2","title":"Book Forum","location":"Lviv","date":"2020-10-10","guests":"1000"},
{"id":"3","title":"UPark Festival","location":"Kyiv","date":"2021-07-15","guests":"2000"},
{"id":"4","title":"Film Festival","location":"Odesa","date":"2021-06-04","guests":"800"}]
```

To filter events by location run:

```
curl --request GET 'http://localhost:3000/events?location=lviv'
```

The expected result should be:

```
[{"id":"1","title":"Craft Beer Festival","location":"Lviv","date":"2020-10-02","guests":"1500"},{"id":"2","title":"Book Forum","location":"Lviv","date":"2020-10-10","guests":"1000"}]
```

To get some specific event by id run:

```
curl --request GET 'http://localhost:3000/events/2'
```

The expected result should be:

```
{"id":"2","title":"Book Forum","location":"Lviv","date":"2020-10-10","guests":"1000"}
```

To save new event to the csv file run:

```
curl --request POST 'http://localhost:3000/events' --header 'Content-Type: application/json' --data-raw '{
    "title": "City day",
    "location": "Rivne",
    "date": "2021-06-04",
    "guests": "500"
}'
```

The expected result should be:

```
Created
```

And file events.csv will have next data: 
```
id,title,location,date,guests
1,Craft Beer Festival,Lviv,2020-10-02,1500
2,Book Forum,Lviv,2020-10-10,1000
3,UPark Festival,Kyiv,2021-07-15,2000
4,Film Festival,Odesa,2021-06-04,800
1604167749720,City day,Rivne,2021-06-04,500
```

To replace specific event data in csv file run:

```
curl --request PUT 'http://localhost:3000/events/2' --header 'Content-Type: application/json' --data-raw '{
    "title": "Atlas Weekend",
    "location": "Kyiv",
    "date": "2021-07-04",
    "guests": "2500"
}'
```

The expected result should be:
```
{"id":"2","title":"Atlas Weekend","location":"Kyiv","date":"2021-07-04","guests":"2500"}
```

To return all events in json format via streaming directly from csv file run:

```
curl --request GET 'http://localhost:3000/events-batch'
```

The expected result should be:
```
[{"id":"1","title":"Craft Beer Festival","location":"Lviv","date":"2020-10-02","guests":"1500"},
{"id":"2","title":"Atlas Weekend","location":"Kyiv","date":"2021-07-04","guests":"2500"},
{"id":"3","title":"UPark Festival","location":"Kyiv","date":"2021-07-15","guests":"2000"},
{"id":"4","title":"Film Festival","location":"Odesa","date":"2021-06-04","guests":"800"},
{"id":"1604167749720","title":"City day","location":"Rivne","date":"2021-06-04","guests":"500"}]
```
