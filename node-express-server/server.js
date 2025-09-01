const express = require("express");
const cors = require("cors");

const app = express();

const corsOptions = {
  origin: true, // Reflects the request origin (recommended for dev or internal apps)
  credentials: true
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");

const connectWithRetry = () => {
  console.log("Trying to connect to the database...");

  db.sequelize.sync()
    .then(() => {
      console.log("✅ Synced db.");
      startServer(); // start app after DB is connected
    })
    .catch((err) => {
      console.error("❌ Failed to sync db:", err.message);
      console.log("🔁 Retrying in 5 seconds...");
      setTimeout(connectWithRetry, 5000);
    });
};

const startServer = () => { // assuming you export your Express app from app.js
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
};

connectWithRetry();


// // drop the table if it already exists
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

require("./app/routes/turorial.routes")(app);

// set port, listen for requests

