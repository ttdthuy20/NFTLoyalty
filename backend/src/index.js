const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const nftsRoute = require('./src/routes/nfts');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api/nfts', nftsRoute);

const port = process.env.PORT || 4000;
app.listen(port, ()=> console.log(`Backend listening on ${port}`));
