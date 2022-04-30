const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
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
    }
    finally {
        // await client.close();
    }
}
run().catch(console.dir());
app.listen(port, () => {
    console.log('server is running on port', port);
})