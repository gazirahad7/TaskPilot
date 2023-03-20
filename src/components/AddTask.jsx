import Input from "@mui/joy/Input";
import * as React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask } from "../features/tasks/taskSlice";

export default function InputSizes() {
  const [task, setTask] = useState("");

  const numberOfTasks = useSelector((state) => state.taskReducer.length);

  const dispatch = useDispatch();
  console.log(numberOfTasks);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTask = {
      id: numberOfTasks + 1,
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
          required
        />
      </form>
    </div>
  );
}
