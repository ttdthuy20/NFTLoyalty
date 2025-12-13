const express = require("express");
const cors = require("cors");
const { getPool } = require("./db");

const app = express();
app.use(cors());
app.use(express.json());

// Test API
app.get("/", (req, res) => {
  res.send("API is running");
});

// POST: Lưu dữ liệu vào SQL Server
app.post("/users", async (req, res) => {
  try {
    const { name, email } = req.body;
    const pool = await getPool();

    await pool
      .request()
      .input("name", name)
      .input("email", email)
      .query("INSERT INTO Users (name, email) VALUES (@name, @email)");

    res.status(201).send({ message: "User created successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Database error" });
  }
});

// GET: đọc dữ liệu
app.get("/users", async (req, res) => {
  try {
    const pool = await getPool();
    const result = await pool.request().query("SELECT * FROM Users");
    res.send(result.recordset);
  } catch (err) {
    res.status(500).send({ error: "Database error" });
  }
});

app.listen(3000, () => console.log("Server running on port 3000"));
