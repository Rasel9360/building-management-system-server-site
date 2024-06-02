const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const port = process.env.PORT || 5000;
const app = express()


// middleware 
app.use(cors(
    {
        origin: [
            'http://localhost:5173',
            'http://localhost:5174',
            'https://assignment-twelve-1044b.web.app',
            'https://assignment-twelve-1044b.firebaseapp.com'
        ],
        credentials: true,
    }
));
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.bhgag9l.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

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
        const couponsCollection = client.db('beverlyDB').collection('coupons');
        const apartmentCollection = client.db('beverlyDB').collection('apartment');


        // coupon related api
        app.get('/coupons', async(req, res)=> {
            const result = await couponsCollection.find().toArray();
            res.send(result);
        })


        // apartment related api
        app.get('/apartment', async(req, res) =>{
            const result = await apartmentCollection.find().toArray();
            res.send(result);
        })


        // Send a ping to confirm a successful connection
        // await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);






app.get('/', (req, res) => {
    res.send('Assignment twelve server is running')
})

app.listen(port, () => {
    console.log(`Assignment twelve server is running on port ${port}`)
})