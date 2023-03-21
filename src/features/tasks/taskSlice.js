import { createSlice } from "@reduxjs/toolkit";

const defaultTasks = [
  {
    id: 1,
    task: "This my 1st task",
    complete: false,
    star: false,
  },
  {
    id: 2,
    task: "This my 2st task",
    complete: true,
    star: false,
  },
  {
    id: 3,
    task: "This my 3st task",
    complete: false,
    star: true,
  },
];
let tasksDB = JSON.parse(localStorage.getItem("tasksDB")) || [];

const taskSlice = createSlice({
  name: "tasks",
  initialState: tasksDB,

  reducers: {
    showTasks: (state) => {
      state;
    },
    addTask: (state, action) => {
      //  const newTask = action.payload;
      state.push(action.payload);
    },
    isComplete: (state, action) => {
      const taskId = action.payload;
      const isTaskExist = state.filter((task) => task.id === taskId);
      let tasksDB = JSON.parse(localStorage.getItem("tasksDB")) || [];
      const isTaskExistLoc = tasksDB.filter((task) => task.id === taskId);
      if (isTaskExist) {
        isTaskExist[0].complete = true;
      }
      if (isTaskExistLoc) {
        isTaskExistLoc[0].complete = true;
        localStorage.setItem("tasksDB", JSON.stringify(tasksDB));
      }
    },
    unChecked: (state, action) => {
      const taskId = action.payload;
      const isTaskExist = state.filter((task) => task.id === taskId);
      if (isTaskExist) {
        isTaskExist[0].complete = false;
      }
      let tasksDB = JSON.parse(localStorage.getItem("tasksDB")) || [];
      const isTaskExistLoc = tasksDB.filter((task) => task.id === taskId);

      if (isTaskExistLoc) {
        isTaskExistLoc[0].complete = false;
        localStorage.setItem("tasksDB", JSON.stringify(tasksDB));
      }
    },

    isStare: (state, action) => {
      const taskId = action.payload;

      const isTaskExist = state.filter((task) => task.id === taskId);

      if (isTaskExist) {
        isTaskExist[0].star = true;
      }
      let tasksDB = JSON.parse(localStorage.getItem("tasksDB")) || [];
      const isTaskExistLoc = tasksDB.filter((task) => task.id === taskId);
      if (isTaskExistLoc) {
        isTaskExistLoc[0].star = true;
        localStorage.setItem("tasksDB", JSON.stringify(tasksDB));
      }
    },
    isNotStare: (state, action) => {
      const taskId = action.payload;

      const isTaskExist = state.filter((task) => task.id === taskId);

      if (isTaskExist) {
        isTaskExist[0].star = false;
      }
      let tasksDB = JSON.parse(localStorage.getItem("tasksDB")) || [];
      const isTaskExistLoc = tasksDB.filter((task) => task.id === taskId);
      if (isTaskExistLoc) {
        isTaskExistLoc[0].star = false;
        localStorage.setItem("tasksDB", JSON.stringify(tasksDB));
      }
    },

    taskDetails: (state, action) => {
      const taskId = action.payload;
      const isTaskExist = state.tasks.filter((task) => task.id === taskId);
    },
    updateTaskValue: (state, action) => {
      const { id, name } = action.payload;

      const isTaskExist = state.filter((task) => task.id === id);
      let tasksDB = JSON.parse(localStorage.getItem("tasksDB")) || [];
      const isTaskExistLoc = tasksDB.filter((task) => task.id === id);
      if (isTaskExistLoc) {
        isTaskExistLoc[0].task = name;
        localStorage.setItem("tasksDB", JSON.stringify(tasksDB));
      }

      if (name !== null && isTaskExist) {
        isTaskExist[0].task = name;
      }
    },
    deleteTask: (state, action) => {
      const taskId = action.payload;

      const isTaskExist = state.filter((task) => task.id === taskId);
      let tasksDB = JSON.parse(localStorage.getItem("tasksDB")) || [];

      const isTaskExistLoc = tasksDB.filter((task) => task.id === taskId);

      if (isTaskExistLoc) {
        tasksDB.pop(isTaskExistLoc);
        localStorage.setItem("tasksDB", JSON.stringify(tasksDB));
      }

      if (isTaskExist) {
        state.pop(isTaskExist);
      }
    },
  },
});

export const {
  showTasks,
  addTask,
  isComplete,
  isStare,
  unChecked,
  taskDetails,
  updateTaskValue,
  deleteTask,
  isNotStare,
} = taskSlice.actions;

export default taskSlice.reducer;
