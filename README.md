[![npm version](https://badge.fury.io/js/lbry-sdk-node.svg)](https://badge.fury.io/js/lbry-sdk-node)
[![npm downloads](https://img.shields.io/npm/dm/lbry-sdk-node.svg?style=flat)](https://npmcharts.com/compare/lbry-sdk-node?minimal=true)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/lbry-sdk-node)](https://bundlephobia.com/result?p=lbry-sdk-node)

# Lbry SDK NodeJS

This is small package to download and bootstrap [lbryio/lbry-sdk](https://github.com/lbryio/lbry-sdk) releases in nodejs.

Original code was taken and adapted from [lbryio/electron-starter](https://github.com/lbryio/electron-starter) and [lbryio/lbry-redux](https://github.com/lbryio/lbry-redux/blob/master/dist/bundle.es.js#L1014).

# How this should work?

```bash
# 1.
npm install lbry-sdk-node --save
# After the install an additional script runs that downloads the lbry-sdk (0.93.0)
```

## Example Usage:


```javascript

const { Lbry } = require('lbry-sdk-node/lbry');
const { launchSDK } = require('lbry-sdk-node/start');

const statusCheck = () => Lbry.status().then(status => {
    console.log(`isRunning ${status.is_running}`)
    console.log(status);
})
const searchClaims = () => Lbry.claim_list().then(claims => {
    console.log(claims);
})

launchSDK().then(isSDKRunning => {
    console.log(`after launch ${isSDKRunning}`);
    statusCheck();
    searchClaims();
}).catch(error => {
    console.error(error);
})

```
