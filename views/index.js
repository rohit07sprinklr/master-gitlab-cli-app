const fs = require("fs");

const logFileContentInDescriptionBox = (content) => {
  const descriptionBox = document.getElementById("description");
  descriptionBox.innerHTML = content;
};

const streamLogFile = () => {
  const FILE_PATH =
    "/Users/adityavikramchoudhary/Desktop/my-projects/my-electron-app/server/resources/console.txt";
  let linesRead = 0;

  try {
    fs.watch(FILE_PATH, (eventType, filename) => {
      if (eventType === "change") {
        const data = fs.readFileSync(FILE_PATH, { encoding: "utf-8" });
        logFileContentInDescriptionBox(data);
      }
    });
  } catch (e) {}
};

streamLogFile();
