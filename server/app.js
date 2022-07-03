const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const PQueue = require("p-queue");
import { getLocalRepository } from "./utils/helper.js";
import { mergeProcess } from "./utils/merge.js";
// const { getMergeCommits } = require("./getMergeCommits");
// const { cherryPickProcess } = require("./cherryPick");
// const {
//   getProfiles,
//   addProfile,
//   deleteProfile,
//   updateProfile,
// } = require("./profiles");
import { log, init as initLogger } from "./logger.js";

//Globals
const PORT = 4000;

const app = express();
app.use(cors());

const queue = new PQueue({ concurrency: 1 });

console.log(PQueue);

//Routes
app.get("/", (req, res) => {
  res.send("App is running");
});

app.get("/merge", async function (req, res) {
  res.writeHead(200, {
    "Content-Type": "text/plain",
    "Transfer-Encoding": "chunked",
    "access-control-allow-origin": "*",
  });
  try {
    const { source, target, location } = req.query;
    const localRepo = await getLocalRepository(location);
    res.write(`Merge Queued `);
    queue.add(
      async () => await mergeProcess(res, source, target, localRepo.path)
    );
  } catch (e) {
    res.write(e.toString());
  }
});

app.get("/handshake", async function (req, res) {
  const { location } = req.query;
  try {
    res.status(200).end();
    log("Handshake successful !!");
    res.end();
  } catch (e) {
    res.status(400).end();
  }
});

const init = async () => {
  //   await initLogger();
  app.listen(PORT);
};

init();
