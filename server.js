import express from "express";
import fs from "fs";
import { promisify } from "util";

const server = express();
const port = 8000;

server.get("/", (request, response) => {
  response.send("RESPONSE");
});

const readfile = promisify(fs.readFile);
const writefile = promisify(fs.writeFile);

server.get("/names", async (request, response) => {
  try {
    const users = await readfile("./src/users.txt", "utf-8");
    response.send(users);
  } catch (error) {
    console.log("error");
  }
});

server.get("/names/add/:name", async (request, response) => {
  try {
    const name = request.params.name;
    let users = await readfile("./src/users.txt", "utf-8");

    if (users) {
      users += "\n";
    }

    users += name;

    await writefile("./src/users.txt", users);

    response.send(users);
  } catch (error) {
    response.send(error);
  }
});

server.listen(port, () => {
  console.log("ONLINE IN PORT", port);
});
