const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const taskRouter = require('./routes/agendamentoRouter');
const userRouter = require('./routes/cadastroRouter');
const tabelaRouter = require('./routes/tabelaRouter');
const loginRouter = require('./routes/loginRouter');
const instiRouter = require('./routes/instiRouter');
const app = express();

app.set('port', process.env.PORT || 3005);
app.use(cors());
app.use(express.json());

app.use('/api', taskRouter);
app.use('/api', userRouter);
app.use('/api', tabelaRouter);
app.use('/api', loginRouter)
app.use('/api', instiRouter)

module.exports = app;
