const path = require("path");
const { spawn, execSync } = require("child_process");

class SDK {
  constructor() {
    this.path = process.env.LBRY_DAEMON || path.join(__dirname, "/dist/lbrynet");
    this.handlers = [];
    this.subprocess = undefined;
  }

  launch() {
    this.subprocess = spawn(this.path, ["start", "--api", "127.0.0.1:5279", "--streaming-server", "127.0.0.1:5280"]);
    this.subprocess.stdout.on("data", data => console.log(`SDK data: ${data}`));
    this.subprocess.stderr.on("data", data => console.log(`SDK error: ${data}`));
    this.subprocess.on("exit", () => this.fire("exit"));
    this.subprocess.on("error", error => console.log(`SDK error: ${error}`));
  }

  quit() {
    if (process.platform === "win32") {
      try {
        execSync(`taskkill /pid ${this.subprocess.pid} /t /f`);
      } catch (error) {
        console.error(error.message);
      }
    } else {
      this.subprocess.kill();
    }
  }

  // Follows the publish/subscribe pattern

  // Subscribe method
  on(event, handler, context = handler) {
    this.handlers.push({ event, handler: handler.bind(context) });
  }

  // Publish method
  fire(event, args) {
    this.handlers.forEach(topic => {
      if (topic.event === event) topic.handler(args);
    });
  }
}

module.exports = SDK;
