import React from "react";
import { useState, useEffect } from "react";
import {
  Plus,
  Loader,
  AlertCircle,
  Pencil,
  Trash2,
  X,
  Check,
} from "lucide-react";
import Button from "./ui/Button";
import { useSelector } from "react-redux";

const baseAPI = "3000";

const TodoList = () => {
  const { token } = useSelector((state) => state.user);

  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [newTodo, setNewTodo] = useState({ title: "", description: "" });
  const [editingTodo, setEditingTodo] = useState(null);
  const [isAddingNew, setIsAddingNew] = useState(false);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:${baseAPI}/todos/listallTodos`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setTodos(data.AllTodos);
      } else {
        throw new Error("Failed to fetch todos");
      }
    } catch (error) {
      setError("Failed to load todos");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTodo = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:${baseAPI}/todos/createTodos`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(newTodo),
        }
      );

      if (response.ok) {
        await fetchTodos();
        setNewTodo({ title: "", description: "" });
        setIsAddingNew(false);
      } else {
        throw new Error("Failed to create todo");
      }
    } catch (error) {
      setError("Failed to create todo");
      console.error(error);
    }
  };

  const handleUpdateTodo = async (todo) => {
    try {
      const response = await fetch(
        `http://localhost:${baseAPI}/todos/updateTodo/${todo._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(todo),
        }
      );

      if (response.ok) {
        await fetchTodos();
        setEditingTodo(null);
      } else {
        throw new Error("Failed to update todo");
      }
    } catch (error) {
      setError("Failed to update todo");
      console.error(error);
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:${baseAPI}/todos/deleteTodo/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.ok) {
        await fetchTodos();
      } else {
        throw new Error("Failed to delete todo");
      }
    } catch (error) {
      setError("Failed to delete todo");
      console.error(error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader className="h-8 w-8 text-indigo-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-slate-800">My Todos</h1>
          <Button
            variant="primary"
            onClick={() => setIsAddingNew(true)}
            className="flex items-center"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add New Todo
          </Button>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 rounded-lg flex items-center gap-3 text-red-700">
            <AlertCircle className="h-5 w-5 flex-shrink-0" />
            <p className="text-sm">{error}</p>
          </div>
        )}

        {isAddingNew && (
          <div className="mb-6 bg-white rounded-xl p-6 shadow-sm border border-slate-100">
            <form onSubmit={handleAddTodo}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  value={newTodo.title}
                  onChange={(e) =>
                    setNewTodo({ ...newTodo, title: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Description
                </label>
                <textarea
                  value={newTodo.description}
                  onChange={(e) =>
                    setNewTodo({ ...newTodo, description: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  rows={3}
                />
              </div>
              <div className="flex justify-end space-x-3">
                <Button
                  variant="outlined"
                  onClick={() => setIsAddingNew(false)}
                >
                  Cancel
                </Button>
                <Button variant="primary" type="submit">
                  Add Todo
                </Button>
              </div>
            </form>
          </div>
        )}

        <div className="space-y-4">
          {todos.map((todo) => (
            <div
              key={todo._id}
              className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow"
            >
              {editingTodo?._id === todo._id ? (
                <div>
                  <input
                    type="text"
                    value={editingTodo.title}
                    onChange={(e) =>
                      setEditingTodo({ ...editingTodo, title: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 mb-3"
                  />
                  <textarea
                    value={editingTodo.description}
                    onChange={(e) =>
                      setEditingTodo({
                        ...editingTodo,
                        description: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 mb-3"
                    rows={3}
                  />
                  <div className="flex justify-end space-x-3">
                    <Button
                      variant="outlined"
                      onClick={() => setEditingTodo(null)}
                      className="flex items-center"
                    >
                      <X className="h-4 w-4 mr-2" />
                      Cancel
                    </Button>
                    <Button
                      variant="primary"
                      onClick={() => handleUpdateTodo(editingTodo)}
                      className="flex items-center"
                    >
                      <Check className="h-4 w-4 mr-2" />
                      Save
                    </Button>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-slate-800 mb-2">
                        {todo.title}
                      </h3>
                      <p className="text-slate-600">{todo.description}</p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setEditingTodo(todo)}
                        className="text-slate-400 hover:text-indigo-600 transition-colors"
                      >
                        <Pencil className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDeleteTodo(todo._id)}
                        className="text-slate-400 hover:text-red-600 transition-colors"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                  <div className="mt-4 text-sm text-slate-500">
                    Created: {new Date(todo.createdAt).toLocaleDateString()}
                  </div>
                </div>
              )}
            </div>
          ))}

          {todos.length === 0 && !isAddingNew && (
            <div className="text-center py-12">
              <p className="text-slate-600">
                No todos yet. Click "Add New Todo" to get started!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TodoList;
