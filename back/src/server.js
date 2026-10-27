require('dotenv').config()
const path = require('path')
const express = require('express')
const app = require('./app');
const port = app.get('port');
const swaggerUi = require('swagger-ui-express')
const swaggerJsDoc = require('swagger-jsdoc')

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Tarefas',
      version: '1.0.0',
      description: 'API CRUD para gerenciar tarefas',
    },
    servers: [{ url: '/api' }],
  },
  apis: [`${__dirname}/routes/*.js`], // caminho para as rotas
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Serve o front-end pelo mesmo servidor, assim tudo fica num único endereço
app.use('/front', express.static(path.join(__dirname, '..', '..', 'front')))
app.get('/', (req, res) => res.redirect('/front/html/intro.html'))

app.listen(port, () => console.log(`Rodando na porta ${port}`));
