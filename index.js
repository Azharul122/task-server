const express = require('express');
const app = express();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.dbuser}:${process.env.dbPass}@cluster0.izhktyr.mongodb.net/?retryWrites=true&w=majority`;
// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_Key}@cluster0.qles4ic.mongodb.net/?retryWrites=true&w=majority`;
// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_Key}@cluster0.jg9zpke.mongodb.net/?retryWrites=true&w=majority`;


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
      // await client.connect();
      // const usersCollection = client.db('summerCampSchool').collection('users')
      // app.get('/users', async (req, res) => {
      //   const users = await usersCollection.find({}).toArray()
      //   res.send(users)
      // })

      // database users data hanlde api
      // app.get('/allUsers', async (req, res) => {
      //   const users = await usersCollection.find({}).toArray()
      //   res.send(users)
      // })
      const usersCollection = client.db("endgame").collection("users");
      const collegeCollection = client.db("endgame").collection("colleges");
      const reviewsCollection = client.db("endgame").collection("reviews");
      
      app.get("/users", async (req, res) => {
        const result = await usersCollection.find().toArray();
        res.send(result);
      });

      app.post("/users", async (req, res) => {
        const user = req.body;
        const query = { email: user.email };
        const existingUser = await usersCollection.findOne(query);
        if (existingUser) {
          return res.send({ message: "User already exists" });
        }
        const result = await userCollection.insertOne(user);
        res.send(result);
      });
      
      
      app.get("/colleges", async (req, res) => {
        const result = await collegeCollection.find().toArray();
        res.send(result);
      });


      app.get('/college/:id', async (req, res) => {
        const collegeId = req.params.id;
        const query = { _id: new ObjectId(collegeId) };
        const result = await collegeCollection.findOne(query);
        res.send(result);
      });

      app.get("/reviews", async (req, res) => {
        const result = await reviewsCollection.find().toArray();
        res.send(result);
      });
      app.post("/review", async (req, res) => {
        const review = req.body;
        const result = await reviewsCollection.insertOne(review);
        res.send(result);
      });


    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('<h1 style="color:#333;text-align:center;font-size:20px;margin:10px 0;">Summer Camp School Server Is Running !!!</h1>')
})

app.listen(port, () => {
    console.log(`End Game Task Server Is Running On Port:http://localhost:${port}`);
})
