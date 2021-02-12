// BUILD YOUR SERVER HERE
const express = require("express");
const { find, findById, insert, update, remove } = require("./users/model.js");

const server = express();

server.get("/api/users", async (req, res) => {
  const users = await find();

  if (users) {
    return res.status(200).json({ users });
  } else
    return res
      .status(500)
      .json({ status: "The users information could not be retrieved" });
});

server.get("/api/users/:id", async (req, res) => {
  const user = await findById(req.params.id);

  if (user) {
    return res.status(200).json({ user });
  } else if (!user)
    return res
      .status(404)
      .json({ status: "The user with the specified ID does not exist" });
  else
    return res
      .status(500)
      .json({ status: "The users information could not be retrieved" });
});

server.post("/api/users", express.json(), async (req, res) => {
  const user = await insert({ name: req.body.name, bio: req.body.bio });
  if (user) {
    return res.status(201).json({ user });
  } else if (!user) {
    return res
      .status(400)
      .json({ message: "Please provide name and bio for the user" });
  } else
    return res.status(500).json({
      message: "There was an error while saving the user to the database",
    });
});

server.put("/api/users/:id", express.json(), async (req, res) => {
  const { id } = req.params;
  const editedUser = await update(id, req.body);

  if (editedUser) {
    return res.status(200).json({ editedUser });
  } else if (!editedUser) {
    return res
      .status(404)
      .json({ message: "The user with the specified ID does not exist" });
  } else if (req.body.name === null || req.body.bio === null) {
    return res
      .status(400)
      .json({ message: "Please provide name and bio for the user" });
  } else
    return res
      .status(500)
      .json({ message: "The user information could not be modified" });
});

server.delete("/api/users/:id", express.json(), async (req, res) => {
  const deletedUser = await remove(req.params.id);

  if (deletedUser) {
    return res
      .status(200)
      .json({ message: "The user was deleted from database" });
  } else if (!deletedUser) {
    return res
      .status(404)
      .json({ message: "The user with the specified ID does not exist" });
  } else {
    return res.status(500).json({ message: "The user could not be removed" });
  }
});

module.exports = server; // EXPORT YOUR SERVER instead of {}
