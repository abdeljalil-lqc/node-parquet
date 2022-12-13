let duckdb = require("duckdb");
let db = new duckdb.Database(":memory:");
const fs = require("fs");
const { exit } = require("process");

// Check argument
if (process.argv.length != 3) {
  console.log("[USAGE]: the .prq file is required as an argument ");
  exit();
} else if (process.argv[process.argv.length - 1].indexOf(".prq") == -1) {
  console.log("[ERROR]: Please use a valid file .prq");
  console.log("[USAGE]: the .prq file is required as an argument ");
  exit();
}
// Check file exist
console.log("PROCESSING...");
try {
  if (fs.existsSync(__dirname + "/" + process.argv[process.argv.length - 1])) {
    //file exists
    console.log("FILE TO CONVERT: ", process.argv[process.argv.length - 1]);
  }
} catch (err) {
  console.log("[ERROR]: FILE DOES NOT EXIST");
  exit();
}

// Parse the file
db.all(
  "SELECT * FROM READ_PARQUET('" +
    __dirname +
    "/" +
    process.argv[process.argv.length - 1] +
    "')",
  function (err, res) {
    if (err) {
      throw err;
    }
    console.log(res);
  }
);
