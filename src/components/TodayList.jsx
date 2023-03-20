import React from "react";
import { useSelector } from "react-redux";
import TasksView from "../features/tasks/TasksView";
import { dateFormat } from "../helper/formater";

function TodayList() {
  const tasks = useSelector((state) => state.taskReducer);

  const todayTasks = tasks.filter(
    (task) => dateFormat(task.created) === dateFormat(new Date())
  );

  return (
    <div>
      <TasksView taskList={todayTasks} />
    </div>
  );
}

export default TodayList;
