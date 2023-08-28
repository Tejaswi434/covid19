const express = require("express");
const path = require("path");

const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const app = express();
app.use(express.json());
const dbPath = path.join(__dirname, "goodreads.db");
let db = null;
const initializeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(3000, () => {
      console.log("Server Running at http://localhost:3000/");
    });
  } catch (e) {
    console.log(`DB Error: ${e.message}`);
    process.exit(1);
  }
};
initializeDBAndServer();
const change = (each) => {
  return {
    stateId: each.state_id,
    stateName: each.state.name,
    population: each.population,
  };
};
/* first*/
app.get("/states/", async (request, response) => {
  const gettingstates = `select * from state order by state_id;`;
  const states = await db.all(gettingstates);
  response.send(states.map((each) => changing(each)));
});
