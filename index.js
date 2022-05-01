const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const { query } = require('express');
require('dotenv').config();
const ObjectId = require('mongodb').ObjectId;
const app = express();
const port = process.env.PORT || 5000;
// midleware 
app.use(cors());
app.use(express.json())

const uri = "mongodb+srv://warehouse_admin:5KhBGbwA7XInVlpv@cluster0.tdnyb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

app.get('/', (req, res) => {
    res.send('Running warehouse management server');
})

async function run() {
    try {
        await client.connect();
        const itemCollection = client.db('wareHouse').collection('item');

        // get all item 
        app.get('/item', async (req, res) => {
            const query = {};
            const cursor = itemCollection.find(query);
            const items = await cursor.toArray();
            res.send(items);
        });
        // get signle item 
        app.get('/item/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const item = await itemCollection.findOne(query);
            res.send(item);
        });
        // update delivered item quantity 
        app.put('/item/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: ObjectId(id) };
            const newQuantity = req.body.newQuantity;
            const newSold = req.body.newSold;
            const options = { upsert: true };
            const updateDoc = {
                $set: {
                    quantity: newQuantity,
                    sold: newSold
                },
            };
            const result = await itemCollection.updateOne(filter, updateDoc, options);
            res.send(result);
        });
        // delete single item 
        app.delete('/item/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await itemCollection.deleteOne(query);
            res.send(result);
        })
    }
    finally {
        // await client.close();
    }
}
run().catch(console.dir);
app.listen(port, () => {
    console.log('server is running on port', port);
})