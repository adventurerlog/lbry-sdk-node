const { Lbry } = require('./lbry');
const { launchSDK } = require('./start');

console.log('__test start')
const statusCheck = () => Lbry.status().then(status => {
    console.log(`isRunning ${status.is_running}`)
    console.log(status);
})
const searchClaims = () => Lbry.claim_list().then(claims => {
    console.log(claims);
})

launchSDK().then(isSDKRunning => {
    console.log(`__test ${isSDKRunning}`);
    statusCheck();
    searchClaims();
}).catch(error => {
    console.error(error);
})