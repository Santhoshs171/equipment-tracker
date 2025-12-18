const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();
const filePath = path.join(__dirname, "../data/equipment.json");

const readData = () => JSON.parse(fs.readFileSync(filePath));
const writeData = (data) =>
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

router.get("/", (req, res) => {
  res.json(readData());
});

router.post("/", (req, res) => {
  const data = readData();
  const newItem = { id: Date.now(), ...req.body };
  data.push(newItem);
  writeData(data);
  res.status(201).json(newItem);
});

router.put("/:id", (req, res) => {
  const data = readData();
  const index = data.findIndex(e => e.id == req.params.id);

  if (index === -1) {
    return res.status(404).json({ message: "Not found" });
  }

  data[index] = { ...data[index], ...req.body };
  writeData(data);
  res.json(data[index]);
});

router.delete("/:id", (req, res) => {
  const data = readData().filter(e => e.id != req.params.id);
  writeData(data);
  res.json({ message: "Deleted" });
});

module.exports = router;