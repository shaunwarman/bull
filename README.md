# @ladjs/bull

[![build status](https://img.shields.io/travis/com/shaunwarman/bull-redis-setup.svg)](https://travis-ci.com/shaunwarman/bull-redis-setup)
[![code coverage](https://img.shields.io/codecov/c/github/shaunwarman/bull-redis-setup.svg)](https://codecov.io/gh/shaunwarman/bull-redis-setup)
[![code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/sindresorhus/xo)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![made with lass](https://img.shields.io/badge/made_with-lass-95CC28.svg)](https://lass.js.org)
[![license](https://img.shields.io/github/license/shaunwarman/bull-redis-setup.svg)](LICENSE)
[![npm downloads](https://img.shields.io/npm/dt/bull-redis-setup.svg)](https://npm.im/bull-redis-setup)

> A simple bull redis setup


## Table of Contents

* [Install](#install)
* [Usage](#usage)
* [Contributors](#contributors)
* [License](#license)


## Install

[npm][]:

```sh
npm install @ladjs/bull
```

[yarn][]:

```sh
yarn add @ladjs/bull
```


## Usage

```js
const Bull = require('..');

const createEmail = () => {
  return {
    name: 'email',
    data: {
      template: 'inquiry',
      to: 'Test email',
      cc: 'test@test.com',
      locales: {
        locale: 'en-US'
      }
    },
    options: {}
  }
};

const job = createEmail();

const bull = new Bull();
bull.configure({
  bullBootJobs: [
    job
  ]
});

bull.start();
```


## Contributors

| Name             | Website                   |
| ---------------- | ------------------------- |
| **Shaun Warman** | <https://shaunwarman.com> |


## License

[MIT](LICENSE) © [Shaun Warman](https://shaunwarman.com)


## 

[npm]: https://www.npmjs.com/

[yarn]: https://yarnpkg.com/
