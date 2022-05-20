const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

// Warning: Do not use in production
app.use(
    cors({
        origin: '*',
    })
);

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Clean co is listening on port ${port}`)
})