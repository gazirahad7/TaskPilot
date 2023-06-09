import "./App.css";
import AddTask from "./components/AddTask";
import Layout from "./components/Layout";
import TaskDetails from "./features/tasks/TaskDetails";
import { Route, Routes } from "react-router-dom";

import TasksView from "./features/tasks/TasksView";
import CompleteList from "./components/CompleteList";
import { useSelector } from "react-redux";
import ImportantList from "./components/Important";
import TodayList from "./components/TodayList";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const tasks = useSelector((state) => state.taskReducer);

  return (
    <>
      <Layout>
        <ToastContainer position="bottom-center" />

        <Routes>
          <Route path="/" element={<TasksView taskList={tasks} />} />
          <Route path="/complete-list" element={<CompleteList />} />
          <Route path="/important" element={<ImportantList />} />
          <Route path="/today-tasks" element={<TodayList />} />
        </Routes>
      </Layout>
    </>
  );
}

export default App;
