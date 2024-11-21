const express = require("express");
const cors = require("cors");
const dotEnv = require("dotenv");
const getConnection = require("./config/db");
const userModel = require("./models/user");

const app = express();

// Registering middlewares
dotEnv.config();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public")); // To serve static files

// Set EJS as the view engine
app.set("view engine", "ejs");

// Connecting to the database
getConnection();

// Listening to the port
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Middleware for logging (example)
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Routes

// About route
app.get("/about", (req, res) => {
  console.log(req.body);
  res.send("About page");
});

// Form submission (POST method to hide credentials in the URL)
app.post("/get-form-data", (req, res) => {
  console.log(req.body);
  res.send("Received data");
});

// Registration form (GET)
app.get("/register", (req, res) => {
    // req.send(req.query);
    res.render("register"); // Ensure `register.ejs` exists in the views folder
});

// CRUD Operations

// Create User (POST)
app.post("/", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).send("All fields are required");
    }

    const newUser = await userModel.create({
      username,
      email,
      password,
    });

    res.status(201).send(`User ${newUser.username} created successfully`);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while creating the user");
  }
});

// Read Users (GET)
app.get("/get-users", (req, res)=>{
  userModel.find({username:'ami'}).then((users)=>{
    res.send(users);
  })
})

// Update User (GET)
app.get("/update-user", async (req, res) => {
  try {
    const updatedUser = await userModel.findOneAndUpdate(
      { username: "Ami" }, // Update condition
      { email: "ami@yahoo.com" }, // Update fields
      { new: true } // Return updated document
    );

    if (!updatedUser) {
      return res.status(404).send("User not found");
    }

    res.send(`User ${updatedUser.username} updated successfully`);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while updating the user");
  }
});

// Handle 404 (Not Found)
app.use((req, res) => {
  console.log(req.body);
  res.status(404).send("Route not found");
});
