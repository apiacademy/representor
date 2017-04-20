# Representor (Serializer)

![MIT License](https://img.shields.io/npm/l/uberclient.svg?style=flat)
![CI Tests Status](https://circleci.com/gh/apiacademy/representor.svg?style=shield&circle-token=:circle-token)
[![Build Status](https://travis-ci.org/apiacademy/representor.svg?branch=master)](https://travis-ci.org/apiacademy/representor)
[![NPM Version](https://img.shields.io/npm/v/representor-serializer.svg)](https://www.npmjs.org/package/representor-serializer) &nbsp;

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

Included tests showcase examples of internal representation: https://github.com/apiacademy/representor/tree/master/test/fixtures

## Currently Implemented Hypermedia Formats

- HAL: `application/vnd.hal+json`
- SIREN: `application/vnd.siren+json`
- Collection+JSON: `application/vnd.collection+json`
- UBER: `application/vnd.uber+json`

## How to add a new serializer

@TODO
