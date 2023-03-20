import React from "react";
import { useSelector } from "react-redux";
import TasksView from "../features/tasks/TasksView";

function CompleteList() {
  const tasks = useSelector((state) => state.taskReducer);

  const completeTasks = tasks.filter((task) => task.complete === true);

  return (
    <div>
      <TasksView taskList={completeTasks} />
    </div>
  );
}

export default CompleteList;
