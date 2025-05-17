import express from "express";
import authenticate from "../middlewares/jwtAuth.js";
import { createTodo, updateTodo } from "../middlewares/TodoZodSchema.js";
import { Todo } from "../models/TodoSchema.js";
import { Validate } from "../middlewares/Validate.js";

const router = express.Router();

router.post(
  "/createTodos",
  authenticate,
  Validate(createTodo),
  async (req, res) => {
    try {
      const { title, description } = req.body;
      const newTodo = new Todo({
        userId: req.user.id,
        title,
        description,
      });

      const saveTodo = newTodo.save();
      res.status(200).json({
        message: "Todo Created!",
        saveTodo,
      });
    } catch (error) {
      res.status(500).json(
        {
          message: "Problem Creating a todo",
        },
        console.error(error)
      );
    }
  }
);

router.get("/listallTodos", authenticate, async (req, res) => {
  try {
    const AllTodos = await Todo.find({
      userId: req.user.id,
    }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      AllTodos,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch Todos",
      error,
    });
  }
});

router.put(
  "/updateTodo/:id",
  authenticate,
  Validate(updateTodo),
  async (req, res) => {
    try {
      const todo = await Todo.findOne({
        _id: req.params.id,
        userId: req.user.id,
      });

      if (!todo)
        return res.status(400).json({
          message: "Todo not found",
        });

      const updatedFields = req.body;
      Object.assign(todo, updatedFields);

      const updatedTodo = await todo.save();
      res.status(200).json({
        message: "Todo updated successfully",
        updateTodo,
      });
    } catch (error) {
      res.status(500).json({ message: "Error updating todo", error });
    }
  }
);

router.delete("/deleteTodo/:id", authenticate, async (req, res) => {
  try {
    const deletedTodo = await Todo.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!deletedTodo)
      return res.status(404).json({ message: "Todo not found" });

    res.status(200).json({ message: "Todo deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting todo", error });
  }
});

export default router;
