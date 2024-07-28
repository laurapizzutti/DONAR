const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const taskRouter = require('./routes/taskRouter');
const userRouter = require('./routes/userRouter');
const tabelaRouter = require('./routes/tabelaRouter');
const app = express();

app.set('port', process.env.PORT || 3001);
app.use(cors());
app.use(express.json());
app.use('/api', taskRouter);
app.use('/api', userRouter);
app.use('/api', tabelaRouter);

module.exports = app;
