import Todo from '../models/Todo.model.js';

export const createTodo = async (req, res) => {
  try {
    const newTodo = new Todo({
      userId: req.userId,
      text: req.body.text,
    });
    await newTodo.save();
    res.status(201).send(newTodo);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ userId: req.userId });
    res.send(todos);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const deleteTodo = async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.sendStatus(204);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const updateTodo = async (req, res) => {
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.send(updatedTodo);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
