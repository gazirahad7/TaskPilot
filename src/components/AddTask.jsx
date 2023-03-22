import Input from "@mui/joy/Input";
import * as React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask } from "../features/tasks/taskSlice";
import { v4 as uuidv4 } from "uuid";

export default function AddTaskInput() {
  const [task, setTask] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTask = {
      id: uuidv4(),
      task,
      complete: false,
      star: false,
      created: new Date(),
    };
    // console.log({ newTask });

    dispatch(addTask(newTask));
    let tasksDB = JSON.parse(localStorage.getItem("tasksDB")) || [];

    tasksDB.push(newTask);
    localStorage.setItem("tasksDB", JSON.stringify(tasksDB));

    setTask("");
  };
  return (
    <div className="add-input ">
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          size="lg"
          placeholder=" +  Add new task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          autoFocus
          required
        />
      </form>
    </div>
  );
}
