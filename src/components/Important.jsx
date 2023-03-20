import React from "react";
import { useSelector } from "react-redux";
import TasksView from "../features/tasks/TasksView";

function ImportantList() {
  const tasks = useSelector((state) => state.taskReducer);

  const importantTasks = tasks.filter((task) => task.star === true);

  return (
    <div>
      <TasksView taskList={importantTasks} />
    </div>
  );
}

export default ImportantList;
