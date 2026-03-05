const express = require("express");
const cors = require("cors");
const path = require("path");
const prisma = require("./utils/db");

const app = express();
require("dotenv").config({ path: ['.env.local', '.env'] });

/* ======================
   Middleware Section
====================== */

// CORS (All Origin Allow)
app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true
}));

// JSON Support
app.use(express.json());

// URL Encoded Support
app.use(express.urlencoded({ extended: true }));

// Public Folder (Static Embedded Files)
app.use(express.static(path.join(__dirname, "public")));




/* ======================
   Database Check
====================== */
app.get("/users", async (req, res) => {
  try {
    const users = await prisma.user.findMany(); // empty table থাকলেও empty array return করবে
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});


/* ======================
   Routes
====================== */

app.use("/app", require("./routes/create.course"));



/* ======================
   Export
====================== */

module.exports = app;