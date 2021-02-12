// BUILD YOUR SERVER HERE
const model = require("./users/model.js");

const express = require("express");

const server = express();

server.get("/api/users", async (req, res) => {
  const listOfUsers = await model.find();
  res.status(200).json({ listOfUsers });
  res.end();
});

server.post("/api/users", express.json(), async (req, res) => {
  const newUser = req.body; //read request for body

  await model.insert(newUser.name, newUser.bio);
  console.log(newUser.name, newUser.bio);
  //add new user in listOfUser
  res.status(200).json({ newUser });
  res.end();
});

server.get("/api/users/:id", async (req, res) => {
  const user = await model.findById(req.params.id);

  if (!user) {
    return res.status(404).json({ user });
  }
  return res.status(200).json({ user });
});

server.delete("/api/users/:id", async (req, res) => {
  const removeUser = await model.remove(req.params.id);

  removeUser
    ? res.status(200).json({ removeUser })
    : res.status(404).json({ stauts: "Is not exist user" });
  res.end();
});

server.put("/api/users/:id", express.json(), async (req, res) => {
  const user = req.body;

  const updateUser = await model.update(req.params.id, user);

  updateUser
    ? res.status(200).json({ updateUser })
    : res.status(404).json({ stauts: "Is not exist id" });
  res.end();
  console.log({ user });
  res.end();
});

module.exports = server; // EXPORT YOUR SERVER instead of {}
