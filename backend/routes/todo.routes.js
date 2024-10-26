import express from 'express';
import { verifyToken } from '../middlewares/auth.js';
import { createTodo, getTodos, deleteTodo, updateTodo } from '../controllers/todo.controller.js';
const router = express.Router();

router.use(verifyToken);

router.post('/', createTodo);
router.get('/', getTodos);
router.delete('/:id', deleteTodo);
router.put('/:id', updateTodo);

export default router;