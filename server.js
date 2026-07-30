// Import required packages
const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");

const app = express();

// Middleware to read form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public")); // serve index.html from /public folder

// Connect to MySQL
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Tadiwanashe21",
  database: "library"
});

// Test connection
db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
    return;
  }
  console.log("Connected to MySQL successfully!");
});

// Route to add data from form
app.post("/add", (req, res) => {
  const { title, genre, rating, item_type } = req.body;
  const sql = "INSERT INTO library_table (title, genre, rating, item_type) VALUES (?, ?, ?, ?)";
  db.query(sql, [title, genre, rating, item_type], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error adding data");
      return;
    }
    res.send("Data added successfully!");
  });
});

// Route to view data WITH pagination + optional search filters
app.get("/view", (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;
  const offset = (page - 1) * limit;

  const { title, genre, rating, item_type } = req.query;

  let whereClauses = [];
  let params = [];

  if (title) {
    whereClauses.push("title LIKE ?");
    params.push(`%${title}%`);
  }
  if (genre && genre !== "All") {
    whereClauses.push("genre = ?");
    params.push(genre);
  }
  if (rating && rating !== "All") {
    whereClauses.push("rating = ?");
    params.push(rating);
  }
  if (item_type && item_type !== "All") {
    whereClauses.push("item_type = ?");
    params.push(item_type);
  }

  const whereSQL = whereClauses.length ? "WHERE " + whereClauses.join(" AND ") : "";

  const countSQL = `SELECT COUNT(*) AS total FROM library_table ${whereSQL}`;
  db.query(countSQL, params, (err, countResult) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Error counting data" });
    }

    const total = countResult[0].total;
    const totalPages = Math.max(1, Math.ceil(total / limit));

    const dataSQL = `SELECT * FROM library_table ${whereSQL} ORDER BY id DESC LIMIT ? OFFSET ?`;
    db.query(dataSQL, [...params, limit, offset], (err, rows) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Error fetching data" });
      }

      res.json({
        data: rows,
        page,
        totalPages,
        total
      });
    });
  });
});

// Route to update a record
app.post("/update", (req, res) => {
  const { id, rating } = req.body;
  const sql = "UPDATE library_table SET rating = ? WHERE id = ?";
  db.query(sql, [rating, id], (err, result) => {
    if (err) {
      console.error(err);
      res.send("Error updating data");
      return;
    }
    res.send("Data updated successfully!");
  });
});

// Route to delete a record
app.post("/delete", (req, res) => {
  const { id } = req.body;
  const sql = "DELETE FROM library_table WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error(err);
      res.send("Error deleting data");
      return;
    }
    res.send("Data deleted successfully!");
  });
});

// Start server
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});