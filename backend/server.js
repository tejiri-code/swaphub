// In server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://evelynedjere:<sjje8223115>@swaphub.l0xpsqt.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);




// Middleware
app.use(cors());
app.use(bodyParser.json());

// Dummy user data for simplicity (replace with MongoDB or any other database)
const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    skills: String,
    lookingFor: String,
  });
  
  const User = mongoose.model('User', userSchema);
  
  // User registration route
  app.post('/register', async (req, res) => {
    try {
      const user = new User(req.body);
      await user.save();
      res.status(201).send(user);
    } catch (error) {
      res.status(400).send(error);
    }
  });
  
  // Fetch user profile route
  app.get('/profile/:userId', async (req, res) => {
    try {
      const user = await User.findById(req.params.userId);
      if (!user) {
        return res.status(404).send({ error: 'User not found' });
      }
      res.send(user);
    } catch (error) {
      res.status(500).send(error);
    }
  });
  
  // Update user profile route
  app.patch('/profile/:userId', async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['skills', 'lookingFor']; // Add other allowed fields
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));
  
    if (!isValidOperation) {
      return res.status(400).send({ error: 'Invalid updates!' });
    }
  
    try {
      const user = await User.findByIdAndUpdate(req.params.userId, req.body, { new: true, runValidators: true });
  
      if (!user) {
        return res.status(404).send({ error: 'User not found' });
      }
  
      res.send(user);
    } catch (error) {
      res.status(400).send(error);
    }
  });
