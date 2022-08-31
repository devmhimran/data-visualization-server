const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
var cors = require('cors')


app.use(cors());
app.use(express.json());
require('dotenv').config()

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.guvofca.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {

        const visualizeCollection = client.db('visualize-data').collection('visualize-data');


      app.get('/data', async(req, res) =>{
        const query = {};
        const cursor = visualizeCollection.find(query);
        const data = await cursor.toArray();
        res.send(data);
      });
    } finally {
    //   await client.close();
    }
  }
  run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('Welcome to data visualize')
  })
  
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })