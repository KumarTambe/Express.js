// basic routes and syntax

import express from 'express'

const app = express();

const tasks = ['task1', 'task2', 'task3'];

app.get('/health', (req, res) => {
    res.json({ status: "ok", uptime: "running" })
})

app.get('/profile', (req, res) => {
    res.json({ name: "Kumar", role: "SDE", skills: ["Javascript", "Node.js", "Express.js"] })
})

app.get('/tasks', (req, res) => {
    res.json({ "route": "/tasks", "message": "short list", "data": ["task1"] })
})

app.get('/tasks/all', (req, res) => {
    res.send({ "route": "/tasks/all", "message": "full list", "data": ["task1", "task2", "task3"] });
})

app.get('/count', (req, res) => {
    res.json({ count: tasks.length });
})

app.get('/*splat', (req, res) => {
    res.json({ error: "Route not found" });
})

app.listen(3000, () => {
    console.log("Server started at port 3000")
})