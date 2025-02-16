const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');
const authMiddleware = require('../middleware/auth');

router.use(authMiddleware);
router.get('/', todoController.getTodos);
router.post('/', todoController.createTodo);
router.patch('/:id', todoController.toggleTodo);
router.delete('/:id', todoController.deleteTodo);

module.exports = router;