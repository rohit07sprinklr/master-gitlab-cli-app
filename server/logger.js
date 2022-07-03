const fs = require("fs");

const END_OF_CONTENT = "\n";

export function getLogFilePath() {
  //Todo => fix FILE_PATH
  //   return path.join(__dirname, "./console.txt");
  return "/Users/adityavikramchoudhary/Desktop/my-projects/my-electron-app/server/resources/console.txt";
}

const log = async (content) => {
  const logFilePath = getLogFilePath();
  try {
    await fs.appendFileSync(logFilePath, content + END_OF_CONTENT, {
      encoding: "utf-8",
    });
  } catch (e) {
    console.log(e);
  }
};

const init = () => {
  const logFilePath = getLogFilePath();
  try {
    fs.writeFileSync(logFilePath, "");
  } catch (e) {
    console.log(e);
  }
};

export { log, init };
