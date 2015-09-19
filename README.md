# representor
Node.js implementation of a serializer for major Hypermedia Formats, in the context of Representor Pattern.

## Installation

```console
> npm install representor-serializer --save
```

## Usage

```javascript

var repserializer = require('representor-serializer');

var uber = repserializer(internal_representation, 'application/vnd.uber+json');

```

## Currently Implemented Hypermedia Formats

- HAL application/vnd.hal+json
- SIREN application/vnd.siren+json
- Collection JSON application/vnd.collection+json
- UBER application/vnd.uber+json

## How to add a new serializer

@TODO
