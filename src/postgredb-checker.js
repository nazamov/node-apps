const pg = require("pg");
const colors = require("colors");
const { getArg, getOptArg } = require("./arg");
const { exec } = require("child_process");
const userName = getArg("dbUser");
const pass = getArg("dbPass");
const host = getArg("dbHost");
const dbName = getArg("dbName");
const checkTime = Number(getOptArg("checkTime"));
const conString = `postgres://${userName}:${pass}@${host}/${dbName}`;

function restartPostgres() {
  const command = "sudo systemctl restart postgresql";

  return new Promise((resolve) =>
    exec(command, (error) => {
      error && console.log(colors.red("Couldn't restart postgres", error));
      resolve();
    })
  );
}

async function checkDb() {
  const client = new pg.Client(conString);
  try {
    await client.connect();
    console.log(colors.green("Connection with posgtres is excellent"));
  } catch (e) {
    console.log(colors.red("Couldn't connect to postgres", e.message));
    await restartPostgres();
  } finally {
    await client.end();
  }
}

setInterval(checkDb, checkTime || 60000);
checkDb();
