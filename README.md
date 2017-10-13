# dumb-parrot-logger
HTTP service that prints requests to STDOUT

## Installation

This is a [Node.js](https://nodejs.org/en/) module available through the
[npm registry](https://www.npmjs.com/).

```bash
$ npm install dumb-parrot-logger
```

## Examples

  Start server:

```zsh
// defaults to port 2040
npm start dumb-parrot-logger
```

  Send a request:

```zsh
curl -X POST \
     -H "Content-Type: application/json" \
     -d '{"user":"joe","action":"add task"}' \
     http://localhost:2040/
```

  See request logged (In the terminal window where you started the server)

```zsh
dumb-parrot debug { user: 'joe', action: 'add task' }
```

  Specify log level with the request path ('/:logLevel'):

```zsh
curl -X POST \
     -H "Content-Type: application/json" \
     -d '{"message":"something unexpected happened"}' \
     http://localhost:2040/error
```

```zsh
dumb-parrot error { message: 'something unexpected happened' }
```

  Send a request with javascript (using 'isomorphic-fetch'):

```javascript
// CORS is enabled and accepts requests from any origin

import fetch from 'isomorphic-fetch';

let body = {user: 'Joe', action: 'add task'};

fetch("http://localhost:2040", {
  method: 'POST',
  body: JSON.stringify(body),
  mode: 'cors',
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    Accept: 'application/json',
  }
});
```

```zsh
dumb-parrot debug { user: 'joe', action: 'add task' }
```