# atome

[![version](https://img.shields.io/npm/v/atome.svg)](https://www.npmjs.com/package/atome) [![download](https://img.shields.io/npm/dm/atome.svg)](https://www.npmjs.com/package/atome)
[![status status](https://travis-ci.com/egg-/atome.svg?branch=main)](https://travis-ci.com/egg-/atome)
[![Standard - JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

Node.js module for using the Atome API (https://www.atome.id/)

## Usage

```javascript
const Atome = require('atome')

// if not set, will default to 'SANDBOX'
const atome = new Atome('username or apikey', 'password or apisecret', 'PRODUCTION')
```

## License

atome is licensed under the [MIT license](https://github.com/egg-/atome/blob/main/LICENSE).