# Node.js Calendar

## Run project

```
PORT=3000 node app.js -env=dev
```

The expected result should be:

```
Listening on port 3000
Current environment is dev
```


## microtasks.js

Run:
```
node microtasks.js
``` 

The expected result should be:

```
simple log
next tick1
next tick2
queue microtask
next promise
T
```


## node-vs-browser.js

Run:
```
node node-vs-browser.js
``` 

The expected result should be:

```
timeout 1
timeout 2
promise resolve
timeout 3
timeout 4
```


## event-loop.js

Run:
```
node event-loop.js
``` 

The expected result should be:
```
next tick1
next tick2
next tick3
promise1 resolved
promise2 resolved
promise3 resolved
promise4 resolved
promise5 resolved
next tick inside promise resolve handler
set timeout
set immediate1
set immediate2
set immediate3
set immediate4
```


## blocking-event-loop.js

Run:
```
node blocking-event-loop.js
``` 

The expected result should be:

```
0-999
Next:
Timeout:
```

## child-process.js

Run:
```
node child-process.js
``` 

The expected result should be:

```
stdout: total 0
lrwxr-xr-x     1 root  wheel    25B Dec  1  2019 X11 -> ../private/var/select/X11
lrwxr-xr-x     1 root  wheel    25B Dec  1  2019 X11R6 -> ../private/var/select/X11
drwxr-xr-x  1014 root  wheel    32K Mar 31  2020 bin
drwxr-xr-x   312 root  wheel   9.8K Mar 31  2020 lib
drwxr-xr-x   264 root  wheel   8.3K Mar 31  2020 libexec
drwxr-xr-x    13 root  wheel   416B Mar 31  2020 local
drwxr-xr-x   234 root  wheel   7.3K Mar 31  2020 sbin
drwxr-xr-x    46 root  wheel   1.4K Dec  1  2019 share
drwxr-xr-x     5 root  wheel   160B Oct 24  2019 standalone

child process exited with code 0
```

## blocking-server-loop.js

Run:
```
node blocking-server-loop.js
```

The expected result should be:
```
  Listening on port 3200
```

In another terminal tab, run:
```
curl http://localhost:3200
```

The expected result should be:

```
  {"message":"Hello world!"}
```

Other calls to curl localhost:3000 should not return any messages.

## cluster-with-api.js

Run:
```
node cluster-with-api.js
``` 

The expected result should be:

```
Master xxx is running
Worker yyy1 started
Worker yyy2 started
Worker yyy3 started
Worker yyy4 started
Worker yyy5 started
Worker yyy6 started
```


In another terminal tab, run script 
```
node call-cluster-with-api.js
``` 
that performs 100 calls to server from ```cluster-with-api.js```. 

The expected result should be:

```
Worker yyy1 handled request
Worker yyy2 handled request
Worker yyy3 handled request
....
```

In tab with ```cluster-with-api.js``` send SIGINT event (Crtl+C) to the cluster ```cluster-with-api.js```

The expected result should be:

```
Worker with pid yyy1 handled xx requests.
Worker with pid yyy2 handled xx requests.
Worker with pid yyy3 handled xx requests.
Worker with pid yyy4 handled xx requests.
Worker with pid yyy5 handled xx requests.
Worker with pid yyy6 handled xx requests.
```

## fibonacci-worker-thread.js

Run:
```
node fibonacci-worker-thread.js n
``` 
where's ```n``` is n-th Fibonacci number. 

Example: ```node fibonacci-worker-thread.js 9``` 

The expected result should be:
```
Fibonacci(9) = 34
Thread exiting
```

