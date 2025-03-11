import React, { useEffect, useState } from "react";
import { MdCheck, MdDeleteForever } from "react-icons/md";

const todosKey = "reactTodo";

const Todo = () => {
  const [inputValue, setInputValue] = useState("");
  const [task, setTask] = useState(() => {
    return JSON.parse(localStorage.getItem(todosKey)) || [];
  });
  const [timeDate, setTimeDate] = useState("");

  const handleInputChange = (value) => {
    setInputValue(value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    if (!inputValue.trim()) return;
    const newTask = { id: Date.now(), content: inputValue, checked: false };

    if (task.some((curTask) => curTask.content === inputValue)) return;

    setTask((prevTask) => [...prevTask, newTask]);
    setInputValue("");
  };

  useEffect(() => {
    localStorage.setItem(todosKey, JSON.stringify(task));
  }, [task]);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setTimeDate(`${now.toLocaleDateString()} - ${now.toLocaleTimeString()}`);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleDelete = (id) => {
    setTask(task.filter((curTask) => curTask.id !== id));
  };

  const handleClearButton = () => {
    setTask([]);
  };

  const handleCheckedTodo = (id) => {
    setTask(task.map((curTask) => (curTask.id === id ? { ...curTask, checked: !curTask.checked } : curTask)));
  };

  return (
    <section className="flex flex-col items-center justify-center w-screen h-screen bg-gradient-to-r from-blue-900 to-indigo-900 ">
      <header className="mb-6 text-center">
        <h1 className="text-4xl font-bold ">Todo List</h1>
        <h2 className="text-lg text-gray-300">{timeDate}</h2>
      </header>

      <form onSubmit={handleFormSubmit} className="flex gap-3 mb-6">
        <input
          type="text"
          placeholder="Add a task..."
          value={inputValue}
          onChange={(e) => handleInputChange(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg shadow-md text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg shadow-md">
          Add Task
        </button>
      </form>

      <ul className="w-md  max-w-full space-y-3">
        {task.map((curTask) => (
          <li key={curTask.id} className="flex items-center justify-between p-4  bg-white bg-opacity-10 rounded-lg shadow-md">
            <span className={`text-lg font-medium ${curTask.checked ? "line-through" : "no-underline"}`}>{curTask.content}</span>
            <div className="flex gap-2">
              <button onClick={() => handleCheckedTodo(curTask.id)} className="bg-green-500 hover:bg-green-600 p-2 rounded-md text-white">
                <MdCheck className="text-2xl" />
              </button>
              <button onClick={() => handleDelete(curTask.id)} className="bg-red-500 hover:bg-red-600 p-2 rounded-md text-white">
                <MdDeleteForever className="text-2xl" />
              </button>
            </div>
          </li>
        ))}
      </ul>

      {task.length > 0 && (
        <button onClick={handleClearButton} className="mt-6 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg shadow-md ">
          Clear All
        </button>
      )}
    </section>
  );
};

export default Todo;