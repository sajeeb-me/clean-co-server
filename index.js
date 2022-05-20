const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

require('dotenv').config()

const app = express();
const port = process.env.PORT || 5000;

// Warning: Do not use in production
app.use(
    cors({
        origin: '*',
    })
);

app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.wzq2y.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();
        const serviceCollection = client.db("cleanCo").collection("services");

        app.get('/service', async (req, res) => {
            const services = await serviceCollection.find().toArray();
            res.send(services)
        })
        app.post('/service', async (req, res) => {
            const data = req.body;
            const result = await serviceCollection.insertOne(data);
            res.send(result)
        })
        app.put('/service/:id', async (req, res) => {
            const { id } = req.params;
            const data = req.body;
            const filter = { _id: ObjectId(id) };
            const options = { upsert: true };
            const updateDoc = {
                $set: data,
            }
            const result = await serviceCollection.updateOne(filter, updateDoc, options);
            res.send(result)
        })
        app.delete('/service/:id', async (req, res) => {
            const { id } = req.params;
            const query = { _id: ObjectId(id) };
            const result = await serviceCollection.deleteOne(query);
            res.send(result)
        })


    } finally {

    }
}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Clean co is listening on port ${port}`)
})