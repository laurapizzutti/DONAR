const express = require('express');
const app = express();
const port = 3001;

// Simulação de banco de dados
let tasks = [];

app.use(express.json());

app.post('/api/store/task', (req, res) => {
    const task = req.body;
    tasks.push(task); // Adiciona a tarefa ao "banco de dados"
    res.json({ success: true });
});

app.get('/api/store/tasks', (req, res) => {
    res.json(tasks); // Retorna todas as tarefas
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});

// separação

async function fetchTasks() {
    try {
        const response = await fetch('http://localhost:3001/api/store/tasks');
        const tasks = await response.json();

        const taskList = document.getElementById('taskList');
        tasks.forEach(task => {
            const listItem = document.createElement('li');
            listItem.textContent = `Item: ${task.item}, Date: ${task.date}, Hour: ${task.hora}, Quantity: ${task.qnt}`;
            taskList.appendChild(listItem);
        });
    } catch (error) {
        console.error('Erro ao recuperar as tarefas:', error);
    }
}

// Chama a função para buscar as tarefas quando a página carregar
window.onload = fetchTasks;