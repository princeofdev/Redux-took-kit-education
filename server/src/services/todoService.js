// src/services/todoService.js
let todos = [];

const getTodosByUserId = async (userId) => {
    return todos.filter(todo => todo.userId === userId);
};

const createTodo = async (userId, text) => {
    const newTodo = {
        id: Date.now(),
        text,
        completed: false,
        userId
    };
    todos.push(newTodo);
    return newTodo;
};

const toggleTodo = async (userId, todoId) => {
    const todo = todos.find(t => t.id === parseInt(todoId) && t.userId === userId);
    if (!todo) {
        throw new Error('Todo not found');
    }
    todo.completed = !todo.completed;
    return todo;
};

const deleteTodo = async (userId, todoId) => {
    const index = todos.findIndex(t => t.id === parseInt(todoId) && t.userId === userId);
    if (index === -1) {
        throw new Error('Todo not found');
    }
    const [deletedTodo] = todos.splice(index, 1);
    return deletedTodo;
};

module.exports = { 
    getTodosByUserId, 
    createTodo, 
    toggleTodo, 
    deleteTodo 
};