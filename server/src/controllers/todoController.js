// src/controllers/todoController.js
const todoService = require('../services/todoService');

const getTodos = async (req, res) => {
    try {
        const todos = await todoService.getTodosByUserId(req.userId);
        res.json(todos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createTodo = async (req, res) => {
    try {
        const { text } = req.body;
        if (!text) {
            return res.status(400).json({ message: 'Text is required' });
        }
        const todo = await todoService.createTodo(req.userId, text);
        res.status(201).json(todo);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const toggleTodo = async (req, res) => {
    try {
        const todo = await todoService.toggleTodo(req.userId, req.params.id);
        res.json(todo);
    } catch (error) {
        if (error.message === 'Todo not found') {
            return res.status(404).json({ message: error.message });
        }
        res.status(500).json({ message: error.message });
    }
};

const deleteTodo = async (req, res) => {
    try {
        const todo = await todoService.deleteTodo(req.userId, req.params.id);
        res.json(todo);
    } catch (error) {
        if (error.message === 'Todo not found') {
            return res.status(404).json({ message: error.message });
        }
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getTodos,
    createTodo,
    toggleTodo,
    deleteTodo
};