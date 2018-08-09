# edit-dotenv [![NPM Version][npm-image]][npm-url] [![Linux Build][travis-image]][travis-url] [![Windows Build][appveyor-image]][appveyor-url] [![Coverage Status][coveralls-image]][coveralls-url] [![Dependency Monitor][greenkeeper-image]][greenkeeper-url]

> Edit a `.env` file string with preserved comments and whitespace.


## Installation

[Node.js](http://nodejs.org/) `>= 6` is required. To install, type this at the command line:
```shell
npm install edit-dotenv
```


## Usage

```js
const editDotenv = require('edit-dotenv');

const envString = `VAR1=value
VAR2=value

# Comment
VAR3=value\\nvalue`;

const changes = {
  VAR2: 'new value',
  NEW: 'value'
};

editDotenv(envString, changes);
/*↴
VAR1=value
VAR2=new value

# Comment
VAR3=value\\nvalue

NEW=value
*/
```


[npm-image]: https://img.shields.io/npm/v/edit-dotenv.svg
[npm-url]: https://npmjs.com/package/edit-dotenv
[travis-image]: https://img.shields.io/travis/stevenvachon/edit-dotenv.svg?label=linux
[travis-url]: https://travis-ci.org/stevenvachon/edit-dotenv
[appveyor-image]: https://img.shields.io/appveyor/ci/stevenvachon/edit-dotenv.svg?label=windows
[appveyor-url]: https://ci.appveyor.com/project/stevenvachon/edit-dotenv
[coveralls-image]: https://img.shields.io/coveralls/stevenvachon/edit-dotenv.svg
[coveralls-url]: https://coveralls.io/github/stevenvachon/edit-dotenv
[greenkeeper-image]: https://badges.greenkeeper.io/stevenvachon/edit-dotenv.svg
[greenkeeper-url]: https://greenkeeper.io/
