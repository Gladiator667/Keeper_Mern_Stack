require('dotenv').config()
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const userRouter = require('./router/userRouter');
const port = process.env.BACKEND_PORT || 5000;

app.use(express.json());
app.use(userRouter);


mongoose.connect(`mongodb://localhost:${process.env.DB_CONNECTION_PORT}/${process.env.DB_NAME}`);

app.listen({port}, ()=> {
    console.log(`Server listening on port ${port}......`);
})