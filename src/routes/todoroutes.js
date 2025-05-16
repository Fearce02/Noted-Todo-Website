import express from "express";
import authenticate from "../middlewares/jwtAuth";
import { createTodo, updateTodo } from "../middlewares/TodoZodSchema";
import { Todo } from "../models/TodoSchema";
import { Validate } from "../middlewares/Validate";

const router = express.Router();

router.post("/createTodos", Validate(createTodo), async (req, res) => {
  try {
    const newTodo = new Todo({
      userId: req.user.id,
      title: req.body,
      description: req.body.description,
    });

    const saveTodo = newTodo.save();
    res.status(200).json({
      message: "Todo Created!",
      saveTodo,
    });
  } catch (error) {
    res.status(500).json({
      message: "Problem Creating a todo",
      error,
    });
  }
});

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
