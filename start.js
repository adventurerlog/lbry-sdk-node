
const findProcess = require("find-process");
const SDK = require("./sdk");

const launchSDK = () => {
  
  return new Promise((resolve, reject) => {
    try {
          // Determine if the LBRY SDK is already running, or if it needs to be started
    // This allows you to run the sdk binary separately and have your app connect to it
    const processListArgs = process.platform === "win32" ? "lbrynet" : "lbrynet start";
    findProcess("name", processListArgs).then(processList => {
      const isSDKRunning = processList.length > 0;
      if (!isSDKRunning) {
        sdk = new SDK();
        sdk.on("exit", () => {
          sdk = null;
        });
        sdk.launch();
      }
      resolve(isSDKRunning);
    });
    } catch (error) {
      reject(error)
    }

  })
}

exports = module.exports = { launchSDK: launchSDK };
