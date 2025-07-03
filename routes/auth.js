const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { readData, writeData } = require("../utils/fileHelper")
const USERS_FILE = './data/users.json';

const SECRET = "your_jwt_secret";

router.post('/register', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    let users = await readData(USERS_FILE);
    if (users.find(u => u.email === email)) {
      return res.status(400).json({ message: "Email already exists" });
    }
    const hashed = await bcrypt.hash(password, 10);
    users.push({ id: Date.now().toString(), email, password: hashed });
    await writeData(USERS_FILE, users);
    res.status(201).json({ message: "User registered" });
  } catch (err) {
    next(err);
  }
});

router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const users = await readData(USERS_FILE);
    const user = users.find(u => u.email === email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ id: user.id, email: user.email }, SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
