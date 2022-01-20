const request = require("request");
const fs = require("fs");
const args = process.argv.slice(2);

request(args[0], (error, response, body) => {
  console.log("error:", error); // Print the error if one occurred
  console.log("statusCode:", response && response.statusCode);
  if (!args[0]) {
    console.log(`error :${error}`);
  }
  fs.writeFile(args[1], body, (err) => {
    if (!args[1]) {
      console.log(`error: ${error}`);
    }
    if (err || response.statusCode !== 200) {
      console.log("Unable to download the resource");
    }
    fs.stat(args[1], (err, stats) => {
      if (!err) {
        console.log(`Downladed and saved ${stats.size} bytes to ${args[1]}`);
      }
    });
  });
});
