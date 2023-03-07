const express = require('express');
require('dotenv').config();
const app = express();
const user = require('./Routers/userRouter');

// Midlewares
app.use(express.json());
app.use('/', user);

app.listen(process.env.PORT, () => {
    console.log('server is running on PORT', process.env.PORT);
});
